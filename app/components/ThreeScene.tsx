"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { SystemMode, SCENE_PRESET, ProjectId } from  "@/app/lib/systemState"

export default function ThreeScene({
  mode,
  activeProject,
}: {
  mode: SystemMode
  activeProject: ProjectId
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const coreRef = useRef<THREE.Mesh | null>(null)
 const  sceneRef = useRef<THREE.Scene | null>(null) // 存储场景的实例
 const  rendererRef = useRef<THREE.WebGLRenderer | null>(null) // 渲染器的实例
  const targetCameraZ = useRef(7)
  const targetCoreScale = useRef(1)
  const targetCoreEmissive = useRef(0) // 发光缓动，模拟选中时候的发光效果

  useEffect(() => {
    if (!containerRef.current) return
    // 创建场景、相机、渲染器
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
    rendererRef.current = renderer // 保存渲染器实例
    containerRef.current.appendChild(renderer.domElement)

    // 核心物体（先用最简单的）
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: "#4fd1c5",
      wireframe: true,
      emissive: "#4fd1c5",
      emissiveIntensity: 0.2,
    })
    const core = new THREE.Mesh(geometry, material)
    coreRef.current = core
    scene.add(core)

    // 光源
    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

  // 窗口大小变化处理，防止窗口变化导致画面奇怪
    const handleResize = () => {
   if(!cameraRef.current || !rendererRef.current) return 
   cameraRef.current.aspect = window.innerWidth / window.innerHeight
   cameraRef.current.updateProjectionMatrix()
   rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize",handleResize)


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

      // 核心发光缓动
      //发光强度的缓动逻辑
      const mat = core.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity += (targetCoreEmissive.current - mat.emissiveIntensity) * 0.05

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()
   // 清理函数
    return () => {
      // 销毁
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize",handleResize)

      // 释放资源
      if(coreRef.current){
        const geom = coreRef.current.geometry
        const mat = coreRef.current.material as THREE.Material
        geom.dispose()
        mat.dispose()
      }
     if(rendererRef.current){
      rendererRef.current.dispose()
      containerRef.current?.removeChild(rendererRef.current.domElement)
     }
     // 清空引用
     sceneRef.current = null
      cameraRef.current = null
      coreRef.current = null
      rendererRef.current = null

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

  // 监听选中状态
  // 1 代表选中 ，2 代表没有选中
  useEffect(() => {
    targetCoreEmissive.current = activeProject ? 1 : 0.2
  }, [activeProject])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,  // 类似 left：0 ，right:0,top:0,bottom:0
        zIndex: 0, // 物体始终初于最底层，方便别的文字之类的，在上
      }}
    />
  )
}
