import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpotLightProps {
  position: [number, number, number]
  target: [number, number, number]
  angle: number
  intensity: number
  penumbra: number
  distance?: number
}

const SpotLight = ({ position, target, angle, intensity, penumbra, distance = 0 }: SpotLightProps) => {
  const lightRef = useRef<THREE.SpotLight>(null!)
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D())

  useEffect(() => {
    targetRef.current.position.set(...target)
    if (lightRef.current) {
      lightRef.current.target = targetRef.current
    }
  }, [target])

  useFrame(() => {
    lightRef.current.position.set(...position)

    if (lightRef.current) {
      // Adjust shadow map resolution
      lightRef.current.shadow.mapSize.width = 2048
      lightRef.current.shadow.mapSize.height = 2048

      // Adjust bias
      lightRef.current.shadow.bias = -0.1
    }
  })

  return (
    <>
      <primitive object={targetRef.current} />
      <spotLight ref={lightRef} castShadow={true} angle={angle} intensity={intensity} penumbra={penumbra} distance={distance} />
    </>
  )
}

const PrivateQLights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <SpotLight position={[-0.65, 0.8, 25]} target={[-0.65, -1, 25]} angle={Math.PI / 5} intensity={0.5} penumbra={0.2} />
      <SpotLight position={[-0.65, 0.8, 24.2]} target={[-0.65, -1, 24]} angle={Math.PI / 5} intensity={0.5} penumbra={0.2} />
    </>
  )
}

export default PrivateQLights
