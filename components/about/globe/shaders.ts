/* ───────────────────────── background gradient ───────────────────────── */
export const bgVert = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}`;

export const bgFrag = /* glsl */ `
varying vec2 vUv;
void main(){
  vec3 top = vec3(0.036, 0.165, 0.128);
  vec3 mid = vec3(0.020, 0.092, 0.072);
  vec3 bot = vec3(0.007, 0.036, 0.029);
  float y = 1.0 - vUv.y;                       // 0 top → 1 bottom
  vec3 c = mix(top, mid, smoothstep(0.0, 0.55, y));
  c = mix(c, bot, smoothstep(0.45, 1.0, y));
  // soft lighter wash on the left (where the copy sits)
  float wash = exp(-pow(length((vUv - vec2(0.22, 0.62)) * vec2(1.0, 1.4)) * 2.2, 2.0));
  c += vec3(0.006, 0.024, 0.018) * wash;
  // vignette
  float v = smoothstep(1.25, 0.35, length(vUv - 0.5));
  c *= mix(0.66, 0.94, v);
  gl_FragColor = vec4(c, 1.0);
}`;

/* ───────────────────────────── earth ───────────────────────────── */
export const earthVert = /* glsl */ `
varying vec3 vPos;
varying vec3 vN;
void main(){
  vPos = position;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const earthFrag = /* glsl */ `
precision highp float;
uniform sampler2D uMask;
uniform vec3 uLight;      // view space
varying vec3 vPos;
varying vec3 vN;

float hash13(vec3 p){
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

void main(){
  vec3 n = normalize(vPos);
  float lon = atan(n.x, n.z);
  float lat = asin(clamp(n.y, -1.0, 1.0));
  float u = lon / 6.28318530718 + 0.5;
  float v = lat / 3.14159265359 + 0.5;
  vec2 uvA = vec2(u, v);
  vec2 uvB = vec2(fract(u + 0.5), v);

  // seam-free derivatives (avoids the 1px line at the date line)
  float useB = step(fwidth(uvB.x), fwidth(uvA.x));
  vec2 dx = mix(dFdx(uvA), dFdx(uvB), useB);
  vec2 dy = mix(dFdy(uvA), dFdy(uvB), useB);

  float land    = textureGrad(uMask, uvA, dx, dy).r;
  float blurred = textureGrad(uMask, uvA, dx * 10.0, dy * 10.0).r;

  vec3 N = normalize(vN);
  float ndl = dot(N, normalize(uLight));
  float lit = pow(smoothstep(-0.12, 0.95, ndl), 1.3);

  // riso-like stipple stuck to the surface
  float g = hash13(floor(n * 270.0));
  float g2 = hash13(floor(n * 640.0) + 7.0);
  float grain = (g * 0.65 + g2 * 0.35) - 0.5;
  float t = clamp(lit + grain * (0.30 + 0.20 * lit), 0.0, 1.0);

  vec3 landLit   = vec3(0.27, 0.80, 0.58);
  vec3 landDark  = vec3(0.030, 0.150, 0.125);
  vec3 oceanLit  = vec3(0.075, 0.250, 0.560);
  vec3 oceanDark = vec3(0.045, 0.040, 0.175);
  vec3 shallow   = vec3(0.100, 0.520, 0.640);

  vec3 ocean = mix(oceanDark, oceanLit, pow(t, 1.45));
  float coast = clamp(blurred - land, 0.0, 1.0);
  ocean = mix(ocean, shallow * (0.25 + 0.75 * t), coast * 0.85);
  vec3 ground = mix(landDark, landLit, t);

  vec3 col = mix(ocean, ground, smoothstep(0.42, 0.58, land));

  // thin limb on the lit side — kept teal (not white) and dimmer so the left
  // of the globe doesn't wash out
  float rim = pow(1.0 - clamp(N.z, 0.0, 1.0), 3.2);
  col += vec3(0.26, 0.72, 0.82) * rim * smoothstep(-0.1, 0.55, ndl) * 0.4;

  gl_FragColor = vec4(col, 1.0);
}`;

/* ─────────────────────────── atmosphere ─────────────────────────── */
export const atmoVert = earthVert;
export const atmoFrag = /* glsl */ `
uniform vec3 uLight;
varying vec3 vPos;
varying vec3 vN;
void main(){
  vec3 N = normalize(vN);
  float a = smoothstep(0.0, 0.30, -N.z);
  a = pow(a, 1.6);
  float side = smoothstep(-0.6, 0.6, dot(N, normalize(uLight)));
  vec3 c = vec3(0.20, 0.85, 0.65);
  gl_FragColor = vec4(c, a * (0.10 + 0.30 * side));
}`;

/* ───────────────────────────── city dots ───────────────────────────── */
export const dotsVert = /* glsl */ `
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform float uPx;
uniform vec3 uLight;
varying float vI;
void main(){
  vec3 n = normalize(normalMatrix * normalize(position));
  float lit = smoothstep(0.0, 0.85, dot(n, normalize(uLight)));
  vI = mix(1.0, 0.45, lit) * (0.85 + 0.15 * sin(uTime * 1.6 + aPhase));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uPx * 0.95 * (0.92 + 0.08 * sin(uTime * 2.3 + aPhase * 1.7));
}`;

export const dotsFrag = /* glsl */ `
varying float vI;
void main(){
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  // deeper gold + a much weaker core so dense clusters (and the lit left side)
  // stay warm gold instead of washing out to white
  float disc = smoothstep(1.0, 0.45, d);        // defined round body
  float hot  = smoothstep(0.6, 0.0, d);         // glowing centre
  vec3 gold = vec3(1.0, 0.66, 0.18);
  vec3 c = gold * disc + vec3(1.0, 0.72, 0.28) * hot * 0.3;
  gl_FragColor = vec4(c, disc * vI);
}`;

/* ─────────────────────────────── arcs ─────────────────────────────── */
export const arcVert = /* glsl */ `
attribute float aT;
attribute float aSide;
attribute vec3 iP0;
attribute vec3 iP1;
attribute vec3 iP2;
attribute vec3 iP3;
attribute vec3 iTime;          // x = start, y = duration, z = seed
uniform float uTime;
uniform float uWidth;
varying float vT;
varying float vAge;
varying float vSeed;
varying float vSide;

vec3 bez(float t){
  float u = 1.0 - t;
  return u*u*u*iP0 + 3.0*u*u*t*iP1 + 3.0*u*t*t*iP2 + t*t*t*iP3;
}
vec3 dbez(float t){
  float u = 1.0 - t;
  return 3.0*u*u*(iP1 - iP0) + 6.0*u*t*(iP2 - iP1) + 3.0*t*t*(iP3 - iP2);
}

void main(){
  vT = aT;
  vSide = aSide;
  vSeed = iTime.z;
  vAge = (uTime - iTime.x) / iTime.y;   // 0 → 2

  vec3 p = bez(aT);
  vec3 tang = normalize(dbez(aT));
  vec3 toCam = normalize(cameraPosition - p);
  vec3 side = normalize(cross(tang, toCam));  // keeps the ribbon facing the viewer

  float taper = 0.35 + 0.65 * pow(sin(3.14159265 * clamp(aT, 0.0, 1.0)), 0.4);
  p += side * aSide * uWidth * taper;

  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;

export const arcFrag = /* glsl */ `
varying float vT;
varying float vAge;
varying float vSeed;
varying float vSide;

// Ribbon body colour. The primary field keeps the classic mint-white; a second
// ArcField instance overrides these with a warmer hue for its own lanes.
uniform vec3 uTint;
uniform vec3 uHot;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main(){
  float d = vAge - vT;                       // distance behind the head
  if (vAge < 0.0 || vAge > 2.05 || d < 0.0) discard;

  // smooth continuous fade — no noise chunks, just a clean gradient dissolve
  float trail = 1.0 - smoothstep(0.25, 1.65, d);
  float head = exp(-d * 16.0);

  float edge = 1.0 - smoothstep(0.35, 1.0, abs(vSide));
  // destination-side soft fade: as the arc reaches the city (vT → 1) during
  // the fade-out phase, melt gracefully into the city dot.
  float destFade = 1.0 - smoothstep(0.88, 1.0, vT) * smoothstep(1.0, 1.5, vAge);
  float a = trail * edge * destFade;
  if (a < 0.01) discard;

  // Body ramp matches the original exactly (0.86,1.0,0.95 × 0.9 + hot × 2.4 for
  // the primary field). uHot lets a saturated secondary field keep a coloured
  // head instead of washing out to white under the same boost.
  vec3 c = uTint * 0.9 + uHot * head * 2.4;
  gl_FragColor = vec4(c, a);
}`;
