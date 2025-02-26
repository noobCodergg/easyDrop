import React from "react";
import Cards from "./Cards";

const Cardsection = () => {
  const data = [
    { title: "Total Earnings", data: "Tk.27,264" },
    { title: "Total Orders", data: "+2" },
    { title: "Current Balance", data: "Tk.3,550" },
    { title: "Received Amount", data: "Tk.23,753" },
  ];

  return (
    <div className="relative w-full py-6 px-4 sm:py-12 sm:px-6 md:px-10 bg-gray-50 shadow-inner max-sm:py-6 max-sm:px-2">
      {/* Hidden on phones */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 max-sm:hidden">
        <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800 drop-shadow-sm">
          Insights
        </h1>
      </div>

      {/* Cards Grid (2 in a row on mobile, 4 in a row on larger screens) */}
      <div className="relative z-10 container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-sm:gap-2">
        {data.map((item, index) => (
          <Cards key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Cardsection;
