import React, { Component } from 'react';
import { ScatterChart, XAxis, YAxis, Legend, Scatter, Tooltip } from 'recharts';

const ScatterPlot = ({ data, color, xKey, yKey, xLabel, yLabel}) => {
  return (
    <ScatterChart width={250} height={250} syncId={"cookieId"} margin={{ top: 30, left: 0, bottom: 0, right: 0 }}>
      <XAxis dataKey={xKey} type="number" domain={[0, 1]} ticks={[0, 0.5, 1.0]} label={xLabel}/>
      <YAxis dataKey={yKey} type="number" domain={[0, 1]} ticks={[0, 0.5, 1.0]} label={yLabel}/>
    <Tooltip />
    <Scatter data={data} fill={color}/>
  </ScatterChart>
  );
};

export default ScatterPlot;
