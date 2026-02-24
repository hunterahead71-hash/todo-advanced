import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import styles from '../../styles/DailyAnalytics.module.css';

const COLORS = ['#4CAF50', '#FF5252'];

const DailyAnalytics = ({ analytics, todos }) => {
  const today = new Date().toDateString();
  const todayStats = analytics.dailyCompletion[today] || 0;
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  
  const pieData = [
    { name: 'Completed', value: completedTodos },
    { name: 'Pending', value: totalTodos - completedTodos }
  ];

  return (
    <div className={styles.container}>
      <h3>Daily Analytics</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Today's Completion</span>
            <span className={styles.statValue}>{todayStats} tasks</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Overall Progress</span>
            <span className={styles.statValue}>{analytics.overallPercentage}%</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h4>Completion Breakdown</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.completed}`} />
            <span>Completed ({completedTodos})</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.pending}`} />
            <span>Pending ({totalTodos - completedTodos})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAnalytics;
