import useSpline from '@splinetool/r3f-spline'
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

interface StartingEarthProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const StartingEarth = ({position, rotation, scale}: StartingEarthProps) => {
  const {nodes} = useSpline('https://prod.spline.design/4qGC-5kRLw12RYQp/scene.splinecode')

  // Earth reference
  const earthRef = useRef<any>()

  // Earth rotation
  useFrame(({clock}) => {
    earthRef.current.rotation.y = clock.getElapsedTime() / 33
  })

  return (
      <group ref={earthRef} name="earth" position={position} rotation={rotation} scale={scale}>
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
  )
}

export default StartingEarth
