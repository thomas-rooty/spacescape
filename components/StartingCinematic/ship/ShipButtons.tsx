import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useStore } from '@/utils/zustore'
import { useControls } from '@/utils/useControls'

const ShipButtons = () => {
  // Get store variables and functions
  const addObjectAsHoverable = useStore((state) => state.addObjectAsHoverable)
  const hoveredObject = useStore((state) => state.hoveredObject)

  // Create refs for the buttons
  const SHIP_BTN_SELECT = useRef<any>()
  const SHIP_BTN_START = useRef<any>()
  const { interact } = useControls()

  useFrame(() => {
    // Add SHIP_BTN_SELECT as a hoverable object
    if (SHIP_BTN_SELECT.current && SHIP_BTN_SELECT.current.uuid) {
      addObjectAsHoverable(SHIP_BTN_SELECT.current)
    }

    // Change the color of the SHIP_BTN_SELECT object if it is hovered
    if (hoveredObject === 'SHIP_SELECT_BTN' && interact) {
      SHIP_BTN_SELECT.current.material.color.set('red')
    } else {
      SHIP_BTN_SELECT.current.material.color.set('hotpink')
    }

    // Add SHIP_BTN_START as a hoverable object
    if (SHIP_BTN_START.current && SHIP_BTN_START.current.uuid) {
      addObjectAsHoverable(SHIP_BTN_START.current)
    }

    // Change the color of the SHIP_BTN_START object if it is hovered
    if (hoveredObject === 'SHIP_START_BTN' && interact) {
      SHIP_BTN_START.current.material.color.set('red')
    } else {
      SHIP_BTN_START.current.material.color.set('hotpink')
    }
  })

  return (
    <>
      <mesh ref={SHIP_BTN_SELECT} userData={{ id: 'SHIP_SELECT_BTN' }} position={[-0.68, 0.08, 24.3]}>
        <boxBufferGeometry args={[0.07, 0.07, 0.07]} />
        <meshLambertMaterial opacity={0.5} transparent={true} />
      </mesh>
      <mesh ref={SHIP_BTN_START} userData={{ id: 'SHIP_START_BTN' }} position={[-0.87, 0.08, 24.41]}>
        <boxBufferGeometry args={[0.07, 0.07, 0.07]} />
        <meshLambertMaterial opacity={0.5} transparent={true} />
      </mesh>
    </>
  )
}

export default ShipButtons
