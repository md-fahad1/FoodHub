"use client";

import React from "react";
import Image from "next/image";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";

// Dummy icon assets (replace with actual if needed)
const assets = {
  rating_stars: "/icons/rating-stars.svg", // Replace with your image or remove if not available
};

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const quantity = cartItems[id] || 0;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300">
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
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(id)}
              className="bg-tomato text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
              title="Add to cart"
            >
              <FaPlus size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-lg">
              <button
                onClick={() => removeFromCart(id)}
                className="text-red-500"
              >
                <FaMinus size={14} />
              </button>
              <span className="font-medium text-gray-700">{quantity}</span>
              <button onClick={() => addToCart(id)} className="text-green-600">
                <FaPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="text-tomato text-xl font-bold mt-3">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
