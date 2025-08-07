"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#15191C] text-white py-10 px-[5%] " id="footer">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-tomato">FoodHub</h2>
          <p className="text-sm mt-3 text-gray-300">
            Taste the best fast food in town! From spicy burgers to crispy
            fries, FoodHub brings flavor to your doorstep.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="#" className="hover:text-tomato">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tomato">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tomato">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tomato">
                Order Now
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-tomato" /> 123 Food Street, Dhaka
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-tomato" /> +880 123 456 789
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-tomato" /> support@foodhub.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-white text-[#15191C] p-2 rounded-full hover:bg-tomato hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white text-[#15191C] p-2 rounded-full hover:bg-tomato hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-[#15191C] p-2 rounded-full hover:bg-tomato hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
