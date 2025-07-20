"use client";

import React, { useState } from "react";
import { food_list } from "@/public/assets/assets";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = () => {
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const newCount = prev[id] - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8 mb-6" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-bold text-[#262626] ">
        Top Dishes Near You
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          <option value="Chicken">Chicken</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Beef">Beef</option>
        </select>
      </div>

      {/* Responsive Food Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {food_list.map((item) => {
          if (category === "All" || item.category === category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
