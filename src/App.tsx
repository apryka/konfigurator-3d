import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Photo } from './views/Photo';
import { Size } from './views/Size';
import { Products } from './views/Products';
import { Placeholder } from './components/Placeholder';
import { Configurator } from './components/Configurator';

import addPhotoIcon from './assets/add-photo.svg';
import productsIcon from './assets/products.svg';
import sizeIcon from './assets/size.svg';
import addIcon from './assets/add.svg';
import subtractIcon from './assets/subtract.svg';
import rotateIcon from './assets/rotate.svg';

import { Model, RoomSize, VIEW } from './types';

import { AppContext } from './context/AppContext';
import { fetcher } from './utils/fetcher';
import { useModels } from './components/useModels';
import useOutsideClick from './hooks/useOutsideClick';
import { useScreenOrientation } from './hooks/useScreenOrientation';

export const API = {
  translations: 'https://edelweiss-admin-panel.azurewebsites.net/api/v1/cms/pages/mobile?path=settings',
  categories: 'https://edelweiss-admin-panel.azurewebsites.net/api/categories',
  // products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search',
  // products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search/configurator',
  products: 'https://edelweiss-admin-panel.azurewebsites.net/api/v1/products/search/configurator'
};


function App() {
  const [view, setView] = useState<VIEW>(VIEW.Size);
  const [roomSize, setRoomSize] = useState<RoomSize>();
  const [texture, setTexture] = useState<string>('');
  // const [listOfModels, setListOfModels] = useState<string[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [activeSection, setActiveSection] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [tooltip, setTooltip] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const [addLoadedModel, loadedModels] = useModels();

  const { data: translationsData, error:_translationsDataError, isLoading: translationsDataIsLoading } = useSWR(API.translations, fetcher);
  const translations = translationsData?.contentSections[0].properties;
  const { data: categoriesData, error:_categoriesDataError, isLoading: _categoriesDataIsLoading } = useSWR(API.categories, fetcher);

  const buttonRef = useOutsideClick(() => setTooltip(false));
  const orientation = useScreenOrientation();

  useEffect(() => {
    setShowControls(orientation.includes('portrait'));
  }, [orientation]);

  const handleTextureImage = (texture:string) => {
    setTexture(texture);
  };

  const addModel = (model:Model) => {
    addLoadedModel(model.name);
    setModels((state) => [...state, model]);
  };

  const rotateHandler = () => {
    if (!selectedItem) return;
    setModels(state => (state.map(model => model.id === selectedItem ? {...model, rotation: model.rotation + 90} : model)));
  };

  return (
    <AppContext.Provider value={{
      translations,
      categories: categoriesData,
      models,
      texture,
      roomSize,
      loadedModels,
      zoom,
    }}>
    <main className="bg-[#EBECED] font-manrope text-ed-black2 flex flex-col min-h-screen">

      <div onClick={() => setActiveSection(false)}>{roomSize ? <Configurator selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <Placeholder onClick={() => setActiveSection(true)} />}</div>

      {roomSize && <div className='flex gap-4 absolute right-[20px] top-[20px]'>
        {selectedItem && <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={rotateHandler}><img src={rotateIcon} alt="add" className='w-[20px] h-[20px]' /></button>}
        <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={() => setZoom(zoom => zoom === 1 ? zoom : zoom-0.1)}><img src={subtractIcon} alt="add" className='w-[20px] h-[20px]' /></button>
        <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={() => setZoom(zoom => zoom+0.1)}><img src={addIcon} alt="add" className='w-[20px] h-[20px]' /></button>
      </div>}

      <section 
        className={`bg-ed-white text-ed-black2 rounded-tl-[30px] rounded-tr-[30px] font-manrope px-4 py-[60px] mt-auto pb-[150px] absolute top-0 left-0 right-0 bottom-auto min-h-[50vh] transition-transform ${activeSection ? "translate-y-[50vh]" : "translate-y-[calc(100vh_-_150px)]"} ${showControls ? "block" : "hidden"}`}
        onClick={() => setActiveSection(true)}
      >

      {roomSize && (
        <button
         type='button'
         ref={buttonRef as React.LegacyRef<HTMLButtonElement> | undefined}
         className='absolute top-0 left-[1rem] translate-y-[calc(-100%_-_10px)] flex gap-1 rounded-[4px] bg-ed-white px-2 py-4 hover:bg-ed-yellow cursor-pointer'
         onClick={(e) => {
            e.stopPropagation();
            setTooltip(!tooltip);
          }}
         >
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>

          {tooltip && <ul className='absolute bg-ed-white rounded-[4px] p-4 flex flex-col shadow-sm bottom-full left-0 mb-[10px]'>
            <li className='font-manrope text-sm whitespace-nowrap text-ed-error' onClick={() => {
              setTooltip(false);
              setModels([]);
              setSelectedItem('');
              setTexture('')
            }}>Usuń szablon</li>
          </ul>}
        </button>
      )}

        <div className='rounded-full w-[100px] h-[10px] bg-[#ECEDEE] absolute top-4 left-[50%] -translate-x-1/2'></div>

        {view === VIEW.Size && <Size setSize={setRoomSize} />}
        {view === VIEW.Photo && <Photo setImage={handleTextureImage} />}
        {view === VIEW.Products && <Products addModel={addModel} />}
            
      </section>

      <div className={`fixed z-20 bottom-0 left-0 w-full bg-[#dedede] text-ed-black2 rounded-tl-[30px] rounded-tr-[30px] h-[90px] flex justify-center items-center ${showControls ? "block" : "hidden"}`}>
        <nav>
          <ul className='grid grid-cols-3 gap-4 items-center justify-center text-sm leading-tight'>
            <li className='inline-block'>
              <button 
                className={`w-full rounded-0 border-0 flex items-center flex-col p-[10px] transition-opacity ${view === VIEW.Size ? "opacity-100 bg-ed-yellow" : "opacity-50 bg-none bg-transparent"}`}
                onClick={() => {
                  setView(VIEW.Size);
                  setActiveSection(true);
                }}    
              >
                <img src={sizeIcon} alt='wymiary lokalu' className='w-[25px] mb-2' />
                {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-store-size')?.value}</span>}
              </button>
            </li>
            <li className='inline-block'>
              <button 
                className={`w-full rounded-0 border-0 flex items-center flex-col p-[10px] transition-opacity ${view === VIEW.Photo ? "opacity-100 bg-ed-yellow" : "opacity-50 bg-none bg-transparent"}`}
                onClick={() => {
                  setView(VIEW.Photo);
                  setActiveSection(true);
                }}  
              >
                <img src={addPhotoIcon} alt='zdjęcie lokalu' className='w-[25px] mb-2' />
                {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-photo')?.value}</span>}
              </button>
            </li>
            <li className='inline-block'>
              <button 
                className={`w-full rounded-0 border-0 flex items-center flex-col p-[10px] transition-opacity ${view === VIEW.Products ? "opacity-100 bg-ed-yellow" : "opacity-50 bg-none bg-transparent"}`}
                onClick={() => {
                  setView(VIEW.Products);
                  setActiveSection(true);
                }}  
              >
                <img src={productsIcon} alt='dostępne produkty' className='w-[25px] mb-2' />
                {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-products')?.value}</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </main>
    </AppContext.Provider>
  )
}

export default App;