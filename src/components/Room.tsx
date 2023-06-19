import { DIRECTION } from '../types';
import { Floor } from './Floor';
import { Wall } from './Wall';


export interface RoomProps {
  roomSize: [number, number, number];
  floorColor: string;
  wallsColor: string;
}

export function Room({ roomSize, floorColor, wallsColor }: RoomProps) {
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