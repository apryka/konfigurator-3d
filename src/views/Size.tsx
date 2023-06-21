import { useContext } from "react";
import { RoomSize } from "../types";
import { AppContext } from "../context/AppContext";

type SizeProps = {
  size?: RoomSize;
  setSize: (size:RoomSize) => void;
}

export const Size: React.FC<SizeProps> = ({ size, setSize }) => {
  const inputSize = size ?? [undefined, undefined];
  const { translations } = useContext(AppContext);
  return (
    <>
      <h3 className='font-noto italic text-[18px] mb-6 text-left'>{translations?.find(({ id }: {id:string}) => id === 'title-store-size')?.value}</h3>

        <div className='flex flex-wrap gap-4'>
        <label className='text-[15px] leading-[20px] flex flex-col flex-1 text-left'>
          {translations?.find(({ id }: {id:string}) => id === 'label-width')?.value}
          <input type='number' min={1} className='rounded-[4px] px-[20px] py-[14px] border border-[#D6D6D6] bg-ed-white text-[15px] leading-[20px]' value={inputSize[0] ?? ''} onChange={e => setSize([e.target.valueAsNumber, inputSize[1] ?? 1])} />
        </label>
        <label className='text-[15px] leading-[20px] flex flex-col flex-1 text-left'>
          {translations?.find(({ id }: {id:string}) => id === 'label-height')?.value}
          <input type='number' min={1} className='rounded-[4px] px-[20px] py-[14px] border border-[#D6D6D6] bg-ed-white text-[15px] leading-[20px]' value={inputSize[1] ?? ''} onChange={e => setSize([inputSize[0] ?? 1, e.target.valueAsNumber])}  />
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