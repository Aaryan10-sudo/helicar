"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 30000 },
  { name: "Apr", value: 18000 },
  { name: "May", value: 22000 },
  { name: "Jun", value: 14000 },
];

const EarningSummaryChart = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Earning Summary</h2>
        <button className="text-sm px-3 py-1 bg-gray-100 rounded-md">
          Last Month ⌄
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningSummaryChart;
