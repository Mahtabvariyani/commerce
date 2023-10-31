"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
  id: string;
  lable: string;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  id,
  lable,
  disabled,
  register,
}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...(register && register(id))}
        placeholder=""
        className="cursur-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {lable} 
      </label>
    </div>
  );
};

export default CustomCheckBox;
