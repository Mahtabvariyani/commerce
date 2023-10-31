"use client";

import { IconType } from "react-icons";

interface CategoriesInputProps {
  selected?: boolean;
  lable: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoriesInput: React.FC<CategoriesInputProps> = ({
  selected,
  lable,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(lable)}
      className={`flex-col items-center gap-2 hover:border-slate-500
  transition cursor-pointer
  rounded-xl border-2 p-4 flex
  ${selected ? "border-slate-500" : "border-slate-200"}
  
  `}
    >
      <Icon size={30} />
      <div className="font-medium">{lable}</div>
    </div>
  );
};

export default CategoriesInput;
