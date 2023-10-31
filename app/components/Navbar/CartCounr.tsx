"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { FaShopify } from "react-icons/fa";

const CartCounr = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <FaShopify />
      </div>
      <span className="absolute top-[-13px] right-[-19px]   font-semibold text-pink-800 h-6 w-6 rounded-full items-center justify-center">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCounr;
