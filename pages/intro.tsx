import { Canvas } from '@react-three/fiber'
import { Stars, PointerLockControls } from '@react-three/drei'
import { Physics, Debug } from '@react-three/cannon'
import { createCinematicSlice } from '@/utils/zustore'
import DyingEarth from '@/components/intro/earth/DyingEarth'
import Lights from '@/components/intro/lights/Lights'
import Effects from '@/components/effects/Effects'
import Floor from '@/components/intro/floor/Floor'
import BaseCharacter from '@/components/character/BaseCharacter'
import CockpitCollision from '@/components/intro/ship/CockpitCollision'
import Spaceship from '@/components/intro/ship/Spaceship'

const Intro = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)

  return (
    <>
      <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
        <Effects />
        <Lights />
        <Physics gravity={[0, -9.8, 0]}>
          <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]} />
          <Debug scale={0} color="red">
            <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromCenter + 0.2]}/>
            <CockpitCollision/>
          </Debug>
        </Physics>
        {animationDone && <PointerLockControls/>}
        <Stars radius={1} depth={25} count={2500} factor={0.5} saturation={1} fade/>
        <DyingEarth position={[0, 0, -6]} rotation={[0, 0, 0]} scale={9.33}/>
        <Spaceship position={[0, -3.83, 26]} rotation={[0, 0, 0]} scale={0.006}/>
      </Canvas>
      <audio id="intro-music" autoPlay={true} loop={true}>
        <source src="/musics/StartingCinematic/Interstellar_Main_Theme.mp3" type="audio/mpeg"/>
      </audio>
    </>
  )
}

export default Intro
