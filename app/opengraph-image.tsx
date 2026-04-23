import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Japan Field Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const [notoSansJP, geistMono] = await Promise.all([
    fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
    )
      .then((res) => res.text())
      .then((css) => {
        const match = css.match(/src: url\((.+?)\)/);
        return match ? fetch(match[1]).then((r) => r.arrayBuffer()) : null;
      }),
    readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf"
      )
    ),
  ]);

  const fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 400 | 700 }[] = [
    {
      name: "GeistMono",
      data: geistMono.buffer as ArrayBuffer,
      style: "normal" as const,
      weight: 400 as const,
    },
  ];

  if (notoSansJP) {
    fonts.push({
      name: "NotoSansJP",
      data: notoSansJP,
      style: "normal" as const,
      weight: 700 as const,
    });
  }

  // Flag dimensions: 200×133 (2:3), circle diameter = 3/5 height = 80
  const flagW = 200;
  const flagH = 133;
  const circleR = (flagH * 3) / 5 / 2; // 40

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0C0C",
        }}
      >
        {/* Japanese flag */}
        <svg
          width={flagW}
          height={flagH}
          viewBox={`0 0 ${flagW} ${flagH}`}
        >
          <rect width={flagW} height={flagH} fill="#FFFFFB" />
          <circle
            cx={flagW / 2}
            cy={flagH / 2}
            r={circleR}
            fill="#CB1B45"
          />
        </svg>

        {/* Japanese headline */}
        <div
          style={{
            marginTop: 32,
            fontSize: 48,
            fontWeight: 700,
            color: "#FFFFFB",
            fontFamily: notoSansJP ? "NotoSansJP" : "sans-serif",
          }}
        >
          日本のフィールドガイド
        </div>

        {/* English subtitle */}
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            color: "rgba(255, 255, 251, 0.8)",
            fontFamily: "GeistMono, monospace",
          }}
        >
          Japan Field Guide
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
