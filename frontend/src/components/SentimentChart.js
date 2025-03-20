import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const SentimentChart = ({ sentiment }) => {
  const data = [
    { name: "सकारात्मक", value: sentiment["सकारात्मक"] || 0 },
    { name: "नकारात्मक", value: sentiment["नकारात्मक"] || 0 },
    { name: "तटस्थ", value: sentiment["तटस्थ"] || 0 }
  ];
  const COLORS = ["#4CAF50", "#F44336", "#FFC107"];

  return (
    <div>
      <h2>Sentiment Distribution</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default SentimentChart;
