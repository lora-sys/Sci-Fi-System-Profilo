"use client"

import { useState } from "react"
import { SystemMode, ProjectId } from "../lib/systemState";

const PROJECTS = [
  {
    id: "HUD_SYSTEM",
    title: "REAL-TIME HUD SYSTEM",
    tech: "Next.js / Three.js / Interaction",
  },
  {
    id: "DATA_VIS",
    title: "INTERACTIVE DATA VIS",
    tech: "D3 / GLSL / UX",
  },
]

function ProjectItem({
  project,
  activate,
  onSelect,
}:{
  project: {
    id: string
    title: string
    tech: string
  }
  activate: boolean
  onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        marginBottom: 14,
        cursor: "pointer",
        color: activate ? "#4fd1c5" : "#aaa",
      }}
    >
      ▸ {project.title}
      <br />
      <span
        style={{
          fontSize: 12,
          opacity: 0.6,
          marginLeft: 12,
        }}
      >
        {project.tech}
      </span>   
    </div>
  )
}

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
      {/** 实现边框最上边角的l型的边框 */}
      <div
        style={{
          position: "absolute",
          top: "-1px", // 使用字符串而不是数字，服务器渲染可能会使用展开css属性， “-1px”，客户端渲染使用简化的数字，如-1
          left: "-1px",// 确保服务器和客户端渲染时产生完全相同的样式，
          width: "12px",
          height: "12px",
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
  activeProject,
  setActiveProject,
}: {
  mode: SystemMode
  setMode: (m: SystemMode) => void
  activeProject: ProjectId
  setActiveProject: (id: ProjectId) => void
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
        {/** 控制台模块感*/}
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
     
     {/** mode === PROJECTS 时的项目列表  
      *
  项目文案模版 
  ▸ PROJECT NAME
  TECH STACK
  STATUS / ROLE
  之后可以考虑做成可滚动的列表，做出控制台，hud效果，科幻效果，3d项目列表，项目的补充在下面添加就行
*/}
{mode === "PROJECTS" && (
  <div
    style={{
      position: "absolute",
      top: 40,
      left: 280,
      pointerEvents: "auto",
    }}
  >
    <Panel>
      <div style={{ marginBottom: 12, opacity: 0.6 }}>
        PROJECT DATABASE
      </div>

      {PROJECTS.map((p) => (
        <ProjectItem
          key={p.id}
          project={p}
          activate={activeProject === p.id}
          onSelect={() => setActiveProject(p.id as ProjectId)}
        />
      ))}
    </Panel>
  </div>
)}



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
