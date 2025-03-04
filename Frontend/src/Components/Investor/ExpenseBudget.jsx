import React from 'react';
import Title from './Title';
import { Pie } from 'react-chartjs-2';
import { CircleDollarSign } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBudget = () => {
  // Sample expense budget data
  const expenseData = {
    labels: [
      'Marketing',
      'Salaries',
      'Utilities',
      'Research',
      'Travel',
      'Miscellaneous',
    ],
    datasets: [
      {
        label: 'Expense Budget ($)',
        data: [12000, 35000, 5000, 8000, ],
        backgroundColor: [
          '#744591',   // Red
          '#FF0080',  // Blue
          '#982DE5',   // Green
          '#F356A4'   // Yellow
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container height
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
          },
          color: '#333',
          padding: 15,
        },
        // Adjust legend for smaller screens
        maxWidth: 150,
        display: true,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
    // Responsive adjustments
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <Title
        icon={<CircleDollarSign color='#572782' size={'24'}/>}
        text="Expense Budget"
      />
      <div className="flex-1 w-full min-h-0"> {/* min-h-0 prevents overflow */}
        <Pie data={expenseData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseBudget;