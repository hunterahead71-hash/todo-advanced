import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateWeeklyStats } from '../../utils/analyticsUtils';
import styles from '../../styles/ProgressChart.module.css';

const ProgressChart = ({ todos }) => {
  const weeklyStats = calculateWeeklyStats(todos);
  
  const chartData = Object.entries(weeklyStats).map(([date, stats]) => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    completed: stats.completed,
    total: stats.total,
    percentage: stats.percentage
  }));

  return (
    <div className={styles.container}>
      <h3>Weekly Progress</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="completed" fill="#8884d8" name="Completed" />
          <Bar yAxisId="right" dataKey="percentage" fill="#82ca9d" name="Percentage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
