"use client";

import React, { useState } from "react";
import { food_list } from "@/public/assets/assets";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = () => {
  // Dummy food list

  // Selected category (can change this if needed)
  const [category, setCategory] = useState("All");

  // Cart state: object with item id as key and quantity as value
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
    <div className="mt-8 px-[4%]" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-semibold text-[#262626]">
        Top dishes near you
      </h2>

      {/* Category selector for demo */}
      <div className="my-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Chicken">Chicken</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Beef">Beef</option>
        </select>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7 gap-y-12 mt-8 mb-6">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
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
