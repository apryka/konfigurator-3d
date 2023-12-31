/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props:any) {
  const { nodes, materials:_materials } = useGLTF("/models/display-naladowy.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DISPLAY_NALADOWY.geometry}
        material={nodes.DISPLAY_NALADOWY.material}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/models/display-naladowy.gltf");
