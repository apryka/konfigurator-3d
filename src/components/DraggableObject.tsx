import React from 'react';

import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';

export interface DraggableObjectProps {
  position: [number, number, number];
  setActive: (active: boolean) => void;
  children: React.ReactNode;
  bounds: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  onDoubleClick?: any;
}

const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.00001, 0), 0);

export function DraggableObject(props: DraggableObjectProps) {
  const [position, setPosition] = React.useState(props.position);
  const clampRef = React.useRef<[THREE.Vector3, THREE.Vector3]>([new THREE.Vector3(), new THREE.Vector3()]);

  const bboxRef = React.useRef<THREE.Box3>();

  // TODO: Avoid recalculating on every rerender
  const onChildrenMount = React.useCallback((group: THREE.Group | null) => {
    if (group === null) {
      // clampRef.current[0].set(0, 0, 0);
      // clampRef.current[1].set(0, 0, 0);
      return;
    }

    if (!bboxRef?.current) {
      const bbox = new THREE.Box3();
      bboxRef.current = bbox.expandByObject(group);
    }

    clampRef.current[0].copy(props.bounds.min).sub(bboxRef.current.min);
    clampRef.current[1].copy(props.bounds.max).sub(bboxRef.current.max);
    
  }, [props.bounds]);

  const bind = useDrag<ThreeEvent<MouseEvent>>(({ first, active, event, memo }) => {
    const offset: THREE.Vector3 = memo ?? new THREE.Vector3(...position);

    const intersectionPoint = new THREE.Vector3();
    event.ray.intersectPlane(floorPlane, intersectionPoint);

    if (first) {
      offset.sub(intersectionPoint);
    }

    if (active) {
      event.ray.intersectPlane(floorPlane, intersectionPoint);

      intersectionPoint.add(offset);
      intersectionPoint.clamp(...clampRef.current);
      
      setPosition([intersectionPoint.x, position[1], intersectionPoint.z]);

    }

    props.setActive(active);

    return offset;
  });

  return (
    <group position={position} {...bind() as any} onDoubleClick={props.onDoubleClick ? props.onDoubleClick : null}>
      <group ref={onChildrenMount}>
        {props.children}
      </group>
    </group>
  );
}