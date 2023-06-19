import * as THREE from 'three';
import { Plane } from '@react-three/drei';

export interface FloorProps {
  roomSize: [number, number, number];
  color: string;
}

export function Floor({ roomSize, color }: FloorProps) {
  const planeSize: [number, number] = [roomSize[0], roomSize[2]];
  const position: [number, number, number] = [roomSize[0] / 2, 0, roomSize[2] / 2];
  const rotation: [number, number, number] = [Math.PI / 2, 0, 0];

  return (
    <Plane args={planeSize} position={position} rotation={rotation} castShadow receiveShadow name='floor'>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </Plane>
  );
}
