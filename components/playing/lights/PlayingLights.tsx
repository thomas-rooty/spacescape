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
  color: string | number
}

function Spot({ target, position, ...props }: SpotProps) {
  const light = useRef<any>()
  // Make the light point the target and update its position
  useFrame(() => {
    light.current.target.position.set(...target)
    light.current.position.set(...position)
  })
  return <SpotLight debug={false} volumetric={false} castShadow ref={light} {...props} />
}

const PlayingLights = () => {
  // Store values
  const lightColor = useState('#e8e8e8')
  const lightShip = useState('#f0f2ff')
  const position = createCharacterSlice((state) => state.position)

  const lightsPosition: LightsPosition = {
    position: [position['x'], position['y'] + 2, position['z']],
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
      <ambientLight intensity={0.025} />
      <fog attach="fog" args={['black', 0, 10]} />
      {/* Character light */}
      <Spot
        penumbra={1}
        distance={10}
        angle={Math.PI / 4}
        attenuation={0.5}
        anglePower={2}
        intensity={0.5}
        target={[position['x'], position['y'] - 2, position['z']]}
        position={lightsPosition.position}
        color={lightColor[0]}
      />
      {/* Ship alert light */}
      <Spot position={lightsPosition.lightShip} target={[0.5, 0, 24.6]} color={lightShip[0]} penumbra={1} distance={1} angle={1} attenuation={1} anglePower={0.5} intensity={2} />
    </>
  )
}

export default PlayingLights
