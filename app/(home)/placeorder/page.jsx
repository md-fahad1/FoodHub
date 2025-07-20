"use client";

const PlaceOrder = () => {
  return (
    <form className="flex flex-col lg:flex-row justify-between gap-8 mt-16 px-4 lg:px-20">
      {/* Left Side - Delivery Info */}
      <div className="w-full lg:w-1/2">
        <p className="text-3xl font-semibold mb-8 text-gray-800">
          Delivery Information
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Zip code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <input
          type="tel"
          placeholder="Phone"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Right Side - Cart Summary */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Cart Total
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>500</p>
          </div>
          <hr />
          <div className="flex justify-between text-gray-700">
            <p>Delivery Fee</p>
            <p>$50</p>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <p>Total</p>
            <p>$550</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-8 bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
