import Image from "next/image";
import React from "react";

function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 to-gray-300 mb-8 py-16 md:flex md:items-center md:justify-center">
      <div className="md:flex md:items-center md:justify-between mx-4 md:mx-auto max-w-7xl">
        <div className="md:w-2/5 p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-4 md:text-left">
            Perfums
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-black mb-4 md:text-left">
            Enjoy the Winter Discount
          </p>
        </div>
        <div className="md:w-3/5">
          <div className="w-full h-full relative aspect-w-2 aspect-h-3">
            <Image
              src="/hero.png"
              alt="perfumhero"
              width={800}
              height={600}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
