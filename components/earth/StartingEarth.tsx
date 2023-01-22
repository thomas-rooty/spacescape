import useSpline from '@splinetool/r3f-spline'

interface StartingEarthProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const StartingEarth = ({position, rotation, scale}: StartingEarthProps) => {
  const {nodes} = useSpline('https://prod.spline.design/4qGC-5kRLw12RYQp/scene.splinecode')
  return (
    <>
      <group name="earth" position={position} rotation={rotation} scale={scale}>
        <mesh name="lands" geometry={nodes.lands.geometry} material={nodes.lands.material} castShadow={true}
              receiveShadow={true}/>
        <mesh
          name="oceans"
          geometry={nodes.oceans.geometry}
          material={nodes.oceans.material}
          castShadow={true}
          receiveShadow={true}
        />
      </group>
    </>
  )
}

export default StartingEarth
