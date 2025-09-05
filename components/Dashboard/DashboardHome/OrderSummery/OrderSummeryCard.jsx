"use client";

import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const OrderSummeryCard = ({ summery }) => {
  const isUp = summery.trend === "up";

  return (
    <div className="relative flex items-center bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 h-32">
      {/* Trend button top-right */}
      <div className="absolute top-1 right-4">
        <button
          className={`flex  items-center px-3 mb-1 py-1 rounded-full font-medium text-sm gap-1 ${
            isUp ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
          }`}
        >
          {isUp ? (
            <FaArrowUp size={10} className="text-green-400" />
          ) : (
            <FaArrowDown size={10} className="text-red-400" />
          )}
          <span className="text-sm">{Math.abs(summery.trendValue)}</span>
        </button>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-gray-300 text-gray-700 mr-4 p-4 flex-shrink-0">
          <div className="text-4xl">{summery.icon}</div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center mt-3">
          <p className="text-gray-500 font-medium">{summery.title}</p>
          <p className="text-2xl font-bold text-gray-800">{summery.amount}</p>
        </div>
      </div>

      {/* Icon */}
    </div>
  );
};

export default OrderSummeryCard;
