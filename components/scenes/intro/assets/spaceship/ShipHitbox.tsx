import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { createCinematicSlice } from '@/utils/stores/intro.store'

interface ShipButtonProps {
  refProp: any
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  geometryArgs: [number, number, number]
}

const useShipButtonInteractions = (refProp: React.MutableRefObject<any>, id: string, interact: boolean) => {
  const addObjectAsHoverable = createCinematicSlice((state) => state.addObjectAsHoverable)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)

  // Ship button interactions
  useFrame(() => {
    if (refProp.current && refProp.current.uuid) {
      addObjectAsHoverable(refProp.current)
    }

    if (hoveredObject === id && interact) {
      refProp.current.material.color.set('orange')

      if (id === 'SHIP_HITBOX') {
        console.log('Ship hitbox clicked')
      }
    } else {
      refProp.current.material.color.set('#FFD580')
    }
  })
}

const ShipButton = ({ refProp, id, position, rotation, geometryArgs }: ShipButtonProps) => {
  const { interact } = useControls()

  useShipButtonInteractions(refProp, id, interact)

  return (
    <mesh ref={refProp} userData={{ id }} position={position} rotation={rotation}>
      <boxGeometry args={geometryArgs} />
      <meshLambertMaterial visible={false} />
    </mesh>
  )
}

export default ShipButton
