import { useRef, useState } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Summary:
// 1. The first light is a spotlight that is used to light up the planet
// 2. The second light is a spotlight that is used to light up the spaceship
// 3. The ambient light is used to light up the scene

type LightsPosition = {
  light1: [number, number, number]
  light2: [number, number, number]
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

function Spot({ target, ...props }: SpotProps) {
  const light = useRef<any>()
  // Make the light point the target
  useFrame(() => {
    light.current.target.position.set(...target)
  })
  return <SpotLight castShadow ref={light} {...props} />
}

const PlayingLights = () => {
  const LightsPosition: LightsPosition = {
    light1: [-20, -20, 25],
    light2: [0, 0.7, 24.8],
  }

  // Store values
  const light2Color = useState('#e8e8e8')

  return (
    <>
      <Spot position={LightsPosition.light2} target={[0, 0, 25 + 0.09]} color={light2Color[0]} penumbra={1} distance={4} angle={Math.PI/2} attenuation={1} anglePower={0} intensity={1.5} />
      <ambientLight intensity={0.025} />
      <fog attach='fog' args={['black', 0, 10]} />
    </>
  )
}

export default PlayingLights
