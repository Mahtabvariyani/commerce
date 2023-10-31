"use client";

import { useCallback, useEffect, useState } from "react";
import { ImageType } from "../admin/add-prodcuts/AddProcustForm";
import SelectImage from "./inputs/SelectImage";
import Button from "./Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFormState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  removeImageFormState,
  addImageToState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);
  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFormState(item);
    }
  }, []);

  return (
    <div
      className="
  grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px]
  border-slate-200 items-center p-2
  "
    >
      <div
        className="
    flex flex-row gap-2 items-center h-[60px]
    "
      >
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
            <p>{file?.name}</p>
            <div className="w-70px">
              <Button
                small
                outline
                lable="cancle"
                onClick={() => {
                  setFile(null);
                  removeImageFormState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
