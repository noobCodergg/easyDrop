import React, { useRef, useEffect } from 'react';
import Title from './Title';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { ShoppingBag } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const SalesByCategory = () => {
  const chartRef = useRef(null);

  // Sample sales data by category (in dollars)
  const salesData = {
    labels: [
      'Electronics',
      'Clothing',
      'Books',
      'Home Decor',
      'Toys',
    ],
    datasets: [
      {
        label: 'Sales ($)',
        data: [45000, 32000, 18000, 25000, 15000],
        backgroundColor: [], // Will be set dynamically with gradients
        borderWidth: 1,
        borderRadius: 6,
       
      },
    ],
  };

  const baseColors = [
    '#5C267F',  // Electronics
    '#7C2279',  // Clothing
    '#98206B',  // Books
    '#B01A70',  // Home Decor
    '#BC1660',  // Toys
  ];

  // Chart options for customization
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: (context) => {
            return `${context.label}: $${context.raw.toLocaleString()}`;
          },
        },
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
          maxTicksLimit: 5,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#666',
          font: { size: 12 },
          callback: (value) => `$${value / 1000}K`,
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

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradients = baseColors.map((color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
        
        // Create gradient from base color to a lighter version
        gradient.addColorStop(0, `${color}CC`);    // Base color with some transparency
        gradient.addColorStop(0.5, `${color}99`);  // Slightly lighter
        gradient.addColorStop(1, `${color}66`);    // Lightest at bottom
        
        return gradient;
      });

      // Update the dataset with gradients
      chart.data.datasets[0].backgroundColor = gradients;
      chart.update();
    }
  }, []);

  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <Title
        icon={<ShoppingBag color='#572782' size={24} />}
        text="Sales by Category"
      />
      <div className="flex-1 w-full min-h-0">
        <Bar 
          ref={chartRef}
          data={salesData} 
          options={options} 
        />
      </div>
    </div>
  );
};

export default SalesByCategory;