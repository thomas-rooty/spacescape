import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import DyingEarth from '@/components/intro/scene/earth/DyingEarth'
import IntroLights from '@/components/intro/lights/IntroLights'
import Effects from '@/components/fx/Effects'
import ShipFloor from '@/components/objects/ship/ShipFloor'
import BaseCharacter from '@/components/character/BaseCharacter'
import ShipCollision from '@/components/objects/ship/ShipCollision'
import Spaceship from '@/components/objects/ship/Spaceship'

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
        <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]} canMove={false} />
        <ShipFloor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromCenter + 0.2]} />
        <ShipCollision />
      </Physics>
      {animationDone && <PointerLockControls />}
      {!endCryo && <DyingEarth position={[0, -9.8, 8]} rotation={[0, 0, 0]} scale={9.33} />}
      <Stars radius={1} depth={25} count={10000} factor={0.5} saturation={1} fade />
      <Spaceship position={[0, -3.83, 26]} rotation={[0, 0, 0]} scale={0.006} />
    </Canvas>
  )
}

export default IntroScene
