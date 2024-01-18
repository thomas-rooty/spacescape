import * as THREE from 'three'
import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { rocksRandomizer, crystalsRandomizer } from '@/components/scenes/common/physics/randomizer'
import { InstancedRigidBodies, InstancedRigidBodyProps, RapierRigidBody } from '@react-three/rapier'
import { createInteractionSlice } from '@/stores/interactions.store'
import { createInventorySlice } from '@/stores/inventory.store'
import RockHitbox from '@/components/scenes/playing/assets/rocks/RockHitbox'
import CrystalHitbox from '@/components/scenes/playing/assets/rocks/CrystalHitbox'

interface StoneCountProps {
  count?: number
}

type StonesData = GLTF & {
  nodes: {
    Rock_3: THREE.Mesh
    crystal_2: THREE.Mesh
  }
  materials: {
    Stone_Dark: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

const RAYCAST_DISTANCE = 0.5

const Rocks = ({ count = 1000 }: StoneCountProps) => {
  const rigidBodies = useRef<RapierRigidBody[]>(null)
  const rocks = useRef<any>(null)
  const hitbox = useRef<any>(null)
  const [hitboxData, setHitboxData] = useState<any | null>(null)
  const collectedRock = createInteractionSlice((state) => state.collectedRock)
  const addItem = createInventorySlice((state) => state.addItem)
  const { nodes, materials } = useGLTF('/models/rocks/rocks1.glb') as unknown as StonesData

  // Interactions
  const onPointerEnter = useCallback((e: any) => {
    const distance = e.distance
    // Intersected object
    if (distance < RAYCAST_DISTANCE && rigidBodies.current) {
      e.stopPropagation()
      const data = rigidBodies.current[e.instanceId].userData as any
      const rock = {
        id: data.id,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
      }
      setHitboxData(rock)
    }
  }, [])

  const onPointerOut = useCallback((e: any) => {
    e.stopPropagation()
    setHitboxData(null)
  }, [])

  useEffect(() => {
    // Apply force to the rock
    if (collectedRock && rigidBodies.current) {
      addItem('stone', 3, 'resources', 'https://cdn.iconscout.com/icon/free/png-256/free-stone-11-449918.png')
      setHitboxData(null)
    }
  }, [collectedRock])

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    rocksRandomizer.forEach((props, i) => {
      instances.push({
        key: i,
        position: [props.position[0], props.position[1], props.position[2]],
        rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
        scale: [props.scale[0], props.scale[1], props.scale[2]],
        userData: {
          id: i,
          position: props.position,
          rotation: props.rotation,
          scale: props.scale,
        },
      })
    })

    return instances
  }, [])

  return (
    <>
      <InstancedRigidBodies ref={rigidBodies} instances={instances} colliders="cuboid" type="dynamic">
        <instancedMesh ref={rocks} castShadow args={[nodes.Rock_3.geometry, undefined, count]} count={count} onPointerEnter={onPointerEnter} onPointerOut={onPointerOut}>
          <meshStandardMaterial attach="material" {...materials.Stone_Dark} />
        </instancedMesh>
      </InstancedRigidBodies>
      {hitboxData && <RockHitbox refProp={hitbox} id={hitboxData.id} position={hitboxData.position} rotation={hitboxData.rotation} />}
    </>
  )
}

const Crystals = ({ count = 1000 }: StoneCountProps) => {
  const rigidBodiesCrystals = useRef<RapierRigidBody[]>(null)
  const crystals = useRef<any>(null)
  const hitbox = useRef<any>(null)
  const [hitboxData, setHitboxData] = useState<any | null>(null)
  const collectedCrystal = createInteractionSlice((state) => state.collectedCrystal)
  const addItem = createInventorySlice((state) => state.addItem)
  const { nodes, materials } = useGLTF('/models/rocks/crystal1.glb') as unknown as StonesData

  // Interactions
  const onPointerEnter = useCallback((e: any) => {
    const distance = e.distance
    // Intersected object
    if (distance < RAYCAST_DISTANCE && rigidBodiesCrystals.current) {
      e.stopPropagation()
      const data = rigidBodiesCrystals.current[e.instanceId].userData as any
      const crystal = {
        id: data.id,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
      }
      setHitboxData(crystal)
    }
  }, [])

  const onPointerOut = useCallback((e: any) => {
    e.stopPropagation()
    setHitboxData(null)
  }, [])

  useEffect(() => {
    // Apply force to the rock
    if (collectedCrystal && rigidBodiesCrystals.current) {
      addItem('crystal', 1, 'resources', 'https://cdn-icons-png.flaticon.com/512/10606/10606237.png')
      setHitboxData(null)
    }
  }, [collectedCrystal])

  const instancesCrystals = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    crystalsRandomizer.forEach((props, i) => {
      instances.push({
        key: i,
        position: [props.position[0], props.position[1], props.position[2]],
        rotation: [props.rotation[0], props.rotation[1], props.rotation[2]],
        scale: [1, 1, 1],
        userData: {
          id: i,
          position: props.position,
          rotation: props.rotation,
          scale: [1, 1, 1],
        },
      })
    })

    return instances
  }, [])

  return (
    <>
    <InstancedRigidBodies ref={rigidBodiesCrystals} instances={instancesCrystals} colliders="cuboid" type="dynamic">
      <instancedMesh ref={crystals} castShadow args={[nodes.crystal_2.geometry, undefined, count]} count={count} onPointerEnter={onPointerEnter} onPointerOut={onPointerOut}>
        <meshStandardMaterial attach="material" {...materials['Material.004']} />
      </instancedMesh>
    </InstancedRigidBodies>
      {hitboxData && <CrystalHitbox refProp={hitbox} id={hitboxData.id} position={hitboxData.position} rotation={hitboxData.rotation} />}
    </>
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

useGLTF.preload('/models/rocks/rocks1.glb')

export default Stones
