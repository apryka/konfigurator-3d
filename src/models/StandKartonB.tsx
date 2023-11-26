/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props:any) {
  const { nodes } = useGLTF("/models/stand-karton-b.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.STAND_KART.geometry}
        material={nodes.STAND_KART.material}
      />
    </group>
  );
}

useGLTF.preload("/models/stand-karton-b.gltf");