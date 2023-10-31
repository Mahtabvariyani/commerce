"use client";

import SetColor from "@/app/components/Products/SetColor";
import { Rating } from "@mui/material";
import React, { use, useCallback, useEffect, useState } from "react";
import SetQuantity from "@/app/components/Products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/Products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

export type CartProdutType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quaantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horisontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProdutType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quaantity: 1,
    price: product.price,
  });
  const router = useRouter();
  console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quaantity === 20) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quaantity: prev.quaantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quaantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quaantity: prev.quaantity - 1 };
    });
  }, [cartProduct]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium tex-slate-700 ">{product.name}</h2>
        <div className="flex items-center gap-2 ">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} Reviews</div>
        </div>
        <Horisontal />
        <div className="text-justify">{product.description}</div>
        <Horisontal />
        <div>
          <span>
            <strong className="font-semibold">Category:</strong>
          </span>
          {product.category}
        </div>
        <div>
          <span>
            <strong>Brand:</strong>
          </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-500" : "text-red-700"}>
          {product.inStock ? "In Stock" : "Out Of Stock"}
        </div>
        <Horisontal />
        {isProductInCart ? (
          <>
            <p className="mb-2  text-slate-500 flex items-center gap-1">
              <AiFillCheckCircle size={20} className="text-teal-400" />
              <span>Product added to Cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                lable="View Cart Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horisontal />
            <div>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
              />
            </div>
            <Horisontal />
            <div className="max-w-[320px]">
              <Button
                outline
                lable="Add to Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
