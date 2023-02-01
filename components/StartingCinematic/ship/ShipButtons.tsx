import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import {useStore} from "@/utils/zustore";

const ShipButtons = () => {
  // Get store variables and functions
  const addObjectAsHoverable = useStore((state) => state.addObjectAsHoverable)
  const hoveredObject = useStore((state) => state.hoveredObject)

  // Create refs for the buttons
  const SHIP_SELECT_BTN = useRef<any>()

  useFrame(() => {
    // Add SHIP_SELECT_BTN as a hoverable object if not already in the list
    if (SHIP_SELECT_BTN.current && SHIP_SELECT_BTN.current.uuid) {
      addObjectAsHoverable(SHIP_SELECT_BTN.current)
    }

    // Change the color of the SHIP_SELECT_BTN object if it is hovered
    if (hoveredObject === 'SHIP_SELECT_BTN') {
      SHIP_SELECT_BTN.current.material.color.set('red')
    } else {
      SHIP_SELECT_BTN.current.material.color.set('hotpink')
    }
  })

  return (
    <>
      <mesh ref={SHIP_SELECT_BTN} userData={{id: 'SHIP_SELECT_BTN'}} position={[-0.68, 0.07, 24.3]}>
        <boxBufferGeometry args={[0.07, 0.07, 0.07]}/>
        <meshLambertMaterial opacity={0.5} transparent={true}/>
      </mesh>
    </>
  )
}

export default ShipButtons
