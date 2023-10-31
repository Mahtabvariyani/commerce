"use client"
import React from "react";
import Container from "../Container";
import { categories } from "@/utils/categories";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");


  const pathname = usePathname()
  const isMainPage = pathname === '/'
  if(!isMainPage) return null
  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.lable}
              lable={item.lable}
              icon={item.icon}
              selected={category === item.lable || (category === null && item.lable === 'All')}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
