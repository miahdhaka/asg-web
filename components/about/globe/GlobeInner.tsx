"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

/* Same textures as globe.gl/example/clouds */
const EARTH_TEX = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg";
const BUMP_TEX = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png";
const CLOUDS_IMG = "/images/about-us/clouds.png";
const STARS_TEX = "https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png";
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

export default function GlobeInner({ onReady }: { onReady?: () => void }) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /* Responsive canvas sizing + wheel blocker */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sync = () => {
      const { width, height } = el.getBoundingClientRect();
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    /* Block wheel on canvas so page scrolls normally */
    const onWheel = (e: WheelEvent) => { e.stopPropagation(); };
    el.addEventListener("wheel", onWheel, { capture: true, passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, []);

  const handleGlobeReady = useCallback(() => {
    const ctrl = globeRef.current;
    if (!ctrl) return;

    /* Auto-rotate — same as clouds example */
    const controls = ctrl.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    /* Disable zoom */
    controls.enableZoom = false;
    controls.enablePan = false;
    const cam = ctrl.camera();
    const dist = cam.position.distanceTo(controls.target);
    controls.minDistance = dist;
    controls.maxDistance = dist;

    /* react-globe.gl only fires onGlobeReady once the earth + starfield textures
       have decoded, so the scene is fully in place here — let the parent
       re-measure the page so the scroll-jacked sections above line back up. */
    onReady?.();

    /* --- Cloud layer (adapted from globe.gl/example/clouds) ---
       react-globe.gl only forwards a fixed allow-list of methods to the ref
       (scene/camera/controls/getGlobeRadius…), so `globeMaterial()` isn't
       available here. We don't need the material — `getGlobeRadius()` gives us
       the radius directly for sizing the cloud sphere. */
    const scene = ctrl.scene();
    const globeRadius = ctrl.getGlobeRadius();

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(CLOUDS_IMG, (cloudsTexture: THREE.Texture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true }),
      );
      scene.add(clouds);

      const rotateClouds = () => {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * (Math.PI / 180);
        requestAnimationFrame(rotateClouds);
      };
      rotateClouds();
    });
  }, [onReady]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeOffset={[dimensions.width * 0.22, 0]}
          globeImageUrl={EARTH_TEX}
          bumpImageUrl={BUMP_TEX}
          /* Black scene base + starfield background image. Section.tsx paints
             its green wash over this canvas with mix-blend-mode: screen, which
             adds light on top of black — the stars stay visible underneath. */
          backgroundColor="#000000"
          backgroundImageUrl={STARS_TEX}
          onGlobeReady={handleGlobeReady}
          enablePointerInteraction={false}
        />
      )}
    </div>
  );
}
