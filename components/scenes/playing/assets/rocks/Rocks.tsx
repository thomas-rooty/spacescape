import * as THREE from 'three'
import { useRef, useCallback, useMemo } from 'react'
import { Instances, Instance, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { rocksRandomizer, goldRandomizer, crystalsRandomizer } from '@/components/scenes/common/physics/randomizer'
import { InstancedRigidBodies, InstancedRigidBodyProps, RapierRigidBody } from '@react-three/rapier'
import { createCinematicSlice } from '@/stores/intro.store'

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
  const rocks = useRef<any>(null)
  const { nodes, materials } = useGLTF('/models/rocks/rocks1.glb') as unknown as StonesData

  // Interactions
  const onPointerMove = useCallback((e: any) => {
    e.stopPropagation()
    // Intersected object
    const intersected = e.instanceId
    console.log('hovering rock id : ' + intersected)
  }, [])

  const onPointerOut = useCallback((e: any) => {
    e.stopPropagation()
    // Intersected object
    const intersected = e.instanceId
    console.log('hovering out rock id : ' + intersected)
  }, [])

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

    console.log(instances)
    return instances
  }, [])

  return (
    <InstancedRigidBodies ref={rigidBodies} instances={instances} colliders="cuboid" type="fixed">
      <instancedMesh ref={rocks} castShadow args={[nodes.Rock_3.geometry, undefined, count]} count={count} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
        <meshStandardMaterial attach="material" {...materials.Stone_Dark} />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}

const Gold = ({ count = 1000 }: StoneCountProps) => {
  const rigidBodiesGold = useRef<RapierRigidBody[]>(null)
  const { nodes, materials } = useGLTF('/models/rocks/gold1.glb') as unknown as StonesData

  const instancesGold = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    goldRandomizer.forEach((props, i) => {
      instances.push({
        key: i,
        position: [props.position[0], props.position[1], props.position[2]],
        rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
        scale: [10, 10, 10],
      })
    })

    return instances
  }, [])

  return (
    <InstancedRigidBodies ref={rigidBodiesGold} instances={instancesGold} colliders="cuboid" type="fixed" onIntersectionEnter={(e) => console.log(e)}>
      <instancedMesh castShadow args={[nodes.Resource_Gold_1_1.geometry, undefined, count]} count={count}>
        <meshStandardMaterial attach="material" {...materials.Gold} />
      </instancedMesh>
      <instancedMesh castShadow args={[nodes.Resource_Gold_1_2.geometry, undefined, count]} count={count}>
        <meshStandardMaterial attach="material" {...materials.Stone} />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}

const Crystals = ({ count = 1000 }: StoneCountProps) => {
  const rigidBodiesCrystals = useRef<RapierRigidBody[]>(null)
  const { nodes, materials } = useGLTF('/models/rocks/crystal1.glb') as unknown as StonesData

  const instancesCrystals = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    crystalsRandomizer.forEach((props, i) => {
      instances.push({
        key: i,
        position: [props.position[0], props.position[1], props.position[2]],
        rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
        scale: [1, 1, 1],
      })
    })

    return instances
  }, [])

  return (
    <InstancedRigidBodies ref={rigidBodiesCrystals} instances={instancesCrystals} colliders="cuboid" type="fixed" onIntersectionEnter={(e) => console.log(e)}>
      <instancedMesh castShadow args={[nodes.crystal_2.geometry, undefined, count]} count={count}>
        <meshStandardMaterial attach="material" {...materials['Material.004']} />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}

const Stones = () => {
  return (
    <>
      <Rocks count={1000} />
      <Crystals count={100} />
    </>
  )
}

export default Stones
