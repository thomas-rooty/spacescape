import { useRef } from 'react'
import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { createCinematicSlice } from '@/stores/intro.store'
import Effects from '@/components/scenes/common/fx/Effects'
import FloorMesh from '@/components/scenes/playing/scene/planet/floor/FloorMesh'
import PlayingLights from '@/components/scenes/playing/lights/PlayingLights'
import SpaceshipOuters from '@/components/scenes/playing/assets/spaceship/ShipshipOuters'
import ShipHitbox from '@/components/scenes/playing/assets/spaceship/ShipHitbox'
import RenderAstronauts from '@/components/scenes/common/multiplayer/RenderAstronauts'
import CharacterController from '@/components/character/CharacterController'
import Floor from '@/components/scenes/common/utils/Floor'

const PlayingScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)

  // Hitbox references
  const SHIP_HITBOX = useRef<any>()

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 60 }}>
      <Stars radius={150} depth={25} count={10000} factor={2} saturation={10} fade />
      <RenderAstronauts />
      <PlayingLights />
      <Effects />
      {animationDone && <PointerLockControls />}
      <Stars radius={1} depth={250} count={10000} factor={0.5} saturation={1} fade />
      <Physics debug gravity={[0, -1.5, 0]}>
        <CharacterController position={[0, 0.3, distanceFromCenter]} canMove={true} />
        <SpaceshipOuters position={[4, 1, 26]} scale={0.4} rotation={[0, -2, 0]} />
        <Floor position={[0, 0, distanceFromCenter]} size={2000} friction={1} />
      </Physics>
      <ShipHitbox refProp={SHIP_HITBOX} id="SHIP_HITBOX" position={[5.5, 0.3, 26.6]} rotation={[0, -2, 0]} geometryArgs={[2, 0.5, 1.2]} />
      <FloorMesh />
    </Canvas>
  )
}

export default PlayingScene
