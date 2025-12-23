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
    {mode === "PROJECTS" &&
    (
    <div 
    style={{
      position:"absolute",
      top:40,
      left:200, // 与左侧菜单对齐
      pointerEvents:"auto",
    }}
    >
      <Panel>
        <div
        style={{ marginBottom:12,opacity:0.6}}
        >
          PROJECT DATABASE
        </div>
        <div style={{fontSize:13,lineHeight:1.6}}>
         *SCI-FI HUD PORTFOLIO
        <br/>
        <span style={{opacity:0.5}}>
          React/Three.js/WebGL
        </span>

        <br/><br/>

        *INTERACTIVE DATA VIS
        <br/>
        <span style={{opacity:0.5}}>
          D3.js/GLSL/UX
        </span>
        </div>
      </Panel>
    </div>
    )
    }


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
