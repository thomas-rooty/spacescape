import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { Instances, Instance, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { rocksRandomizer, goldRandomizer, crystalsRandomizer } from '@/components/scenes/common/physics/randomizer'
import { InstancedRigidBodies, InstancedRigidBodyProps, RapierRigidBody } from '@react-three/rapier'

interface StoneCountProps {
  count?: number
}

type StonesData = GLTF & {
  nodes: {
    Rock_3: THREE.Mesh
    Resource_Gold_1_1: THREE.Mesh
    Resource_Gold_1_2: THREE.Mesh
    crystal_2: THREE.Mesh
  }
  materials: {
    Stone_Dark: THREE.MeshStandardMaterial
    Stone: THREE.MeshStandardMaterial
    Gold: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

const Rocks = ({ count = 1000 }: StoneCountProps) => {
  const rigidBodies = useRef<RapierRigidBody[]>(null)
  const { nodes, materials } = useGLTF('/models/rocks/rocks1.glb') as unknown as StonesData

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    rocksRandomizer.forEach((props, i) => {
      instances.push({
        key: i,
        position: [props.position[0], props.position[1], props.position[2]],
        rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
        scale: [props.scale[0], props.scale[1], props.scale[2]],
      })
    })

    return instances
  }, [])

  return (
    <InstancedRigidBodies ref={rigidBodies} instances={instances} colliders="cuboid" type="fixed" onIntersectionEnter={(e) => console.log(e)}>
      <instancedMesh castShadow args={[nodes.Rock_3.geometry, undefined, count]} count={count} >
        <meshStandardMaterial attach="material" {...materials.Stone_Dark} />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}

const Gold = ({ count = 1000 }: StoneCountProps) => {
  const { nodes, materials } = useGLTF('/models/rocks/gold1.glb') as unknown as StonesData
  return (
    <>
      <Instances range={count} material={materials.Gold} geometry={nodes.Resource_Gold_1_1.geometry}>
        {goldRandomizer.map((props, i) => (
          <Gold1 key={i} {...props} scale={[10, 10, 10]} meshRef={nodes.Resource_Gold_1_1} />
        ))}
      </Instances>
      <Instances range={count} material={materials.Stone} geometry={nodes.Resource_Gold_1_2.geometry}>
        {goldRandomizer.map((props, i) => (
          <Gold1 key={i} {...props} scale={[10, 10, 10]} meshRef={nodes.Resource_Gold_1_2} />
        ))}
      </Instances>
    </>
  )
}

const Crystals = ({ count = 1000 }: StoneCountProps) => {
  const { nodes, materials } = useGLTF('/models/rocks/crystal1.glb') as unknown as StonesData
  return (
    <Instances range={count} material={materials['Material.004']} geometry={nodes.crystal_2.geometry}>
      {crystalsRandomizer.map((props, i) => (
        <Crystal1 key={i} {...props} scale={[1, 1, 1]} />
      ))}
    </Instances>
  )
}

const Gold1 = ({ ...props }) => {
  const gold1 = useRef()
  return <Instance ref={gold1} {...props} />
}

const Crystal1 = ({ ...props }) => {
  const crystal1 = useRef()
  return <Instance ref={crystal1} {...props} />
}

const Stones = () => {
  return (
    <>
      <Rocks count={1000} />
      <Gold count={100} />
      <Crystals count={100} />
    </>
  )
}

export default Stones
