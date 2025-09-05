"use client";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy monthly sales data
const monthlyData = [
  { month: "Jan", sales: 4500 },
  { month: "Feb", sales: 5200 },
  { month: "Mar", sales: 6100 },
  { month: "Apr", sales: 4800 },
  { month: "May", sales: 7000 },
  { month: "Jun", sales: 6700 },
  { month: "Jul", sales: 7200 },
  { month: "Aug", sales: 6800 },
  { month: "Sep", sales: 7500 },
  { month: "Oct", sales: 8000 },
  { month: "Nov", sales: 8500 },
  { month: "Dec", sales: 9000 },
];

const OrderStatus = () => {
  const [period, setPeriod] = useState("This Month");

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="border rounded-xl bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b">
        <h3 className="text-xl font-bold text-tomato">Monthly Sales</h3>
        {/* <FormControl size="small">
          <Select
            value={period}
            onChange={handleChange}
            className=" text-tomato rounded-lg"
            sx={{
              ".MuiSvgIcon-root": { fill: "white" },
              "& .MuiSelect-select": {
                paddingY: 0.5,
                paddingX: 1,
              },
            }}
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
        </FormControl> */}
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barCategoryGap={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 14, fontWeight: 500, fill: "#555" }}
            />
            <YAxis
              tick={{ fontSize: 14, fontWeight: 500, fill: "#555" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend />
            <Bar
              dataKey="sales"
              name="Sales"
              fill="#FC427B"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderStatus;
