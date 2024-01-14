import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpotLightProps {
  position: [number, number, number]
  target: [number, number, number]
  angle: number
  intensity: number
  penumbra: number
  distance?: number
  bias?: number
}


export const SpotLight = ({ position, target, angle, intensity, penumbra, distance = 0, bias = -0.1 }: SpotLightProps) => {
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
      lightRef.current.shadow.bias = bias
    }
  })

  return (
    <>
      <primitive object={targetRef.current} />
      <spotLight ref={lightRef} castShadow={true} angle={angle} intensity={intensity} penumbra={penumbra} distance={distance} />
    </>
  )
}
