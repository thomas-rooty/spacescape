import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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

type ActionName =
  | 'CharacterArmature|Death'
  | 'CharacterArmature|Gun_Shoot'
  | 'CharacterArmature|HitRecieve'
  | 'CharacterArmature|HitRecieve_2'
  | 'CharacterArmature|Idle'
  | 'CharacterArmature|Idle_Gun'
  | 'CharacterArmature|Idle_Gun_Pointing'
  | 'CharacterArmature|Idle_Gun_Shoot'
  | 'CharacterArmature|Idle_Neutral'
  | 'CharacterArmature|Idle_Sword'
  | 'CharacterArmature|Interact'
  | 'CharacterArmature|Kick_Left'
  | 'CharacterArmature|Kick_Right'
  | 'CharacterArmature|Punch_Left'
  | 'CharacterArmature|Punch_Right'
  | 'CharacterArmature|Roll'
  | 'CharacterArmature|Run'
  | 'CharacterArmature|Run_Back'
  | 'CharacterArmature|Run_Left'
  | 'CharacterArmature|Run_Right'
  | 'CharacterArmature|Run_Shoot'
  | 'CharacterArmature|Sword_Slash'
  | 'CharacterArmature|Walk'
  | 'CharacterArmature|Wave'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<any>()
  const { nodes, materials, animations } = useGLTF('/Astronaut.glb') as any
  const { actions } = useAnimations<any>(animations, group)

  return (
    <group ref={group} {...props} dispose={null}>
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
            <skinnedMesh name="SpaceSuit_Head_3" geometry={nodes.SpaceSuit_Head_3.geometry} material={materials.Grey} skeleton={nodes.SpaceSuit_Head_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Astronaut.glb')
