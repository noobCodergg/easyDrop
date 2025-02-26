import React, { useMemo, useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const ChartsSection = () => {
  const [currentChart, setCurrentChart] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lineData = useMemo(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [12, 10, 10, 25, 15, 9, 18],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: [8, 14, 6, 20, 10, 25, 14],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  }), []);

  const pieData = useMemo(() => ({
    labels: ["Electronics", "Clothing", "Groceries", "Furniture"],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#9333EA"],
        hoverOffset: 6,
      },
    ],
  }), []);

  return (
    <div className="relative w-full bg-gradient-to-br from-[#ECFDF5] via-[#DBEAFE] to-[#EDE9FE] overflow-hidden rounded-lg shadow-xl">
      {/* PC View: Both Charts Side by Side */}
      {!isMobile && (
        <div className="flex w-full max-w-screen-xl mx-auto space-x-4 p-6">
          <div className="w-1/2 flex flex-col bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-800 text-center pb-2">Sales Trends</h2>
            <div className="flex-1 h-[450px] w-full">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-800 text-center pb-2">Product Distribution</h2>
            <div className="flex-1 h-[450px] w-full flex justify-center">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile View: Slider for Charts */}
      {isMobile && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden p-2">
            <h2 className="text-lg font-bold text-gray-800 text-center pb-1">
              {currentChart === 0 ? "Sales Trends" : "Product Distribution"}
            </h2>
            <div className="w-full h-auto flex justify-center p-2">
              {currentChart === 0 ? (
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
              ) : (
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
              )}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex space-x-2 mt-2">
            {[0, 1].map((index) => (
              <span
                key={index}
                onClick={() => setCurrentChart(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${currentChart === index ? "bg-blue-500" : "bg-gray-300"}`}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
