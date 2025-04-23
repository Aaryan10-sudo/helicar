"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Figma",
    2020: 40,
    2021: 50,
    2022: 60,
  },
  {
    name: "Sketch",
    2020: 30,
    2021: 60,
    2022: 45,
  },
  {
    name: "XD",
    2020: 50,
    2021: 80,
    2022: 70,
  },
  {
    name: "PS",
    2020: 60,
    2021: 70,
    2022: 90,
  },
  {
    name: "AI",
    2020: 70,
    2021: 60,
    2022: 80,
  },
  {
    name: "CorelDraw",
    2020: 50,
    2021: 55,
    2022: 65,
  },
  {
    name: "Canva",
    2020: 30,
    2021: 50,
    2022: 70,
  },
  {
    name: "InVision",
    2020: 35,
    2021: 40,
    2022: 50,
  },
  {
    name: "Affinity",
    2020: 25,
    2021: 35,
    2022: 45,
  },
  {
    name: "Master",
    2020: 45,
    2021: 55,
    2022: 65,
  },
  {
    name: "Framer",
    2020: 40,
    2021: 50,
    2022: 60,
  },
];

const GroupedBarChart = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-[1000px] h-[400px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="2020" fill="#8884d8" />
          <Bar dataKey="2021" fill="#82ca9d" />
          <Bar dataKey="2022" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
