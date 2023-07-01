import { useGLTF } from "@react-three/drei";

export default function StandKartonowy(props:any) {
  const { nodes, materials } = useGLTF("/models/stand-kartonowy.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0.436]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle0.geometry}
          material={materials["0.008"]}
          position={[0.023, -6.857, 13.802]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle1.geometry}
          material={materials["0.008"]}
          position={[0.023, -6.857, 3.026]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle2.geometry}
          material={materials["0.008"]}
          position={[0.023, -6.857, -7.429]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle3.geometry}
          material={materials["0.008"]}
          position={[9.28, -7, 34.202]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle4.geometry}
          material={materials["0.008"]}
          position={[0.023, -6.857, -17.969]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle5.geometry}
          material={materials["0.008"]}
          position={[-9.28, -7, 34.202]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape006.geometry}
          material={materials["0.008"]}
          position={[0.023, -6.816, 0.975]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape008.geometry}
          material={materials["0.008"]}
          position={[18.111, -6.801, -62.778]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.561}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape009.geometry}
          material={materials["0.008"]}
          position={[0.023, 6.075, 24.6]}
          rotation={[1.484, 0, 0]}
          scale={1.561}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/stand-kartonowy.gltf");

