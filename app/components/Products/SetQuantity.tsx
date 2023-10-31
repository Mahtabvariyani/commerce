"use client"
import { CartProdutType } from "@/app/product/[productId]/ProductDetails";


interface setQtyProps{
  cartCounter?: boolean;
  cartProduct:CartProdutType;
  handleQtyIncrease: () => void ;
  handleQtyDecrease: () => void ;
}

const SetQuantity: React.FC<setQtyProps>=(
{
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease
}

)=> {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">
        Quantity:
        </div>}
      <div className="flex gap-4 items-center text-base">
        <button className="btn-DI" onClick={handleQtyDecrease}>-</button>
        <div>{cartProduct.quaantity}</div>
        <button className="btn-DI"  onClick={handleQtyIncrease}>+</button>
      </div>
    </div>
  )
}

export default SetQuantity
