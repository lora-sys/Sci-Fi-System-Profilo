"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { SystemMode, SCENE_PRESET } from  "@/app/lib/systemState"

export default function ThreeScene({
  mode,
}: {
  mode: SystemMode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const coreRef = useRef<THREE.Mesh | null>(null)

  const targetCameraZ = useRef(7)
  const targetCoreScale = useRef(1)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 7
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // 核心物体（先用最简单的）
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: "#4fd1c5",
      wireframe: true,
    })
    const core = new THREE.Mesh(geometry, material)
    coreRef.current = core
    scene.add(core)

    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    let frameId: number

    const animate = () => {
      // 核心缓慢旋转
      core.rotation.y += 0.002

      // 相机缓动
      camera.position.z +=
        (targetCameraZ.current - camera.position.z) * 0.05

      // 核心缩放缓动
      const s = core.scale.x
      const ts = targetCoreScale.current
      const ns = s + (ts - s) * 0.05
      core.scale.set(ns, ns, ns)

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  // 响应 SystemMode 变化
  useEffect(() => {
    const preset = SCENE_PRESET[mode]
    targetCameraZ.current = preset.cameraZ
    targetCoreScale.current = preset.coreScale
  }, [mode])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    />
  )
}
