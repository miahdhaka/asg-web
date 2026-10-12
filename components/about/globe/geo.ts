import * as THREE from "three";

export const DEG = Math.PI / 180;

/** lon 0 faces +Z, east (+lon) goes toward +X, north is +Y. */
export function latLonToVec3(lat: number, lon: number, r = 1, out = new THREE.Vector3()) {
  const la = lat * DEG;
  const lo = lon * DEG;
  return out.set(Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r);
}

export function angularDistance(a: THREE.Vector3, b: THREE.Vector3) {
  return Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
}

/** shortest signed difference between two longitudes (degrees) */
export function lonDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
