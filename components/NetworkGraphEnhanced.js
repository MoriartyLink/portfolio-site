import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Line } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

function Node({ position }) {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y += 0.003
    mesh.current.rotation.x += 0.002
  })
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial emissive="#00e5ff" emissiveIntensity={0.7} color="#00e5ff" />
    </mesh>
  )
}

export default function NetworkGraph() {
  const nodes = [
    [-2, 0, 0],
    [2, 0, 0],
    [0, 2, -1],
    [0, -2, 1],
    [-1, 1, 2],
    [1, -1, -2],
  ]

  const edges = [
    [0,1], [0,2], [1,3], [2,3], [3,4], [4,5], [5,0]
  ]

  return (
    <div className="w-full h-[450px] md:h-[550px] rounded-2xl shadow-neon bg-[#071226]/50 mb-12">
      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5,5,5]} intensity={0.8} />
        <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade />

        {/* Nodes */}
        {nodes.map((pos, i) => <Node key={i} position={pos} />)}

        {/* Lines connecting nodes */}
        {edges.map(([a,b], i) => (
          <Line
            key={i}
            points={[nodes[a], nodes[b]]}
            color="#00e5ff"
            lineWidth={1.5}
            dashed={false}
            transparent
            opacity={0.6}
          />
        ))}

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}
