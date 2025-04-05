import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Make sure you import these icons
import { Button } from "../Components/ui/button";
import { LogInInput } from "../Components/ui/input";
import { venderLogn } from "../Api/VendorApi/VendorApi";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Initialized as false

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try{
      const response=await venderLogn(formData)
      navigate("/dashboard")
    }catch(error){
      console.log("Error Occured")
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Gradient (Full width on mobile, 3/5 on desktop) with Text */}
      <div
        className="lg:flex lg:w-3/5 w-full items-center justify-center order-1"
        style={{
          background: "linear-gradient(to right, #C50F61, #4E247B)",
        }}
      >
        <div className="flex flex-col items-center space-y-6 p-4 lg:p-8">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center px-4">
  Empowering Vendors  
  <br />
  Grow Your Business  
  <br />
  Effortlessly!
</h2>

          <div className="flex items-center justify-between text-white p-2 md:p-4 w-full">
            <div className="flex -space-x-2 md:-space-x-3">
              <img
                src="/images/reviewer/abu_bokkor.jpg"
                alt="Profile 1"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
              />
              <img
                src="/images/reviewer/maruf.jpg"
                alt="Profile 2"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
              />
              <img
                src="/images/reviewer/mejba_wahid.jpg"
                alt="Profile 3"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
              />
            </div>
            <div className="text-right text-sm md:text-lg font-medium ml-2 md:ml-4 flex-1">
              980+ vendors joined. Now it's you to grow your business!
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Form (Full width on mobile, 2/5 on desktop, Centered) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-6 order-2">
        <div className="w-full max-w-md">
          <div className="flex flex-row items-center justify-center space-x-1 mb-4 md:mb-6">
           <img src="/images/logo/new-sitelogo.png" className="h-8"/>
          </div>
          <div className="rounded-sm p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-4 md:mb-6">
              Login To Your Account
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-2 md:p-4">
              <LogInInput
                type="tel"
                name="phoneNumber"
                placeholder="Type your mobile no."
                value={formData.phoneNumber}
                onChange={handleChange}
                label="Phone Number"
                required
              />

              {/* Password Input with Eye Icon */}
              <LogInInput
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                required
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              <div className="flex items-center justify-end">
                <p className="font-semibold text-red-700 text-sm md:text-base">Forgot password?</p>
              </div>

              <Button type="submit" variant="logInButton" className="w-full">
                Login
              </Button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <p className="text-sm md:text-base">Don’t have an account? <span className="font-semibold text-purple-800">Sign up</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;