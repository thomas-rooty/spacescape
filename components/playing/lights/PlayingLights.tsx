import { useRef, useState } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { createCharacterSlice } from '@/utils/stores/character.store'

// Summary:
// 1. The spotlight shall target the ground of the playing area
// 2. The position of the spotlight shall move along with the base character.

type LightsPosition = {
  position: [number, number, number]
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
  return <SpotLight castShadow ref={light} {...props} />
}

const PlayingLights = () => {
  // Store values
  const lightColor = useState('#e8e8e8')
  const position = createCharacterSlice((state) => state.position)

  const lightsPosition: LightsPosition = {
    position: [position['x'], position['y'] + 2, position['z']]
  }

  return (
    <>
      {/* Main light */}
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
      <ambientLight intensity={0.025} />
      <fog attach="fog" args={['black', 0, 10]} />
    </>
  )
}

export default PlayingLights
