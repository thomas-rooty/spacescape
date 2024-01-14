import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import ExitDoor from '@/components/scenes/privatequarters/interactions/ExitDoor'

type GLTFResult = GLTF & {
  nodes: {
    l_low: THREE.Mesh
    e_low: THREE.Mesh
    f_low: THREE.Mesh
    g_low: THREE.Mesh
    d_low: THREE.Mesh
    h_low: THREE.Mesh
    i_low: THREE.Mesh
    j_low: THREE.Mesh
    b_low: THREE.Mesh
    a_low: THREE.Mesh
    c_low: THREE.Mesh
    k_low: THREE.Mesh
  }
  materials: {
    turbine: THREE.MeshPhysicalMaterial
    base: THREE.MeshPhysicalMaterial
    gun: THREE.MeshPhysicalMaterial
  }
}

interface SpaceshipOutersProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const SpaceshipOuters = ({ position, rotation, scale }: SpaceshipOutersProps) => {
  const { nodes, materials } = useGLTF('/models/spaceship/spaceship.gltf') as unknown as GLTFResult
  const ship = useRef<any>(null)

  useEffect(() => {
    if (ship.current) {
      ship.current.isWalkable = true
    }
  }, [])
  return (
    <>
      <RigidBody ref={ship} type="fixed" colliders={'trimesh'} name="ship" position={position} rotation={rotation} scale={scale}>
        <mesh castShadow receiveShadow geometry={nodes.l_low.geometry} material={materials.turbine} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.e_low.geometry} material={materials.base} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.f_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.g_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.d_low.geometry} material={materials.base} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.h_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.i_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.j_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.b_low.geometry} material={materials.turbine} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.a_low.geometry} material={materials.turbine} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.c_low.geometry} material={materials.turbine} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
        <mesh castShadow receiveShadow geometry={nodes.k_low.geometry} material={materials.gun} rotation={[Math.PI / 2, 0, 0]} scale={8.766} />
      </RigidBody>
    </>
  )
}

useGLTF.preload('/models/spaceship/spaceship.gltf')

export default SpaceshipOuters
