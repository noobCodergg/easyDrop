import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MarketOverview = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Sample market data
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Market Value',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        borderColor: '#CA3977',
        tension: 0.4,
        pointBackgroundColor: '#CA3977',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#CA3977',
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
              color: '#333',
            },
          },
          title: {
            display: true,
            text: 'Market Overview 2025',
            font: {
              size: 16,
            },
            color: '#333',
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            padding: 10,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value',
              font: {
                size: 14,
              },
            },
            ticks: {
              color: '#666',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 14,
              },
            },
            ticks: {
              color: '#666',
              font: {
                size: 12,
              },
              maxTicksLimit: 6,
            },
            grid: {
              display: false,
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
      },
    };

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart with gradient
    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
    gradient.addColorStop(0, 'rgba(255, 136, 197, 0.6)');  // #FF88C5 with opacity at top
    gradient.addColorStop(0.5, 'rgba(202, 57, 119, 0.3)'); // #CA3977 with mid opacity
    gradient.addColorStop(1, 'rgba(202, 57, 119, 0)');     // Transparent at bottom

    // Update dataset with gradient
    data.datasets[0].backgroundColor = gradient;

    chartInstance.current = new Chart(ctx, config);

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <div className="flex-1 w-full min-h-0">
        <canvas ref={chartRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default MarketOverview;