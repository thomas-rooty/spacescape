import * as THREE from 'three'
import React, { useRef } from 'react'
import ShipButtons from '@/components/objects/ship/buttons/ShipButtons'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { a, useSpring } from '@react-spring/three'

type GLTFResult = GLTF & {
  nodes: {
    Space_ship_interior_lp_1: THREE.Mesh
    Space_ship_interior_lp_2: THREE.Mesh
    Space_ship_interior_lp_3: THREE.Mesh
    Space_ship_interior_lp_4: THREE.Mesh
  }
  materials: {
    Space_ship_phone_and_speed_control: THREE.MeshStandardMaterial
    Space_ship_chair_screens_lamps: THREE.MeshStandardMaterial
    Space_ship_interior_base: THREE.MeshStandardMaterial
    Space_ship: THREE.MeshStandardMaterial
  }
}

interface SpaceshipProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const Spaceship = ({ position, rotation, scale }: SpaceshipProps) => {
  const shipRef = useRef<any>()
  const { nodes, materials } = useGLTF('/models/spaceship/spaceship_compressed.gltf') as unknown as GLTFResult

  // Get required values from store
  const animationDone = createCinematicSlice((state) => state.animationDone)

  const { z } = useSpring({
    z: animationDone ? 24.8 : 26,
    config: { mass: 1, tension: 10, friction: 10, precision: 0.003 },
  })

  return (
    <>
      <a.group ref={shipRef} name="shipinteriors" position-z={z} position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <group name="Space_ship_interior_lp" rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow={true} receiveShadow={true} geometry={nodes.Space_ship_interior_lp_1.geometry} material={materials.Space_ship_phone_and_speed_control} />
          <mesh castShadow={true} receiveShadow={true} geometry={nodes.Space_ship_interior_lp_2.geometry} material={materials.Space_ship_chair_screens_lamps} />
          <mesh castShadow={true} receiveShadow={true} geometry={nodes.Space_ship_interior_lp_3.geometry} material={materials.Space_ship_interior_base} />
          <mesh castShadow={true} receiveShadow={true} geometry={nodes.Space_ship_interior_lp_4.geometry} material={materials.Space_ship} />
        </group>
      </a.group>
      <ShipButtons />
    </>
  )
}

useGLTF.preload('/models/spaceship/spaceship_compressed.gltf')

export default Spaceship
