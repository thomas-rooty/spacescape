import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {useTexture} from "@react-three/drei"
import {useStore} from "@/utils/zustore";
import {useFrame} from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Body_ship: THREE.Mesh;
    Glasse_ship: THREE.Mesh;
  };
  materials: {
    lambert7: THREE.MeshStandardMaterial;
  };
};

interface SpaceshipProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const Spaceship = ({position, rotation, scale}: SpaceshipProps) => {
  const shipRef = useRef<any>()
  const glassRef = useRef<any>()
  const { nodes, materials } = useGLTF("/models/spaceship.gltf") as unknown as GLTFResult;

  // Get startedGame from store
  const startedGame = useStore((state) => state.startedGame)

  // Load textures
  const [spaceshipTexture] = useTexture([
    '/models/tex/spaceship/Color_map.png',
  ])

  // Useful variables
  let animationDone = false

  // Toggle glass opacity on game start
  useFrame(() => {
    if (startedGame && glassRef.current.material.opacity < 0.05) {
      glassRef.current.material.opacity += 0.0001;
    } else if (!animationDone && startedGame && glassRef.current.material.opacity >= 0.05) {
      glassRef.current.material.opacity = 0.05;
      animationDone = true;
    }
  })

  return (
    <group ref={shipRef} name="shipinteriors" position={position} rotation={rotation} scale={scale}>
      <mesh
        name="Body_ship"
        castShadow={true}
        geometry={nodes.Body_ship.geometry}
        material={materials.lambert7}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          name="Glasse_ship"
          ref={glassRef}
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Glasse_ship.geometry}
        >
          <meshLambertMaterial
            attach="material"
            map={spaceshipTexture}
            fog={false}
            transparent={true}
            opacity={0}
          />
        </mesh>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/spaceship.gltf");

export default Spaceship;
