"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { food } from "@/public/assets/assets";

const Hero1 = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % food.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + food.length) % food.length);
  };

  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden px-4 md:px-12 py-8 md:h-[600px]">
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/3 space-y-6 text-center md:text-left order-2 md:order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-4xl text-tomato font-bold uppercase flex flex-wrap gap-2 justify-center md:justify-start">
              {food[current].name.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <p className="text-gray-600 mt-2 flex flex-wrap gap-1 justify-center md:justify-start">
              {food[current].description.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </p>

            <motion.button
              className="bg-tomato mt-4 text-white font-medium px-5 py-2 rounded-full w-fit hover:bg-gray-200 transition"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              view menu →
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT IMAGES */}
      <div className="relative w-full md:w-2/3 h-[300px] md:h-full flex items-center justify-center mb-6 md:mb-0 order-1 md:order-2">
        {food.map((item, index) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % food.length;
          const isPrev = index === (current - 1 + food.length) % food.length;

          return (
            <AnimatePresence key={index}>
              {/* Main Active Image */}
              {isActive && (
                <motion.div
                  key={item._id}
                  initial={{ scale: 0.7, x: 200, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0.6, x: -300, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute z-20 hidden md:block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={520}
                    height={520}
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                  />
                </motion.div>
              )}

              {/* Main Image for Mobile */}
              {isActive && (
                <motion.div
                  key={item._id + "-mobile"}
                  className="block md:hidden w-full h-[300px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain w-full h-full"
                  />
                </motion.div>
              )}

              {/* Next/Prev Images - only on desktop */}
              {isNext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ x: 250, scale: 0.8, opacity: 0.5 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute blur-md z-10 hidden md:block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={380}
                    height={380}
                    className="object-contain"
                  />
                </motion.div>
              )}

              {isPrev && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ x: -250, scale: 0.8, opacity: 0.5 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute blur-md z-10 hidden md:block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Arrows - hidden on mobile */}
      <button
        onClick={handlePrev}
        className="absolute left-6 bottom-10 bg-tomato/60 text-white p-3 rounded-full hover:bg-black hidden md:block"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 bottom-10 bg-tomato/60 text-white p-3 rounded-full hover:bg-black hidden md:block"
      >
        ▶
      </button>
    </div>
  );
};

export default Hero1;
