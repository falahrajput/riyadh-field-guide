"use client";
import { useEffect, useRef } from "react";

export function SaudiFlag() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FW = 900, FH = 600;

    // Pre-render static flag to offscreen canvas
    const off = document.createElement("canvas");
    off.width = FW;
    off.height = FH;
    const oc = off.getContext("2d")!;

    // Green background
    oc.fillStyle = "#006C35";
    oc.fillRect(0, 0, FW, FH);

    // Shahada — Arabic text
    oc.fillStyle = "#FFFFFF";
    oc.textAlign = "center";
    oc.textBaseline = "middle";
    oc.font = `bold ${FW * 0.072}px 'Arial', 'Noto Naskh Arabic', serif`;
    oc.fillText("لا إله إلا الله محمد رسول الله", FW / 2, FH * 0.37);

    // Sword — horizontal, pointing left, centred below text
    const cx = FW / 2;
    const cy = FH * 0.60;
    const bladeLen = FW * 0.52;
    const bladeH = FH * 0.028;
    const tipX = cx - bladeLen / 2;
    const hiltX = cx + bladeLen / 2;

    oc.fillStyle = "#FFFFFF";

    // Blade — slight taper toward tip
    oc.beginPath();
    oc.moveTo(tipX, cy);                               // tip
    oc.lineTo(hiltX - FW * 0.02, cy - bladeH / 2);    // top edge to hilt
    oc.lineTo(hiltX, cy);                              // hilt top
    oc.lineTo(hiltX, cy + bladeH * 0.3);              // hilt bottom
    oc.lineTo(hiltX - FW * 0.02, cy + bladeH / 2);    // bottom edge
    oc.closePath();
    oc.fill();

    // Guard (cross-piece)
    const guardW = FW * 0.008;
    const guardH = FH * 0.09;
    oc.fillRect(hiltX - guardW / 2, cy - guardH / 2, guardW, guardH);

    // Grip
    const gripW = FW * 0.06;
    const gripH = FH * 0.022;
    oc.fillRect(hiltX, cy - gripH / 2, gripW, gripH);

    // Pommel
    oc.beginPath();
    oc.arc(hiltX + gripW + FH * 0.018, cy, FH * 0.022, 0, Math.PI * 2);
    oc.fill();

    // --- Animation ---
    let t = 0;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const _canvas = canvas;
    const _ctx = ctx;

    function draw() {
      const W = _canvas.width;
      const H = _canvas.height;

      _ctx.fillStyle = "#0C0C0C";
      _ctx.fillRect(0, 0, W, H);

      // Cover the screen with the flag (fill, not fit)
      const flagAspect = FW / FH;
      const canvasAspect = W / H;
      let dw: number, dh: number;
      if (canvasAspect > flagAspect) {
        dw = W;
        dh = W / flagAspect;
      } else {
        dh = H;
        dw = H * flagAspect;
      }
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      // Dim overlay value baked into alpha — darken so text over the flag stays legible
      _ctx.globalAlpha = 0.75;

      // Wave: slice each vertical column and offset vertically
      const SLICES = 120;
      for (let i = 0; i <= SLICES; i++) {
        const progress = i / SLICES;
        const amplitude = progress * 0.06 * dh;
        const waveY = Math.sin(progress * Math.PI * 3 - t) * amplitude;
        const scaleY = 1 - Math.abs(Math.sin(progress * Math.PI * 3 - t)) * progress * 0.035;

        const srcX = (i / SLICES) * FW;
        const srcW = FW / SLICES;
        const destX = dx + progress * dw;
        const destW = dw / SLICES + 1; // +1 to avoid hairline gaps
        const destY = dy + waveY;
        const destH = dh * scaleY;

        _ctx.drawImage(off, srcX, 0, srcW, FH, destX, destY, destW, destH);
      }

      _ctx.globalAlpha = 1;
      t += 0.035;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ display: "block" }}
    />
  );
}
