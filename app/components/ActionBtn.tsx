import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`


flex items-center 
    justify-center rounded
    h-[30px]
    text-slate-700
    border
    border-slate-400
     cursor-pointer w-[40px]
     
     ${disabled && "opacity-50 cursor-not-allowed"}
     `}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionBtn;
