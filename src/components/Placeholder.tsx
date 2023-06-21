import { useContext } from "react";
import { AppContext } from "../context/AppContext";

type PlaceholderProps = {
  onClick: () => void;
}

export const Placeholder:React.FC<PlaceholderProps> = ({ onClick }) => {
  const { translations: _translations } = useContext(AppContext);
  return (
    <div 
      className='rounded-[4px] border-[#D5B51B] border border-dashed bg-[#FFF5C8] text-[#D5B51B] font-manrope text-[14px] leading-[18px] text-center px-[20px] py-[10px] w-max max-w-full m-auto my-[15vh] cursor-pointer'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }
    }
    >
      Uzupełnij wymiary lokalu oraz wybierz szablon sklepu
    </div>
  )
}