import { Canvas } from '@react-three/fiber'
import StartingEarth from "@/components/earth/StartingEarth";

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <StartingEarth position={[1, 0, 0]} rotation={[0, 0, 0]} scale={0.009} />
    </Canvas>
  )
}

export default Scene
