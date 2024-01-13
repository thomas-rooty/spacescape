import { useRef } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

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
  return <SpotLight debug={true} volumetric={false} ref={light} {...props} />
}

const PrivateQLights = () => {
  return (
    <>
      {/* Ambient light and fog */}
      <ambientLight intensity={0.8} />
      {/* Sun */}
    </>
  )
}

export default PrivateQLights
