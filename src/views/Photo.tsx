import { useContext } from "react";
import { AppContext } from "../context/AppContext";

type PhotoProps = {
  setImage: (texture: string) => void;
}

export const Photo:React.FC<PhotoProps> = ({ setImage }) => {
  const { translations, texture } = useContext(AppContext);
  
  const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }

  }

  return (
    <>
    <h3 className='font-noto italic text-[18px] mb-6 text-center'>{translations?.find(({ id }: {id:string}) => id === 'label-add-photos')?.value}</h3>
    <label className="block bg-[#f2f2f2] border-[#d6d6d6] border border-dashed rounded-[4px] px-[36px] py-[48px] grid place-content-center cursor-pointer">
      <span className="underline">{translations?.find(({ id }: {id:string}) => id === 'label-select-photos')?.value}</span>
      <input type="file" className="hidden" onChange={handleImageUpload}/>
    </label>

    {texture && <img src={texture} alt='texture' style={{ width: 100, height: 100, objectFit: 'cover', margin: 10}} />}
    </>
  )
};