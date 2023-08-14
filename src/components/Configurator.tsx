import React, { Suspense, useContext } from 'react';

// import { useControls, folder } from 'leva';

import * as THREE from 'three';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Bounds} from '@react-three/drei';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';
// import { nanoid } from 'nanoid';

// import { TextureContext } from './context/TextureContext';

// import { Room, DraggableObject } from './components';
// import { useModels } from './components/useModels';
import { Room, DraggableObject } from '.';
import { AppContext } from '../context/AppContext';
import { Model } from '../types';
// import ModelStandKartonowy from '../models/Stand-kartonowy';
// import ModelsDisplayNaladowy from '../models/DisplayNaladowy';
// import Krawat from '../models/Krawat';

// import Stand from '../models/Stand';
// import StandKartonowy from '../models/StandKartonowy';
// import Bulldog3 from '../models/Bulldog3';
// import KoncowkaRegalu from '../models/KoncowkaRegalu';
// import KoszZasypowy from '../models/KoszZasypowy';
// import ObudowaSlupa from '../models/ObudowaSlupa';

const floorColor = '#aaa';
const wallsColor = '#fff';

type ConfiguratorProps = {
  selectedItem: string;
  setSelectedItem: (id: string) => void;
}

export const Configurator:React.FC<ConfiguratorProps> = ({ selectedItem, setSelectedItem }) => {

  const { roomSize: roomSizeFromContext, models, loadedModels } = useContext(AppContext);

  // const [selectedItem, setSelectedItem] = useState('');

  const roomSize = [...roomSizeFromContext, 6] as [number, number, number];

  const [orbitControlsDisabled, setOrbitControlsDisabled] = React.useState(false);

  const roomBounds = React.useMemo(() => ({
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(roomSize[0], 0, roomSize[2]),
  }), [roomSize]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // const handleDblClick = (_e:any, id: string) => {
  //   setSelectedItem(selectedItem => selectedItem ? '' : id);
  // }

  // const removeHandler = (id:string) => {
  //   setSelectedItem('');
  //   const newState = models.filter(model => model.id !== id);
  //   setModels(newState);
  // };

  // const rotateHandler = (id:string) => {
  //   setModels(state => (state.map(model => model.id === id ? {...model, rotation: model.rotation + 90} : model)));
  // };

  // const controlsRef = React.useRef();
  // if (controlsRef.current) {
  //   controlsRef.current.zoomIn();
  // }

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
                <Outline blur visibleEdgeColor={0xffffff} edgeStrength={50} width={1000} />
              </EffectComposer>

            <Suspense>
            {
              models.map((model:Model, idx: number) => {
                const Model = loadedModels[model.name] as any;
                // return Model ? (<DraggableObject key={`${model.id}-${idx}`} bounds={roomBounds} position={[1, 1, 1]} setActive={setOrbitControlsDisabled} onDoubleClick={() => setSelectedItem(selectedItem ? '' : model.id)}><Select enabled={model.id === selectedItem}><Box castShadow receiveShadow scale={3} position={[0,0,0]} rotation={[0, model.rotation, 0]}><Model /></Box></Select></DraggableObject>) : null; // scale for Bulldog 0.0125
                return Model ? (<DraggableObject key={`${model.id}-${idx}`} bounds={roomBounds} position={[1, 1, 1]} setActive={setOrbitControlsDisabled} onDoubleClick={() => setSelectedItem(selectedItem ? '' : model.id)}><Select enabled={model.id === selectedItem}><group dispose={null} castShadow receiveShadow scale={10} position={[0,0,0]} rotation={[0, model.rotation, 0]}><Model /></group></Select></DraggableObject>) : null; // scale for Bulldog 0.0125
              
            })
            }
            </Suspense>

            </Selection>
          
            {/* <Box castShadow receiveShadow scale={4} position={[0,0,0]} rotation={[0, 0, 0]}><ModelsDisplayNaladowy /></Box> */}
            {/* <group dispose={null} castShadow receiveShadow scale={40} position={[1,1,0]}><Krawat position={[0,0,0]} /></group> */}

          
        </Bounds>
      </Canvas>
      </div>
  )
}