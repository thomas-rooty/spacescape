import { useRef } from 'react'
import ShipButton from './buttons/ShipButton'
import { createCinematicSlice } from '@/utils/stores/storeIntro'

const ShipButtons = () => {
  const SHIP_BTN_START = useRef()
  const SHIP_BTN_STOP = useRef()
  const SHIP_BTN_SELECT = useRef()
  const SHIP_BTN_CHECK = useRef()
  const SHIP_CMD_STEERING = useRef()
  const endCryo = createCinematicSlice((state) => state.endCryo)

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
      {!endCryo ?
        <ShipButton
          refProp={SHIP_CMD_STEERING}
          id='SHIP_CMD_STEERING'
          position={[0, -0.45, 24.65]}
          rotation={[-0.5, 0, 0]}
          geometryArgs={[0.1, 0.1, 0.04]}
        />
        :
        <ShipButton
          refProp={SHIP_BTN_CHECK}
          id='SHIP_BTN_CHECK'
          position={[0.68, 0.073, 24.3]}
          rotation={[0.1, -0.7, 0.07]}
          geometryArgs={[0.09, 0.04, 0.01]}
        />
      }
    </>
  )
}

export default ShipButtons
