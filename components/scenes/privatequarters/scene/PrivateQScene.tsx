import { PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Effects from '@/components/scenes/common/fx/Effects'
import RenderAstronauts from '@/components/scenes/common/multiplayer/RenderAstronauts'
import CharacterController from '@/components/character/CharacterController'
import Floor from '@/components/scenes/common/utils/Floor'
import PrivateQLights from '@/components/scenes/privatequarters/lights/PrivateQLights'
import PrivateQuarters from '@/components/scenes/privatequarters/assets/spaceship/interiors/PrivateQuarters'

const PrivateQScene = () => {
  // Base values
  const distanceFromCenter = 25

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 60 }}>
      <RenderAstronauts />
      <PrivateQLights />
      <Effects />
      <PointerLockControls />
      <Physics gravity={[0, -1.5, 0]}>
        <CharacterController position={[0, 0.3, distanceFromCenter]} canMove={true} />
        <Floor position={[0, -0.2, distanceFromCenter]} size={2000} />
        <PrivateQuarters position={[1.3, 0, distanceFromCenter]} rotation={[0, 0, 0]} scale={0.18}/>
      </Physics>
    </Canvas>
  )
}

export default PrivateQScene
