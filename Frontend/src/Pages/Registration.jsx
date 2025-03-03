import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "../Components/ui/button";
import { LogInInput } from "../Components/ui/input";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    nid: "",
    profession: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Gradient (60% Width) with Text */}
      <div
        className="hidden lg:flex w-3/5 items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #990b60, #4c0657)",
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-6xl font-bold text-white text-center px-8">
            Register to<br /> Start Your Investment <br />Journey!
          </h2>
        </div>
      </div>

      {/* Right Side Form (40% Width, Centered) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex flex-row items-center justify-center space-x-1 mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUB90GXU0XhgZXJ3Le3Yj9CHrNlooymbSchw&s"
              alt="easyDrop Logo"
              className="w-10 h-10"
            />
            <h1 className="text-3xl font-bold text-purple-800">easyDrop</h1>
          </div>
          <div className="rounded-sm p-6">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
              Create Your Own Account
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <LogInInput
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                label="Full Name"
                required
              />
              <LogInInput
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                label="Phone Number"
                required
              />
              <LogInInput
                type="text"
                name="nid"
                placeholder="NID"
                value={formData.nid}
                onChange={handleChange}
                label="NID"
                required
              />
              <LogInInput
                type="text"
                name="profession"
                placeholder="Profession"
                value={formData.profession}
                onChange={handleChange}
                label="Profession"
                required
              />
              <LogInInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                required
              />
              <Button
                type="submit"
                variant="logInButton"
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;