import { Canvas } from '@react-three/fiber'
import { Stars, PointerLockControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/cannon'
import { Suspense } from 'react'
import { useStore } from '@/utils/zustore'
import DyingEarth from '@/components/StartingCinematic/earth/DyingEarth'
import Lights from '@/components/StartingCinematic/lights/Lights'
import Effects from '@/components/effects/Effects'
import Floor from '@/components/StartingCinematic/floor/Floor'
import BaseCharacter from '@/components/character/BaseCharacter'
import CockpitCollision from '@/components/StartingCinematic/ship/CockpitCollision'
import StartBtn from '@/components/StartingCinematic/buttons/StartBtn'
import Loader from '@/components/loader/Loader'
import Spaceship from "@/components/StartingCinematic/ship/Spaceship";

const Scene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = useStore((state) => state.animationDone)

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
          <Effects />
          <Lights />
          <Physics gravity={[0, -9.8, 0]}>
            <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]} />
            <Debug scale={0} color="red">
              <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromCenter + 0.2]} />
              <CockpitCollision />
            </Debug>
          </Physics>
          {animationDone && <PointerLockControls />}
          <Stars radius={1} depth={25} count={2500} factor={0.5} saturation={1} fade />
          <DyingEarth position={[0, 0, -6]} rotation={[0, 0, 0]} scale={9.33} />
          <Spaceship position={[0, -3.75, 27]} rotation={[0, 0, 0]} scale={0.006} />
        </Canvas>
        <StartBtn />
      </Suspense>
    </>
  )
}

export default Scene
