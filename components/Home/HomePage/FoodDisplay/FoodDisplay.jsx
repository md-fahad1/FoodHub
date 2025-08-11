"use client";

import React, { useState } from "react";
import { food_list } from "@/public/assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { useAppDispatch } from "@/lib/features/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Link from "next/link";

const FoodDisplay = () => {
  const [category, setCategory] = useState("All");
  const [viewAll, setViewAll] = useState(false);
  const dispatch = useAppDispatch();

  const [activeControls, setActiveControls] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleToggleControls = (id, product) => {
    setActiveControls((prev) => ({ ...prev, [id]: true }));
    setQuantities((prev) => ({ ...prev, [id]: prev[id] || 1 }));
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
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
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
      setQuantities((prev) => ({ ...prev, [id]: newQty }));
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
      setActiveControls((prev) => ({ ...prev, [id]: false }));
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
      dispatch(addToCart({ productId: product._id, count: 0 }));
    }
  };
  console.log("Food Display Rendered", food_list);
  // Generate unique category list
  const categories = [
    "All",
    ...new Set(food_list.map((item) => item.category)),
  ];

  // Filter food items based on category
  const filteredFood = food_list.filter(
    (item) => category === "All" || item.category === category
  );

  const visibleFood = viewAll ? filteredFood : filteredFood.slice(0, 12);

  return (
    <div className="mt-4 px-2 md:px-6 mb-6" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-bold text-[#262626] mb-4">
        Top Dishes Near You
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setViewAll(false);
            }}
            className={`px-4 py-1.5 rounded-full border ${
              category === cat
                ? "bg-tomato text-white"
                : "bg-white text-gray-800"
            } hover:bg-tomato hover:text-white transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {visibleFood.map((item) => (
          <Link href={`/products/product-info/${item._id}`} key={item._id}>
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
          </Link>
        ))}
      </div>

      {/* View All Button */}
      {!viewAll && filteredFood.length > 12 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setViewAll(true)}
            className="px-6 py-2 bg-tomato text-white rounded-full hover:bg-[#c92c23] transition"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
