import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'; 

const MiniBarChart = ({data, xLabel, yLabel}) => {
  return (
    	<BarChart width={230} height={190} data={data}
            margin={{top: 20, right: 10, left: -10, bottom: -10}}>
       <XAxis dataKey="bin" domain={[0, 120]} label={{value: xLabel, position: "top", offset: 160}}/>
       <YAxis label={{value: yLabel, angle: -90}}/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Bar dataKey="count" fill="#8884d8"/>
      </BarChart>
  );
}


export default MiniBarChart;
