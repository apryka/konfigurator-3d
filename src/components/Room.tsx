import { useThree } from '@react-three/fiber';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { DIRECTION } from '../types';
import { Floor } from './Floor';
import { Wall } from './Wall';


export interface RoomProps {
  roomSize: [number, number, number];
  floorColor: string;
  wallsColor: string;
}

export function Room({ roomSize, floorColor, wallsColor }: RoomProps) {
  const { camera } = useThree();
  const { zoom } = useContext(AppContext);

  useEffect(() => {
    if (typeof zoom === 'number') {
      console.log(zoom, camera);
      camera.zoom = zoom;
    }
  }, [zoom]);

  return (
    <>
      <Floor roomSize={roomSize} color={floorColor} />
      <Wall roomSize={roomSize} color={wallsColor} direction={DIRECTION.NORTH} />
      <Wall roomSize={roomSize} color={wallsColor} direction={DIRECTION.EAST} />
      <Wall roomSize={roomSize} color={wallsColor} direction={DIRECTION.SOUTH} />
      <Wall roomSize={roomSize} color={wallsColor} direction={DIRECTION.WEST} />
    </>
  );
}