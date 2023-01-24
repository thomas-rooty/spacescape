import {Canvas} from '@react-three/fiber'
import {Stars} from "@react-three/drei";
import StartingEarth from "@/components/StartingCinematic/earth/StartingEarth";
import ShipInteriors from "@/components/StartingCinematic/ship/Ship";
import Lights from "@/components/StartingCinematic/lights/Lights";

const Scene = () => {
  return (
    <Canvas
      shadows={true}
    >
      <Lights />
      <Stars radius={1} depth={25} count={1250} factor={0.5} saturation={1} fade />
      <StartingEarth position={[0, -0.33, 3.33]} rotation={[0, 0, 0]} scale={0.01}/>
      <ShipInteriors position={[-0.495, -0.153, 5]} rotation={[0, 0, 0]} scale={0.001}/>
    </Canvas>
  )
}

export default Scene
