import {Canvas} from '@react-three/fiber'
import {Stars, PointerLockControls} from "@react-three/drei";
import {Physics, Debug} from '@react-three/cannon';
import {Suspense} from "react";
import {useStore} from "@/utils/zustore";
import DyingEarth from "@/components/StartingCinematic/earth/DyingEarth";
import ShipInteriors from "@/components/StartingCinematic/ship/Ship";
import Lights from "@/components/StartingCinematic/lights/Lights";
import Effects from "@/components/effects/effects";
import Floor from "@/components/StartingCinematic/floor/Floor";
import BaseCharacter from "@/components/character/BaseCharacter";
import Wall from "@/components/StartingCinematic/ship/Wall";
import StartBtn from "@/components/StartingCinematic/buttons/StartBtn";
import Loader from "@/components/loader/Loader";

const Scene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const startedGame = useStore((state) => state.startedGame)

  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Canvas
          shadows={true}
          camera={{position: [0, 0, distanceFromCenter], fov: 50}}
        >
          <Effects/>
          <Lights/>
          <Physics gravity={[0, -9.8, 0]}>
            <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]}/>
            <Debug scale={0} color="red">
              <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'}
                     position={[-0.33, -0.17, distanceFromCenter + 0.2]}/>
              <Wall position={[0.3, 0, distanceFromCenter + 0.2]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]}/>
              <Wall position={[-0.3, 0, distanceFromCenter + 0.2]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]}/>
              <Wall position={[0, 0, distanceFromCenter + 0.5]} rotation={[0, Math.PI / -2, 0]} args={[0.1, 0.4, 0.6]}/>
              <Wall position={[0, 0, distanceFromCenter - 0.1]} rotation={[0, Math.PI / -2, 0]} args={[0.1, 0.4, 0.6]}/>
            </Debug>
          </Physics>
          {startedGame && <PointerLockControls/>}
          <Stars radius={1} depth={25} count={1250} factor={0.5} saturation={1} fade/>
          <DyingEarth position={[0, 0, 0]} rotation={[0, 0, 0]} scale={9.33}/>
          <ShipInteriors position={[-0.495, -0.153, distanceFromCenter]} rotation={[0, 0, 0]} scale={0.001}/>
        </Canvas>
        <StartBtn/>
      </Suspense>
    </>
  )
}

export default Scene
