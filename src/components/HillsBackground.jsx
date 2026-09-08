"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./HillsBackground.module.css";

// Movement/shape constants are intentionally kept aligned with the GLSL Hills
// reference. Performance is handled around the shader (geometry density, DPR,
// FPS cap and visibility), not by changing the characteristic motion.
const VERTEX_SHADER = /* glsl */ `
precision highp float;
#define GLSLIFY 1
attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

varying vec3 vPosition;

mat4 rotateMatrixX(float radian) {
  return mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, cos(radian), -sin(radian), 0.0,
    0.0, sin(radian), cos(radian), 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(
    dot(g000, g000),
    dot(g010, g010),
    dot(g100, g100),
    dot(g110, g110)
  ));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;

  vec4 norm1 = taylorInvSqrt(vec4(
    dot(g001, g001),
    dot(g011, g011),
    dot(g101, g101),
    dot(g111, g111)
  ));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(
    vec4(n000, n100, n010, n110),
    vec4(n001, n101, n011, n111),
    fade_xyz.z
  );
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main(void) {
  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
  float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
  float noise1 = cnoise(noisePosition * 0.08);
  float noise2 = cnoise(noisePosition * 0.06);
  float noise3 = cnoise(noisePosition * 0.4);
  vec3 lastPosition = updatePosition + vec3(
    0.0,
    noise1 * sin1 * 8.0
      + noise2 * sin1 * 8.0
      + noise3 * (abs(sin1) * 2.0 + 0.5)
      + pow(sin1, 2.0) * 40.0,
    0.0
  );

  vPosition = lastPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision mediump float;
#define GLSLIFY 1

varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.42;
  vec3 color = vec3(0.46, 0.56, 0.72);
  gl_FragColor = vec4(color, opacity);
}
`;

function getDeviceProfile(width, height) {
  const aspect = width / Math.max(height, 1);
  const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 8 : 8;
  const memory =
    typeof navigator !== "undefined" && "deviceMemory" in navigator
      ? navigator.deviceMemory || 8
      : 8;

  const lowPower = cores <= 4 || memory <= 4;
  const veryLowPower = cores <= 2 || memory <= 2;
  const shortViewport = height <= 680;

  let segments = 192;
  let maxDpr = 1.25;
  let maxFps = 60;
  let cameraZ = 128;
  let cameraY = 16;
  let lookAtY = 28;

  if (width < 1280) {
    segments = 160;
    maxDpr = 1.2;
    maxFps = 55;
    cameraZ = 132;
  }

  if (width < 1024) {
    segments = 128;
    maxDpr = 1.1;
    maxFps = 45;
    cameraZ = 142;
    lookAtY = 27;
  }

  if (width < 768) {
    segments = 96;
    maxDpr = 1;
    maxFps = 40;
    cameraZ = 152;
    lookAtY = 26;
  }

  if (width < 480) {
    segments = 80;
    maxDpr = 1;
    maxFps = 36;
    cameraZ = 160;
    cameraY = 15;
    lookAtY = 25;
  }

  if (width < 390) {
    segments = 64;
    maxDpr = 1;
    maxFps = 30;
    cameraZ = 166;
    cameraY = 14;
    lookAtY = 24;
  }

  // Portrait/tablet screens need a slightly wider camera framing so the
  // valley remains centered and both hills stay visible instead of feeling cropped.
  if (aspect < 0.9) {
    const portraitAmount = Math.min(1, (0.9 - aspect) / 0.5);
    cameraZ += 4 + portraitAmount * 14;
    lookAtY += 1 + portraitAmount * 2;
  }

  if (shortViewport) {
    segments = Math.max(56, Math.round(segments * 0.82));
    maxFps = Math.min(maxFps, 36);
    cameraZ += 6;
  }

  if (lowPower) {
    segments = Math.max(56, Math.round(segments * 0.78));
    maxDpr = 1;
    maxFps = Math.min(maxFps, 36);
  }

  if (veryLowPower) {
    segments = Math.max(48, Math.round(segments * 0.75));
    maxFps = Math.min(maxFps, 30);
  }

  return {
    segments,
    maxDpr,
    maxFps,
    cameraZ,
    cameraY,
    lookAtY,
  };
}

export default function HillsBackground() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reducedMotion = Boolean(reducedMotionQuery?.matches);
    let destroyed = false;
    let isInViewport = true;
    let pageVisible = !document.hidden;
    let frameId = 0;
    let lastFrameTime = 0;
    let activeSegments = 0;
    let profile = getDeviceProfile(root.clientWidth || window.innerWidth, root.clientHeight || window.innerHeight);

    // Fail safe when WebGL is unavailable (headless browsers, blocked GPU, etc.)
    // so the rest of the page keeps rendering instead of crashing.
    const supportsWebGL = (() => {
      try {
        const probe = document.createElement("canvas");
        return Boolean(
          probe.getContext("webgl") ||
            probe.getContext("experimental-webgl") ||
            probe.getContext("webgl2"),
        );
      } catch {
        return false;
      }
    })();

    if (!supportsWebGL) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        canvas,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        stencil: false,
        depth: false,
      });
    } catch {
      return undefined;
    }
    if (!renderer.getContext() || renderer.getContext().isContextLost()) return undefined;

    // Keep the WebGL layer transparent so the existing Hero background remains untouched.
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    const uniforms = { time: { value: 0 } };

    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    let geometry = new THREE.PlaneGeometry(256, 256, profile.segments, profile.segments);
    activeSegments = profile.segments;

    const plane = new THREE.Mesh(geometry, material);
    plane.frustumCulled = false;
    scene.add(plane);

    const applyProfile = (nextProfile) => {
      profile = nextProfile;

      if (profile.segments !== activeSegments) {
        const nextGeometry = new THREE.PlaneGeometry(256, 256, profile.segments, profile.segments);
        const previousGeometry = geometry;
        geometry = nextGeometry;
        plane.geometry = nextGeometry;
        activeSegments = profile.segments;
        previousGeometry.dispose();
      }

      camera.position.set(0, profile.cameraY, profile.cameraZ);
      camera.lookAt(0, profile.lookAtY, 0);
    };

    const renderOnce = () => {
      if (destroyed) return;
      try {
        if (!renderer.getContext()?.isContextLost()) renderer.render(scene, camera);
      } catch {
        /* A lost WebGL context can throw during render; skip silently. */
      }
    };

    const resize = () => {
      if (destroyed) return;

      const width = Math.max(1, Math.round(root.clientWidth));
      const height = Math.max(1, Math.round(root.clientHeight));
      const nextProfile = getDeviceProfile(width, height);

      applyProfile(nextProfile);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, profile.maxDpr));
      renderer.setSize(width, height, false);
      renderOnce();
    };

    const shouldAnimate = () => !destroyed && isInViewport && pageVisible && !reducedMotion;

    const stop = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const renderLoop = (now) => {
      frameId = 0;
      if (!shouldAnimate()) return;

      const frameInterval = 1000 / profile.maxFps;
      const elapsedMs = lastFrameTime ? now - lastFrameTime : frameInterval;

      if (elapsedMs >= frameInterval * 0.9) {
        // Keep movement time-based so 30/36/45 FPS profiles move at the same
        // speed as 60 FPS instead of slowing the animation down.
        const deltaSeconds = Math.min(elapsedMs / 1000, 0.05);
        uniforms.time.value += deltaSeconds;
        lastFrameTime = now;
        try {
          if (!renderer.getContext()?.isContextLost()) renderer.render(scene, camera);
        } catch {
          /* Context may drop mid-loop; stop rather than crash the page. */
          stop();
          return;
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    const start = () => {
      if (!shouldAnimate() || frameId) return;
      lastFrameTime = performance.now();
      frameId = requestAnimationFrame(renderLoop);
    };

    const syncAnimationState = () => {
      if (shouldAnimate()) {
        start();
      } else {
        stop();
        lastFrameTime = 0;
        renderOnce();
      }
    };

    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              isInViewport = entry.isIntersecting;
              syncAnimationState();
            },
            { rootMargin: "15% 0px 15% 0px", threshold: 0 },
          )
        : null;

    let resizeFrame = 0;
    const scheduleResize = () => {
      if (resizeFrame || destroyed) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
      });
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleResize) : null;

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      syncAnimationState();
    };

    const onReducedMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) uniforms.time.value = 0;
      syncAnimationState();
    };

    const onContextLost = (event) => {
      event.preventDefault();
      stop();
    };

    const onContextRestored = () => {
      resize();
      syncAnimationState();
    };

    intersectionObserver?.observe(root);
    resizeObserver?.observe(root);
    if (!resizeObserver) window.addEventListener("resize", scheduleResize, { passive: true });

    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery?.addEventListener?.("change", onReducedMotionChange);
    canvas.addEventListener("webglcontextlost", onContextLost, false);
    canvas.addEventListener("webglcontextrestored", onContextRestored, false);

    resize();
    syncAnimationState();

    return () => {
      destroyed = true;
      stop();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);

      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", scheduleResize);

      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery?.removeEventListener?.("change", onReducedMotionChange);
      canvas.removeEventListener("webglcontextlost", onContextLost, false);
      canvas.removeEventListener("webglcontextrestored", onContextRestored, false);

      scene.remove(plane);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.root} hero-hills-layer`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
