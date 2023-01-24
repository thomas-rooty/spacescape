import {Canvas} from '@react-three/fiber'
import StartingEarth from "@/components/StartingCinematic/earth/StartingEarth";
import ShipInteriors from "@/components/StartingCinematic/ship/Ship";
import {Stars} from "@react-three/drei";

const Scene = () => {
  return (
    <Canvas
      shadows={true}
    >
      <directionalLight
        color="white"
        position={[5, 5, 3]}
        castShadow={false}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Stars radius={1} depth={25} count={1250} factor={0.5} saturation={1} fade />
      <StartingEarth position={[0, 0, 2.5]} rotation={[0, 0, 0]} scale={0.01}/>
      <ShipInteriors position={[-0.495, -0.153, 5]} rotation={[0, 0, 0]} scale={0.001}/>

    </Canvas>
  )
}

export default Scene
