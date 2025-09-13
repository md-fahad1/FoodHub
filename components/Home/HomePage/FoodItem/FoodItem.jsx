"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  quantity,
  showControls,
  onToggleControls,
  onIncrease,
  onDecrease,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/food/${id}`); // Navigate to info page
  };

  const stopClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={500}
          height={300}
          className="w-full h-[200px] object-cover"
        />

        {/* Quantity Control */}
        <div className="absolute bottom-4 right-4">
          {!showControls ? (
            <button
              onClick={(e) => {
                stopClick(e);
                onToggleControls();
              }}
              className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
              title="Add to cart"
            >
              <FaPlus size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-lg">
              <button
                onClick={(e) => {
                  stopClick(e);
                  onDecrease();
                }}
                className="text-red-500 hover:text-red-700 transition"
                title="Decrease quantity"
              >
                <FaMinus size={14} />
              </button>
              <span className="font-medium text-gray-700">{quantity}</span>
              <button
                onClick={(e) => {
                  stopClick(e);
                  onIncrease();
                }}
                className="text-green-600 hover:text-green-800 transition"
                title="Increase quantity"
              >
                <FaPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className=" text-sm md:text-lg font-semibold text-gray-800">
            {name}
          </h3>
          <div className="hidden md:flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="text-red-600 text-sm md:text-xl font-bold mt-3">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
