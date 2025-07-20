"use client";

import React from "react";
import Image from "next/image";
import { menu_list } from "@/public/assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 px-[4%] py-10" id="explore-menu">
      <h1 className="text-[#262626] font-medium text-3xl">Explore our menu</h1>

      <p className="text-[#808080] max-w-[100%] md:max-w-[60%] text-base leading-relaxed">
        Dive into a world of flavors with our carefully crafted menu. From juicy
        burgers and crispy fries to mouth-watering desserts — FoodHub brings
        your cravings to life with every bite.
      </p>

      <div className="flex items-center gap-[30px] overflow-x-scroll no-scrollbar text-center my-5">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <div
              className={`relative w-[7.5vw] min-w-[80px] aspect-square rounded-full overflow-hidden transition-all duration-200 ${
                category === item.menu_name
                  ? "border-[4px] border-[tomato] p-[2px]"
                  : ""
              }`}
            >
              <Image
                src={item.menu_image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="mt-[10px] text-[#747474] text-[max(1.4vw,16px)]">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-2 h-[2px] bg-[#e2e2e2] border-0" />
    </div>
  );
};

export default ExploreMenu;
