import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Knife_1: THREE.Mesh
    Knife_2: THREE.Mesh
    Knife_3: THREE.Mesh
    Knife_4: THREE.Mesh
  }
  materials: {
    DarkWood: THREE.MeshStandardMaterial
    Grey: THREE.MeshStandardMaterial
    LightGrey: THREE.MeshStandardMaterial
    Yellow: THREE.MeshStandardMaterial
  }
}

const Knife = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/items/Knife.glb') as unknown as GLTFResult
  // Disable depth to prevent clipping
  materials.Grey.depthTest = false
  materials.LightGrey.depthTest = false
  materials.Yellow.depthTest = false
  materials.DarkWood.depthTest = false
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={198.9}>
        <mesh geometry={nodes.Knife_1.geometry} receiveShadow={true} castShadow={true} material={materials.DarkWood} />
        <mesh geometry={nodes.Knife_2.geometry} receiveShadow={true} castShadow={true} material={materials.Grey} />
        <mesh geometry={nodes.Knife_3.geometry} receiveShadow={true} castShadow={true} material={materials.LightGrey} />
        <mesh geometry={nodes.Knife_4.geometry} receiveShadow={true} castShadow={true} material={materials.Yellow} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/items/Knife.glb')

export default Knife
