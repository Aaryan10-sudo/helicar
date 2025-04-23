"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ongoing", value: 1000, color: "#A3C9F1" },
  { name: "Returned", value: 7250, color: "#336699" },
  { name: "Cancelled", value: 1000, color: "#F4B2B0" },
];

const VehicleStatusChart = ({
  title = "Vehicle Status",
  timeframe = "This week",
}) => (
  <div className="bg-white p-6 rounded-2xl  w-full max-w-[400px]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <select className="text-sm border border-gray-200 rounded px-2 py-1">
        <option>{timeframe}</option>
        <option>This month</option>
        <option>This year</option>
      </select>
    </div>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={4}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <ul className="mt-4 space-y-2">
      {data.map((entry) => (
        <li key={entry.name} className="flex justify-between items-center">
          <div className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.name}</span>
          </div>
          <span className="text-sm font-medium">
            {entry.value.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default VehicleStatusChart;
