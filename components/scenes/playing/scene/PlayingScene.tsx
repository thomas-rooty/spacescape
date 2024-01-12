import { Stars, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import Effects from '@/components/fx/Effects'
import FloorMesh from '@/components/scenes/playing/scene/planet/floor/FloorMesh'
import PlayingLights from '@/components/scenes/playing/lights/PlayingLights'
import SpaceshipOuters from '@/components/models/ship/ShipshipOuters'
import ShipHitbox from '@/components/models/ship/ShipHitbox'
import RenderAstronauts from '@/components/scenes/playing/multiplayer/RenderAstronauts'
import CharacterController from '@/components/character/CharacterController'
import ShipFloor from '@/components/models/ship/ShipFloor'

const PlayingScene = () => {
  // Base values
  const distanceFromCenter = 25

  // Store values
  const animationDone = createCinematicSlice((state) => state.animationDone)

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
      <RenderAstronauts />
      <PlayingLights />
      <Effects />
      {animationDone && <PointerLockControls />}
      <Stars radius={1} depth={250} count={10000} factor={0.5} saturation={1} fade />
      <Physics gravity={[0, -1.5, 0]}>
        <CharacterController position={[0, 0.3, distanceFromCenter]} canMove={true} />
        <ShipFloor position={[0, -1, distanceFromCenter]} size={2000} />
      </Physics>
      <SpaceshipOuters position={[4, 0.85, 26]} scale={0.4} rotation={[0, -2, 0]} />
      <FloorMesh />
    </Canvas>
  )
}

export default PlayingScene
