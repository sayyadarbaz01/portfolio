import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#faf8f5",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            color: "#0f766e",
            marginBottom: 16,
          }}
        >
          FULL-STACK & AI INTEGRATION ENGINEER
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            color: "#1c1917",
            letterSpacing: -2,
          }}
        >
          Arbaz Sayyad
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 30,
            color: "#44403c",
            marginTop: 20,
          }}
        >
          React · TypeScript · Node.js · AI & RAG Systems
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["3+ YOE", "4s → 2s load time", "500+ daily users"].map((stat) => (
            <div
              key={stat}
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: "#1c1917",
                backgroundColor: "#ffffff",
                border: "1px solid #e7e0d3",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {stat}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 12,
            backgroundColor: "#0f766e",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
