// This is used to create the walls that surround the player to prevent them from leaving the desired area.
import {useBox} from '@react-three/cannon';

interface WallsProps {
  position: [number, number, number];
  rotation: [number, number, number];
  args: [number, number, number];
}

const Wall = (props: WallsProps) => {
  const [ref] = useBox<any>(() => ({
    type: 'Static',
    position: props.position,
    rotation: props.rotation,
    args: props.args,
  }));

  return (
    <mesh ref={ref}/>
  );
};

export default Wall;
