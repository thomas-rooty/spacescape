import { useRef } from 'react'
import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import Effects from '@/components/fx/Effects'
import BaseCharacter from '@/components/character/BaseCharacter'
import FloorMesh from '@/components/scenes/playing/scene/planet/floor/FloorMesh'
import FloorColBox from '@/components/scenes/playing/scene/planet/floor/FloorColBox'
import PlayingLights from '@/components/scenes/playing/lights/PlayingLights'
import SpaceshipOuters from '@/components/models/ship/ShipshipOuters'
import ShipHitbox from '@/components/models/ship/ShipHitbox'
import RenderAstronauts from '@/components/scenes/playing/multiplayer/RenderAstronauts'
import SpaceshipCol from '@/components/scenes/playing/assets/spaceship/SpaceshipCol'

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
          <group name={'SPACESHIP_LANDED'} position={[1, 0, 0]}>
            <SpaceshipOuters position={[3, 0.85, 26]} scale={0.4} rotation={[0, -2, 0]} />
            <ShipHitbox refProp={SHIP_HITBOX} id="SHIP_HITBOX" position={[4, 0, 26.5]} rotation={[0, -2, 0]} geometryArgs={[2, 0.5, 1]} />
            <SpaceshipCol />
          </group>
        </Debug>
      </Physics>
      <FloorMesh />
    </Canvas>
  )
}

export default PlayingScene
