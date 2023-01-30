import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Body_ship: THREE.Mesh
    Glasse_ship: THREE.Mesh
  }
  materials: {
    lambert7: THREE.MeshStandardMaterial
  }
}

interface SpaceshipProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const Spaceship = ({ position, rotation, scale }: SpaceshipProps) => {
  const shipRef = useRef<any>()
  const { nodes, materials } = useGLTF('/models/spaceship.gltf') as unknown as GLTFResult

  return (
    <group ref={shipRef} name="shipinteriors" position={position} rotation={rotation} scale={scale}>
      <mesh name="Body_ship" castShadow={true} geometry={nodes.Body_ship.geometry} material={materials.lambert7} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/spaceship.gltf')

export default Spaceship
