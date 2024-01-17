import { useRef } from 'react'
import { Stars, PointerLockControls, AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { createCinematicSlice } from '@/stores/intro.store'
import { createDebugStore } from '@/stores/debug.store'
import Effects from '@/components/scenes/common/fx/Effects'
import PlayingLights from '@/components/scenes/playing/lights/PlayingLights'
import CharacterController from '@/components/character/CharacterController'
import RenderAstronauts from '@/components/multiplayer/RenderAstronauts'
import Floor from '@/components/scenes/common/physics/Floor'
import FloorMesh from '@/components/scenes/playing/assets/floor/FloorMesh'
import Stones from '@/components/scenes/playing/assets/rocks/Rocks'
import Ship from '@/components/scenes/playing/assets/ship/Ship'
import ShipHitbox from '@/components/scenes/playing/assets/ship/ShipHitbox'

const PlayingScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)
  const debug = createDebugStore((state) => state.debug)

  // Hitbox references
  const SHIP_HITBOX = useRef<any>()

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 60 }} performance={{ min: 0.5, max: 1 }}>
      <AdaptiveDpr pixelated />
      <Stars radius={150} depth={25} count={10000} factor={2} saturation={10} fade />
      <RenderAstronauts />
      <PlayingLights />
      <Effects />
      {animationDone && <PointerLockControls />}
      <Physics debug={debug} gravity={[0, -1, 0]}>
        <CharacterController position={[0, 0.3, distanceFromCenter]} canMove={true} />
        <Floor position={[0, -0.03, distanceFromCenter]} size={2000} friction={1} />
        <Ship position={[4, 1.07, 26]} scale={0.4} rotation={[0, -2, 0]} />
      </Physics>
      <ShipHitbox refProp={SHIP_HITBOX} id="SHIP_HITBOX" position={[5.5, 0.3, 26.6]} rotation={[0, -2, 0]} geometryArgs={[2, 0.5, 1.2]} />
      <FloorMesh />
      <Stones />
    </Canvas>
  )
}

export default PlayingScene
