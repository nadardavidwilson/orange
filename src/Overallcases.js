import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from "recharts";

const Overallcases = ({ data }) => {
    
  if (!data) return null;

    // Calculate the cumulative sum for each category
    const processedData = data.map((entry) => {
      const { timestamp, newCases, recoveries, deathCases } = entry;
      return {
        timestamp: new Date(timestamp * 1000),
        newCases,
        recoveries,
        deathCases,
      };
    });
  
    for (let i = 1; i < processedData.length; i++) {
      processedData[i].newCases += processedData[i - 1].newCases;
      processedData[i].recoveries += processedData[i - 1].recoveries;
      processedData[i].deathCases += processedData[i - 1].deathCases;
    }
  
    return (
      <LineChart width={600} height={300} data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="newCases" stroke="rgba(54, 12, 235, 0.6)" name="Total New Cases" />
        <Line type="monotone" dataKey="recoveries" stroke="rgba(75, 192, 192, 0.6)" name="Total Recoveries" />
        <Line type="monotone" dataKey="deathCases" stroke="rgba(255, 99, 132, 0.6)" name="Total Death Cases" />
      </LineChart>
    );
  };

export default Overallcases;
