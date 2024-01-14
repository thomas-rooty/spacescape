import { PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Effects from '@/components/scenes/common/fx/Effects'
import CharacterController from '@/components/character/CharacterController'
import PrivateQLights from '@/components/scenes/privatequarters/lights/PrivateQLights'
import PrivateQuarters from '@/components/scenes/privatequarters/assets/spaceship/interiors/PrivateQuarters'
import ExitDoor from '@/components/scenes/privatequarters/interactions/ExitDoor'
import React, { useRef } from 'react'

const PrivateQScene = () => {
  // Base values
  const distanceFromCenter = 25
  const EXIT_HITBOX = useRef<any>()

  return (
    <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 60 }}>
      <PrivateQLights />
      <Effects />
      <PointerLockControls />
      <Physics gravity={[0, -1.5, 0]}>
        <CharacterController position={[0, 0.3, distanceFromCenter]} canMove={true} />
        <PrivateQuarters position={[1.3, 0, distanceFromCenter]} rotation={[0, 0, 0]} scale={0.18}/>
      </Physics>
      <ExitDoor refProp={EXIT_HITBOX} id="EXIT_DOOR" position={[0.7, 0.25, 23.8]} rotation={[0, 0, Math.PI/2]} geometryArgs={[0.6, 0.5, 0.1]} />
    </Canvas>
  )
}

export default PrivateQScene
