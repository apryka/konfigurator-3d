import React, { useState, Suspense, useEffect, useContext } from 'react';

import { useControls, folder } from 'leva';

import * as THREE from 'three';
import { Canvas} from '@react-three/fiber';
import { Box, OrbitControls, Bounds} from '@react-three/drei';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';
// import { nanoid } from 'nanoid';

import { TextureContext } from './context/TextureContext';

// import { Room, DraggableObject } from './components';
import { useModels } from './components/useModels';
import { Room, DraggableObject } from '.';
import { AppContext } from '../context/AppContext';

export const Configurator = () => {

  const { roomSize: roomSizeFromContext} = useContext(AppContext);

  const [{floorColor, wallsColor}, set] = useControls(() => ({
    'Room': folder({
      // roomSize: [8, 3, 6],
      floorColor: '#aaa',
      wallsColor: '#fff',
    })
  }))

  const roomSize = [...roomSizeFromContext, 6] as [number, number, number];

  // const { backgroundColor } = useControls('Misc', {
  //   backgroundColor: '#103045',
  // });
 
  const [orbitControlsDisabled, setOrbitControlsDisabled] = React.useState(false);

  const roomBounds = React.useMemo(() => ({
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(roomSize[0], 0, roomSize[2]),
  }), [roomSize]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div className='h-screen'>
    <Canvas shadows ref={canvasRef}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 3]} intensity={0.5} castShadow name='light' />

        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} enabled={!orbitControlsDisabled} />
        <Bounds fit clip observe damping={6} name='bounds'>
          <Room roomSize={roomSize} floorColor={floorColor} wallsColor={wallsColor} />

            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline blur visibleEdgeColor={0xffffff} edgeStrength={100} width={500} />
              </EffectComposer>

            <Suspense>
            {/* {
              models.map((model) => {
                const Model = loadedModels[model.name] as any;
                return Model ? (<DraggableObject key={model.id} bounds={roomBounds} position={[1, 1, 1]} setActive={setOrbitControlsDisabled} onDoubleClick={(e:any) => handleDblClick(e, model.id)}><Select enabled={model.id === selectedItem}><Box castShadow receiveShadow scale={0.0125} position={[0,0,0]} rotation={[0, model.rotation, 0]}><Model /></Box></Select></DraggableObject>) : null;
              
            })
            } */}
          </Suspense>

            </Selection>
          

          
        </Bounds>
      </Canvas>
      </div>
  )
}