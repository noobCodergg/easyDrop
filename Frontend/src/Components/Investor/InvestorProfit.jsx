import React, { useRef, useEffect } from 'react';
import Title from './Title';
import { Bar } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const InvestorProfit = () => {
  const chartRef = useRef(null);

  const profitData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Profit ($K)',
        data: [12, 19, 15, 25, 22, 30, 28, 35, 40, 38, 45, 50],
      
        hoverBackgroundColor: '#FF48A4',
        
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
          },
          color: '#333',
        },
      },
      tooltip: {
        backgroundColor: '#FF48A4',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: { size: 12 },
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'gray',
          font: { size: 12 },
          callback: (value) => `$${value}K`,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  // Apply gradient effect
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      
      // Gradient from purple to pink
      gradient.addColorStop(0, '#912172');    // Top color (purple)
      gradient.addColorStop(0.5, '#C62987');  // Middle transition
      gradient.addColorStop(1, '#FF48A4');    // Bottom color (pink)

      // Update the dataset with gradient
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <Title
        icon={<TrendingUp color='#572782' size={24} />}
        text="Investor Profit"
      />
      <div className="flex-1 w-full min-h-0">
        <Bar 
          ref={chartRef}
          data={profitData} 
          options={options} 
        />
      </div>
    </div>
  );
};

export default InvestorProfit;