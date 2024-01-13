import { useRef } from 'react'
import ShipButton from './ShipButton'
import { createCinematicSlice } from '@/stores/intro.store'

const ShipButtons = () => {
  const SHIP_BTN_START = useRef()
  const SHIP_BTN_STOP = useRef()
  const SHIP_BTN_SELECT = useRef()
  const SHIP_BTN_CHECK = useRef()
  const SHIP_CMD_STEERING = useRef()
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)

  return (
    <>
      {!endCryo && (
        <>
          <ShipButton refProp={SHIP_BTN_START} id="SHIP_BTN_START" position={[-0.87, 0.17, 24.415]} rotation={[0.1, 0.9, -0.07]} geometryArgs={[0.1, 0.04, 0]} />
          <ShipButton refProp={SHIP_BTN_STOP} id="SHIP_BTN_STOP" position={[-0.765, 0.167, 24.36]} rotation={[0.1, 0.5, -0.07]} geometryArgs={[0.115, 0.04, 0]} />
          <ShipButton refProp={SHIP_BTN_SELECT} id="SHIP_BTN_SELECT" position={[-0.675, 0.165, 24.3]} rotation={[0.1, 0.7, -0.07]} geometryArgs={[0.09, 0.04, 0]} />
        </>
      )}
      {!endCryo ? (
        <ShipButton refProp={SHIP_CMD_STEERING} id="SHIP_CMD_STEERING" position={[0, -0.35, 24.65]} rotation={[-0.5, 0, 0]} geometryArgs={[0.1, 0.1, 0.04]} />
      ) : (
        !checkInitiated && <ShipButton refProp={SHIP_BTN_CHECK} id="SHIP_BTN_CHECK" position={[0.675, 0.166, 24.3]} rotation={[0.1, -0.7, 0.07]} geometryArgs={[0.09, 0.04, 0.01]} />
      )}
    </>
  )
}

export default ShipButtons
