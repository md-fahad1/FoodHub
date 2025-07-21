"use client";

import React, { useState } from "react";
import { food_list } from "@/public/assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { useAppDispatch } from "@/lib/features/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Swal from "sweetalert2";

const FoodDisplay = () => {
  const [category, setCategory] = useState("All");
  const dispatch = useAppDispatch();

  // Track which items have controls shown and their quantities
  const [activeControls, setActiveControls] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleToggleControls = (id, product) => {
    setActiveControls((prev) => ({
      ...prev,
      [id]: true, // once clicked, show controls (never hide unless quantity = 0)
    }));

    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] || 1,
    }));

    // Add 1 item on first click
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        count: 1,
      })
    );
  };

  const handleIncrease = (id, product) => {
    const newQty = (quantities[id] || 1) + 1;
    setQuantities((prev) => ({
      ...prev,
      [id]: newQty,
    }));
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        count: newQty,
      })
    );
  };

  const handleDecrease = (id, product) => {
    const currentQty = quantities[id] || 1;
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      setQuantities((prev) => ({
        ...prev,
        [id]: newQty,
      }));
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          count: newQty,
        })
      );
    } else {
      // Remove item from cart & hide controls if qty goes to 0
      setActiveControls((prev) => ({
        ...prev,
        [id]: false,
      }));
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
      dispatch(
        addToCart({
          productId: product._id,
          count: 0,
        })
      );
    }
  };

  return (
    <div className="mt-4 px-2 md:px-6 mb-6" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-bold text-[#262626] mb-4">
        Top Dishes Near You
      </h2>

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 mb-6 border border-gray-300 rounded-md"
      >
        <option value="All">All</option>
        <option value="Chicken">Chicken</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Beef">Beef</option>
      </select>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {food_list.map((item) =>
          category === "All" || item.category === category ? (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              quantity={quantities[item._id] || 0}
              showControls={activeControls[item._id] || false}
              onToggleControls={() => handleToggleControls(item._id, item)}
              onIncrease={() => handleIncrease(item._id, item)}
              onDecrease={() => handleDecrease(item._id, item)}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
