import * as THREE from 'three'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph, useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    SpaceSuit_Body016: THREE.SkinnedMesh
    SpaceSuit_Body016_1: THREE.SkinnedMesh
    SpaceSuit_Body016_2: THREE.SkinnedMesh
    SpaceSuit_Body016_3: THREE.SkinnedMesh
    SpaceSuit_Feet016: THREE.SkinnedMesh
    SpaceSuit_Feet016_1: THREE.SkinnedMesh
    SpaceSuit_Head016: THREE.SkinnedMesh
    SpaceSuit_Head016_1: THREE.SkinnedMesh
    SpaceSuit_Head016_2: THREE.SkinnedMesh
    SpaceSuit_Legs016: THREE.SkinnedMesh
    SpaceSuit_Legs016_1: THREE.SkinnedMesh
    SpaceSuit_Legs016_2: THREE.SkinnedMesh
    SpaceSuit_Legs016_3: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    ['SciFi_Light_Accent.016']: THREE.MeshStandardMaterial
    ['SciFi_Light.016']: THREE.MeshStandardMaterial
    ['SciFi_MainDark.016']: THREE.MeshStandardMaterial
    ['SciFi_Main.016']: THREE.MeshStandardMaterial
    ['Grey.016']: THREE.MeshStandardMaterial
  }
}

interface AstronautProps {
  headColor: string
  position: any
  animationName: string
  lookingAt: any
}

type ActionName =
  | 'dance'
  | 'idle02'
  | 'idle'
  | 'jump'
  | 'fall'
  | 'pistol_idle'
  | 'pistol_walk'
  | 'pistol_walk_back'
  | 'pistol_walk_left'
  | 'pistol_walk_right'
  | 'run'
  | 'sitting'
  | 'walk'
  | 'walk_backward'
  | 'walk_left'
  | 'walk_right'
  | 'wave'

export const Astronaut = ({ headColor = '#f5f5f5', animationName, ...props }: AstronautProps) => {
  const position = useMemo(() => props.position, [])
  const group = useRef<THREE.Group>(null)
  const { scene, materials, animations } = useGLTF('/models/astronaut/animated_astronaut.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  // Clone the mesh to avoid mutating the original GLTF nodes
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as GLTFResult

  // Animate the astronaut
  const [animation, setAnimation] = useState('idle')
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.2).play()
    return () => {
      if (actions[animation]) {
        actions[animation]?.fadeOut(0.2)
      }
    }
  }, [actions, animation])

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
      setAnimation(animationName)
    }
  })

  return (
    <group ref={group} {...props} dispose={null} scale={0.11} position={position}>
      <group name="Scene" position={[0, 0.3, 0]}>
        <group name="RootNode1" position={[0, 0.019, 0.005]} rotation={[Math.PI / 2, 0, 0]} scale={-134.044} />
        <group name="Head_end" position={[0, 0.802, 0.005]} scale={-134.044} />
        <group name="Index4L_end" position={[0, 1.107, 0.005]} scale={-134.044} />
        <group name="Middle4L_end" position={[0, 1.106, 0.005]} scale={-134.044} />
        <group name="Ring4L_end" position={[0, 1.101, 0.005]} scale={-134.044} />
        <group name="Pinky4L_end" position={[0, 1.113, 0.005]} scale={-134.044} />
        <group name="Thumb3L_end" position={[0, 1.099, 0.005]} scale={-134.044} />
        <group name="Index4R_end" position={[0, 1.107, 0.005]} scale={-134.044} />
        <group name="Middle4R_end" position={[0, 1.106, 0.005]} scale={-134.044} />
        <group name="Ring4R_end" position={[0, 1.101, 0.005]} scale={-134.044} />
        <group name="Pinky4R_end" position={[0, 1.113, 0.005]} scale={-134.044} />
        <group name="Thumb3R_end" position={[0, 1.099, 0.005]} scale={-134.044} />
        <group name="LowerLegL_end" position={[0, -0.085, 0.005]} scale={-134.044} />
        <group name="LowerLegR_end" position={[0, -0.085, 0.005]} scale={-134.044} />
        <group name="FootL_end" position={[0, 0.905, 0.005]} scale={-134.044} />
        <group name="PTL_end" position={[0, 0.905, 0.005]} scale={-134.044} />
        <group name="FootR_end" position={[0, 0.905, 0.005]} scale={-134.044} />
        <group name="PTR_end" position={[0, 0.905, 0.005]} scale={-134.044} />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="SpaceSuit_Body">
            <skinnedMesh name="SpaceSuit_Body016" geometry={nodes.SpaceSuit_Body016.geometry} material={materials['SciFi_Light_Accent.016']} skeleton={nodes.SpaceSuit_Body016.skeleton} />
            <skinnedMesh name="SpaceSuit_Body016_1" geometry={nodes.SpaceSuit_Body016_1.geometry} material={materials['SciFi_Light.016']} skeleton={nodes.SpaceSuit_Body016_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Body016_2" geometry={nodes.SpaceSuit_Body016_2.geometry} material={materials['SciFi_MainDark.016']} skeleton={nodes.SpaceSuit_Body016_2.skeleton} />
            <skinnedMesh name="SpaceSuit_Body016_3" geometry={nodes.SpaceSuit_Body016_3.geometry} material={materials['SciFi_Main.016']} skeleton={nodes.SpaceSuit_Body016_3.skeleton} />
          </group>
          <group name="SpaceSuit_Feet">
            <skinnedMesh name="SpaceSuit_Feet016" geometry={nodes.SpaceSuit_Feet016.geometry} material={materials['SciFi_Light_Accent.016']} skeleton={nodes.SpaceSuit_Feet016.skeleton} />
            <skinnedMesh name="SpaceSuit_Feet016_1" geometry={nodes.SpaceSuit_Feet016_1.geometry} material={materials['SciFi_Light.016']} skeleton={nodes.SpaceSuit_Feet016_1.skeleton} />
          </group>
          <group name="SpaceSuit_Head">
            <skinnedMesh name="SpaceSuit_Head016" geometry={nodes.SpaceSuit_Head016.geometry} material={materials['SciFi_Light_Accent.016']} skeleton={nodes.SpaceSuit_Head016.skeleton} />
            <skinnedMesh name="SpaceSuit_Head016_1" geometry={nodes.SpaceSuit_Head016_1.geometry} material={materials['SciFi_Light.016']} skeleton={nodes.SpaceSuit_Head016_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Head016_2" geometry={nodes.SpaceSuit_Head016_2.geometry} material={materials['Grey.016']} skeleton={nodes.SpaceSuit_Head016_2.skeleton} />
          </group>
          <group name="SpaceSuit_Legs">
            <skinnedMesh name="SpaceSuit_Legs016" geometry={nodes.SpaceSuit_Legs016.geometry} material={materials['SciFi_Light_Accent.016']} skeleton={nodes.SpaceSuit_Legs016.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs016_1" geometry={nodes.SpaceSuit_Legs016_1.geometry} material={materials['SciFi_Light.016']} skeleton={nodes.SpaceSuit_Legs016_1.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs016_2" geometry={nodes.SpaceSuit_Legs016_2.geometry} material={materials['SciFi_MainDark.016']} skeleton={nodes.SpaceSuit_Legs016_2.skeleton} />
            <skinnedMesh name="SpaceSuit_Legs016_3" geometry={nodes.SpaceSuit_Legs016_3.geometry} material={materials['SciFi_Main.016']} skeleton={nodes.SpaceSuit_Legs016_3.skeleton} />
          </group>
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/astronaut/animated_astronaut.glb')
