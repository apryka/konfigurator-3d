import React, { useState, Suspense, useEffect } from 'react';

import { useControls, folder } from 'leva';

import * as THREE from 'three';
import { Canvas} from '@react-three/fiber';
import { Box, OrbitControls, Bounds} from '@react-three/drei';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';
import { nanoid } from 'nanoid';

import { TextureContext } from './context/TextureContext';

import { Room, DraggableObject } from './components';
// import Bulldog3 from './models/Bulldog3';
// import { Bulldog2 } from './models/Bulldog2';
import { useModels } from './components/useModels';


import './App.css';

type Model = {
  name: string;
  id: string;
  rotation: number;
}

function App() {
  // const { roomSize, floorColor, wallsColor } = useControls('Room', {
  //   roomSize: [8, 3, 6],
  //   floorColor: '#aaa',
  //   wallsColor: '#fff',
  // });

  const [{roomSize, floorColor, wallsColor}, set] = useControls(() => ({
    'Room': folder({
      roomSize: [8, 3, 6],
      floorColor: '#aaa',
      wallsColor: '#fff',
    })
  }))

  const { backgroundColor } = useControls('Misc', {
    backgroundColor: '#103045',
  });
 
  const [orbitControlsDisabled, setOrbitControlsDisabled] = React.useState(false);

  const roomBounds = React.useMemo(() => ({
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(roomSize[0], 0, roomSize[2]),
  }), [roomSize]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [listOfModels, setListOfModels] = useState<string[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [texture, setTexture] = useState<string>('');

  const [addLoadedModel, loadedModels] = useModels();
  
  useEffect(() => {
    import('./models')
      .then(({ list }) => setListOfModels(list))
      .catch(() => setListOfModels([]));
  }, []);

  const addModel = (model:string) => {
    addLoadedModel(model);
    setModels((state) => [...state, {name: model, id: nanoid() , rotation: 0}])
  }

  const handleDblClick = (_e:any, id: string) => {
    setSelectedItem(selectedItem => selectedItem ? '' : id);
  }

  const removeHandler = (id:string) => {
    setSelectedItem('');
    const newState = models.filter(model => model.id !== id);
    setModels(newState);
  };

  const rotateHandler = (id:string) => {
    setModels(state => (state.map(model => model.id === id ? {...model, rotation: model.rotation + 90} : model)));
  };

  function handleImageUpload(e:any) {
      console.log(e.target.files);
      setTexture(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App" style={{ backgroundColor }}>
      <TextureContext.Provider value={texture}>
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
            {/* <DraggableObject bounds={roomBounds} position={[1, 1, 1]} setActive={setOrbitControlsDisabled}>
              <Box args={[1, 1, 1]} castShadow receiveShadow scale={0.0125}>
              <Bulldog2 />
              </Box>
              </DraggableObject> */}
              
            {
              models.map((model) => {
                const Model = loadedModels[model.name] as any;
                return Model ? (<DraggableObject key={model.id} bounds={roomBounds} position={[1, 1, 1]} setActive={setOrbitControlsDisabled} onDoubleClick={(e:any) => handleDblClick(e, model.id)}><Select enabled={model.id === selectedItem}><Box castShadow receiveShadow scale={0.0125} position={[0,0,0]} rotation={[0, model.rotation, 0]}><Model /></Box></Select></DraggableObject>) : null;
              
            })
            }
          </Suspense>

            </Selection>
          

          
        </Bounds>
      </Canvas>
      </TextureContext.Provider>
      {selectedItem && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 20px', background: 'white', position: 'absolute', bottom: 50, left: 10}}>
          <button type='button' onClick={() => removeHandler(selectedItem)}>Remove object</button>
          <button type='button' onClick={() => rotateHandler(selectedItem)}>Rotate object</button>
        </div>
      )}
      <div style={{ position: 'absolute', top: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10}}>
          {listOfModels.map((model, idx) => <li key={`${model}-${idx}`}>
            <button type='button' onClick={() => addModel(model)}>Add {model}</button>
          </li>)}
        </ul>
        <div>
          Room size
          <label style={{ display: 'block'}}>
            x
            <input type='number' min={0} value={roomSize[0]} onChange={(e) => set({ roomSize: [e.target.valueAsNumber, roomSize[1], roomSize[2]] })} />
          </label>
          <label style={{ display: 'block'}}>
            y
            <input type='number' min={0} value={roomSize[1]} onChange={(e) => set({ roomSize: [roomSize[0], e.target.valueAsNumber, roomSize[2]] })} />
          </label>
          <label style={{ display: 'block'}}>
            z
            <input type='number' min={0} value={roomSize[2]} onChange={(e) => set({ roomSize: [roomSize[0], roomSize[1], e.target.valueAsNumber] })}  />
          </label>
        </div>
        <div>
          <label style={{ display: 'block'}}>
            Floor color
            <input type='color' value={floorColor} onChange={(e) => set({ floorColor: e.target.value })}/>
          </label>
        </div>
        <div>
          <label style={{ display: 'block'}}>
            Walls color
            <input type='color' value={wallsColor} onChange={(e) => set({ wallsColor: e.target.value })}/>
          </label>
        </div>
        <div>
          <h2>Add Image:</h2>
          <input type="file" onChange={handleImageUpload} />
          
          {texture && <>
            <img src={texture} alt='texture' style={{ width: 100, height: 100, objectFit: 'cover'}} />
          </>}
        </div>

      </div>

      <div className='rounded-[4px] border-[#D5B51B] border border-dashed bg-[#FFF5C8] text-[#D5B51B] font-manrope text-[14px] leading-[18px] text-center px-[20px] py-[10px]'>
        Uzupełnij wymiary lokalu oraz wybierz szablon sklepu
      </div>

      




      
    </div>
  );
}

export default App;