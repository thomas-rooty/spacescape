import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import {createCinematicSlice} from '@/utils/zustore'
import {useControls} from '@/utils/useControls'

const ShipButtons = () => {
  // Get store variables and functions
  const addObjectAsHoverable = createCinematicSlice((state) => state.addObjectAsHoverable)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)
  const setAudioState = createCinematicSlice((state) => state.setAudioState)
  const setAudioVolume = createCinematicSlice((state) => state.setAudioVolume)

  // Create refs for the buttons
  const SHIP_BTN_START = useRef<any>()
  const SHIP_BTN_STOP = useRef<any>()
  const SHIP_BTN_SELECT = useRef<any>()
  const SHIP_CMD_STEERING = useRef<any>()
  const {interact} = useControls()

  useFrame(() => {
    // Add SHIP_BTN_START as a hoverable object
    if (SHIP_BTN_START.current && SHIP_BTN_START.current.uuid) {
      addObjectAsHoverable(SHIP_BTN_START.current)
    }

    // Change the color of the SHIP_BTN_START object if it is hovered
    if (hoveredObject === 'SHIP_BTN_START' && interact) {
      SHIP_BTN_START.current.material.color.set('orange')
      // Resume the audio
      setAudioState(true)
    } else {
      SHIP_BTN_START.current.material.color.set('#FFD580')
    }

    // Add SHIP_BTN_STOP as a hoverable object
    if (SHIP_BTN_STOP.current && SHIP_BTN_STOP.current.uuid) {
      addObjectAsHoverable(SHIP_BTN_STOP.current)
    }

    // Change the color of the SHIP_BTN_STOP object if it is hovered
    if (hoveredObject === 'SHIP_BTN_STOP' && interact) {
      SHIP_BTN_STOP.current.material.color.set('orange')
      // Pause the audio
      setAudioState(false)
    } else {
      SHIP_BTN_STOP.current.material.color.set('#FFD580')
    }


    // Add SHIP_BTN_SELECT as a hoverable object
    if (SHIP_BTN_SELECT.current && SHIP_BTN_SELECT.current.uuid) {
      addObjectAsHoverable(SHIP_BTN_SELECT.current)
    }

    // Change the color of the SHIP_BTN_SELECT object if it is hovered
    if (hoveredObject === 'SHIP_BTN_SELECT' && interact) {
      SHIP_BTN_SELECT.current.material.color.set('orange')
    } else {
      SHIP_BTN_SELECT.current.material.color.set('#FFD580')
    }


    // Add SHIP_CMD_STEERING as a hoverable object
    if (SHIP_CMD_STEERING.current && SHIP_CMD_STEERING.current.uuid) {
      addObjectAsHoverable(SHIP_CMD_STEERING.current)
    }

    // Change the color of the SHIP_CMD_STEERING object if it is hovered
    if (hoveredObject === 'SHIP_CMD_STEERING' && interact) {
      SHIP_CMD_STEERING.current.material.color.set('orange')
    } else {
      SHIP_CMD_STEERING.current.material.color.set('#FFD580')
    }
  })

  return (
    <>
      <mesh ref={SHIP_BTN_START} userData={{id: 'SHIP_BTN_START'}} position={[-0.87, 0.079, 24.415]}
            rotation={[0.1, 0.9, -0.07]}>
        <boxBufferGeometry args={[0.1, 0.04, 0]}/>
        <meshLambertMaterial opacity={0.3} transparent={true}/>
      </mesh>
      <mesh ref={SHIP_BTN_STOP} userData={{id: 'SHIP_BTN_STOP'}} position={[-0.77, 0.077, 24.36]}
            rotation={[0.1, 0.5, -0.07]}>
        <boxBufferGeometry args={[0.115, 0.04, 0]}/>
        <meshLambertMaterial opacity={0.3} transparent={true}/>
      </mesh>
      <mesh ref={SHIP_BTN_SELECT} userData={{id: 'SHIP_BTN_SELECT'}} position={[-0.68, 0.075, 24.3]}
            rotation={[0.1, 0.7, -0.07]}>
        <boxBufferGeometry args={[0.09, 0.04, 0]}/>
        <meshLambertMaterial opacity={0.3} transparent={true}/>
      </mesh>
      <mesh ref={SHIP_CMD_STEERING} userData={{id: 'SHIP_CMD_STEERING'}} position={[0, -0.45, 24.65]}>
        <sphereBufferGeometry args={[0.07, 16, 16]}/>
        <meshLambertMaterial opacity={0.3} transparent={true}/>
      </mesh>
    </>
  )
}

export default ShipButtons
