'use client';

import HUD from "./components/HUD";
import ThreeScene from "./components/ThreeScene";
import { SystemMode ,ProjectId} from "./lib/systemState";
import  {useState} from "react";

export default function Page() {
  const [mode, setMode] = useState<SystemMode>("HOME")
  const [activeProject, setActiveProject] = useState<ProjectId>(null)
  return (
    <>
      <ThreeScene mode={mode} activeProject={activeProject} />
      <HUD mode={mode} setMode={setMode} activeProject={activeProject} setActiveProject={setActiveProject} />
    </>
  )
}