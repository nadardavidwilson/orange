import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Cases = ({ data }) => {
    
  if (!data) return null;

  const states = Object.keys(data);

  const graphData = states.map((state) => ({
    state,
    deathCases: data[state].deathCases,
    recoveries: data[state].recoveries,
    newCases: data[state].newCases,  
  }));

  return (
    <BarChart width={600} height={300} data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="state" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="deathCases" stackId="a" fill="rgba(255, 99, 132, 0.6)" />
      <Bar dataKey="recoveries" stackId="a" fill="rgba(75, 192, 192, 0.6)" />
      <Bar dataKey="newCases" stackId="a" fill="rgba(54, 162, 235, 0.6)" />
    </BarChart>
  );
};

export default Cases;
