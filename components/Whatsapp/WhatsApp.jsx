"use client";

import React, { useState } from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaFacebookMessenger,
  FaHeadset,
} from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-5 right-3 md:right-5 bg-green-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-700 transition-all z-50"
      >
        <MdContactPhone size={22} />
        <span className="font-semibold">Contact</span>
      </button>

      {/* Modal Backdrop (always rendered) */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full md:max-w-md p-6 rounded-xl shadow-lg transform transition-transform duration-[2000ms] ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-red-500 transition"
            >
              <IoClose size={28} />
            </button>
          </div>

          {/* Contact Options */}
          <div className="space-y-4">
            <a
              href="https://wa.me/8801761402081"
              target="_blank"
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 transition"
            >
              <FaWhatsapp className="text-green-500" size={20} />
              <span className="text-gray-700 font-medium">WhatsApp</span>
            </a>

            <a
              href="tel:01761402081"
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 transition"
            >
              <FaPhone className="text-blue-500" size={20} />
              <span className="text-gray-700 font-medium">Call Us</span>
            </a>

            <a
              href="https://m.me/"
              target="_blank"
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-indigo-50 transition"
            >
              <FaFacebookMessenger className="text-indigo-500" size={20} />
              <span className="text-gray-700 font-medium">Messenger</span>
            </a>

            <a
              href="mailto:complain@example.com"
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-red-50 transition"
            >
              <FaHeadset className="text-red-500" size={20} />
              <span className="text-gray-700 font-medium">Complain</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
