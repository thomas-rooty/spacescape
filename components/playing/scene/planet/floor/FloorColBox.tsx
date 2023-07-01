import { useBox } from '@react-three/cannon'

interface PlanetFloorProps {
  rotation: [number, number, number]
  color: string
  position: [number, number, number]
}

const FloorColBox = (props: PlanetFloorProps) => {
  const [ref] = useBox(() => ({ type: 'Static', mass: 0, args: [100, 100, 0.2], ...props })) as any

  return <mesh receiveShadow={true} rotation={props.rotation} position={props.position} ref={ref}></mesh>
}

export default FloorColBox
