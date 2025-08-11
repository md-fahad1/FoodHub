"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { food_list } from "@/public/assets/assets";
import { useState } from "react";
import { useAppDispatch } from "@/lib/features/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductInfo() {
  const { id } = useParams();
  const product = food_list.find((item) => item._id === id);

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return <div className="p-6 text-center text-lg">Product not found.</div>;
  }

  const handleIncrease = () => setQuantity((qty) => Math.min(qty + 1, 99));
  const handleDecrease = () => setQuantity((qty) => (qty > 1 ? qty - 1 : 1));
  const handleInputChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 99) val = 99;
    setQuantity(val);
  };

  const dispatchToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        count: quantity,
      })
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Left: Product Image */}
      <motion.div
        className="rounded-xl overflow-hidden shadow-md bg-gray-50 col-span-1"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={480}
          height={480}
          className="object-contain w-full h-full"
          priority
        />
      </motion.div>

      {/* Right: Info + Controls */}
      <section className="col-span-2 flex flex-col gap-8">
        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <span className="text-3xl font-bold text-tomato">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed max-w-xl">
          {product.description}
        </p>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-5">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden select-none">
            <button
              onClick={handleDecrease}
              className="px-4 py-2 text-xl font-semibold hover:bg-gray-100 transition"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              min={1}
              max={99}
              className="w-16 text-center outline-none font-semibold text-lg"
            />
            <button
              onClick={handleIncrease}
              className="px-4 py-2 text-xl font-semibold hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={dispatchToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-tomato to-red-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            🛒 Add to Cart
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: "description", label: "Description" },
              { id: "ingredients", label: "Ingredients" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 font-semibold ${
                  activeTab === tab.id
                    ? "border-tomato text-tomato"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 text-gray-700 max-w-3xl leading-relaxed"
              >
                {product.description || "No description available."}
              </motion.div>
            )}
            {activeTab === "ingredients" && (
              <motion.div
                key="ingredients"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 text-gray-700 max-w-3xl leading-relaxed"
              >
                <ul className="list-disc ml-6 space-y-1">
                  <li>Ingredient 1</li>
                  <li>Ingredient 2</li>
                  <li>Ingredient 3</li>
                </ul>
              </motion.div>
            )}
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 text-gray-700 max-w-3xl leading-relaxed"
              >
                <p>No reviews yet. Be the first to review!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
