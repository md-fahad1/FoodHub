"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

const food_list = [
  {
    _id: "1",
    name: "Cheese Burger",
    price: 8,
    image: "/burger.jpg",
  },
  {
    _id: "2",
    name: "Veg Pizza",
    price: 10,
    image: "/pizza.jpg",
  },
];

const initialCartItems = {
  1: 2,
  2: 1,
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promo, setPromo] = useState("");
  const router = useRouter();

  const updateQuantity = (id, type) => {
    const updated = { ...cartItems };
    if (type === "inc") updated[id] += 1;
    else if (type === "dec" && updated[id] > 1) updated[id] -= 1;
    setCartItems(updated);
  };

  const removeFromCart = (id) => {
    const updated = { ...cartItems };
    delete updated[id];
    setCartItems(updated);
  };

  const getTotalCartAmount = () =>
    food_list.reduce(
      (total, item) => total + (cartItems[item._id] || 0) * item.price,
      0
    );

  const deliveryFee = getTotalCartAmount() > 0 ? 2 : 0;
  const total = getTotalCartAmount() + deliveryFee;

  return (
    <div className="pt-2 px-4 md:px-10 lg:px-20 pb-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
        🛒 Your Cart
      </h1>

      {/* Empty cart fallback */}
      {Object.keys(cartItems).length === 0 ? (
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

              {food_list.map((item) =>
                cartItems[item._id] ? (
                  <div
                    key={item._id}
                    className="grid grid-cols-6 items-center px-6 py-5 border-b text-gray-800 text-sm"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <p className="col-span-2 font-medium">{item.name}</p>
                    <p>${item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, "dec")}
                        className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span>{cartItems[item._id]}</span>
                      <button
                        onClick={() => updateQuantity(item._id, "inc")}
                        className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <p>${item.price * cartItems[item._id]}</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Summary + Promo */}
          <div className="mt-3 flex flex-col lg:flex-row justify-between gap-10">
            {/* Summary */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalCartAmount()}</span>
              </div>
              <hr />
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button
                onClick={() => router.push("/placeorder")}
                disabled={getTotalCartAmount() === 0}
                className={`w-full mt-4 py-3 text-white font-medium rounded-lg transition ${
                  getTotalCartAmount() === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
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
