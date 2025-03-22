import React from "react";
import Lottie from "lottie-react";
import  anim1  from '../../public/images/lottifiles/1.json'
import anim2 from '../../public/images/lottifiles/2.json'
import { Button } from "../Components/ui/button";

const RequestPayment = () => {
 

  return (
    <div className="border border-gray-200 m-4 p-4">
      <div className="flex  justify-center w-full p-0  sm:p-4">
      <div className="flex flex-col items-center justify-start bg-custom-gradient w-full sm:w-2/3 p-6">
        <img src="/images/logo/new-sitelogo.png" alt="logo" />
        <p className="text-base sm:text-2xl text-white">Dropshipping Made Easy!</p>
      </div>
      </div>
      <div className="flex justify-center items-center">
      <Lottie 
      animationData={anim2} 
      loop={true} 
      style={{ width: 300, height: 300 }} // Adjust size
    />
    </div>
    
    <div className="flex items-center justify-center">
        <Lottie 
      animationData={anim1} 
      loop={true} 
      style={{ width: 100, height: 100 }} // Adjust size
    />
    <div>
    </div>
    <div>
      <p className="text-base sm:text:2xl">Congratulations! Your payment request has been accepted!</p>
    </div>
    </div>

    <div className="flex items-center justify-center">
      <Button variant="logInButton" className="w-full sm:w-1/4 h-12">
        <p>GO BACK</p>
      </Button>
    </div>


    </div>
  );
};

export default RequestPayment;
