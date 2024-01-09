import { useRef } from 'react'
import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import Effects from '@/components/fx/Effects'
import BaseCharacter from '@/components/character/BaseCharacter'
import FloorMesh from '@/components/playing/scene/planet/floor/FloorMesh'
import FloorColBox from '@/components/playing/scene/planet/floor/FloorColBox'
import PlayingLights from '@/components/playing/lights/PlayingLights'
import Spaceship from '@/components/objects/ship/Spaceship'
import ShipHitbox from '@/components/objects/ship/ShipHitbox'
import RenderAstronauts from '@/components/playing/multiplayer/RenderAstronauts'

const PlayingScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)

  // Hitbox references
  const SHIP_HITBOX = useRef()

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
      <PlayingLights />
      <Effects />
      {animationDone && <PointerLockControls />}
      <Stars radius={1} depth={250} count={10000} factor={0.5} saturation={1} fade />
      <Physics gravity={[0, -1.5, 0]}>
        <RenderAstronauts />
        <BaseCharacter position={[0, 0, distanceFromCenter + 0.09]} args={[0.14]} canMove={true} />
        <Debug scale={1} color="red">
          <FloorColBox rotation={[Math.PI / -2, 0, 0]} color={'pink'} position={[-0.33, -0.17, distanceFromCenter + 0.2]} />
        </Debug>
      </Physics>
      <FloorMesh rotation={[Math.PI / -2, 0, 0]} position={[-0.33, -0.17, distanceFromCenter]} size={100} />
      <Spaceship position={[1, 0.2, 26]} rotation={[1.8, 1.8, 0]} scale={0.0008} />
      <ShipHitbox refProp={SHIP_HITBOX} id="SHIP_HITBOX" position={[0.98, 0.15, 25.2]} rotation={[1.8, 1.8, 0]} geometryArgs={[0.33, 0.66, 0.33]} />
    </Canvas>
  )
}

export default PlayingScene
