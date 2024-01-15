import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { RigidBody } from '@react-three/rapier'

type GLTFResult = GLTF & {
  nodes: {
    Rover_Body_Rover_2ver_0: THREE.Mesh
    Rover_wheel_1_Rover_2ver_0: THREE.Mesh
    Rover_wheel_2_Rover_2ver_0: THREE.Mesh
    Rover_wheel_3_Rover_2ver_0: THREE.Mesh
  }
  materials: {
    Rover_2ver: THREE.MeshStandardMaterial
  }
}

interface RoverModelProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const Rover = ({ position, rotation, scale }: RoverModelProps) => {
  const { nodes, materials } = useGLTF('/models/rover/rover.glb') as unknown as GLTFResult
  const rover = useRef<any>()

  useEffect(() => {
    if (rover.current) {
      console.log(rover.current)
    }
  }, [])

  return (
    <RigidBody ref={rover} type="dynamic" colliders={'cuboid'} name="rover" position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow geometry={nodes.Rover_Body_Rover_2ver_0.geometry} material={materials.Rover_2ver} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Rover_wheel_1_Rover_2ver_0.geometry} material={materials.Rover_2ver} position={[0, -105.973, 219.023]} rotation={[0.636, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Rover_wheel_2_Rover_2ver_0.geometry} material={materials.Rover_2ver} position={[0, -105.973, -59.234]} rotation={[-0.848, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Rover_wheel_3_Rover_2ver_0.geometry} material={materials.Rover_2ver} position={[0, -105.973, -208.386]} rotation={[-2.566, 0, 0]} />
    </RigidBody>
  )
}

useGLTF.preload('/models/rover/rover.glb')

export default Rover
