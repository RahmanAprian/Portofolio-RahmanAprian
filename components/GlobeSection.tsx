"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import createGlobe from "cobe";

export default function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const phiRef = useRef(2.0);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: window.devicePixelRatio || 2,
      width: width * (window.devicePixelRatio || 2),
      height: width * (window.devicePixelRatio || 2),
      phi: phiRef.current,
      theta: 0.2,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.4],
      markerColor: [0, 0.8, 1],
      glowColor: [0.4, 0.35, 1],
      markers: [
        { location: [-2.97, 104.78], size: 0.09 },
        { location: [-6.21, 106.85], size: 0.05 },
        { location: [1.35, 103.82], size: 0.05 },
        { location: [35.68, 139.65], size: 0.05 },
        { location: [25.20, 55.27], size: 0.05 },
        { location: [51.51, -0.13], size: 0.05 },
        { location: [40.71, -74.01], size: 0.05 },
        { location: [-33.87, 151.21], size: 0.05 },
        { location: [48.86, 2.35], size: 0.04 },
        { location: [19.08, 72.88], size: 0.04 },
        { location: [39.91, 116.39], size: 0.05 },
        { location: [37.57, 126.98], size: 0.04 },
      ],
      onRender(state) {
        if (!isDraggingRef.current) {
          phiRef.current += 0.004;
        }
        state.phi = phiRef.current;
        state.theta = pointerRef.current.y * 0.5;
        state.width = width * (window.devicePixelRatio || 2);
        state.height = width * (window.devicePixelRatio || 2);
      },
    });

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      phiRef.current -= dx * 0.008;
      pointerRef.current.y -= dy * 0.005;
      pointerRef.current.y = Math.max(-0.6, Math.min(0.6, pointerRef.current.y));
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDraggingRef.current = false; };
    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.touches[0].clientX - lastPointerRef.current.x;
      const dy = e.touches[0].clientY - lastPointerRef.current.y;
      phiRef.current -= dx * 0.008;
      pointerRef.current.y -= dy * 0.005;
      pointerRef.current.y = Math.max(-0.6, Math.min(0.6, pointerRef.current.y));
      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDraggingRef.current = false; };
    const onResize = () => { width = canvas.offsetWidth; };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    return () => {
      globeRef.current?.destroy();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="py-12 px-6 flex flex-col items-center" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg flex flex-col items-center gap-4"
      >
        <span className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
          🌏 Open for remote worldwide
        </span>

        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-75" />
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>

        <p className="text-xs text-muted font-mono animate-pulse">↔ drag to rotate</p>

        <div className="flex flex-wrap justify-center gap-2">
          {[
            { name: "Palembang 🏠", home: true },
            { name: "Jakarta" }, { name: "Singapore" }, { name: "Tokyo" },
            { name: "Dubai" }, { name: "London" }, { name: "New York" },
            { name: "Sydney" }, { name: "Paris" }, { name: "Mumbai" },
            { name: "Beijing" }, { name: "Seoul" },
          ].map(({ name, home }) => (
            <span
              key={name}
              className={`text-xs px-3 py-1 rounded-full border ${
                home
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-surface border-white/8 text-muted"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
