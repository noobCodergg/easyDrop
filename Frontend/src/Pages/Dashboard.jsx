// src/pages/Dashboard.jsx
import React, { useState } from "react";

import Sidenav from "../Components/Common/Sidenav";
import Upperbar from "../Components/Common/Upperbar";
import Welcomesection from "../Components/Dashboard/Welcomesection";
import Cardsection from "../Components/Dashboard/Cardsection";
import ChartsSection from "../Components/Dashboard/Chartsection";
import Advertise from "../Components/Dashboard/Advertise";
import AuthButton from "../Components/Common/AuthButton";




const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
     
      <Sidenav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      
      <div
        className={`flex-1 flex flex-col min-h-screen ${
          isExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
       
        <Upperbar/>

       
        <main className="flex-1 overflow-y-auto mt-16 bg-gray-50">
          
          <section className="w-full">
            <Welcomesection/>
          </section>

          
          <section className="w-full">
            <Cardsection/>
          </section>

          <section className="w-full">
            <ChartsSection/>
          </section>

          <Advertise/>

          
          <section className="w-full flex justify-center py-10">
            <AuthButton/>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;