import React, { useContext, useEffect, useRef } from 'react';

import * as THREE from 'three';
import { Plane } from '@react-three/drei';

import { DIRECTION } from '../types';
// import { TextureContext } from '../context/TextureContext';
import { AppContext } from '../context/AppContext';

export interface WallProps {
  roomSize: [number, number, number];
  direction: DIRECTION;
  color: string;
}

export function Wall({ roomSize, direction, color }: WallProps) {
  // const texture = useContext(TextureContext);
  const { texture } = useContext(AppContext);
  const materialRef = useRef<any>();

  useEffect(() => {
    if (texture) {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(texture, (t) => {
        materialRef.current.map = t;
        materialRef.current.needsUpdate = true;
      })
    } else {
      materialRef.current.map = null;
      materialRef.current.needsUpdate = true;
    }
  }, [texture])

  // const [colorMap] = useTexture(['photo-1618221999490-9418f64786aa.avif']);
  const planeSize: [number, number] = React.useMemo(() => {
    const [x, y, z] = roomSize;

    switch (direction) {
      case DIRECTION.NORTH:
      case DIRECTION.SOUTH:
        return [x, y];
      case DIRECTION.EAST:
      case DIRECTION.WEST:
        return [z, y];
    }
  }, [direction, roomSize]);

  const position: [number, number, number] = React.useMemo(() => {
    const [x, y, z] = roomSize;

    switch (direction) {
      case DIRECTION.NORTH:
        return [x / 2, y / 2, 0];
      case DIRECTION.EAST:
        return [x, y / 2, z / 2];
      case DIRECTION.SOUTH:
        return [x / 2, y / 2, z];
      case DIRECTION.WEST:
        return [0, y / 2, z / 2];
    }
  }, [direction, roomSize])

  const rotation: [number, number, number] = React.useMemo(() => {
    switch (direction) {
      case DIRECTION.NORTH:
        return [0, 0, 0];
      case DIRECTION.EAST:
        return [0, -Math.PI / 2, 0];
      case DIRECTION.SOUTH:
        return [0, Math.PI, 0];
      case DIRECTION.WEST:
        return [0, Math.PI / 2, 0];
    }
  }, [direction]);

  return (
    <Plane args={planeSize} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={color} side={THREE.FrontSide} ref={materialRef as any} />
    </Plane>
  );
}
