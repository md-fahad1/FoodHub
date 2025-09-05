"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

// Demo food order datasets
const DATASETS = {
  Today: [
    { name: "Pizza", value: 120 },
    { name: "Burger", value: 90 },
    { name: "Pasta", value: 60 },
    { name: "Drinks", value: 40 },
  ],
  "This Week": [
    { name: "Pizza", value: 480 },
    { name: "Burger", value: 350 },
    { name: "Pasta", value: 240 },
    { name: "Drinks", value: 180 },
  ],
  "Last Month": [
    { name: "Pizza", value: 1800 },
    { name: "Burger", value: 1400 },
    { name: "Pasta", value: 1000 },
    { name: "Drinks", value: 750 },
  ],
};

const COLORS = ["#FF6B6B", "#FFA502", "#1E90FF", "#2ED573"];
const RADIAN = Math.PI / 180;

// % labels inside slices
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize={13}
      fontWeight="bold"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom legend with color + name + value
const renderCustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mt-4 flex-wrap">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {entry.value} – {entry.payload.value} orders
          </span>
        </div>
      ))}
    </div>
  );
};

export default function NewPieChart() {
  const [duration, setDuration] = useState("Today");
  const chartData = DATASETS[duration];

  return (
    <div className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-lg border border-gray-200 dark:border-[#3d47514d]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-tomato dark:text-dark-color">
          🍽️ Top Selling Items
        </h3>
        <FormControl size="small">
          <Select
            id="duration-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{
              ".MuiSvgIcon-root": { fill: "white !important" },
              color: "white",
              "& .MuiSelect-select": {
                padding: "2px 10px",
                fontSize: "14px",
                fontWeight: "500",
              },
              backgroundColor: "#FC427B",
              borderRadius: "0.5rem",
              height: "32px",
            }}
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120} // previous bigger radius
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" content={renderCustomLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
