"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ExternalLink, Loader2, X } from "lucide-react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";


GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

const WASM_URL = "/pdfjs/wasm/";

const RENDER_SCALE = 2;

export default function CertLightbox(props: {
  pdfUrl: string;
  caption: string;
  onClose: () => void;
}) {
  // Both mount sites load this component with `ssr: false`, so `document` exists here.
  return createPortal(<CertLightboxContent {...props} />, document.body);
}

function CertLightboxContent({
  pdfUrl,
  caption,
  onClose,
}: {
  pdfUrl: string;
  caption: string;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const docRef = useRef<PDFDocumentProxy | null>(null);
  // Monotonic token so a slow render of an old page can never overwrite the
  // canvas after the user (or a re-mount) has moved on to a newer page.
  const renderTokenRef = useRef(0);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  /* Draw the given 1-based page onto the canvas. */
  const renderPage = useCallback(
    async (pageNum: number) => {
      const doc = docRef.current;
      const canvas = canvasRef.current;
      if (!doc || !canvas) return;

      // Cancel any in-flight render and bump the token so its completion is
      // ignored if it somehow still resolves.
      renderTaskRef.current?.cancel();
      const token = ++renderTokenRef.current;

      try {
        const pdfPage = await doc.getPage(pageNum);
        if (token !== renderTokenRef.current) return;

        const viewport = pdfPage.getViewport({ scale: RENDER_SCALE });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const task = pdfPage.render({ canvas, viewport });
        renderTaskRef.current = task;
        await task.promise;
        if (token === renderTokenRef.current) setStatus("ready");
      } catch (err) {
        // A cancel() throws a named "RenderingCancelledException"; that's
        // expected during fast page switches, so only surface real errors.
        if (token === renderTokenRef.current && (err as Error)?.name !== "RenderingCancelledException") {
          setStatus("error");
        }
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const loadingTask = getDocument({ url: pdfUrl, wasmUrl: WASM_URL });
    loadingTask.promise
      .then((doc) => {
        if (cancelled) {
          void loadingTask.destroy();
          return;
        }
        docRef.current = doc;
        setNumPages(doc.numPages);
        void renderPage(1);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTokenRef.current += 1;
      docRef.current = null;
      void loadingTask.destroy();
    };
  }, [pdfUrl, renderPage]);

  /* (Re)render whenever the visible page changes. */
  useEffect(() => {
    if (status === "ready" || status === "loading") {
      // Only render once the doc exists; skip the very first paint handled above.
      if (docRef.current && page >= 1) void renderPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => Math.min(numPages, p + 1)),
    [numPages],
  );

  /* Close with a short exit animation before unmounting. */
  const dismiss = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    gsap
      .timeline({ onComplete: onClose })
      .to(contentRef.current, { opacity: 0, scale: 0.97, y: 10, duration: 0.22, ease: "power2.in" })
      .to(rootRef.current, { opacity: 0, duration: 0.22, ease: "power1.in" }, "<0.04");
  }, [onClose]);

  /* Open animation: backdrop fade + content settle-in. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap
      .timeline()
      .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.96, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "<",
      );
    return () => {
      tl.kill();
    };
  }, []);

  /* Cross-fade the page on navigation. */
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (canvasRef.current) {
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", overwrite: true },
      );
    }
  }, [page]);

  /* Kill running animations on unmount. */
  useEffect(
    () => () => {
      gsap.killTweensOf([rootRef.current, contentRef.current, canvasRef.current, captionRef.current]);
      [rootRef.current, contentRef.current].forEach((el) => el?.removeAttribute("style"));
    },
    [],
  );

  /* Keyboard: Esc closes, arrows navigate (only when there is more than one page). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      else if (numPages > 1 && e.key === "ArrowLeft") goPrev();
      else if (numPages > 1 && e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss, goPrev, goNext, numPages]);

  /* Lock page scroll while open (same technique as PhotoLightbox). */
  useEffect(() => {
    const lockedY = window.scrollY;
    const blockWheel = (e: WheelEvent) => e.preventDefault();
    const blockTouch = (e: TouchEvent) => e.preventDefault();
    const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    const snapBack = () => {
      if (window.scrollY !== lockedY) window.scrollTo(0, lockedY);
    };
    document.addEventListener("wheel", blockWheel, { passive: false, capture: true });
    document.addEventListener("touchmove", blockTouch, { passive: false, capture: true });
    document.addEventListener("keydown", blockKeys, true);
    document.addEventListener("scroll", snapBack, { passive: true, capture: true });
    return () => {
      document.removeEventListener("wheel", blockWheel, true);
      document.removeEventListener("touchmove", blockTouch, true);
      document.removeEventListener("keydown", blockKeys, true);
      document.removeEventListener("scroll", snapBack, true);
    };
  }, []);

  const multiPage = numPages > 1;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-2 py-4 sm:px-4 sm:py-8 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      <div
        ref={contentRef}
        className="flex w-fit max-w-[90vw] flex-col gap-2 sm:gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar: open PDF + close ─────────────────────────── */}
        <div className="flex items-center justify-between">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-3 py-2 sm:px-[1.5rem] sm:py-[0.8rem] font-medium leading-none text-white shadow-lg shadow-black/30 tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0.75rem_2rem_-0.375rem_rgba(26,161,121,0.6)]"
            style={{ background: "var(--primary-gradient)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
            />
            <ExternalLink className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" strokeWidth={2} />
            <span>Open PDF</span>
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close preview"
            className="cursor-pointer p-2 text-white transition-all duration-200 hover:rotate-90 hover:opacity-70"
          >
            <X className="h-6 w-6 sm:h-[2rem] sm:w-[2rem]" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Stage — hugs the certificate so the preview takes the page's
               own aspect ratio and the whole certificate is visible. The
               rendered <canvas> *is* the card (white, rounded, shadowed),
               scaled down to fit the viewport while keeping its ratio. ── */}
        <div
          ref={stageRef}
          className="relative flex w-fit max-w-[92vw] items-center justify-center"
        >
          {/* Placeholder footprint while the page hasn't painted yet */}
          {status !== "ready" && (
            <div className="flex h-[40vh] w-[min(86vw,34rem)] items-center justify-center rounded-[1rem] bg-white px-6 text-center shadow-2xl sm:h-[54vh] sm:rounded-[1.25rem]">
              {status === "loading" ? (
                <Loader2 className="h-8 w-8 animate-spin text-[#1AA179]" />
              ) : (
                <span className="text-sm text-neutral-500">Unable to load this certificate.</span>
              )}
            </div>
          )}

          {/* Prev arrow — only for multi-page certificates */}
          {multiPage && (
            <button
              type="button"
              onClick={goPrev}
              disabled={page <= 1}
              aria-label="Previous page"
              className="absolute left-1.5 z-10 flex cursor-pointer items-center justify-center p-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition duration-200 enabled:hover:scale-110 enabled:hover:opacity-70 disabled:cursor-default disabled:opacity-30 sm:-left-10 lg:-left-14"
            >
              <ChevronLeft className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.5} />
            </button>
          )}

          <canvas
            ref={canvasRef}
            className={`block h-auto max-h-[74vh] w-auto max-w-[92vw] rounded-[1rem] bg-white shadow-2xl sm:max-w-[78vw] sm:rounded-[1.25rem] ${
              status !== "ready" ? "hidden" : ""
            }`}
            style={{ width: "auto", height: "auto" }}
          />

          {/* Next arrow — only for multi-page certificates */}
          {multiPage && (
            <button
              type="button"
              onClick={goNext}
              disabled={page >= numPages}
              aria-label="Next page"
              className="absolute right-1.5 z-10 flex cursor-pointer items-center justify-center p-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition duration-200 enabled:hover:scale-110 enabled:hover:opacity-70 disabled:cursor-default disabled:opacity-30 sm:-right-10 lg:-right-14"
            >
              <ChevronRight className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* ── Caption + page indicator ──────────────────────────── */}
        <div ref={captionRef} className="flex flex-col items-center gap-0 sm:gap-1">
          <h4 className="text-center font-archivo-black text-sm sm:text-[1.25rem] leading-[1.75rem] text-white lg:text-[1.5rem] tracking-wider">
            {caption}
          </h4>
          {multiPage && (
            <p className="font-space-mono text-[13px] sm:text-[1rem] text-white/80 font-medium tracking-wider">
              Page {page} / {numPages}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
