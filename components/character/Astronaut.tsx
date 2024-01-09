import * as THREE from 'three'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph, useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    SpaceSuit_Feet_1: THREE.SkinnedMesh
    SpaceSuit_Feet_2: THREE.SkinnedMesh
    SpaceSuit_Legs_1: THREE.SkinnedMesh
    SpaceSuit_Legs_2: THREE.SkinnedMesh
    SpaceSuit_Legs_3: THREE.SkinnedMesh
    SpaceSuit_Legs_4: THREE.SkinnedMesh
    SpaceSuit_Body_1: THREE.SkinnedMesh
    SpaceSuit_Body_2: THREE.SkinnedMesh
    SpaceSuit_Body_3: THREE.SkinnedMesh
    SpaceSuit_Body_4: THREE.SkinnedMesh
    SpaceSuit_Head_1: THREE.SkinnedMesh
    SpaceSuit_Head_2: THREE.SkinnedMesh
    SpaceSuit_Head_3: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    SciFi_Light_Accent: THREE.MeshStandardMaterial
    SciFi_Light: THREE.MeshStandardMaterial
    SciFi_MainDark: THREE.MeshStandardMaterial
    SciFi_Main: THREE.MeshStandardMaterial
    Grey: THREE.MeshStandardMaterial
  }
}

interface AstronautProps {
  headColor: string
  position: any
  isMoving: boolean
  lookingAt: any
}

export function Astronaut({ headColor = '#f5f5f5', isMoving, ...props }: AstronautProps) {
  const position = useMemo(() => props.position, [])
  const group = useRef<THREE.Group>(null)
  const { scene, materials, animations } = useGLTF('/models/astronaut/Astronaut.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  // Clone the mesh to avoid mutating the original GLTF nodes
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as GLTFResult

  // Animate the astronaut
  const [animation, setAnimation] = useState('CharacterArmature|Idle')
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play()
    return () => {
      if (actions[animation]) {
        actions[animation]?.fadeOut(0.1)
      }
    }
  }, [animation])

  // Movements
  useFrame(() => {
    if (group.current) {
      group.current.position.set(props.position.x, props.position.y, props.position.z) // Position
      const target = new THREE.Vector3(0, 0, 0) // Direction
      target.x = props.lookingAt.x
      target.y = props.lookingAt.y
      target.z = props.lookingAt.z
      group.current.lookAt(target)

      // Animate the astronaut
      setAnimation(isMoving ? 'CharacterArmature|Run' : 'CharacterArmature|Idle')
    }
  })

  return (
    <group ref={group} {...props} dispose={null} scale={0.1} position={position}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <group name="SpaceSuit_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Feet_1" geometry={nodes.SpaceSuit_Feet_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Feet_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Feet_2" geometry={nodes.SpaceSuit_Feet_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Feet_2.skeleton} />
          </group>
          <group name="SpaceSuit_Legs" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Legs_1" geometry={nodes.SpaceSuit_Legs_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Legs_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs_2" geometry={nodes.SpaceSuit_Legs_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Legs_2.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs_3" geometry={nodes.SpaceSuit_Legs_3.geometry} material={materials.SciFi_MainDark} skeleton={nodes.SpaceSuit_Legs_3.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs_4" geometry={nodes.SpaceSuit_Legs_4.geometry} material={materials.SciFi_Main} skeleton={nodes.SpaceSuit_Legs_4.skeleton} />
          </group>
          <group name="SpaceSuit_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Body_1" geometry={nodes.SpaceSuit_Body_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Body_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Body_2" geometry={nodes.SpaceSuit_Body_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Body_2.skeleton} />
            <skinnedMesh name="SpaceSuit_Body_3" geometry={nodes.SpaceSuit_Body_3.geometry} material={materials.SciFi_MainDark} skeleton={nodes.SpaceSuit_Body_3.skeleton} />
            <skinnedMesh name="SpaceSuit_Body_4" geometry={nodes.SpaceSuit_Body_4.geometry} material={materials.SciFi_Main} skeleton={nodes.SpaceSuit_Body_4.skeleton} />
          </group>
          <group name="SpaceSuit_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="SpaceSuit_Head_1" geometry={nodes.SpaceSuit_Head_1.geometry} material={materials.SciFi_Light_Accent} skeleton={nodes.SpaceSuit_Head_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Head_2" geometry={nodes.SpaceSuit_Head_2.geometry} material={materials.SciFi_Light} skeleton={nodes.SpaceSuit_Head_2.skeleton} />
            <skinnedMesh name="SpaceSuit_Head_3" geometry={nodes.SpaceSuit_Head_3.geometry} material={materials.Grey} skeleton={nodes.SpaceSuit_Head_3.skeleton}>
              <meshStandardMaterial color={headColor} />
            </skinnedMesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/astronaut/Astronaut.glb')
