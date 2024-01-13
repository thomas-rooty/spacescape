import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { createCinematicSlice } from '@/stores/intro.store'
import DyingEarth from '@/components/scenes/intro/scene/earth/DyingEarth'
import IntroLights from '@/components/scenes/intro/lights/IntroLights'
import Effects from '@/components/scenes/common/fx/Effects'
import Floor from '@/components/scenes/common/utils/Floor'
import CharacterController from '@/components/character/CharacterController'
import SpaceshipIntro from '@/components/scenes/intro/assets/spaceship/SpaceshipIntro'

const IntroScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)
  const endCryo = createCinematicSlice((state) => state.endCryo)

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 25 }}>
      <IntroLights />
      <Effects />
      <Physics gravity={[0, -9.8, 0]}>
        <CharacterController position={[0, 1.5, distanceFromCenter]} canMove={false} />
        <Floor position={[0, 0, distanceFromCenter]} size={15} />
      </Physics>
      {animationDone && <PointerLockControls />}
      {!endCryo && <DyingEarth position={[0, -9.8, 8]} rotation={[0, 0, 0]} scale={9.33} />}
      <Stars radius={1} depth={25} count={10000} factor={0.5} saturation={1} fade />
      <SpaceshipIntro position={[0, -3.74, 26]} rotation={[0, 0, 0]} scale={0.006} />
    </Canvas>
  )
}

export default IntroScene
