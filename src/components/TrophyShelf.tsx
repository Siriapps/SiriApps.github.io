import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Trophy({ position, color, scale = 1, active = false }: {
  position: [number, number, number]
  color: string
  scale?: number
  active?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    let raf: number
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += active ? 0.012 : 0.003
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [active])

  const emissiveIntensity = active ? 0.4 : 0.05

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={active ? 0.4 : 0.15}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.15, 32]} />
          <meshStandardMaterial
            color={color} metalness={0.9} roughness={0.15}
            emissive={color} emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.55, 16]} />
          <meshStandardMaterial
            color={color} metalness={0.85} roughness={0.2}
            emissive={color} emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.3, 0.15, 0.5, 32, 1, true]} />
          <meshStandardMaterial
            color={color} metalness={0.95} roughness={0.1}
            side={THREE.DoubleSide}
            emissive={color} emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <torusGeometry args={[0.3, 0.03, 16, 32]} />
          <meshStandardMaterial
            color={color} metalness={0.95} roughness={0.1}
            emissive={color} emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 10]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#ffffff" metalness={0.8} roughness={0.1}
            emissive={color} emissiveIntensity={active ? 0.8 : 0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Shelf() {
  return (
    <group position={[0, -1.2, 0]}>
      <mesh>
        <boxGeometry args={[6, 0.08, 1.2]} />
        <meshStandardMaterial color="#1a1520" metalness={0.3} roughness={0.4} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[6, 0.01, 1.2]} />
        <meshStandardMaterial color="#c2a4ff" emissive="#c2a4ff" emissiveIntensity={0.15} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Scene({ activeIndex }: { activeIndex: number }) {
  const colors = ['#fbbf24', '#c2a4ff', '#a78bfa', '#f472b6', '#fbbf24', '#60a5fa']
  const positions: [number, number, number][] = [
    [-2.2, 0, 0], [-1.1, 0, 0], [0, 0, 0], [1.1, 0, 0], [2.2, 0, 0], [3.3, 0, 0],
  ]
  const scales = [1, 0.95, 0.9, 0.85, 0.8, 0.75]

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 4]} intensity={1} color="#c2a4ff" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#fbbf24" />
      <pointLight position={[3, 2, 2]} intensity={0.5} color="#60a5fa" />
      <Shelf />
      {colors.map((color, i) => (
        <Trophy key={i} position={positions[i]} color={color} scale={scales[i]} active={i === activeIndex} />
      ))}
      <Environment preset="night" />
    </>
  )
}

export default function TrophyShelf({ activeIndex = 0 }: { activeIndex?: number }) {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c2a4ff]/30 border-t-[#c2a4ff] rounded-full animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 45 }}
          dpr={[1, 1.5]}
          style={{ pointerEvents: 'none' }}
        >
          <Scene activeIndex={activeIndex} />
        </Canvas>
      </Suspense>
    </div>
  )
}
