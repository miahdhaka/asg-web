import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

export type LandMask = {
  texture: THREE.CanvasTexture;
  /** returns true when the lat/lon is on land */
  isLand: (lat: number, lon: number) => boolean;
};

/**
 * Rasterises the world-atlas land polygons into an equirectangular canvas.
 * White = land, black = water. Used both as the GPU texture and for CPU land checks.
 */
export async function buildLandMask(width: number): Promise<LandMask> {
  const height = width / 2;
  const topo = (await import("world-atlas/land-50m.json")).default as unknown as Topology;
  const land = feature(topo, topo.objects.land as never);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  const projection = geoEquirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);
  const path = geoPath(projection, ctx);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  path(land as never);
  ctx.fill();

  // CPU copy at reduced resolution is plenty for dot placement
  const small = document.createElement("canvas");
  small.width = 1024;
  small.height = 512;
  const sctx = small.getContext("2d", { willReadFrequently: true })!;
  sctx.drawImage(canvas, 0, 0, 1024, 512);
  const data = sctx.getImageData(0, 0, 1024, 512).data;

  const isLand = (lat: number, lon: number) => {
    const x = Math.min(1023, Math.max(0, Math.floor(((lon + 180) / 360) * 1024)));
    const y = Math.min(511, Math.max(0, Math.floor(((90 - lat) / 180) * 512)));
    return data[(y * 1024 + x) * 4] > 127;
  };

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return { texture, isLand };
}
