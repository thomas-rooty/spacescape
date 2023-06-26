import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { createCinematicSlice } from '@/utils/stores/storeIntro'
import { useControls } from '@/utils/useControls'

interface ShipButtonProps {
  refProp: any
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  geometryArgs: [number, number, number]
}

const ShipButton = ({ refProp, id, position, rotation, geometryArgs }: ShipButtonProps) => {
  const addObjectAsHoverable = createCinematicSlice((state) => state.addObjectAsHoverable)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)
  const setAudioState = createCinematicSlice((state) => state.setAudioState)
  const setLaunchInitiated = createCinematicSlice((state) => state.setLaunchInitiated)
  const setCheckInitiated = createCinematicSlice((state) => state.setCheckInitiated)
  const { interact } = useControls()

  useFrame(() => {
    if (refProp.current && refProp.current.uuid) {
      addObjectAsHoverable(refProp.current)
    }

    if (hoveredObject === id && interact) {
      refProp.current.material.color.set('orange')

      if (id === 'SHIP_BTN_START') {
        setAudioState(true)
      } else if (id === 'SHIP_BTN_STOP') {
        setAudioState(false)
      } else if (id === 'SHIP_BTN_CHECK') {
        setCheckInitiated(true)
      } else if (id === 'SHIP_CMD_STEERING') {
        setLaunchInitiated(true)
      }
    } else {
      refProp.current.material.color.set('#FFD580')
    }
  })

  return (
    <mesh ref={refProp} userData={{ id }} position={position} rotation={rotation}>
      <boxGeometry args={geometryArgs} />
      <meshLambertMaterial opacity={0.3} transparent={true} />
    </mesh>
  )
}

const ShipButtons = () => {
  const SHIP_BTN_START = useRef()
  const SHIP_BTN_STOP = useRef()
  const SHIP_BTN_SELECT = useRef()
  const SHIP_BTN_CHECK = useRef()
  const SHIP_CMD_STEERING = useRef()

  return (
    <>
      <ShipButton
        refProp={SHIP_BTN_START}
        id='SHIP_BTN_START'
        position={[-0.87, 0.079, 24.415]}
        rotation={[0.1, 0.9, -0.07]}
        geometryArgs={[0.1, 0.04, 0]}
      />
      <ShipButton
        refProp={SHIP_BTN_STOP}
        id='SHIP_BTN_STOP'
        position={[-0.77, 0.077, 24.36]}
        rotation={[0.1, 0.5, -0.07]}
        geometryArgs={[0.115, 0.04, 0]}
      />
      <ShipButton
        refProp={SHIP_BTN_SELECT}
        id='SHIP_BTN_SELECT'
        position={[-0.68, 0.075, 24.3]}
        rotation={[0.1, 0.7, -0.07]}
        geometryArgs={[0.09, 0.04, 0]}
      />
      <ShipButton
        refProp={SHIP_BTN_CHECK}
        id='SHIP_BTN_CHECK'
        position={[0.68, 0.073, 24.3]}
        rotation={[0.1, -0.7, 0.07]}
        geometryArgs={[0.09, 0.04, 0.01]}
      />
      <ShipButton
        refProp={SHIP_CMD_STEERING}
        id='SHIP_CMD_STEERING'
        position={[0, -0.45, 24.65]}
        rotation={[-0.5, 0, 0]}
        geometryArgs={[0.1, 0.1, 0.04]}
      />
    </>
  )
}

export default ShipButtons
