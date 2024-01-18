import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { createCinematicSlice } from '@/stores/intro.store'
import { createInteractionSlice } from '@/stores/interactions.store'
import { createDebugStore } from '@/stores/debug.store'
import * as THREE from 'three'

interface ShipButtonProps {
  refProp: any
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
}

const useInteraction = (refProp: React.MutableRefObject<any>, id: string, interact: boolean) => {
  const addObjectAsHoverable = createCinematicSlice((state) => state.addObjectAsHoverable)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)
  const setInteractedWith = createInteractionSlice((state) => state.setInteractedWith)

  // Ship button interactions
  useFrame(() => {
    if (refProp.current && refProp.current.uuid) {
      addObjectAsHoverable(refProp.current)
    }

    if (hoveredObject === id && interact) {
      refProp.current.material.color.set('orange')
      setInteractedWith(id)
    } else {
      refProp.current.material.color.set('#FFD580')
      setInteractedWith(null)
    }
  })
}

const Hitbox = ({ refProp, id, position, rotation }: ShipButtonProps) => {
  const debug = createDebugStore((state) => state.debug)
  const { interact } = useControls()
  useInteraction(refProp, id, interact)

  return (
    <mesh ref={refProp} userData={{ id }} position={position} rotation={rotation}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshLambertMaterial visible={debug} color="red" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Hitbox
