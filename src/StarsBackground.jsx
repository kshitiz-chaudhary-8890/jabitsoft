import { useEffect, useRef } from "react";

export default function StarsBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let frame;
    const stars = [];
    const STAR_COUNT = 60;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.15,
          dy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.4 + 0.2,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.x += s.dx;
        s.y += s.dy;
        s.pulse += 0.008;
        const alpha = s.opacity + Math.sin(s.pulse) * 0.15;

        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;
        if (s.y < -10) s.y = canvas.height + 10;
        if (s.y > canvas.height + 10) s.y = -10;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 180, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      initStars();
    });
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
