"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatData } from "@/utils/formatPrice";
import { safeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: safeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Yout Cart is Empty</div>
        <div>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1">
            <IoChevronBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-400 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            lable="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between text-base font-semibold w-full">
            <span>Subtotal</span>
            <span>{formatData(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping calculated at checkout
          </p>
          <Button
            outline={currentUser ? false : true}
            lable={currentUser ? "Checkout" : "Login to Check out"}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />

          <Link href={"/"} className="text-slate-500 flex items-center gap-1">
            <IoChevronBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
