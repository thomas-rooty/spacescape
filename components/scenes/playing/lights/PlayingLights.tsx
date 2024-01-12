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

const PlayingLights = () => {
  return (
    <>
      {/* Ambient light and fog */}
      <ambientLight intensity={0.1} />
      <fog attach="fog" args={['black', 0, 5]} />
      {/* Sun */}
      <Spot position={[0, 10, 25]} castShadow={true} target={[0, 0, 25]} color={'#cceaff'} penumbra={1} distance={100} angle={360} attenuation={0} anglePower={0} intensity={2} />
    </>
  )
}

export default PlayingLights
