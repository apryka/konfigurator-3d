import { useContext, useEffect, useState } from "react";
import { RoomSize } from "../types";
import { AppContext } from "../context/AppContext";

type SizeProps = {
  setSize: (size:RoomSize) => void;
}

export const Size: React.FC<SizeProps> = ({ setSize }) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const { translations } = useContext(AppContext);

  useEffect(() => {
    if (width && height) {
      setSize([width, height]);
    }
  }, [width, height]);

  return (
    <>
      <h3 className='font-noto italic text-[18px] mb-6 text-left'>{translations?.find(({ id }: {id:string}) => id === 'title-store-size')?.value}</h3>

        <div className='flex flex-wrap gap-4'>
        <label className='text-[15px] leading-[20px] flex flex-col flex-1 text-left'>
          {translations?.find(({ id }: {id:string}) => id === 'label-width')?.value}
          <input type='number' min={1} className='rounded-[4px] px-[20px] py-[14px] border border-[#D6D6D6] bg-ed-white text-[15px] leading-[20px]' value={width || ''} onChange={e => setWidth(e.target.valueAsNumber)} />
        </label>
        <label className='text-[15px] leading-[20px] flex flex-col flex-1 text-left'>
          {translations?.find(({ id }: {id:string}) => id === 'label-height')?.value}
          <input type='number' min={1} className='rounded-[4px] px-[20px] py-[14px] border border-[#D6D6D6] bg-ed-white text-[15px] leading-[20px]' value={height || ''} onChange={e => setHeight(e.target.valueAsNumber)}  />
        </label>
        </div>

        <hr className='border-[#D6D6D6] my-12' />

        <h3 className='font-noto italic text-[18px] mb-6 text-left'>{translations?.find(({ id }: {id:string}) => id === 'title-select-store')?.value}</h3>
        <ul>
          <li>
            <img src='' alt='' />
            <span>ŻABKA / Półka sklepowa</span>
          </li>
        </ul>
    </>
  )
}