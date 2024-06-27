import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TimeframeSelector from '../TimeframeSelector';
import data from '../data/chartData.json';

const Chart = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Filter data based on selected timeframe
    const filteredData = data.filter((item) => {
      const date = new Date(item.timestamp);
      if (timeframe === 'daily') return true;
      if (timeframe === 'weekly') return date.getDate() % 7 === 0;
      if (timeframe === 'monthly') return date.getDate() === 1;
      return false;
    });
    setChartData(filteredData);
  }, [timeframe]);

  const handlePointClick = (data) => {
    alert(`Timestamp: ${data.timestamp}, Value: ${data.value}`);
  };

  return (
    <div className="chart-container">
      <TimeframeSelector onSelect={setTimeframe} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} onClick={handlePointClick} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
