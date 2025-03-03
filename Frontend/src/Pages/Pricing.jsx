import React from "react";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    title: "Basic Investor Plan",
    price: "50,000 Taka",
    features: [
      "Monthly reports",
      "Annual meeting",
      "Portfolio analysis",
      "Company visit",
      "Customer care support",
    ],
    popular: false,
  },
  {
    title: "Elite Investment Plan",
    price: "300,000 Taka",
    features: [
      "Monthly reports",
      "Annual meeting",
      "Portfolio analysis",
      "Full financial access",
      "Company visit",
      "Monthly CEO meetings",
      "Company event access",
      "24-hour customer care",
    ],
    popular: true,
  },
  {
    title: "Premium Investment Plan",
    price: "100,000 Taka",
    features: [
      "Monthly reports",
      "Annual meeting",
      "Portfolio analysis",
      "Full financial access",
      "Company visit",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center pt-2 w-full">
      <h2 className="text-[17px] max-w-[500px] md:max-w-[800px] font-bold sm:text-xl md:text-3xl text-center text-purple-800">
        Invest confidently with our excellent plans designed specifically for you
      </h2>

      <div className="w-full grid grid-cols-1 gap-6 sm:gap-0 sm:grid-cols-3 justify-center items-center mt-8 px-4 sm:px-0">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`w-full border px-0 rounded-sm ${
              plan.popular ? "border-pink-700 shadow-lg scale-105" : "border-gray-300 h-fit"
            }`}
          >
            {plan.popular && (
              <div className="bg-pink-700 text-white text-center py-4 rounded-t-lg font-bold">
                Most Popular
              </div>
            )}

            <CardContent className="p-4 px-8">
              <h3 className="text-lg font-semibold text-center text-gray-500">{plan.title}</h3>
              <p className="text-pink-700 text-center font-bold text-xl">{plan.price}</p>

              <ul className="mt-8 pt-8 border-t border-gray-400 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex text-sm items-center gap-2 text-gray-700">
                    <Check className="bg-pink-600 text-white rounded-full p-[5px]" size={20} strokeWidth={4}/>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center">
                <Button onClick={handleClick} variant="outline" className="border border-purple-700 px-8 rounded-sm text-purple-700 hover:bg-purple-700 hover:text-white">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
