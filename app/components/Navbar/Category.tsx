"use client"

import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  lable: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ icon: Icon, selected, lable }) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (lable === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updateQuery: any = {
        ...currentQuery,
        category: lable,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updateQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [lable,params,router]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-400 text-slate-800"
        : "border-transparent  text-slate-600"
    }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{lable}</div>
    </div>
  );
};

export default Category;
