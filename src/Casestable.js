import React from "react";
import "./CovidDataTable.css"; // Import the CSS file for the table styles


const Casestable = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <h2>COVID-19 State-wise Data</h2>
      <table className="covid-table">
        <thead>
          <tr>
            <th>State</th>
            <th>New Cases</th>
            <th>Recoveries</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((stateData) => (
            <tr key={stateData.state}>
              <td>{stateData.state || "N/A"}</td>
              <td>{stateData.newCases}</td>
              <td>{stateData.recoveries}</td>
              <td>{stateData.deathCases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Casestable;
