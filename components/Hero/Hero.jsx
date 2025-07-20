"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[500px] mt-2 rounded-xl overflow-hidden shadow-md">
      {/* Background Image */}
      <Image
        src="/home.jpg" // adjust path if needed
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 shadow-md"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-10 text-white">
        <div className="  px-6 py-4 rounded-md max-w-[80%] sm:max-w-[60%] md:max-w-[50%] mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Order your favorite <br /> food here
          </h1>
        </div>
        <p className="text-sm sm:text-base max-w-[70%] mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          inventore nihil ex magnam autem culpa veniam debitis delectus expedita
          pariatur?
        </p>
        <button className="bg-white text-black font-medium px-6 py-2 rounded-full w-fit hover:bg-gray-200 transition">
          view menu
        </button>
      </div>
    </div>
  );
};

export default Hero;
