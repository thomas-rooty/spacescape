import { useBox } from '@react-three/cannon';

interface FloorProps {
  rotation: [number, number, number];
  color: string;
  position: [number, number, number];
}

const Floor = (props: FloorProps) => {
  const [ref] = useBox(() => ({ type: 'Static', mass: 0, args: [2.5, 0.5, 0.02], ...props })) as any;

  return (
    <mesh receiveShadow={true} rotation={props.rotation} position={props.position} ref={ref}>
      <boxGeometry args={[2.5, 0.5, 0.02]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

export default Floor;
