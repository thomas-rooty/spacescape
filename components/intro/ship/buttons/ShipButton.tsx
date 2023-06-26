import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { createCinematicSlice } from '@/utils/stores/storeIntro'

interface ShipButtonProps {
  refProp: any;
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  geometryArgs: [number, number, number];
}

const useShipButtonInteractions = (
  refProp: React.MutableRefObject<any>,
  id: string,
  interact: boolean,
) => {
  const addObjectAsHoverable = createCinematicSlice((state) => state.addObjectAsHoverable)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)
  const setAudioState = createCinematicSlice((state) => state.setAudioState)
  const setLaunchInitiated = createCinematicSlice((state) => state.setLaunchInitiated)
  const setCheckInitiated = createCinematicSlice((state) => state.setCheckInitiated)

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
}

const ShipButton = ({
                      refProp,
                      id,
                      position,
                      rotation,
                      geometryArgs,
                    }: ShipButtonProps) => {
  const { interact } = useControls()

  useShipButtonInteractions(refProp, id, interact)

  return (
    <mesh ref={refProp} userData={{ id }} position={position} rotation={rotation}>
      <boxGeometry args={geometryArgs} />
      <meshLambertMaterial opacity={0.3} transparent />
    </mesh>
  )
}

export default ShipButton
