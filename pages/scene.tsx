import {Canvas} from '@react-three/fiber'
import {Stars, PointerLockControls} from "@react-three/drei";
import {Physics, Debug} from '@react-three/cannon';
import StartingEarth from "@/components/StartingCinematic/earth/StartingEarth";
import ShipInteriors from "@/components/StartingCinematic/ship/Ship";
import Lights from "@/components/StartingCinematic/lights/Lights";
import Floor from "@/components/StartingCinematic/floor/Floor";
import BaseCharacter from "@/components/character/BaseCharacter";
import Wall from "@/components/StartingCinematic/ship/Wall";

const Scene = () => {
  // Base values
  const distanceFromCenter = 25

  return (
    <Canvas
      shadows={true}
      camera={{position: [0, 0, distanceFromCenter], fov: 50}}
    >
      <Lights/>
      <Physics gravity={[0, -9.8, 0]}>
        <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]}/>
        <Debug scale={1} color="red">
          <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromCenter + 0.2]}/>
          <Wall position={[0.3, 0, distanceFromCenter + 0.2]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]}/>
          <Wall position={[-0.3, 0, distanceFromCenter + 0.2]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]}/>
          <Wall position={[0, 0, distanceFromCenter + 0.5]} rotation={[0, Math.PI/-2, 0]} args={[0.1, 0.4, 0.6]}/>
          <Wall position={[0, 0, distanceFromCenter - 0.1]} rotation={[0, Math.PI/-2, 0]} args={[0.1, 0.4, 0.6]}/>
        </Debug>
      </Physics>
      <PointerLockControls/>
      <Stars radius={1} depth={25} count={1250} factor={0.5} saturation={1} fade/>
      <StartingEarth position={[0, -0.33, -3.33]} rotation={[0, 0, 0]} scale={0.10}/>
      <ShipInteriors position={[-0.495, -0.153, distanceFromCenter]} rotation={[0, 0, 0]} scale={0.001}/>
    </Canvas>
  )
}

export default Scene
