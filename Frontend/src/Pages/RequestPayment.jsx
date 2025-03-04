import React from "react";
import { Button } from "../Components/ui/button";
import { CheckCircle } from "lucide-react";

const RequestPayment = () => {
  const handleBack = () => {
    // console.log("Going back...");
  };

  return (
    <div className="max-w-[1300px] mx-auto border rounded-xl pb-20 shadow-sm bg-white text-center">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-pink-900 via-purple-500 to-[#64439A] rounded-t-xl rounded-b-[40px] py-16 text-white font-semibold text-3xl">
        Payment
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 bg-white p-2 rounded-full shadow-md">
          <img src="https://easydrop.asia/logo/new-sitelogo.png" alt="Easydrop Logo" className="h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 px-10">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="font-semibold text-lg mt-4">Congratulations</h2>
        <p className="text-gray-600 mt-2">
          Your payment request has been accepted. You will be notified of your
          payment status within 24 hours.
        </p>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Button className="bg-[#64439A] hover:bg-[#64439A] text-white px-10 py-0 rounded-full" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default RequestPayment;
