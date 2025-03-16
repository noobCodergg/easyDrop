import React, { useState } from "react";
import Slider from "react-slick"; // Import react-slick for the carousel
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { LogInInput } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { createVendor } from "../Api/VendorApi/VendorApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    nid:"",
    isAccepted: false,
  });

  const [error,setError]=useState();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try{
      const response=await createVendor(formData)
    }catch(error){
      setError(error.response.data.error)
    }
  };

  const handleCheckBox = (e) => {
    setFormData({ ...formData, isAccepted: e.target.checked });
  };

  // Sample review data (you can expand this with more reviews)
  const reviews = [
    {
      name: "Mejba Wahid",
      rating: 4,
      text: "আমি কিনা বাড়ি থেকে ব্যবসা করতে চাই তাই আমি অনেক সময় নষ্ট করে ফেলেছি কিন্তু এখানে আমি সফল হয়েছি।",
      image: "/images/reviewer/mejba_wahid.jpg", // Replace with actual image
    },
    {
      name: "Abu Bokkor",
      rating: 5,
      text: "এটি আমার ব্যবসার জন্য একটি দুর্দান্ত প্ল্যাটফর্ম। আমি খুব খুশি!",
      image: "/images/reviewer/abu_bokkor.jpg", // Replace with actual image
    },
    {
      name: "Maruf",
      rating: 3,
      text: "ভালো সার্ভিস, তবে আরও উন্নতি করা যেতে পারে।",
      image: "/images/reviewer/maruf.jpg", // Replace with actual image
    },
  ];

  // Slider settings for auto-sliding (removed dots)
  const sliderSettings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Slide every 3 seconds
    arrows: false,
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Side Gradient (Hidden on mobile, 3/5 on desktop) with Text and Slider on Desktop */}
      <div
        className="hidden lg:block lg:w-3/5 w-full items-center justify-center order-1 overflow-y-auto"
        style={{
          background: "linear-gradient(to right, #C50F61, #4E247B)",
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-4 p-4 text-white h-full">
        <h2 className="text-4xl font-bold text-center">
  Why Vendors Love EasyDrop
</h2>
<ul className="space-y-2 text-left w-full max-w-md">
  <li className="flex items-center justify-start text-base">
    <span className="text-2xl mr-1">✔</span> Simple investment  
  </li>
  <li className="flex items-center justify-start text-base">
    <span className="text-2xl mr-1">✔</span> Seamless order & inventory management  
  </li>
  <li className="flex items-center justify-start text-base">
    <span className="text-2xl mr-1">✔</span> Sell products under your own branding  
  </li>
  <li className="flex items-center justify-start text-base">
    <span className="text-2xl mr-1">✔</span> 2000+ successful vendor shipments  
  </li>
  <li className="flex items-center justify-start text-base">
    <span className="text-2xl mr-1">✔</span> Access to high-demand products & expert support  
  </li>
</ul>

          {/* Slider visible only on desktop (already hidden due to parent) */}
          <div className="w-full max-w-md">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Slider {...sliderSettings}>
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 px-2 py-1"
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/32")
                      } // Fallback image
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-base">
                        {review.name}
                      </p>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-sm text-white break-words">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Full width on mobile, 2/5 on desktop) with Form and Slider on Mobile */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-4 order-2 bg-white overflow-y-auto">
        {/* Form Section */}
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center space-y-2 mb-3 md:mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn9GcQUB90GXU0XhgZXJ3Le3Yj9CHrNlooymbSchw&s" // Replace with actual logo
              alt="easyDrop Logo"
              className="w-8 h-8 md:w-12 md:h-12"
            />
            <h1 className="text-xl md:text-2xl font-bold text-purple-800">
              <img src="/images/logo/new-sitelogo.png " className="h-8" />
            </h1>
          </div>
          <div className="rounded-sm p-3 md:p-4">
            <h3 className="text-base md:text-lg font-bold text-center text-gray-800 mb-3 md:mb-4">
              Create Your Account
            </h3>
            
            <form
              onSubmit={handleSubmit}
              className="space-y-3 md:space-y-4 p-2 md:p-2"
            >
              <LogInInput
                type="text"
                name="name"
                placeholder="Type your full name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                required
              />
              <LogInInput
                type="email"
                name="email"
                placeholder="Type your email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                required
              />
              <LogInInput
                type="tel"
                name="phoneNumber"
                placeholder="Type your phone no."
                value={formData.phoneNumber}
                onChange={handleChange}
                label="Phone No."
                required
              />

<LogInInput
                type="text"
                name="nid"
                placeholder="Type your NID"
                value={formData.nid}
                onChange={handleChange}
                label="NID"
                required
              />
              
              <LogInInput
                type="password"
                name="password"
                placeholder="Type your password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                required
              />


              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-purple-600"
                  checked={formData.isAccepted} // ✅ Make it controlled
                  onChange={handleCheckBox} // ✅ Update state on change
                />
                <p className="text-gray-700">Accept terms and conditions</p>
              </div>
              {error && <p className="text-red-700">{error}</p>}
              <Button
                type="submit"
                variant="logInButton"
                className="w-full"
                disabled={!formData.isAccepted} // ✅ Disable when unchecked
              >
                Create
              </Button>
            </form>
            <div className="flex items-center justify-center mt-3 md:mt-4">
              <p className="text-xs md:text-sm">
                Already have an account?{" "}
                <span className="font-semibold text-purple-800">Sign in</span>
              </p>
            </div>
          </div>
        </div>

        {/* Review Slider Section (Visible only on mobile, below form) with Gradient */}
        <div className="lg:hidden w-full max-w-md mt-3 order-3">
          <div
            className="bg-white bg-opacity-20 p-3 rounded-lg"
            style={{
              background: "linear-gradient(to right, #C50F61, #4E247B)", // Gradient matching the left section
            }}
          >
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-2 py-2"
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/32")
                    } // Fallback image
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">
                      {review.name}
                    </p>
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="text-xs break-words">{review.text}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
