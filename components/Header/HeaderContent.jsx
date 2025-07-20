"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link href="/" className="text-2xl font-bold text-tomato tracking-wide">
        FoodHub
      </Link>

      {/* Menu */}
      <ul className="flex gap-6 items-center font-medium text-gray-700">
        <Link href="/" legacyBehavior>
          <a
            onClick={() => setMenu("home")}
            className={`capitalize hover:text-black transition ${
              menu === "home"
                ? "text-black font-semibold border-b-2 border-black"
                : ""
            }`}
          >
            home
          </a>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`capitalize hover:text-black transition ${
            menu === "menu"
              ? "text-black font-semibold border-b-2 border-black"
              : ""
          }`}
        >
          menu
        </a>
        <a
          href="#app-downlaod"
          onClick={() => setMenu("mobile-app")}
          className={`capitalize hover:text-black transition ${
            menu === "mobile-app"
              ? "text-black font-semibold border-b-2 border-black"
              : ""
          }`}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`capitalize hover:text-black transition ${
            menu === "contact-us"
              ? "text-black font-semibold border-b-2 border-black"
              : ""
          }`}
        >
          contact us
        </a>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Wishlist Icon */}
        <Link href="/wishlist">
          <div className="relative group cursor-pointer">
            <FaHeart className="text-xl text-gray-600 group-hover:text-red-600 transition" />
          </div>
        </Link>

        {/* Cart Icon */}
        <Link href="/cartpage">
          <div className="relative group cursor-pointer">
            <FaShoppingCart className="text-xl text-gray-600 group-hover:text-green-600 transition" />
            <div className="absolute -top-1 -right-1 h-[8px] w-[8px] bg-red-600 rounded-full" />
          </div>
        </Link>

        {/* Sign In Button */}
        <button
          onClick={() => setLogin(true)}
          className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
        >
          sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
