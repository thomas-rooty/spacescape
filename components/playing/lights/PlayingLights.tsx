import { useRef, useState } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { createCharacterSlice } from '@/utils/stores/character.store'

// Summary:
// 1. The spotlight shall target the ground of the playing area
// 2. The position of the spotlight shall move along with the base character.

type LightsPosition = {
  position: [number, number, number]
  lightShip: [number, number, number]
}

type SpotProps = {
  penumbra: number
  distance: number
  angle: number
  attenuation: number
  anglePower: number
  intensity: number
  target: [number, number, number]
  position: [number, number, number]
  castShadow: boolean
  color: string | number
}

function Spot({ target, position, ...props }: SpotProps) {
  const light = useRef<any>()
  // Make the light point the target and update its position
  useFrame(() => {
    light.current.target.position.set(...target)
    light.current.position.set(...position)
  })
  return <SpotLight debug={false} volumetric={false} ref={light} {...props} />
}

const PlayingLights = () => {
  // Store values
  const lightColor = useState('#fff')
  const lightShip = useState('#f0f2ff')
  const position = createCharacterSlice((state) => state.position)

  const lightsPosition: LightsPosition = {
    position: [position['x'] - 0.33, position['y'] + 0.66, position['z'] + 0.5],
    lightShip: [1, 0.1, 25.6], // Updated position of the alert light
  }

  // Alert light blinking
  useFrame(({ clock }) => {
    if (clock.getElapsedTime() % 1 < 0.5) {
      lightShip[1]('#ff0000')
    } else {
      lightShip[1]('#f0f2ff')
    }
  })

  return (
    <>
      {/* Ambient light and fog */}
      <ambientLight intensity={0.033} />
      <fog attach="fog" args={['black', 0, 7]} />
      {/* Main light following character */}
      <Spot position={lightsPosition.position} castShadow={false} target={[position['x'], 0, position['z']]} color={lightColor[0]} penumbra={1} distance={2} angle={2} attenuation={1} anglePower={0.5} intensity={1} />
      {/* Ship alert light */}
      <Spot position={lightsPosition.lightShip} castShadow={true} target={[0.5, 0, 24.6]} color={lightShip[0]} penumbra={1} distance={1} angle={1} attenuation={1} anglePower={0.5} intensity={2} />
    </>
  )
}

export default PlayingLights
