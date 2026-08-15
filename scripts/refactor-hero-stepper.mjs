import fs from 'fs';
const file = 'components/homepage/Hero.tsx';
let src = fs.readFileSync(file, 'utf8');
// Normalize to \n for processing
src = src.replace(/\r\n/g, '\n');

// ── 0a. Top-of-file: imports ──
rep(
  /import \{ useRef \} from "react";/,
  'import { useRef, type MutableRefObject } from "react";',
  'import MutableRefObject'
);
rep(
  /(import \{ useGSAP \} from "@gsap\/react";\n)/,
  '$1import { useGestureInput } from "./hooks/useGestureInput";\nimport { useScrollStepper } from "./hooks/useScrollStepper";\n',
  'add hook imports'
);

// ── 0b. HeroProps interface + function signature ──
rep(
  /export default function Hero\(\) \{/,
  `interface HeroProps {\n  /** Shared refs connecting WeAreASG's count-up to the stepper */\n  waaTriggerRef?: MutableRefObject<(() => void) | null>;\n  waaResetRef?: MutableRefObject<(() => void) | null>;\n}\n\nexport default function Hero({ waaTriggerRef, waaResetRef }: HeroProps) {`,
  'HeroProps interface'
);

// ── 0c. Stepper + gesture hook calls after waaWhiteRef ──
rep(
  /(  const waaWhiteRef = useRef<HTMLDivElement>\(null\);\n)/,
  `$1
  // ── Scroll-stepper state machine (extracted) ──
  const TRANSITION_COUNT = 10;
  const onProgressRef = useRef<(i: number, p: number) => void>(() => {});
  const onStageRef = useRef<(i: number, fromAbove: boolean) => void>(() => {});
  const onLandRef = useRef<(i: number) => void>(() => {});
  const onLandBackRef = useRef<(i: number) => void>(() => {});
  const transitionDurationsRef = useRef<number[]>([]);
  const getTransitionDuration = (i: number) =>
    transitionDurationsRef.current[i] || 1;
  const stepper = useScrollStepper({
    transitionCount: TRANSITION_COUNT,
    getTransitionDuration,
    onProgress: onProgressRef,
    onStage: onStageRef,
    onLand: onLandRef,
    onLandBack: onLandBackRef,
  });

  // Extracted gesture input — owns wheel / touch / keyboard event handling.
  const onGestureRef = useRef<(dir: number, fire: boolean) => boolean>(() => false);
  const { isLandingRef, anchorCorrectedRef } = useGestureInput({
    onGesture: onGestureRef,
    sweeping: stepper.sweeping,
  });
`,
  'stepper + gesture hook calls'
);

// ── 0d. Scroll-stability helpers + controlledScrollTo after mobile check ──
rep(
  /(      if \(window\.innerWidth < 1024\) return;\n)\n(      const headerLogo)/,
  `$1
      /* ── Scroll-stability state (C3 + C4) ── */
      const SCROLL_TOP_THRESHOLD = 4;
      const FADE_CHAIN_TOLERANCE = 6;
      const ANCHOR_DRIFT_LIMIT = 20;

      const controlledScrollTo = (top: number) => {
        isLandingRef.current = true;
        window.scrollTo({ top, behavior: "auto" });
      };

$2`,
  'scroll-stability helpers'
);

// ── 0e. correctLogoPosition after fadeChain ──
rep(
  new RegExp(
    '(        newsLink\\.onSettle = resetNewsHeading;\n' +
    '        newsLink\\.onUnsettle = resetNewsHeading;\n' +
    '      \\}\\n)\n' +
    '(      /\\* ── Discrete scroll stepping)'
  ),
  `$1
      /* C1 fix — After a reverse of tl4, correct the flying logo position. */
      const correctLogoPosition = () => {
        if (!introLogo || !headerLogo || !logoRef.current) return;
        const iRect = introLogo.getBoundingClientRect();
        const nRect = headerLogo.getBoundingClientRect();
        const dx = nRect.left + nRect.width / 2 - (iRect.left + iRect.width / 2);
        const dy = nRect.top + nRect.height / 2 - (iRect.top + iRect.height / 2);
        const scale = nRect.height / Math.max(iRect.height, 1);
        gsap.set(logoRef.current, {
          left: iRect.left, top: iRect.top, x: dx, y: dy, scale,
          transformOrigin: "center center", opacity: 1, autoAlpha: 1,
        });
      };

      $2`,
  'correctLogoPosition'
);

// ── 0f. Change window.scrollTo → controlledScrollTo in transitions ──
rep(
  /              window\.scrollTo\(\{ top: 0, behavior: "auto" \}\);/,
  '              controlledScrollTo(0);',
  'controlledScrollTo(0)'
);
rep(
  /            window\.scrollTo\(\{ top: ourBusinessTopY\(\), behavior: "auto" \}\);/,
  '            controlledScrollTo(ourBusinessTopY());',
  'controlledScrollTo(ourBusinessTopY)'
);
rep(
  /              window\.scrollTo\(\{ top: topY\(link\.from\), behavior: "auto" \}\);/,
  '              controlledScrollTo(topY(link.from));',
  'controlledScrollTo(link.from)'
);
rep(
  /            window\.scrollTo\(\{ top: topY\(link\.to\), behavior: "auto" \}\);/,
  '            controlledScrollTo(topY(link.to));',
  'controlledScrollTo(link.to)'
);

function rep(pattern, replacement, label) {
  const before = src;
  src = src.replace(pattern, replacement);
  if (src === before) console.log('WARN: no match for', label);
  else console.log('OK:', label);
}

// ── 1. Remove step declaration + comment ──
rep(
  new RegExp('      /\\* ── Discrete scroll stepping ──\\n[\\s\\S]*?let step = 0;[^\\n]*\\n\\n'),
  '',
  'step declaration'
);

// ── 2. Remove wheel gesture detection block ──
rep(
  new RegExp('      /\\* ── Cross-device wheel gesture detection ──\\n[\\s\\S]*?return false;\\n      \\};\\n\\n'),
  '',
  'wheel gesture detection'
);

// ── 3. Remove stepper state + stageTransition ──
rep(
  new RegExp(
    '      const LAST = transitions\\.length;[^\\n]*\\n' +
    '      const TEMPO[^\\n]*\\n' +
    '      const LAG_EXP[^\\n]*\\n' +
    '      const RATE_MAX[^\\n]*\\n\\n' +
    '      const scrub[^\\n]*\\n' +
    '      let goal[^\\n]*\\n' +
    '      let staged[^\\n]*\\n' +
    '      let sweep[^\\n]*\\n\\n' +
    '      // A chase is in flight[^\\n]*\\n' +
    '      const sweeping[^\\n]*\\n\\n' +
    '      const stageTransition[^\\n]*\\n' +
    '        staged = i;\\n' +
    '        transitions\\[i\\]\\.enter\\(fromAbove\\);\\n' +
    '      \\};\\n'
  ),
  '',
  'stepper state + stageTransition'
);

// ── 4. Replace render() with callback-based version ──
rep(
  new RegExp('      const render = \\(\\) => \\{[\\s\\S]*?          return;\\n        \\}\\n      \\};'),
  `      const render = () => {
        // Bounded: one pass per boundary crossed, never an open loop.
        // M5: each iteration processes exactly one boundary.
        // The guard bound (TRANSITION_COUNT*2) prevents runaway.
        for (let guard = 0; guard <= TRANSITION_COUNT * 2; guard++) {
          if (staged !== null) {
            const i = staged;
            if (scrub.pos >= i + 1) {
              onProgressRef.current(i, 1);
              staged = null;
              stepper.stepRef.current = i + 1;
              onLandRef.current(i);
              continue;
            }
            if (scrub.pos <= i) {
              onProgressRef.current(i, 0);
              staged = null;
              stepper.stepRef.current = i;
              onLandBackRef.current(i);
              continue;
            }
            onProgressRef.current(i, scrub.pos - i);
            return;
          }
          if (scrub.pos > stepper.stepRef.current && stepper.stepRef.current < TRANSITION_COUNT) {
            onStageRef.current(stepper.stepRef.current, false);
            staged = stepper.stepRef.current;
            continue;
          }
          if (scrub.pos < stepper.stepRef.current && stepper.stepRef.current > 0) {
            onStageRef.current(stepper.stepRef.current - 1, true);
            staged = stepper.stepRef.current - 1;
            continue;
          }
          return;
        }
      };`,
  'render()'
);

// ── 5. Replace retarget() ──
rep(
  new RegExp('      const retarget = \\(\\) => \\{[\\s\\S]*?        \\}\\);\\n      \\};'),
  `      const retarget = () => {
        sweep?.kill();
        sweep = null;
        const dist = Math.abs(goal - scrub.pos);
        if (dist < 0.0005) {
          scrub.pos = goal;
          render();
          return;
        }
        const lead = Math.min(
          TRANSITION_COUNT - 1,
          Math.max(
            0,
            goal > scrub.pos ? Math.floor(scrub.pos) : Math.ceil(scrub.pos) - 1
          )
        );
        const base = getTransitionDuration(lead) || 1;
        const TEMPO = 4.5;
        const LAG_EXP = -0.03;
        const RATE_MAX = 0.8;
        const duration =
          dist <= 1
            ? TEMPO * base * dist
            : Math.max(
                TEMPO * base * Math.pow(dist, LAG_EXP),
                dist / RATE_MAX
              );
        sweep = gsap.to(scrub, {
          pos: goal,
          duration,
          ease: "power4.out",
          onUpdate: render,
          onComplete: () => {
            scrub.pos = goal;
            render();
            sweep = null;
          },
        });
      };`,
  'retarget()'
);

// ── 6. Add durations ref + callback wiring after transitions array ──
rep(
  new RegExp('(        \\}\\)\\),\\n      \\];\\n)'),
  `$1
      // Populate durations ref so the stepper hook can read real timeline durations
      transitionDurationsRef.current = transitions.map(t => t.tl.duration() || 1);

      // Wire stepper callbacks
      onProgressRef.current = (i, p) => transitions[i].tl.progress(p);
      onStageRef.current = (i, fromAbove) => transitions[i].enter(fromAbove);
      onLandRef.current = (i) => transitions[i].land();
      onLandBackRef.current = (i) => {
        transitions[i].landBack();
        if (i === 3) correctLogoPosition();
      };
`,
  'callback wiring'
);

// ── 7. Add onGestureRef wiring before onWheel ──
rep(
  new RegExp('(      const onWheel = \\(e: WheelEvent\\))'),
  `      /* ── Wire the extracted gesture-input hook to the animation state ── */
      onGestureRef.current = (dir, fire) => {
        if (stepper.sweepingRef.current()) {
          if (fire) {
            anchorCorrectedRef.current = false;
            isLandingRef.current = false;
            stepper.advanceRef.current(dir);
          }
          return true;
        }
        const handled = routeGesture(dir, fire);
        if (handled && fire) {
          anchorCorrectedRef.current = false;
          isLandingRef.current = false;
        }
        return handled;
      };

$1`,
  'onGestureRef wiring'
);

// ── 8. routeGesture: step → stepper.stepRef.current, LAST → TRANSITION_COUNT ──
{
  const m = src.match(new RegExp('const routeGesture = \\(dir: number, fire: boolean\\): boolean => \\{[\\s\\S]*?\\n      \\};'));
  if (m) {
    let fixed = m[0];
    fixed = fixed.replace(/step === LAST/g, 'stepper.stepRef.current === TRANSITION_COUNT');
    fixed = fixed.replace(/step === link\.step/g, 'stepper.stepRef.current === link.step');
    fixed = fixed.replace(/step >= 5/g, 'stepper.stepRef.current >= 5');
    fixed = fixed.replace(/step < 5/g, 'stepper.stepRef.current < 5');
    fixed = fixed.replace(/step > 0/g, 'stepper.stepRef.current > 0');
    fixed = fixed.replace(/advance\(1\)/g, 'stepper.advanceRef.current(1)');
    fixed = fixed.replace(/advance\(-1\)/g, 'stepper.advanceRef.current(-1)');
    fixed = fixed.replace(/<= 4/g, '<= FADE_CHAIN_TOLERANCE');
    fixed = fixed.replace(
      /window\.scrollTo\(\{ top: anchor, behavior: "auto" \}\)/,
      'controlledScrollTo(anchor)'
    );
    src = src.replace(m[0], fixed);
    console.log('OK: routeGesture refs');
  } else console.log('WARN: routeGesture not found');
}

// ── 9. anchorY: step → stepper.stepRef.current ──
{
  const m = src.match(new RegExp('const anchorY = \\(\\) => \\{[\\s\\S]*?\\n      \\};'));
  if (m) {
    let fixed = m[0];
    fixed = fixed.replace(/step === 5/g, 'stepper.stepRef.current === 5');
    fixed = fixed.replace(/step === l\.step \+ 1/g, 'stepper.stepRef.current === l.step + 1');
    src = src.replace(m[0], fixed);
    console.log('OK: anchorY refs');
  } else console.log('WARN: anchorY not found');
}

// ── 10. Remove onWheel (useGestureInput handles wheel) ──
rep(
  new RegExp('      const onWheel = \\(e: WheelEvent\\) => \\{[\\s\\S]*?if \\(routeGesture\\(dir, isGesture\\)\\) e\\.preventDefault\\(\\);\\n      \\};\\n\\n'),
  '',
  'remove onWheel'
);

// ── 11. Remove onKeyDown (useGestureInput handles keyboard) ──
rep(
  new RegExp('      const onKeyDown = \\(e: KeyboardEvent\\) => \\{[\\s\\S]*?if \\(routeGesture\\(dir, true\\)\\) e\\.preventDefault\\(\\);\\n      \\};\\n\\n'),
  '',
  'remove onKeyDown'
);

// ── 12. Remove touch handlers (useGestureInput handles touch) ──
rep(
  new RegExp('      /\\* ── Touch \\(tablets, touchscreen laptops, mobile\\) ──[\\s\\S]*?      \\};\\n\\n'),
  '',
  'remove touch handlers'
);

// ── 13. onResize: step → stepper.stepRef.current, sweeping() → stepper.sweepingRef.current() ──
rep(
  /if \(step === 0 && !sweeping\(\)\) placeLogo\(\)/,
  'if (stepper.stepRef.current === 0 && !stepper.sweepingRef.current()) placeLogo()',
  'onResize refs'
);

// ── 14. onScroll: replace anchor floor with hardened version ──
rep(
  new RegExp('        /\\* Anchor floor — the last line of defence[\\s\\S]*?        \\}\\n'),
  `        /* Anchor floor (C3 + C4 fix) —
           During a controlled landing, skip correction entirely.
           After one correction per momentum burst, suppress further
           corrections to avoid fighting browser inertia (jitter). */
        if (!stepper.sweepingRef.current() && stepper.stepRef.current >= 5) {
          if (isLandingRef.current) {
            isLandingRef.current = false;
          } else if (anchorCorrectedRef.current) {
            const anchor = anchorY();
            if (anchor !== null && window.scrollY < anchor - ANCHOR_DRIFT_LIMIT) {
              anchorCorrectedRef.current = false;
            }
          } else {
            const anchor = anchorY();
            if (anchor !== null && window.scrollY < anchor - 1) {
              window.scrollTo({ top: anchor, behavior: "auto" });
              anchorCorrectedRef.current = true;
            }
          }
        }
`,
  'onScroll anchor floor'
);

// ── 15. onScroll: window.scrollY > 2 → SCROLL_TOP_THRESHOLD ──
rep(
  /window\.scrollY > 2/,
  'window.scrollY > SCROLL_TOP_THRESHOLD',
  'scrollY > 2'
);

// ── 16. atTop: window.scrollY <= 2 → SCROLL_TOP_THRESHOLD ──
rep(
  /const atTop = \(\) => window\.scrollY <= 2/,
  'const atTop = () => window.scrollY <= SCROLL_TOP_THRESHOLD',
  'atTop threshold'
);

// ── 17. Cleanup: remove sweep kill ──
rep(
  new RegExp('        // Kill the active scrub tween[^\\n]*\\n        // on DOM that no longer exists\\n        sweep\\?\\.kill\\(\\);\\n        sweep = null;\\n\\n'),
  '',
  'cleanup sweep kill'
);

// ── 18. Cleanup: step → stepper.stepRef.current ──
rep(
  /i <= step/,
  'i <= stepper.stepRef.current',
  'cleanup step ref'
);

// ── 19. Cleanup: remove wheel/keydown/touch listener removals ──
for (const rl of [
  '        window.removeEventListener("wheel", onWheel);\n',
  '        window.removeEventListener("keydown", onKeyDown);\n',
  '        window.removeEventListener("touchstart", onTouchStart);\n',
  '        window.removeEventListener("touchmove", onTouchMove);\n',
]) {
  rep(rl, '', 'remove ' + rl.trim());
}

// ── 20. Remove event listener registration for wheel/keydown/touch ──
for (const rl of [
  '      window.addEventListener("wheel", onWheel, { passive: false });\n',
  '      window.addEventListener("keydown", onKeyDown);\n',
  '      window.addEventListener("touchstart", onTouchStart, { passive: true });\n',
  '      window.addEventListener("touchmove", onTouchMove, { passive: false });\n',
]) {
  rep(rl, '', 'remove addEventListener ' + rl.trim());
}

// Write back with original line endings
fs.writeFileSync(file, src.replace(/\n/g, '\r\n'));
console.log('\nDone. Refactored Hero.tsx');
