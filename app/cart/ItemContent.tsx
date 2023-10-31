"use client";
import { CartProdutType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/Products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProdutType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveFromCart, handleCartQtyIncrease, handleCartQtyDecrease } =
    useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-600 py-4 items-center">
      <div
        className="
               col-span-2 
               justify-self-start
               flex 
               gap-2
               md:gap-4
               "
      >
        <Link href={`/product/${item.id}`}>
          <div className="relative  w-[70px] aspect-square">
            <Image
              src={item.selectedImg?.image} // Use optional chaining (?.)
              alt={item.name}
              fill
              className="object-contain" // Fixed typo: "object-contain" instead of "onject-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          {/* <div>{item.selectedImg.color}</div> */}
          <div>
            {item.selectedImg && item.selectedImg.color && (
              <div>{item.selectedImg.color}</div>
            )}
          </div>

          <div className="w-[70px]">
            <button
              className="text-slate-600 underline"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">${item.price.toFixed(2)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        ${(item.price * item.quaantity).toFixed(2)}
      </div>
    </div>
  );
};

export default ItemContent;
