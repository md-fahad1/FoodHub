// "use client";

// import * as React from "react";
// import Box from "@mui/material/Box";
// import OrderSummeryCard from "./OrderSummeryCard";
// import { RiFileList2Fill } from "react-icons/ri";
// import { BsFillCartCheckFill, BsFillBoxSeamFill } from "react-icons/bs";
// import { GiProfit } from "react-icons/gi";
// import { BiSolidDish } from "react-icons/bi";
// import { FaBox } from "react-icons/fa";
// import axios from "axios";
// import { FaSellsy } from "react-icons/fa";

// const OrderSummery = () => {
//   const [orderSummery, setOrderSummery] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/monthly`;
//   const API_URL_WEEK = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/weakly/now`;
//   const API_URL_SIX_MONTH = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/sales/last-6-months`;

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [resMonth, resWeek] = await Promise.all([
//           axios.get(API_URL),
//           axios.get(API_URL_SIX_MONTH),
//         ]);

//         const monthlyData = resMonth.data || [];
//         const weeklyData = resWeek.data || [];

//         setOrderSummery([
//           {
//             title: "Total Dish",
//             icon: <BiSolidDish className="text-[60px] text-tomato" />,
//             amount: monthlyData[0]?.totalSales || 0,
//           },
//           {
//             title: "Total Sales",
//             icon: <FaSellsy className="text-[60px] text-yellow" />,
//             amount: monthlyData[1]?.totalSales || 0,
//           },
//           {
//             title: "Total Orders",
//             icon: <FaBox className="text-[55px] text-purple" />,
//             amount: weeklyData[0]?.totalSales || 0,
//           },
//           {
//             title: "Total Profit",
//             icon: <GiProfit className="text-[60px] text-dash-primary" />,
//             amount: weeklyData[0]?.todaySales || 0, // Assuming your API provides this, otherwise adjust
//           },
//         ]);

//         setError(null);
//       } catch (err) {
//         console.error("Error fetching summary:", err);
//         setError("Failed to fetch order summary");
//         setOrderSummery([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // ✅ Empty dependency array to avoid infinite loop

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-32 text-dash-primary">
//         Loading summary...
//       </div>
//     );

//   if (error)
//     return <div className="text-center text-red-500 py-8">{error}</div>;

//   return (
//     <section>
//       <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {orderSummery.map((summery, idx) => (
//           <OrderSummeryCard key={idx} summery={summery} />
//         ))}
//       </Box>
//     </section>
//   );
// };

// export default OrderSummery;
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import OrderSummeryCard from "./OrderSummeryCard";
import { BiSolidDish } from "react-icons/bi";
import { FaBox, FaSellsy } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";

const OrderSummery = () => {
  // Dummy data
  const orderSummery = [
    {
      title: "Total Dish",
      icon: <BiSolidDish className="text-tomato" />,
      amount: 120,
      trend: "up",
      trendValue: 15,
    },
    {
      title: "Total Sales",
      icon: <FaSellsy className="text-blue-500" />,
      amount: 4500,
      trend: "down",
      trendValue: 300,
    },
    {
      title: "Total Orders",
      icon: <FaBox className="text-yellow" />,
      amount: 78,
      trend: "up",
      trendValue: 12,
    },
    {
      title: "Total Profit",
      icon: <GiProfit className="text-green-500" />,
      amount: 3200,
      trend: "down",
      trendValue: 150,
    },
  ];

  return (
    <section className="p-4">
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderSummery.map((summery, idx) => (
          <OrderSummeryCard key={idx} summery={summery} />
        ))}
      </Box>
    </section>
  );
};

export default OrderSummery;
