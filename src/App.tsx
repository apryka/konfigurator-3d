import { useState } from 'react';
import useSWR from 'swr';

import { Photo } from './views/Photo';
import { Size } from './views/Size';
import { Products } from './views/Products';
import { Placeholder } from './components/Placeholder';
import { Configurator } from './components/Configurator';

import addPhotoIcon from './assets/add-photo.svg';
import productsIcon from './assets/products.svg';
import sizeIcon from './assets/size.svg';
import { Model, RoomSize, VIEW } from './types';

import { AppContext } from './context/AppContext';
import { fetcher } from './utils/fetcher';
import { useModels } from './components/useModels';

export const API = {
  translations: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/cms/pages/mobile?path=settings',
  categories: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/categories',
  products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search',
  // products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search/configurator',
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

  const [addLoadedModel, loadedModels] = useModels();

  const { data: translationsData, error:_translationsDataError, isLoading: translationsDataIsLoading } = useSWR(API.translations, fetcher);
  const translations = translationsData?.contentSections[0].properties;
  const { data: categoriesData, error:_categoriesDataError, isLoading: _categoriesDataIsLoading } = useSWR(API.categories, fetcher);

  const handleTextureImage = (texture:string) => {
    setTexture(texture);
  };

  const addModel = (model:Model) => {
    addLoadedModel(model.name);
    setModels((state) => [...state, model]);
  }

  return (
    <AppContext.Provider value={{
      translations,
      categories: categoriesData,
      models,
      texture,
      roomSize,
      loadedModels,
    }}>
    <main className="bg-[#EBECED] font-manrope text-ed-black2 flex flex-col min-h-screen">

      <div onClick={() => setActiveSection(false)}>{roomSize ? <Configurator selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <Placeholder onClick={() => setActiveSection(true)} />}</div>

      <section 
        className={`bg-ed-white text-ed-black2 rounded-tl-[30px] rounded-tr-[30px] font-manrope px-4 py-[60px] mt-auto pb-[150px] absolute top-0 left-0 right-0 bottom-auto min-h-[50vh] transition-transform ${activeSection ? "translate-y-[50vh]" : "translate-y-[calc(100vh_-_150px)]"}`}
        onClick={() => setActiveSection(true)}
      >

      {roomSize && (
        <button
         type='button' 
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

        {view === VIEW.Size && <Size size={roomSize} setSize={setRoomSize} />}
        {view === VIEW.Photo && <Photo setImage={handleTextureImage} />}
        {view === VIEW.Products && <Products addModel={addModel} />}
            
      </section>

      <div className='fixed z-20 bottom-0 left-0 w-full bg-[#dedede] text-ed-black2 rounded-tl-[30px] rounded-tr-[30px] h-[90px]'>
        <nav>
          <ul className='flex gap-4 items-center justify-center text-sm leading-tight'>
            <li>
              <button 
                className={`bg-none bg-transparent rounded-0 border-0 flex items-center flex-col p-[20px] px-[10px] transition-opacity ${view === VIEW.Size ? "opacity-100" : "opacity-50"}`}
                onClick={() => setView(VIEW.Size)}    
              >
                <img src={sizeIcon} alt='wymiary lokalu' className='w-[25px] mb-2' />
                {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-store-size')?.value}</span>}
              </button>
            </li>
            <li>
              <button 
                className={`bg-none bg-transparent rounded-0 border-0 flex items-center flex-col py-[20px] px-[10px] transition-opacity ${view === VIEW.Photo ? "opacity-100" : "opacity-50"}`}
                onClick={() => setView(VIEW.Photo)}  
              >
                <img src={addPhotoIcon} alt='zdjęcie lokalu' className='w-[25px] mb-2' />
                {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-photo')?.value}</span>}
              </button>
            </li>
            <li>
              <button 
                className={`bg-none bg-transparent rounded-0 border-0 flex items-center flex-col p-[20px] px-[10px] transition-opacity ${view === VIEW.Products ? "opacity-100" : "opacity-50"}`}
                onClick={() => setView(VIEW.Products)}  
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