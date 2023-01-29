import {useStore} from "@/utils/zustore";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";

type LightsPosition = {
  light1: [number, number, number];
}

const Lights = () => {
  const LightsPosition: LightsPosition = {
    light1: [-0.98, -1, -0.18]
  }
  // Get startedGame, animationDone from store
  const startedGame = useStore((state) => state.startedGame)
  const animationDone = useStore((state) => state.animationDone)

  // Light ref
  const lightRef = useRef<any>()

  // Useful variables
  let animationAliveTime = 0

  // Animate light position
  // sin((t * 3.14) * cos(x) + r)
  // t : tours effectués
  // x : temps écoulé (varie de x = 0 à x = 3.14, le temps d'une periode)
  // r : rayon definissant l'axe de rotation
  useFrame(() => {
    if (startedGame && !animationDone) {
      animationAliveTime += 0.01 * 3.14 / 10
      lightRef.current.position.x = Math.sin((27 * 3.14) * Math.cos(animationAliveTime) + 14)
      lightRef.current.position.y = Math.cos((27 * 3.14) * Math.cos(animationAliveTime))
      lightRef.current.position.z = Math.cos((27 * 3.14) * Math.cos(animationAliveTime) + 14)
    }
  })

  return (
    <>
      <directionalLight
        color="#ffffcc"
        ref={lightRef}
        position={LightsPosition.light1}
        castShadow={false}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.1}/>
      {/* These are boxes that are used to visualize the light sources */}
      <mesh position={LightsPosition.light1}>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]}/>
        <meshStandardMaterial color="hotpink"/>
      </mesh>
    </>
  );
};

export default Lights;
