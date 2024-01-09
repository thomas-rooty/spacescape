import { useRef, useState } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { createCinematicSlice } from '@/utils/stores/intro.store'

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

const IntroLights = () => {
  const LightsPosition: LightsPosition = {
    light1: [-15, 10, 30],
    light2: [0, 0.7, 24.8],
  }

  // Store values
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)
  const light2Color = useState('#f0f2ff')

  // Alert light blinking
  useFrame(({ clock }) => {
    if (endCryo && !checkInitiated) {
      if (clock.getElapsedTime() % 1 < 0.3) {
        light2Color[1]('#ff0000')
      } else {
        light2Color[1]('#f0f2ff')
      }
    }
  })

  return (
    <>
      {/* These are the lights that are used to light up the scene */}
      <Spot position={LightsPosition.light1} target={[0, 0, -6]} color='#def3ff' penumbra={0} distance={60} angle={90} attenuation={1} anglePower={5} intensity={5} />
      <Spot position={LightsPosition.light2} target={[0, 0, 25 + 0.09]} color={light2Color[0]} penumbra={1} distance={5} angle={3} attenuation={1} anglePower={0} intensity={2} />
      <ambientLight intensity={0.05} />
      {/* These are the boxes that are used to visualize the light sources */}
    </>
  )
}

export default IntroLights
