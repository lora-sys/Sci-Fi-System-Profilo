"use client"

import { SystemMode } from "../lib/systemState";

function MenuItem({
  label,
  value,
  mode,
  setMode,
}: {
  label: string
  value: SystemMode
  mode: SystemMode
  setMode: (m: SystemMode) => void
}) {
  return (
    <div
      onClick={() => setMode(value)}
      style={{
        cursor: "pointer",
        marginBottom: 12,
        color: mode === value ? "#4fd1c5" : "#888",
      }}
    >
      ▸ {label}
    </div>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        border: "1px solid rgba(79,209,197,0.4)",
        background:
          "linear-gradient(180deg, rgba(79,209,197,0.05), rgba(0,0,0,0))",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -1,
          left: -1,
          width: 12,
          height: 12,
          borderTop: "2px solid #4fd1c5",
          borderLeft: "2px solid #4fd1c5",
        }}
      />
      {children}
    </div>
  )
}

export default function HUD({
  mode,
  setMode,
}: {
  mode: SystemMode
  setMode: (m: SystemMode) => void
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        fontFamily: "monospace",
        color: "#ccc",
      }}
    >
      {/* 左侧 HUD */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          pointerEvents: "auto",
        }}
      >
        <Panel>
          <div style={{ marginBottom: 12, opacity: 0.6 }}>
            SYSTEM MENU
          </div>

          <MenuItem
            label="HOME"
            value="HOME"
            mode={mode}
            setMode={setMode}
          />
          <MenuItem
            label="PROJECTS"
            value="PROJECTS"
            mode={mode}
            setMode={setMode}
          />
          <MenuItem
            label="CONTACT"
            value="CONTACT"
            mode={mode}
            setMode={setMode}
          />
        </Panel>
      </div>

      {/* 右上角状态 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          opacity: 0.6,
        }}
      >
        MODE: {mode}
      </div>
    </div>
  )
}
