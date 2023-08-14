/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 stand-kartonowy.glb --shadows --transform
*/

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ModelStandKartonowy(props:any) {
  const { nodes, materials } = useGLTF('/models/stand-kartonowy-transformed.glb') as any
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Rectangle0.geometry} material={materials['0.008']} position={[0.029, -0.138, -0.062]} rotation={[-Math.PI, 0.436, 0]} scale={0.016} />
    </group>
  )
}

useGLTF.preload('/models/stand-kartonowy-transformed.glb')