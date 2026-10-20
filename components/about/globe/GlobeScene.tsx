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
import { ARC_DESTINATIONS, type TourStop } from "./content";
/* ───────────────────────────── public types ───────────────────────────── */

export type Anchor = { el: HTMLElement; lat: number; lon: number; dx: number; dy: number };
export type OrderEvent = { id: number; region: string; city: string; lat: number; lon: number };

type Bus = { lat: number; lon: number };

export type GlobeSceneProps = {
  tour: TourStop[];
  hub: { lat: number; lon: number };
  anchors: React.MutableRefObject<Map<string, Anchor>>;
  hover: React.MutableRefObject<boolean>;
  /** Set to a target longitude to request a one-time horizontal swing; the rig
      reads and clears it, reusing the same smooth approach as the entry swing. */
  spinTo: React.MutableRefObject<number | null>;
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
   ~1.9 minutes per revolution. */
const SPIN_DPS = 3.2;

/* Fixed viewing latitude. The camera deliberately never changes latitude on
   its own — chasing tour latitudes is what made the globe tip back and forth. */
const BASE_LAT = 22;

/* Hover pull-in as a camera-distance multiplier (< 1 = globe looks bigger).
   7 % is clearly visible without the cards losing their anchor positions. */
const HOVER_DIST = 0.93;


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
  // Wall-clock (elapsed) time until which the auto-tour stays quiet after a
  // manual click, so the card the user chose isn't instantly replaced.
  const autoHold = useRef(0);

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
      <ArcField hub={props.hub} />
      <BangladeshHoverMap hub={props.hub} hover={props.hover} />
      <DestinationMarkers onOrder={props.onOrder} autoHold={autoHold} />
      <Orders bus={props.bus} onOrder={props.onOrder} autoHold={autoHold} />
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
        onClick={(e) => {
          // Occlude the far-side destination markers: the globe's near surface is
          // always hit before anything behind it, so stopping here means a click
          // on the front can never reach a city on the back.
          e.stopPropagation();
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

function ArcField({ hub }: { hub: { lat: number; lon: number } }) {
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
  const hubVec = useMemo(() => latLonToVec3(hub.lat, hub.lon), [hub]);
  // Destination unit vectors plus the weight total the biased pick below needs.
  const dest = useMemo(() => {
    const vecs = ARC_DESTINATIONS.map((d) => latLonToVec3(d.lat, d.lon));
    const total = ARC_DESTINATIONS.reduce((sum, d) => sum + d.w, 0);
    return { vecs, total };
  }, []);

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.5);
    const t = clock.elapsedTime;
    material.uniforms.uTime.value = t;

    const s = state.current;
    // Ribbons per second. At 9 the field read as a firework — new arcs kept
    // appearing faster than the eye could follow one. With the longer durations
    // below this still leaves roughly 20 arcs alive at any moment.
    s.acc += dt * 3;
    let dirty = false;

    while (s.acc >= 1) {
      s.acc -= 1;

      // Every ribbon is an export lane: it leaves the hub (Dhaka) and lands on
      // one destination, weighted so the bigger markets draw more traffic.
      const a = hubVec;
      let left = Math.random() * dest.total;
      let bi = dest.vecs.length - 1;
      for (let i = 0; i < ARC_DESTINATIONS.length; i++) {
        left -= ARC_DESTINATIONS[i].w;
        if (left <= 0) {
          bi = i;
          break;
        }
      }
      const b = dest.vecs[bi];
      const ang = angularDistance(a, b);

      const h = 0.1 + 0.6 * (ang / Math.PI);
      const p1 = a.clone().lerp(b, 0.25).normalize().multiplyScalar(1 + h);
      const p2 = a.clone().lerp(b, 0.75).normalize().multiplyScalar(1 + h);
      const p0 = a.clone().multiplyScalar(1.004);
      const p3 = b.clone().multiplyScalar(1.004);
      // Seconds for the head to sweep the curve (the shader runs vAge 0→1 over
      // this, then 1→2 while the trail dissolves). Doubled from 0.7 + ang*0.55
      // so a ribbon glides to its destination instead of snapping there.
      const dur = 1.6 + ang * 1.1;

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

/* ──────────── Bangladesh hover map ───────────── */

function BangladeshHoverMap({
  hub,
  hover,
}: {
  hub: { lat: number; lon: number };
  hover: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  // Hover intensity: 0 = hidden, 1 = fully risen. Driven by pointer proximity
  // to the hub and the global hover flag.
  const intensity = useRef(0);
  const isOverHub = useRef(false);

  // Simplified Bangladesh outline in lat/lon (approximate border points).
  const bdOutline = useMemo(
    () => [
      [26.6, 88.1], [26.4, 88.5], [26.1, 89.0], [25.8, 89.5],
      [25.2, 89.9], [24.6, 90.4], [24.3, 90.8], [24.0, 91.2],
      [23.6, 91.6], [23.2, 92.0], [22.8, 92.3], [22.4, 92.1],
      [21.8, 92.0], [21.4, 91.8], [21.0, 91.5], [20.7, 91.0],
      [20.9, 90.5], [21.2, 90.0], [21.6, 89.5], [22.0, 89.0],
      [22.5, 88.6], [23.0, 88.3], [23.5, 88.1], [24.0, 88.0],
      [24.6, 88.0], [25.2, 88.0], [25.8, 88.0], [26.3, 88.0],
    ],
    []
  );

  // Build the shape geometry: convert lat/lon to local tangent-plane coords
  // centered on the hub.
  const { geometry, material } = useMemo(() => {
    const shape = new THREE.Shape();
    const hubRad = 1.008; // slightly above surface
    const center = latLonToVec3(hub.lat, hub.lon, hubRad, new THREE.Vector3());
    const up = center.clone().normalize();
    // Build a tangent basis at the hub.
    const north = latLonToVec3(hub.lat + 1, hub.lon, hubRad, new THREE.Vector3())
      .sub(center)
      .normalize();
    const east = new THREE.Vector3().crossVectors(up, north).normalize();
    const north2 = new THREE.Vector3().crossVectors(east, up).normalize();

    bdOutline.forEach(([lat, lon], i) => {
      const p = latLonToVec3(lat, lon, hubRad, new THREE.Vector3());
      const local = p.clone().sub(center);
      const x = local.dot(east);
      const y = local.dot(north2);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();

    const geom = new THREE.ShapeGeometry(shape);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x8bc34a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: geom, material: mat };
  }, [hub, bdOutline]);

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;

    // Smoothly animate intensity: rise when over hub, fall when away.
    const target = isOverHub.current && hover.current ? 1 : 0;
    intensity.current += (target - intensity.current) * 0.08;
    const v = intensity.current;

    // Position the group at the hub, oriented tangent to the surface.
    const hubPos = latLonToVec3(hub.lat, hub.lon, 1.008, new THREE.Vector3());
    groupRef.current.position.copy(hubPos);
    groupRef.current.lookAt(0, 0, 0);
    groupRef.current.rotateX(Math.PI / 2);

    // Rise up: lift the map away from the surface (local Z in the rotated frame).
    const rise = v * 0.15; // max 0.15 units above surface
    meshRef.current.position.z = rise;
    // Scale up slightly as it rises.
    const scale = 1 + v * 0.3;
    meshRef.current.scale.set(scale, scale, 1);
    // Fade in/out.
    material.opacity = v * 0.6;
  });

  return (
    <group renderOrder={3}>
      {/* Invisible hit-sphere at the hub to detect hover */}
      <mesh
        position={latLonToVec3(hub.lat, hub.lon, 1.01, new THREE.Vector3())}
        onPointerOver={() => {
          isOverHub.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          isOverHub.current = false;
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* The Bangladesh outline map */}
      <group ref={groupRef}>
        <mesh ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />
      </group>
    </group>
  );
}

/* ───────────────── "order placed" pop-ups (pure data, UI is DOM) ───────────────── */

function Orders({
  bus,
  onOrder,
  autoHold,
}: {
  bus: React.MutableRefObject<Bus>;
  onOrder: (o: OrderEvent) => void;
  autoHold: React.MutableRefObject<number>;
}) {
  const next = useRef(2.5);
  const id = useRef(0);
  // Round-robin pointer into ARC_DESTINATIONS so the card walks the list in
  // order (Europe → America → Africa → Australia → Asia → repeat) instead of
  // jumping to a random place each time.
  const cursor = useRef(0);
  const camera = useThree((s) => s.camera);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // A manual click holds the tour back so the chosen card stays put.
    if (t < autoHold.current) {
      next.current = autoHold.current;
      return;
    }
    if (t < next.current) return;
    // Fixed cadence, comfortably longer than the toast's 3.2s visible window +
    // 0.7s fade, so each card fully dissolves before the next one appears —
    // the swap never teleports mid-fade.
    next.current = t + 4.5;

    // Sourced from ARC_DESTINATIONS rather than the full CITIES list, so a pop-up
    // always names a place that actually has an arc landing on it. The catch
    // window is wider than the old 0.55 rad because the camera holds a fixed
    // ~22N latitude: at the old radius the southern destinations (Sydney,
    // Melbourne, Johannesburg) could never fall inside it and went unannounced.
    const focus = latLonToVec3(bus.current.lat, bus.current.lon);
    const camDir = camera.position.clone().normalize();
    const isFacing = (d: { lat: number; lon: number }) => {
      const v = latLonToVec3(d.lat, d.lon);
      return angularDistance(focus, v) < 1.15 && v.dot(camDir) > 0.55;
    };

    // Advance to the next destination that is currently on the visible side, so
    // the tour still steps one-by-one even though far-side places can't be shown.
    const n = ARC_DESTINATIONS.length;
    let found = -1;
    for (let k = 0; k < n; k++) {
      const i = (cursor.current + k) % n;
      if (isFacing(ARC_DESTINATIONS[i])) {
        found = i;
        break;
      }
    }
    // Nothing on this lap is facing yet (whole list on the far side): retry
    // promptly instead of idling for a full cadence.
    if (found < 0) {
      next.current = t + 0.8;
      return;
    }
    cursor.current = (found + 1) % n;
    const d = ARC_DESTINATIONS[found];
    onOrder({ id: ++id.current, region: d.region, city: d.city, lat: d.lat, lon: d.lon });
  });

  return null;
}

/* ───────────── clickable arc destination points ───────────── */

function DestinationMarkers({
  onOrder,
  autoHold,
}: {
  onOrder: (o: OrderEvent) => void;
  autoHold: React.MutableRefObject<number>;
}) {
  const id = useRef(0);
  const clock = useThree((s) => s.clock);
  // A transparent hit-sphere sits on every arc endpoint. It renders nothing but
  // is still raycast (three.js culls by `visible`, not material opacity), so
  // clicking where a ribbon lands fires that city's card. The Earth mesh stops
  // click propagation, so far-side points can't be triggered through the globe.
  const markers = useMemo(
    () =>
      ARC_DESTINATIONS.map((d) => ({
        d,
        pos: latLonToVec3(d.lat, d.lon, 1.012, new THREE.Vector3()),
      })),
    [],
  );

  return (
    <group>
      {markers.map(({ d, pos }, i) => (
        <mesh
          key={`${d.region}-${d.city}-${i}`}
          position={pos}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (e.delta > 6) return; // ignore the pointer-up that ends a drag-rotate
            // Give the clicked card the screen: hold the auto-tour back so it
            // can't overwrite this destination a moment later.
            autoHold.current = clock.elapsedTime + 6;
            id.current += 1;
            onOrder({ id: id.current, region: d.region, city: d.city, lat: d.lat, lon: d.lon });
          }}
        >
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────── camera: layout, drag-to-rotate, turntable spin, DOM anchors ───────────── */

function CameraRig({
  tour,
  hub,
  anchors,
  bus,
  hover,
  spinTo,
  running,
  reducedMotion,
  onStop,
}: GlobeSceneProps & { bus: React.MutableRefObject<Bus> }) {
  const { camera, size, gl } = useThree();

  const layout = useRef({ dist: 5, D: 700 });
  const rig = useRef({
    lat: BASE_LAT,
    lon: hub.lon,
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
    /** longitude the entry swing is aiming at, or null when not swinging */
    home: null as number | null,
    /** one-time full-turn tween (a card click): spins exactly one revolution
        in the natural direction, then settles centered on the target point */
    turn: { active: false, t0: 0, dur: 2.4, fromLon: 0, toLon: 0, fromLat: 0, toLat: 0 },
    /** grace frames: keeps zoom target while transitioning between globe/card */
    hoverHold: 0,
  });

  /* Re-arm the entry swing whenever the section comes back into view.
     This has to be an effect, not a check inside useFrame: while the section is
     off-screen the canvas runs with frameloop="never", so useFrame stops firing
     entirely and never gets a frame in which to observe that `running` went
     false → true. The last frame before pausing always leaves running=true. */
  useEffect(() => {
    if (running) rig.current.home = hub.lon;
  }, [running, hub.lon]);

  // place the globe on the right (desktop) / top (mobile) and size it to the viewport
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const W = size.width;
    const H = size.height;
    const mobile = W < 820;
    const cx = mobile ? 0.5 : 0.7;
    // Vertical centre as a fraction of the viewport. On mobile the copy sits at
    // the top and the brand marquee at the bottom, so the globe is framed lowish
    // (cy 0.68) to keep clear of the description text above it;
    // desktop keeps it centred.
    const cy = mobile ? 0.68 : 0.5;
    // Globe size as a fraction of the viewport. On mobile it is kept large enough
    // that the DOM cards anchored to its surface stay on the disc, with a margin on
    // both side edges. On desktop it is sized close to the full viewport height.
    // The equal-gap centre (cy above) is independent of this radius, so trimming
    // the mobile globe leaves the top/bottom gaps balanced.
    const D = mobile ? Math.min(W * 0.8, H * 0.44) : Math.min(H * 0.82, W * 0.54);

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
      s.home = null; // grabbing the globe cancels an in-flight entry swing
      s.turn.active = false; // ...and an in-flight full-turn tween
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

    // A card click armed a target longitude: spin exactly one full turn in the
    // natural direction and settle centered on that point (Bangladesh).
    if (spinTo.current !== null && !s.dragging) {
      const target = spinTo.current;
      spinTo.current = null;
      s.home = null; // a manual turn overrides any pending entry swing
      const delta = ((target - s.lon + 540) % 360) - 180; // shortest signed gap
      s.turn.active = true;
      s.turn.t0 = now;
      s.turn.fromLon = s.lon;
      s.turn.toLon = s.lon + delta + 360; // one extra revolution, always forward
      s.turn.fromLat = s.lat;
      s.turn.toLat = hub.lat;
      s.stopT0 = now; // hold the card timetable through the turn
    }

    // The tour now only drives which stat cards are active; the camera ignores
    // the stop coordinates entirely so it never reverses or rocks.
    if (s.resumeAt === Infinity) s.resumeAt = now + 5;

    // `s.home` is armed from the effect above, never from in here.
    if (!s.dragging && now > s.resumeAt && now - s.stopT0 > tour[s.stop].hold) {
      s.stop = (s.stop + 1) % tour.length;
      s.stopT0 = now;
      onStop(s.stop);
    }

    // Hover parks the globe: the rate is eased, so it glides to a halt and
    // glides back up when the pointer leaves instead of snapping. The spin
    // itself is never gated by the tour timetable.
    // Grace counter: keeps the zoom steady for ~4 frames (~70 ms) after hover
    // drops to false, so the globe→card pointer handoff doesn't flicker.
    if (hover.current) s.hoverHold = 4;
    else if (s.hoverHold > 0) s.hoverHold--;

    const rateTarget = s.hoverHold > 0 || reducedMotion ? 0 : SPIN_DPS;
    s.rate += (rateTarget - s.rate) * (1 - Math.exp(-dt * 2.2));

    if (s.turn.active && !s.dragging) {
      // Eased single revolution to the target; the turntable is paused until it
      // lands, then handed back to the continuous spin.
      const p = Math.min(1, (now - s.turn.t0) / s.turn.dur);
      const e = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
      s.lon = s.turn.fromLon + (s.turn.toLon - s.turn.fromLon) * e;
      s.lat = s.turn.fromLat + (s.turn.toLat - s.turn.fromLat) * e;
      s.stopT0 = now;
      if (p >= 1) s.turn.active = false;
    } else if (s.home !== null && !s.dragging) {
      // Shortest-path signed gap, wrapped into (-180, 180].
      const gap = ((s.home - s.lon + 540) % 360) - 180;
      if (reducedMotion || Math.abs(gap) < 0.25) {
        s.lon = s.home;
        s.home = null;
      } else {
        // Exponential approach: covers a large gap promptly, then decelerates
        // into the target so the arrival reads as settling rather than stopping.
        s.lon += gap * (1 - Math.exp(-dt * 1.8));
        // Hold the card timetable until the swing is done, so a flip that was
        // already due doesn't fire mid-move.
        s.stopT0 = now;
      }
    } else if (!s.dragging) {
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

    // Hover eases the camera in a touch; the grace period prevents a flicker
    // when the pointer transitions from the globe surface to the floating card.
    const zoomTarget = s.hoverHold > 0 ? HOVER_DIST : 1;
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
      // Mobile: the globe is centred and small, so the desktop pull-out offsets
      // (e.g. eu-1 dx -150) shove a card past the screen edge where the clamp
      // below pins it to the margin — off the globe entirely. Scale the offsets
      // toward the anchor so the boxes land on the disc instead. Desktop (≥820)
      // keeps the raw offsets, so nothing changes there.
      const mobile = w < 820;
      const kx = mobile ? 0.28 : 1;
      const ky = mobile ? 0.6 : 1;
      camDir.copy(camera.position).normalize();
      anchors.current.forEach((a) => {
        latLonToVec3(a.lat, a.lon, 1.0, tmp);
        // Mid-turn every box — the Bangladesh hub included — stays hidden;
        // once the rotation settles they all fade back in by facing.
        const facing = s.turn.active ? false : tmp.dot(camDir) > 0.12;
        tmp.project(camera);
        const cw = a.el.offsetWidth || 0;
        const x = THREE.MathUtils.clamp((tmp.x * 0.5 + 0.5) * w + a.dx * kx, 8, Math.max(8, w - cw - 8));
        const y = (-tmp.y * 0.5 + 0.5) * h + a.dy * ky;
        a.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        a.el.dataset.facing = facing ? "1" : "0";
      });
    }
  });

  return null;
}
