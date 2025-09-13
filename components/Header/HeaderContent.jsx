"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/features/hooks"; // adjust this path if needed
import { cartVisible } from "@/lib/features/cart/cartSlice"; // optional, only if used

const Navbar = ({ setLogin }) => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "home", href: "/" },
    { name: "menu", href: "#explore-menu" },
    { name: "Blog", href: "#blog" },
    { name: "contact us", href: "#footer" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FoodHub Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-tomato tracking-wide">
                FoodHub
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenu(item.name)}
                  className={`capitalize hover:text-black transition ${
                    menu === item.name
                      ? "text-black font-semibold border-b-2 border-black"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link href={item.href} key={item.name}>
                  <span
                    onClick={() => setMenu(item.name)}
                    className={`capitalize hover:text-black transition cursor-pointer ${
                      menu === item.name
                        ? "text-black font-semibold border-b-2 border-black"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <FaHeart className="text-xl text-gray-600 hover:text-red-600 transition" />
            </Link>

            {/* Cart */}
            <Link href="/cartpage">
              <div className="relative cursor-pointer">
                <FaShoppingCart className="text-xl text-gray-600 hover:text-green-600 transition" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Sign In */}
            <Link href="/signin">
              <button className="hidden md:inline-block  text-black px-4 py-0.5 rounded-md hover:bg-tomato hover:text-white border-2 border-tomato transition">
                Sign In
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none text-xl text-gray-600"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col px-4 py-4 gap-4">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setMenu(item.name);
                    toggleMenu();
                  }}
                  className={`capitalize hover:text-black transition ${
                    menu === item.name
                      ? "text-black font-semibold border-b border-black"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link href={item.href} key={item.name}>
                  <span
                    onClick={() => {
                      setMenu(item.name);
                      toggleMenu();
                    }}
                    className={`capitalize hover:text-black transition cursor-pointer ${
                      menu === item.name
                        ? "text-black font-semibold border-b border-black"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            )}

            {/* Mobile Sign In */}
            <Link href="/signin">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-tomato text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
