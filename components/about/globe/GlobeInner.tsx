"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

/* Same textures as globe.gl/example/clouds */
const EARTH_TEX = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg";
const BUMP_TEX = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png";
const NIGHT_SKY = "https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png";
const CLOUDS_IMG = "/images/about-us/clouds.png";
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

export default function GlobeInner() {
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

    /* --- Cloud layer (exact copy from globe.gl/example/clouds) --- */
    const scene = ctrl.scene();

    /* Find globe radius from the globe mesh */
    let globeRadius = 100;
    const mat = ctrl.globeMaterial() as THREE.MeshPhongMaterial;
    scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.material === mat) {
        const geom = mesh.geometry as THREE.SphereGeometry;
        if (geom?.type === "SphereGeometry" && geom.parameters.radius < 200) {
          globeRadius = geom.parameters.radius;
        }
      }
    });

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
  }, []);

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
          backgroundImageUrl={NIGHT_SKY}
          backgroundColor="#000000"
          onGlobeReady={handleGlobeReady}
          enablePointerInteraction={false}
        />
      )}
    </div>
  );
}
