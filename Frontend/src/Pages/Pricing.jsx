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
    <div className="w-full">
      <div className="w-2/3 flex">
        {
          plans.map((plan,index)=>{
            return <div key={index} >
              <div>
              <div>
              <p>{plan.title}</p>
              <p>{plan.price}</p>
              </div>
              <div>

              </div>
              <div>
                {
                  plan.features.map((features,index)=>{
                    return <div key={index}>
                      <p>{features}</p>
                    </div>
                  })
                }
              </div>
              <div>
                <button>Select Plan</button>
              </div>
             </div>
            </div>
          })
        }
        
      </div>
    </div>
  );
};

export default Pricing;
