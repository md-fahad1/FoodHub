"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/features/hooks"; // adjust import path
import {
  addToCart,
  removeFromCart,
  cartCountIncrement,
  cartCountDecrement,
} from "@/lib/features/cart/cartSlice"; // make sure these actions exist and are exported

const CartPage = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [promo, setPromo] = useState("");

  // Increase quantity by 1
  const increaseQuantity = (item) => {
    if (item.count >= 10) return; // max 10 quantity
    dispatch(cartCountIncrement(item.productId));
  };

  // Decrease quantity by 1; if count reaches 1 and user clicks decrease, remove item
  const decreaseQuantity = (item) => {
    if (item.count <= 1) {
      dispatch(removeFromCart(item.productId));
      return;
    }
    dispatch(cartCountDecrement(item.productId));
  };

  // Remove item completely
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate total amount without delivery fee
  const getTotalCartAmount = () =>
    items.reduce((total, item) => total + item.price * item.count, 0);

  const deliveryFee = getTotalCartAmount() > 0 ? 2 : 0;
  const total = getTotalCartAmount() + deliveryFee;

  return (
    <div className="pt-2 px-4 md:px-10 lg:px-20 pb-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
        🛒 Your Cart
      </h1>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg py-2 px-6 text-center">
          <p className="text-gray-500 text-lg mb-1">
            Your cart is currently empty.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="w-full overflow-auto rounded-lg shadow-md bg-white">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-6 font-semibold text-gray-500 text-sm px-6 py-2 border-b">
                <p>Item</p>
                <p className="col-span-2">Title</p>
                <p>Price</p>
                <p>Qty</p>
                <p>Total</p>
              </div>

              {items.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-6 items-center px-6 py-5 border-b text-gray-800 text-sm"
                >
                  <Image
                    src={
                      typeof item.image === "string"
                        ? item.image
                        : item.image?.url || "/placeholder.png"
                    }
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <p className="col-span-2 font-medium">{item.name}</p>
                  <p>${(+item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <p>${(item.price * item.count).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary + Promo */}
          <div className="mt-3 flex flex-col lg:flex-row justify-between gap-10">
            {/* Summary */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push("/placeorder")}
                disabled={getTotalCartAmount() === 0}
                className={`w-full mt-4 py-3 text-white font-medium rounded-lg transition ${
                  getTotalCartAmount() === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-tomato hover:bg-red-600"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Promo Code */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Got a Promo Code?
              </h3>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-grow px-4 py-3 focus:outline-none"
                />
                <button
                  className="bg-black text-white px-6 hover:bg-gray-800 transition"
                  onClick={() => alert("Promo applied (not implemented)")}
                >
                  Apply
                </button>
              </div>
              {promo && (
                <p className="text-sm text-green-600 mt-2">
                  Promo code "<strong>{promo}</strong>" added!
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
