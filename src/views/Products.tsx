import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import useSWR from "swr";
import { API } from "../App";
import { fetcher } from "../utils/fetcher";
import { Model } from "../types";
import { list } from "../models";
import { nanoid } from "nanoid";

type ProductsProps = {
  addModel: (model:Model) => void;
}

export const Products:React.FC<ProductsProps> = ({ addModel }) => {
  const { translations, categories } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const { data, error: _error, isLoading: _isLoading } = useSWR(() => activeCategory ? `${API.products}?category=${encodeURI(activeCategory)}` : null, fetcher);

  const filteredProducts = filterInput ? data?.products.filter(({ name }: { name: string}) => name.includes(filterInput)) : data?.products;

  const handleModelClick = (configuratorVariants: any[]) => {
    if (Array.isArray(configuratorVariants) && configuratorVariants.length) {
      const { objectId } = configuratorVariants[0];

      if (list.includes(objectId)) {
        addModel({ name: objectId, id: nanoid(), rotation: 0});
      } else {
        return null;
      }
    }
    return null;
  }
  
  return (
    <>
      <input 
        type='text' 
        placeholder={translations?.find(({ id }: {id:string}) => id === 'label-search')?.value} 
        className='rounded-[4px] px-[20px] py-[14px] border border-[#D6D6D6] bg-ed-white text-[15px] leading-[20px] w-full mb-[24px]'
        value={filterInput}
        onChange={e => setFilterInput(e.target.value)}
      />

      <h3 className='font-noto italic text-[18px] mb-6 text-left'>{translations?.find(({ id }: {id:string}) => id === 'title-select-category')?.value}</h3>

      <ul className="flex gap-2 snap-x snap-mandatory scroll-pb-1 max-w-full overflow-x-auto mb-[24px]">
        {categories?.map(({id, name, path: _path}: {id: string, name: string, path:string}) => (
          <li key={id}>
            <button type="button" className={`rounded-[4px] px-2 py-4 whitespace-nowrap font-semibold ${activeCategory === name ? "bg-ed-yellow" : "bg-[#f2f2f2]"}`} onClick={() => setActiveCategory(name)}>{name}</button>
          </li>
        ))}
      </ul>
      
      <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
        {filteredProducts?.map(({id, images, name, path: _path, configuratorVariants}: {id: string, images: any, name:string, path: string, configuratorVariants: any[]}) => (
          // <li key={id} onClick={() => addModel({ name:'Stand', id, rotation: 0})}>
          <li key={id} onClick={() => handleModelClick(configuratorVariants)}>
            <img src={images[0]?.src} alt={images[0]?.alt} />
            <p className="font-manrope text-base text-ed-black2">{name}</p>
          </li>
        ))}
      </ul>

    </>
  )
}