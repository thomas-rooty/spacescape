import {Canvas} from '@react-three/fiber'
import {Stars, PointerLockControls} from "@react-three/drei";
import {Physics, Debug} from '@react-three/cannon';
import StartingEarth from "@/components/StartingCinematic/earth/StartingEarth";
import ShipInteriors from "@/components/StartingCinematic/ship/Ship";
import Lights from "@/components/StartingCinematic/lights/Lights";
import Floor from "@/components/StartingCinematic/floor/Floor";
import BaseCharacter from "@/components/character/BaseCharacter";

const Scene = () => {
  // Base values
  const distanceFromEarth = 25

  return (
    <Canvas
      shadows={true}
      camera={{position: [0, 0, distanceFromEarth + 0.05], fov: 65}}
    >
      <Lights/>
      <Physics gravity={[0, -9.8, 0]}>
        <Debug scale={0} color="red">
          <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromEarth + 0.2]}/>
          <BaseCharacter position={[0, 0, distanceFromEarth]} args={[0.15]}/>
        </Debug>
      </Physics>
      <PointerLockControls/>
      <Stars radius={1} depth={25} count={1250} factor={0.5} saturation={1} fade/>
      <StartingEarth position={[0, -0.33, 3.33]} rotation={[0, 0, 0]} scale={0.10}/>
      <ShipInteriors position={[-0.495, -0.153, distanceFromEarth]} rotation={[0, 0, 0]} scale={0.001}/>
    </Canvas>
  )
}

export default Scene
