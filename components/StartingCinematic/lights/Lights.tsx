import {useStore} from "@/utils/zustore";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import * as THREE from "three";

type LightsPosition = {
  light1: [number, number, number];
}

const Lights = () => {
  const LightsPosition: LightsPosition = {
    light1: [30, 20, 25]
  }
  // Get startedGame from store
  const startedGame = useStore((state) => state.startedGame)

  // Light ref
  const lightRef = useRef<any>()

  // Make the light move to [15, 20, -25] slowly when the game starts
  useFrame(() => {
    if (startedGame) {
      lightRef.current.position.lerp(new THREE.Vector3(15, 20, -25), 0.001)
    }
  })

  return (
    <>
      <directionalLight
        color="#ffffcc"
        ref={lightRef}
        position={LightsPosition.light1}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.1} />
      {/* These are boxes that are used to visualize the light sources */}
      <mesh position={LightsPosition.light1}>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
};

export default Lights;
