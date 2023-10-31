"use client";
import {
    SelectedImgType,
  CartProdutType,
} from "@/app/product/[productId]/ProductDetails";

interface setColorProps {
  images: SelectedImgType[];
  cartProduct: CartProdutType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: React.FC<setColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
    console.log(cartProduct)
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">Color:</span>
        <div  className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={`
                h-7
                w-7
                rounded-full
                border-teal-300
                flex
                items-center
                justify-center

                ${
                  cartProduct.selectedImg.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }
                `}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="
                    h-5 
                    w-5
                    rounded-full
                    border-[1.2px]
                    border-slate-300
                    cursur-pointer
                    "
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
