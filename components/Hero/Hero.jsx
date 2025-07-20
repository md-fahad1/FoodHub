"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] mt-2 rounded-xl overflow-hidden shadow-md">
      {/* Background Image */}
      <Image
        src="/home.jpg"
        alt="Delicious Food"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-10 text-white">
        <div className=" px-1 py-1 md:px-6 md:py-4 rounded-md max-w-[90%] sm:max-w-[60%] md:max-w-[50%] mb-4">
          <h1 className=" text-2xl md:text-4xl sm:text-5xl font-bold leading-tight">
            Order your favorite <br /> food here
          </h1>
        </div>
        <p className="text-sm sm:text-base max-w-[90%] md:max-w-[70%] mb-6">
          Discover delicious meals from top restaurants near you. Whether you're
          craving something spicy, sweet, or savory — FoodHub brings the best
          flavors to your doorstep in no time.
        </p>
        <button className="bg-tomato text-white font-medium px-5 py-1 rounded-full w-fit hover:bg-gray-200 transition">
          view menu
        </button>
      </div>
    </div>
  );
};

export default Hero;
