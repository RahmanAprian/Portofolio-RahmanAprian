"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import createGlobe from "cobe";

export default function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(2.0);
  const thetaRef = useRef(0.2);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const [dragging, setDragging] = useState(false);

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
      theta: thetaRef.current,
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
        state.theta = thetaRef.current;
        state.width = width * (window.devicePixelRatio || 2);
        state.height = width * (window.devicePixelRatio || 2);
      },
    });

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const onResize = () => { width = canvas.offsetWidth; };
    window.addEventListener("resize", onResize);

    return () => {
      globeRef.current?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setDragging(true);
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    const dy = e.clientY - lastYRef.current;
    phiRef.current -= dx * 0.008;
    thetaRef.current -= dy * 0.005;
    thetaRef.current = Math.max(-0.6, Math.min(0.6, thetaRef.current));
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setDragging(false);
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

        {/* touchAction: "none" hanya saat drag, bukan selamanya */}
        <div
          className="relative w-full select-none"
          style={{
            aspectRatio: "1 / 1",
            touchAction: dragging ? "none" : "auto",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-75 pointer-events-none" />
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