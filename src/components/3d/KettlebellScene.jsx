import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'

function Kettlebell() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.6
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.08
  })

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Main body — sphere */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Flat bottom */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.25, 0.45, 0.5, 32]} />
        <meshStandardMaterial color="#FF2A2A" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Handle — torus */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.12, 16, 60, Math.PI]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Weight markings — red band */}
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[1.01, 0.025, 8, 64]} />
        <meshStandardMaterial
          color="#FF2A2A"
          emissive="#FF2A2A"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

function OrbitParticles() {
  const groupRef = useRef()
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
  })

  const count = 40
  const positions = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2
    const r = 1.8 + Math.random() * 0.5
    return [Math.cos(angle) * r, (Math.random() - 0.5) * 3, Math.sin(angle) * r]
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#FF2A2A"
            emissive="#FF2A2A"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function KettlebellScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-3, 2, -3]} intensity={1.5} color="#FF2A2A" />
        <spotLight position={[0, 6, 2]} intensity={3} color="#ffffff" angle={0.5} penumbra={0.8} />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
            <Kettlebell />
          </Float>
          <OrbitParticles />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}