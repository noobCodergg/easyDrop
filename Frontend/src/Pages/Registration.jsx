import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";

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
    <div className="max-w-[1100px] mx-auto flex flex-col items-center pt-2 w-full px-4 sm:px-0">
      <h2 className="text-[17px] max-w-[500px] md:max-w-[800px] font-bold sm:text-xl md:text-3xl text-center text-purple-800 mb-8">
        Register to Start Your Investment Journey
      </h2>
      <div className="w-full max-w-md">
        <div className="border border-gray-300 rounded-sm shadow-lg bg-white p-6">
          <h3 className="text-lg font-semibold text-center text-gray-500 mb-6">
            Registration Form
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border-gray-400 text-gray-700 placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700"
            />
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border-gray-400 text-gray-700 placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700"
            />
            <Input
              type="text"
              name="nid"
              placeholder="NID"
              value={formData.nid}
              onChange={handleChange}
              required
              className="border-gray-400 text-gray-700 placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700"
            />
            <Input
              type="text"
              name="profession"
              placeholder="Profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="border-gray-400 text-gray-700 placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-gray-400 text-gray-700 placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700"
            />
            <Button
              type="submit"
              className="w-full border border-purple-700 px-8 rounded-sm text-purple-700 hover:bg-purple-700 hover:text-white"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;