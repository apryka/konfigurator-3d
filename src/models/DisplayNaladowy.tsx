/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";

export default function DisplayN(props:any) {
  const { nodes, materials } = useGLTF("/models/display-naladowy.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Line01.geometry}
        material={materials.WHITE}
        position={[-0.105, 0.046, 0.017]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Line02.geometry}
        material={materials.WHITE}
        position={[-0.105, 0.051, 0.014]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape04.geometry}
        material={materials.WHITE}
        position={[0, 0.177, -0.077]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/display-naladowy.gltf");
