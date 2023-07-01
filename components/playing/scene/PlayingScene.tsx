import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import Lights from '@/components/intro/lights/Lights'
import Effects from '@/components/fx/Effects'
import Floor from '@/components/intro/floor/Floor'
import BaseCharacter from '@/components/character/BaseCharacter'
import CockpitCollision from '@/components/intro/ship/CockpitCollision'
import Spaceship from '@/components/intro/ship/Spaceship'

const PlayingScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
      <Lights />
      <Effects />
      <Physics gravity={[0, -9.8, 0]}>
        <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]} />
        <Floor rotation={[Math.PI / -2, 0, 0]} color={'black'} position={[-0.33, -0.17, distanceFromCenter + 0.2]} />
        <CockpitCollision />
      </Physics>
      {animationDone && <PointerLockControls />}
      <Stars radius={1} depth={25} count={2500} factor={0.5} saturation={1} fade />
      <Spaceship position={[0, -3.83, 26]} rotation={[0, 0, 0]} scale={0.006} />
    </Canvas>
  )
}

export default PlayingScene
