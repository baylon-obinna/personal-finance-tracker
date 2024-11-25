import React from 'react';
import { Bar } from 'react-chartjs-2';
import './BudgetChart.css'; // Importing CSS file

const BudgetChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Budget vs Spending',
        data: data.map(item => item.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="budget-chart-container">
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default BudgetChart;
