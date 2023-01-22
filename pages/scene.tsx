import { Canvas } from '@react-three/fiber'
import StartingEarth from "@/components/earth/StartingEarth";

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[1, 1.5, 1.5]} />
      <StartingEarth position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.033} />
    </Canvas>
  )
}

export default Scene
