'use client';

import HUD from "./components/HUD";
import ThreeScene from "./components/ThreeScene";
import { SystemMode } from "./lib/systemState";
import  {useState} from "react";

export default function Page() {
  const [mode, setMode] = useState<SystemMode>("HOME")

  return (
    <>
      <ThreeScene mode={mode} />
      <HUD mode={mode} setMode={setMode} />
    </>
  )
}