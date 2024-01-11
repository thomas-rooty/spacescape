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
import SpaceshipOuters from '@/components/assets/ship/ShipshipOuters'
import ShipHitbox from '@/components/assets/ship/ShipHitbox'
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
      <SpaceshipOuters position={[2, 0.41, 25]} scale={0.2} rotation={[0, -1, 0]} />
      <ShipHitbox refProp={SHIP_HITBOX} id="SHIP_HITBOX" position={[1.75, 0.2, 25.25]} rotation={[0, -1, 0]} geometryArgs={[1, 0.5, 2]} />
    </Canvas>
  )
}

export default PlayingScene
