/* eslint-disable react-hooks/immutability -- imperative three.js: uniforms, cameras and rig refs are mutated every frame on purpose */
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { CITIES } from "./cities";
import { DEG, angularDistance, latLonToVec3, mulberry32 } from "./geo";
import { buildLandMask, type LandMask } from "./landMask";
import {
  arcFrag, arcVert, atmoFrag, atmoVert, bgFrag, bgVert,
  dotsFrag, dotsVert, earthFrag, earthVert,
} from "./shaders";
import type { TourStop } from "./content";

/* ───────────────────────────── public types ───────────────────────────── */

export type Anchor = { el: HTMLElement; lat: number; lon: number; dx: number; dy: number };
export type OrderEvent = { id: number; city: string; lat: number; lon: number };

type Bus = { lat: number; lon: number };

export type GlobeSceneProps = {
  tour: TourStop[];
  hub: { lat: number; lon: number };
  hubRate: number;
  anchors: React.MutableRefObject<Map<string, Anchor>>;
  hover: React.MutableRefObject<boolean>;
  running: boolean;
  reducedMotion: boolean;
  onStop: (index: number) => void;
  onOrder: (order: OrderEvent) => void;
  onReady: () => void;
};

/* the light never moves relative to the screen → the terminator stays put while you rotate */
const LIGHT = new THREE.Vector3(-0.8, 0.42, 0.42).normalize();

/* Turntable rate in degrees per second — the globe keeps revolving in one
   direction at this constant speed, and starts at full rate on the very first
   frame (the rig seeds `rate` with this value, so there is no spin-up ramp).
   ~2 minutes per revolution: a clear, steady drift rather than a crawl. */
const SPIN_DPS = 5.5;

/* Fixed viewing latitude. The camera deliberately never changes latitude on
   its own — chasing tour latitudes is what made the globe tip back and forth. */
const BASE_LAT = 22;

/* Hover pull-in as a camera-distance multiplier (< 1 = globe looks bigger).
   4.5 % is enough to notice without the cards losing their anchor positions. */
const HOVER_DIST = 0.955;

/* ───────────────────────────────── scene ───────────────────────────────── */

export default function GlobeScene(props: GlobeSceneProps) {
  const bus = useRef<Bus>({ lat: props.tour[0].lat, lon: props.tour[0].lon });

  return (
    <Canvas
      className="cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      frameloop={props.running ? "always" : "never"}
      dpr={[1, 1.75]}
      flat
      linear
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0, 5] }}
    >
      <Background />
      <World {...props} bus={bus} />
      <CameraRig {...props} bus={bus} />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.95} luminanceThreshold={0.85} luminanceSmoothing={0.25} radius={0.78} />
      </EffectComposer>
    </Canvas>
  );
}

/* ─────────────────────────────── background ─────────────────────────────── */

function Background() {
  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={bgVert}
        fragmentShader={bgFrag}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─────────────────────────────── world ─────────────────────────────── */

function World(props: GlobeSceneProps & { bus: React.MutableRefObject<Bus> }) {
  const { gl } = useThree();
  const [mask, setMask] = useState<LandMask | null>(null);
  const { onReady } = props;

  useEffect(() => {
    let alive = true;
    const max = gl.capabilities.maxTextureSize;
    const small = window.innerWidth < 820;
    const size = Math.min(max, small ? 2048 : 4096);
    buildLandMask(size).then((m) => {
      if (!alive) return;
      setMask(m);
      onReady();
    });
    return () => {
      alive = false;
    };
  }, [gl, onReady]);

  if (!mask) return null;
  return (
    <>
      <Earth mask={mask} hover={props.hover} />
      <CityDots mask={mask} />
      <ArcField bus={props.bus} hub={props.hub} hubRate={props.hubRate} />
      <Orders bus={props.bus} onOrder={props.onOrder} />
    </>
  );
}

/* ─────────────────────────────── earth ─────────────────────────────── */

function Earth({ mask, hover }: { mask: LandMask; hover: React.MutableRefObject<boolean> }) {
  const earth = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: earthVert,
        fragmentShader: earthFrag,
        uniforms: { uMask: { value: mask.texture }, uLight: { value: LIGHT.clone() } },
      }),
    [mask],
  );
  const atmo = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmoVert,
        fragmentShader: atmoFrag,
        uniforms: { uLight: { value: LIGHT.clone() } },
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  return (
    <group>
      {/* Raycast against the solid sphere so the hover only fires over the
          globe disc itself, not the empty corners of the full-bleed canvas. */}
      <mesh
        material={earth}
        onPointerOver={() => {
          hover.current = true;
        }}
        onPointerOut={() => {
          hover.current = false;
        }}
      >
        <sphereGeometry args={[1, 128, 96]} />
      </mesh>
      <mesh material={atmo} scale={1.05}>
        <sphereGeometry args={[1, 64, 48]} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────── city dots ─────────────────────────────── */

function CityDots({ mask }: { mask: LandMask }) {
  const gl = useThree((s) => s.gl);

  const { geometry, material } = useMemo(() => {
    const rand = mulberry32(1337);
    const gauss = () => {
      let s = 0;
      for (let i = 0; i < 4; i++) s += rand();
      return (s - 2) * 1.7;
    };

    const pos: number[] = [];
    const size: number[] = [];
    const phase: number[] = [];
    const v = new THREE.Vector3();

    for (const c of CITIES) {
      const count = Math.round(8 + c.w * c.w * 0.9);
      const spread = 0.35 + c.w * 0.16;
      for (let i = 0; i < count; i++) {
        let lat = c.lat;
        let lon = c.lon;
        let ok = i === 0 && mask.isLand(lat, lon);
        if (i > 0) {
          for (let tries = 0; tries < 5 && !ok; tries++) {
            lat = c.lat + gauss() * spread;
            lon = c.lon + (gauss() * spread) / Math.max(0.25, Math.cos(c.lat * DEG));
            ok = mask.isLand(lat, lon);
          }
        }
        if (!ok) continue;
        latLonToVec3(lat, lon, 1.003, v);
        pos.push(v.x, v.y, v.z);
        const core = i === 0 ? 1.6 : 0;
        size.push(2.4 + Math.pow(rand(), 2.0) * 4.6 + core);
        phase.push(rand() * 6.283);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));

    const m = new THREE.ShaderMaterial({
      vertexShader: dotsVert,
      fragmentShader: dotsFrag,
      uniforms: {
        uTime: { value: 0 },
        uPx: { value: 1 },
        uLight: { value: LIGHT.clone() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [mask]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPx.value = gl.getPixelRatio();
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

/* ─────────────────────────────── arcs ─────────────────────────────── */

const CAP = 240; // max simultaneous arcs
const SEG = 72; // segments per arc ribbon

function ArcField({
  bus,
  hub,
  hubRate,
}: {
  bus: React.MutableRefObject<Bus>;
  hub: { lat: number; lon: number };
  hubRate: number;
}) {
  const { geometry, material, attrs } = useMemo(() => {
    const g = new THREE.InstancedBufferGeometry();

    // shared ribbon: two verts per segment (left / right edge)
    const vCount = (SEG + 1) * 2;
    const aT = new Float32Array(vCount);
    const aSide = new Float32Array(vCount);
    for (let i = 0; i <= SEG; i++) {
      aT[i * 2] = aT[i * 2 + 1] = i / SEG;
      aSide[i * 2] = -1;
      aSide[i * 2 + 1] = 1;
    }
    const index: number[] = [];
    for (let i = 0; i < SEG; i++) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    g.setIndex(index);
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vCount * 3), 3));
    g.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
    g.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));

    const mk = () => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(CAP * 3), 3);
      a.setUsage(THREE.DynamicDrawUsage);
      return a;
    };
    const attrs = { p0: mk(), p1: mk(), p2: mk(), p3: mk(), time: mk() };
    for (let i = 0; i < CAP; i++) attrs.time.setXYZ(i, 1e9, 1, 0); // "never started"
    g.setAttribute("iP0", attrs.p0);
    g.setAttribute("iP1", attrs.p1);
    g.setAttribute("iP2", attrs.p2);
    g.setAttribute("iP3", attrs.p3);
    g.setAttribute("iTime", attrs.time);
    g.instanceCount = CAP;

    const m = new THREE.ShaderMaterial({
      vertexShader: arcVert,
      fragmentShader: arcFrag,
      uniforms: { uTime: { value: 0 }, uWidth: { value: 0.0056 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    return { geometry: g, material: m, attrs };
  }, []);

  const state = useRef({ cursor: 0, acc: 0 });
  const cityVecs = useMemo(() => CITIES.map((c) => latLonToVec3(c.lat, c.lon)), []);
  const hubVec = useMemo(() => latLonToVec3(hub.lat, hub.lon), [hub]);

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.5);
    const t = clock.elapsedTime;
    material.uniforms.uTime.value = t;

    const s = state.current;
    s.acc += dt * 9; // arcs per second
    let dirty = false;

    const focus = latLonToVec3(bus.current.lat, bus.current.lon);
    const pick = (pred: (i: number) => boolean) => {
      for (let k = 0; k < 80; k++) {
        const i = (Math.random() * CITIES.length) | 0;
        if (pred(i) && Math.random() < CITIES[i].w / 10 + 0.12) return i;
      }
      return (Math.random() * CITIES.length) | 0;
    };

    while (s.acc >= 1) {
      s.acc -= 1;

      let a: THREE.Vector3;
      if (Math.random() < hubRate) {
        a = hubVec;
      } else if (Math.random() < 0.82) {
        a = cityVecs[pick((i) => angularDistance(focus, cityVecs[i]) < 1.05)];
      } else {
        a = cityVecs[pick(() => true)];
      }
      const bi = pick((i) => {
        const d = angularDistance(a, cityVecs[i]);
        return d > 0.3 && d < 2.3;
      });
      const b = cityVecs[bi];
      const ang = angularDistance(a, b);

      const h = 0.1 + 0.6 * (ang / Math.PI);
      const p1 = a.clone().lerp(b, 0.25).normalize().multiplyScalar(1 + h);
      const p2 = a.clone().lerp(b, 0.75).normalize().multiplyScalar(1 + h);
      const p0 = a.clone().multiplyScalar(1.004);
      const p3 = b.clone().multiplyScalar(1.004);
      const dur = 0.7 + ang * 0.55;

      const i = s.cursor++ % CAP;
      attrs.p0.setXYZ(i, p0.x, p0.y, p0.z);
      attrs.p1.setXYZ(i, p1.x, p1.y, p1.z);
      attrs.p2.setXYZ(i, p2.x, p2.y, p2.z);
      attrs.p3.setXYZ(i, p3.x, p3.y, p3.z);
      attrs.time.setXYZ(i, t, dur, Math.random());
      dirty = true;
    }

    if (dirty) {
      attrs.p0.needsUpdate = attrs.p1.needsUpdate = attrs.p2.needsUpdate = attrs.p3.needsUpdate = true;
      attrs.time.needsUpdate = true;
    }
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} renderOrder={2} />;
}

/* ───────────────── "order placed" pop-ups (pure data, UI is DOM) ───────────────── */

function Orders({
  bus,
  onOrder,
}: {
  bus: React.MutableRefObject<Bus>;
  onOrder: (o: OrderEvent) => void;
}) {
  const next = useRef(2.5);
  const id = useRef(0);
  const camera = useThree((s) => s.camera);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (t < next.current) return;
    next.current = t + 4.2 + Math.random() * 2.2;

    const focus = latLonToVec3(bus.current.lat, bus.current.lon);
    const camDir = camera.position.clone().normalize();
    const candidates = CITIES.filter((c) => {
      const v = latLonToVec3(c.lat, c.lon);
      return angularDistance(focus, v) < 0.55 && v.dot(camDir) > 0.55;
    });
    if (!candidates.length) return;
    const c = candidates[(Math.random() * candidates.length) | 0];
    onOrder({ id: ++id.current, city: c.name, lat: c.lat, lon: c.lon });
  });

  return null;
}

/* ───────────── camera: layout, drag-to-rotate, turntable spin, DOM anchors ───────────── */

function CameraRig({
  tour,
  anchors,
  bus,
  hover,
  reducedMotion,
  onStop,
}: GlobeSceneProps & { bus: React.MutableRefObject<Bus> }) {
  const { camera, size, gl } = useThree();

  const layout = useRef({ dist: 5, D: 700 });
  const rig = useRef({
    lat: BASE_LAT,
    lon: tour[0].lon,
    vLat: 0,
    vLon: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    resumeAt: 0,
    stop: 0,
    stopT0: 0,
    rate: SPIN_DPS,
    zoom: 1,
  });

  // place the globe on the right (desktop) / top (mobile) and size it to the viewport
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const W = size.width;
    const H = size.height;
    const mobile = W < 820;
    const cx = mobile ? 0.5 : 0.69;
    const cy = mobile ? 0.33 : 0.5;
    const D = mobile ? Math.min(W * 0.9, H * 0.5) : Math.min(H * 0.8, W * 0.5);

    cam.fov = 30;
    const k = (D / H) * Math.tan((cam.fov * DEG) / 2);
    layout.current = { dist: 1 / Math.sin(Math.atan(k)), D };
    cam.setViewOffset(W, H, (0.5 - cx) * W, (0.5 - cy) * H, W, H);
    cam.updateProjectionMatrix();
  }, [camera, size]);

  // pointer drag
  useEffect(() => {
    const el = gl.domElement;
    const s = rig.current;

    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.lastT = performance.now();
      s.vLat = s.vLon = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      const R = layout.current.D / 2;
      const k = 1 / R / DEG; // px → degrees so the surface sticks to the cursor
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      const now = performance.now();
      const dts = Math.max(0.008, (now - s.lastT) / 1000);
      s.lon -= dx * k;
      s.lat += dy * k;
      s.lat = THREE.MathUtils.clamp(s.lat, -72, 72);
      s.vLon = THREE.MathUtils.lerp(s.vLon, (-dx * k) / dts, 0.4);
      s.vLat = THREE.MathUtils.lerp(s.vLat, (dy * k) / dts, 0.4);
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      if (performance.now() - s.lastT > 90) s.vLat = s.vLon = 0; // held still before release
      s.resumeAt = Infinity; // set properly in the frame loop
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const camDir = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const now = clock.elapsedTime;
    const s = rig.current;

    // The tour now only drives which stat cards are active; the camera ignores
    // the stop coordinates entirely so it never reverses or rocks.
    if (s.resumeAt === Infinity) s.resumeAt = now + 5;

    if (!s.dragging && now > s.resumeAt && now - s.stopT0 > tour[s.stop].hold) {
      s.stop = (s.stop + 1) % tour.length;
      s.stopT0 = now;
      onStop(s.stop);
    }

    // Hover parks the globe: the rate is eased, so it glides to a halt and
    // glides back up when the pointer leaves instead of snapping. The spin
    // itself is never gated by the tour timetable.
    const rateTarget = hover.current || reducedMotion ? 0 : SPIN_DPS;
    s.rate += (rateTarget - s.rate) * (1 - Math.exp(-dt * 2.2));

    if (!s.dragging) {
      if (Math.abs(s.vLon) + Math.abs(s.vLat) > 0.5) {
        // carry the flick from a drag, then hand back to the turntable
        s.lon += s.vLon * dt;
        s.lat += s.vLat * dt;
        const f = Math.exp(-dt * 3.2);
        s.vLon *= f;
        s.vLat *= f;
      } else {
        s.lon += s.rate * dt;
      }
    }
    s.lat = THREE.MathUtils.clamp(s.lat, -72, 72);
    if (s.lon > 180) s.lon -= 360;
    if (s.lon < -180) s.lon += 360;

    bus.current.lat = s.lat;
    bus.current.lon = s.lon;

    // Hover eases the camera in a touch; the lerp gives the smooth transition.
    const zoomTarget = hover.current ? HOVER_DIST : 1;
    s.zoom += (zoomTarget - s.zoom) * (1 - Math.exp(-dt * 3.2));

    // camera sits on the focus direction; lat is clamped so "up" never flips
    latLonToVec3(s.lat, s.lon, layout.current.dist * s.zoom, camera.position);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    // pin DOM cards to points on the globe
    if (anchors.current.size) {
      const w = size.width;
      const h = size.height;
      camDir.copy(camera.position).normalize();
      anchors.current.forEach((a) => {
        latLonToVec3(a.lat, a.lon, 1.0, tmp);
        const facing = tmp.dot(camDir) > 0.12;
        tmp.project(camera);
        const cw = a.el.offsetWidth || 0;
        const x = THREE.MathUtils.clamp((tmp.x * 0.5 + 0.5) * w + a.dx, 8, Math.max(8, w - cw - 8));
        const y = (-tmp.y * 0.5 + 0.5) * h + a.dy;
        a.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        a.el.dataset.facing = facing ? "1" : "0";
      });
    }
  });

  return null;
}
