import { Button } from '../Components/ui/button';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faStar, faTruckRampBox, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PackageOpen, Shapes, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../Components/ui/avatar';
import { Input } from '../Components/ui/input';
import { postWebinarRequest } from '../Api/WebinarApi/WebinarApi';


// Placeholder for missing imports (uncomment and adjust paths as needed)
// import { errorMsg, successMsg } from '../../helpers/notificationMsg';
// import { createWebinarRequest } from '../../api/apiCall';
// import { fetchProductCategoryList } from '../../api/apiCall'; // For NewFooter

// Placeholder Content component (replace with actual implementation)
const Content = ({ lang, en, bn }) => {
  return lang === 'Bn' ? bn : en;
};

function JoinWebinar() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: '', phone: '',remarks: '' });

  const handleInputData = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Placeholder for handleSubmit (uncomment and implement API call if available)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = ['', null, undefined];

    if (errors.includes(inputData.email)) {
      console.error('Email field required'); 
      return;
    }

    if (errors.includes(inputData.phone)) {
      console.error('Mobile field required'); 
      return;
    }

    if (errors.includes(inputData.remarks)) {
      console.error('Remarks field required'); 
      return;
    }
     try{
      const response=await postWebinarRequest(inputData)
     }catch(error){
      console.log(error)
     }
    
    console.log('Form submitted:', {
      email: inputData.email,
      number: inputData.phone ,
      remarks : inputData.remarks
    });
    setInputData({ phone: '', email: '',remarks:'' });
    console.log('Success: Form submitted'); 
  };

  // NewFooter Component
  const NewFooter = () => {
    const [categoryList, setCategoryList] = useState([]);
    const categories = {
      'Women Clothing': 'মেয়েদের ড্রেস',
      'Gadgets & IT Accessories': 'গ্যাজেটস এন্ড আইটি একসেসোরিজ',
      'Health & Beauty': 'হেলথ & বিউটি',
      'Home & Lifestyle': 'হোম & লাইফস্টাইল',
      'Jewelries & Accessories': 'জুয়েলারি',
      'Kitchen Appaliances': 'কিচেন এপ্লায়েন্স',
      'Ladies Shoes': 'লেডিস সুজ',
      "Men's Shoes": 'মেন্স সুজ',
      Gifts: 'গিফটস',
      'Men Clothing': 'ছেলেদের ড্রেস',
      'Men Accessories': 'ছেলেদের একসেসোরিজ',
      'Consumer Electronics': 'কনজিউমার ইলেকট্রনিক্স',
      'Drop Shoulder T-Shirt': 'ড্রপ শোল্ডার টি-শার্ট',
      'Sports & Kids': 'খেলাধুলা এবং বাচ্চাদের আইটেম',
      'Sunglass Collection': 'সানগ্লাস কালেকশন',
      'Bags Collection': 'ব্যাগ কালেকশন',
      'Electronic Accessories': 'ইলেকট্রনিক একসেসোরিজ',
      'Kitchen & Dining': 'কিচেন & ডাইনিং',
      "Valentine's Special": 'ভ্যালেনটাইন\'স স্পেশাল',
    };

    useEffect(() => {
      // Placeholder for fetchProductCategoryList (uncomment and implement if available)
      // (async () => {
      //   const res = await fetchProductCategoryList();
      //   setCategoryList(res?.list?.map((each) => each.category) || []);
      // })();
      // For now, simulate category list
      setCategoryList(Object.keys(categories));
    }, []);

    return (
      <footer className="p-6 dark:bg-gray-100 dark:text-gray-800 bg-[#F1F1FF] px-0">
        <div className="grid grid-cols-2 pb-4 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
          <div className="col-span-2">
            <img
              src="https://i.ibb.co/JRHSrS3/new-sitelogo.png"
              alt=""
            
              className="h-10 mx-auto md:mx-0"
            />
            <p className="px-5 pt-5 text-justify md:px-0 md:text-start">
              <Content
                lang="Bn" // Hardcoded for now; pass as prop if needed
                en="EasyDrop, ranked as the top dropshipping platform in Bangladesh, is dedicated to the mission of eradicating unemployment and actively participating in the country's economic growth."
                bn="ইজিড্রপ, বাংলাদেশের শীর্ষ ড্রপশিপিং প্ল্যাটফর্ম হিসেবে স্থান পেয়েছে*, বেকারত্ব দূরীকরণ এবং দেশের অর্থনৈতিক প্রবৃদ্ধিতে গুরুত্বপূর্ণ ভূমিকা রাখছে।"
              />
            </p>
            <ul className="space-y-2 text-[#4b4c6e] pt-5 text-sm md:text-base w-full px-5 md:px-auto">
              <li className="flex items-center justify-start gap-2 md:justify-start">
                <MapPin className="text-[#522F8F] font-extrabold" />
                <span className="font-semibold">
                  <Content lang="Bn" en="Address:" bn="ঠিকানা:" />
                </span>
                <Content
                  lang="Bn"
                  en="GA 47 Priyojon Goli, Middle Badda, Dhaka-1212"
                  bn="গ ৪৭ প্রিয়জন গলি, মধ্য বাড্ডা, ঢাকা-১২১২"
                />
              </li>
              <li className="flex items-center justify-start gap-2 md:justify-start">
                <Phone className="text-[#522F8F] font-extrabold" />
                <span className="font-semibold">
                  <Content lang="Bn" en="Call Us:" bn="ফোন:" />
                </span>
                <Content lang="Bn" en="01322873854" bn="০১৩২২৮৭৩৮৫৪" />
              </li>
              <li className="flex items-center justify-start gap-2 md:justify-start">
                <Mail className="text-[#522F8F] font-extrabold" />
                <span className="font-semibold">
                  <Content lang="Bn" en="Email:" bn="ইমেইল:" />
                </span>
                <Content lang="Bn" en="info@easydrop.asia" bn="info@easydrop.asia" />
              </li>
              <li className="flex items-center justify-start gap-2 md:justify-start">
                <Clock3 className="text-[#522F8F] font-extrabold" />
                <span className="font-semibold">
                  <Content lang="Bn" en="Hours:" bn="সময়:" />
                </span>
                <Content lang="Bn" en="(10AM-5PM)" bn="(সকাল ১০টা - বিকেল ৫টা)" />
              </li>
            </ul>
          </div>

          <div className="flex flex-col pl-5 space-y-4 md:pl-0">
            <h2 className="font-medium underline">
              <Content lang="Bn" en="Company" bn="কোম্পানি সম্পর্কৃত" />
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
              <Link to="/terms-&-conditions">
                <Content lang="Bn" en="Terms & Conditions" bn="টার্মস & কন্ডিশনস" />
              </Link>
              <Link to="/under-construction">
                <Content lang="Bn" en="About Us" bn="আমাদের সম্পর্কে" />
              </Link>
              <Link target="_blank" to="https://www.facebook.com/easydropbd">
                <Content lang="Bn" en="Contact Us" bn="আমাদের সাথে যোগাযোগ করুন" />
              </Link>
              <Link to="/faq">
                <Content lang="Bn" en="FAQ" bn="প্রশ্নাবলী" />
              </Link>
              <Link to="/under-construction">
                <Content lang="Bn" en="Learn More" bn="আরও জানুন" />
              </Link>
              <Link to="/under-construction">
                <Content lang="Bn" en="Support Center" bn="সাপোর্ট সেন্টার" />
              </Link>
              <Link to="/under-construction">
                <Content lang="Bn" en="Careers" bn="ক্যারিয়ার" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium underline">
              <Content lang="Bn" en="Account" bn="অ্যাকাউন্ট" />
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
              <Link to="/sign-up">
                <Content lang="Bn" en="Sign Up" bn="সাইন আপ" />
              </Link>
              <Link to="/login">
                <Content lang="Bn" en="Sign In" bn="সাইন ইন" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col pl-5 space-y-4 md:pl-0">
            <h2 className="font-medium underline">
              <Content lang="Bn" en="Categories" bn="সকল ক্যাটাগরি" />
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
              {categoryList?.map((each) => (
                <Content key={each} lang="Bn" en={each} bn={categories[each]} />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium underline">
              <Content lang="Bn" en="Follow Us" bn="সোশ্যাল মিডিয়া" />
            </h2>
            <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
              <Link to="https://www.facebook.com/easydropbd" target="_blank">
                <Content lang="Bn" en="Facebook" bn="ফেসবুক" />
              </Link>
              <Link to="https://www.instagram.com/easydropbd" target="_blank">
                <Content lang="Bn" en="Instagram" bn="ইনস্টাগ্রাম" />
              </Link>
              <Link to="https://www.tiktok.com/@easydrop.official5?_t=8j2DoMpsJGq&_r=1" target="_blank">
                <Content lang="Bn" en="Tiktok" bn="টিকটক" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 pt-4 text-sm border-t-2 border-gray-400">
          <span className="font-bold text-gray-600">
            <Content
              lang="Bn"
              en="Copyright© 2024 EasyDrop. All rights reserved"
              bn="© ২০২৪ ইজিড্রপ, সমস্ত অধিকার সংরক্ষিত"
            />
          </span>
        </div>
      </footer>
    );
  };

  return (
    <>
      <nav className="px-5 md:px-20 flex justify-between py-5 bg-gradient-to-b from-[#e3e3ff] to-[#F1F1FF]">
        <Link to="/new">
          <img src="/images/logo/new-sitelogo.png" alt="EasyDrop" className="h-10" />
        </Link>
        <Button
          className="rounded-md bg-gradient-to-r from-[#522F8F] py-5 from-30% to-[#D31A65] px-8"
          onClick={() => navigate('/sign-up')}
        >
          সাইন আপ
        </Button>
      </nav>
      <div className="h-full bg-[#F1F1FF] px-5 md:px-20" style={{ backgroundImage: 'url("bg-dot.png")' }}>
        <h1 className="py-6 text-3xl font-semibold text-center md:py-10 md:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#522F8F] to-[#D31A65] font-extrabold">
            <span>লাভজনক ড্রপশিপিংয়ের গোপনীয়তা আনলক করুন!</span>
          </span>
        </h1>
        <div className="flex justify-center">
          <div className="hidden overflow-hidden rounded-md md:block w-fit">
            <iframe
              width="900"
              height="500"
              src="https://www.youtube.com/embed/dPVOWQQX6wc"
              title="ইনভেস্ট ছাড়া অনলাইন ব্যবসা | ড্রপশিপিং উইথ ইজিড্রপ 🏆 Dropshipping with Easydrop 🏆"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="block overflow-hidden rounded-md md:hidden w-fit">
            <iframe
              width="400"
              height="230"
              src="https://www.youtube.com/embed/dPVOWQQX6wc"
              title="ইনভেস্ট ছাড়া অনলাইন ব্যবসা | ড্রপশিপিং উইথ ইজিড্রপ 🏆 Dropshipping with Easydrop 🏆"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-5 md:mt-10 md:container md:flex md:flex-row md:justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="grid w-16 h-16 text-white border rounded-full md:w-24 md:h-24 bg-brandcolor place-items-center">
              <FontAwesomeIcon icon={faUsers} className="h-6 md:h-10" />
            </div>
            <div>
              <div className="text-xl font-bold text-black md:text-3xl">৯০০+</div>
              <div className="text-xs md:text-base text-[#7B7E86] font-semibold">সাবস্ক্রাইবার</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="grid w-16 h-16 text-white border rounded-full md:w-24 md:h-24 bg-brandcolor place-items-center">
              <FontAwesomeIcon icon={faTruckRampBox} className="h-6 md:h-10" />
            </div>
            <div>
              <div className="text-xl font-bold text-black md:text-3xl">৩৫০০+</div>
              <div className="text-xs md:text-base text-[#7B7E86] font-semibold">অর্ডার কমপ্লিটেড</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="grid w-16 h-16 text-white border rounded-full md:w-24 md:h-24 bg-brandcolor place-items-center">
              <FontAwesomeIcon icon={faStar} className="h-6 md:h-10" />
            </div>
            <div>
              <div className="text-xl font-bold text-black md:text-3xl">২০০+</div>
              <div className="text-xs md:text-base text-[#7B7E86] font-semibold">রিভিউ</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="grid w-16 h-16 text-white border rounded-full md:w-24 md:h-24 bg-brandcolor place-items-center">
              <FontAwesomeIcon icon={faPeopleGroup} className="h-6 md:h-10" />
            </div>
            <div>
              <div className="text-xl font-bold text-black md:text-3xl">২০+</div>
              <div className="text-xs md:text-base text-[#7B7E86] font-semibold">টিম মেম্বার</div>
            </div>
          </div>
        </div>

        <h1 className="py-10 mt-5 text-3xl font-semibold text-center md:mt-10 md:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#522F8F] to-[#D31A65] font-extrabold">
            <span>ব্যবসা শুরু করতে কতো টাকা লাগে আসুন দেখি?</span>
          </span>
        </h1>
        <div className="flex justify-center">
          <div className="w-[35rem] font-medium text-xl">
            <div className="grid gap-5 md:gap-8">
              <div className="flex">
                <div className="w-[65%]">প্রোডাক্ট ইনভেন্টরি</div>
                <div className="w-[5%]">-</div>
                <div className="w-[30%] text-right">১০,০০০ টাকা/=</div>
              </div>
              <div className="flex">
                <div className="w-[65%]">প্যাকেজিং</div>
                <div className="w-[5%]">-</div>
                <div className="w-[30%] text-right">৫,০০০ টাকা/=</div>
              </div>
              <div className="flex">
                <div className="w-[65%]">ডিজিটাল মার্কেটিং কোর্স</div>
                <div className="w-[5%]">-</div>
                <div className="w-[30%] text-right">৫,০০০ টাকা/=</div>
              </div>
              <div className="flex pt-3 -mt-2 border-t-2 border-black">
                <div className="w-[65%]">টোটাল</div>
                <div className="w-[5%]">-</div>
                <div className="w-[30%] text-right font-bold">২০,০০০ টাকা/=</div>
              </div>
              <div className="flex font-bold">
                <div className="w-[65%]">কিন্তু আমাদের রেজিস্ট্রেশন ফি মাত্র</div>
                <div className="w-[5%]">-</div>
                <div className="w-[30%] text-right">২,০০০ টাকা/=</div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:container">
          <div
            className="w-full h-full my-10 overflow-hidden border md:my-20 rounded-xl"
            style={{ backgroundImage: "url('/images/bg-pattern.webp')" }}
          >
            <div
              className="grid w-full h-full grid-cols-1 gap-2 p-5 md:px-20 md:py-10 md:grid-cols-2 md:gap-0"
              style={{ backgroundImage: 'linear-gradient(0deg,#E9E9F9 0.76%,#E1E2FF00 100%)' }}
            >
              <div className="grid order-2 grid-cols-1 gap-3 md:grid-cols-2 md:order-1">
                <div className="grid gap-3 place-items-center">
                  <div className="flex items-center w-full h-full gap-2 p-5 text-left bg-white border md:w-52 md:h-52 md:p-2 md:text-center rounded-3xl md:gap-0 md:grid md:place-items-center">
                    <div className="p-4 rounded-full grid place-items-center bg-[#DFE5FF]">
                      <Shapes className="h-10 w-10 md:h-14 md:w-14 text-[#4C6FFF] animate-pulse" />
                    </div>
                    <div className="font-semibold">নিত্য নতুন প্রোডাক্টের বিশাল কালেকশন!</div>
                  </div>
                  <div className="flex items-center w-full h-full gap-2 p-5 mt-0 text-left bg-white border md:w-52 md:h-52 md:text-center rounded-3xl md:gap-0 md:grid md:place-items-center">
                    <div className="order-2 md:order-1 p-4 rounded-full grid place-items-center bg-[#FFEEFA]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-10 w-10 md:h-14 md:w-14 text-[#fd8a64] animate-pulse"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg>
                    </div>
                    <div className="order-1 font-semibold md:order-2">ফ্রি ডিজিটাল মার্কেটিং ট্রেইনিং এবং ডেডিকেটেড সাপোর্ট!</div>
                  </div>
                </div>

                <div className="grid gap-3 place-items-center">
                  <div className="flex items-center w-full h-full gap-2 p-5 mt-0 text-left bg-white border md:mt-10 md:w-52 md:h-52 md:text-center rounded-3xl md:gap-0 md:grid md:place-items-center">
                    <div className="p-4 rounded-full grid place-items-center bg-[#FFEEFA]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-10 w-10 md:h-14 md:w-14 text-[#f1a2da] animate-pulse"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="font-semibold">৯০ দিনের মানি ব্যাক গ্যারান্টি!</div>
                  </div>
                  <div className="flex items-center w-full h-full gap-2 p-5 mt-0 text-left bg-white border md:mt-10 md:w-52 md:h-52 md:text-center rounded-3xl md:gap-0 md:grid md:place-items-center">
                    <div className="order-2 md:order-1 p-4 rounded-full grid place-items-center bg-[#c0e3e4]">
                      <PackageOpen className="h-10 w-10 md:h-14 md:w-14 text-[#2D9596] animate-pulse" />
                    </div>
                    <div className="order-1 font-semibold md:order-2">নিজের কোম্পানির নাম ও লোগো দিয়ে প্যাকেজিং</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center order-1 h-full p-5 text-center md:pl-20 md:text-left gap-7 md:order-2">
                <div className="text-3xl font-bold text-brandcolor">২,০০০ টাকায় পাচ্ছেন কি কি?</div>
                <p className="text-xl text-[#2D3958] font-semibold">
                  শুরু করুন ব্যবসা বাংলাদেশের ১* নম্বর ড্রপশিপিং প্লাটফর্ম, ১০০% মানি ব্যাক গ্যারান্টি সহ
                </p>
                <div>
                  <Button
                    className="px-10 bg-brandcolor hover:bg-brandhovercolor"
                    onClick={() => navigate('/sign-up')}
                  >
                    শুরু করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-10 md:py-20">
          <div className="bg-[#522F8F] text-white py-10 md:py-16 px-5 md:px-20">
            <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-3">
              {/* Left Side Content */}
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold md:text-4xl">
                  <span>ঘরে বসেই ইজিড্রপের মাধ্যমে</span>
                  <br className="hidden md:block" />
                  <span>{' '}আপনার অবসর সময়ে একটি</span>
                  <br className="hidden md:block" />
                  <span>{' '}নতুন অনলাইন ব্যবসা তৈরী করুন।</span>
                </h1>
                <p className="w-full mt-4 text-base text-gray-100 md:mt-6 md:w-5/6">
                  আমরা রেজিস্টার্ড মেম্বারদের বিনামূল্যে ডিজিটাল মার্কেটিং প্রশিক্ষণ এবং 90-দিনের মানি ব্যাক গ্যারান্টি অফার করছি! তার মানে আপনি উপার্জন না করলে, আপনার রেজিস্ট্রেশন ফি সম্পূর্ণ ফেরত পাবেন। বিস্তারিত জানতে আমাদের ফ্রি ওয়েবিনার এ জয়েন করুন।
                </p>
                <div className="pt-6 md:pt-10">
                  <p className="font-semibold">আরও 600+ খুশি গ্রাহকদের সাথে আপনিও যোগ দিন</p>
                  <div className="flex items-center pt-2">
                    <Avatar className="border-2">
                      <AvatarImage src="/images/reviewer/abu_bokkor.jpg" alt="Abu Bokkor" />
                      <AvatarFallback>Abu Bokkor</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-4 border-2">
                      <AvatarImage src="/images/reviewer/jahedul_islam.jpg" alt="Jahedul Islam" />
                      <AvatarFallback>Jahedul Islam</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-4 border-2">
                      <AvatarImage src="/images/reviewer/mejba_wahid.jpg" alt="Mejba Wahid" />
                      <AvatarFallback>Mejba Wahid</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 font-bold text-white underline md:ml-4">and others</span>
                  </div>
                </div>
              </div>

              {/* Right Side Content */}
              <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="py-4 mb-4 text-black bg-white rounded-none md:py-6"
                  value={inputData.email}
                  onChange={handleInputData}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="py-4 mb-4 text-black bg-white rounded-none md:py-6"
                  value={inputData.phone}
                  onChange={handleInputData}
                />

<Input
                  type="text"
                  name="remarks"
                  placeholder="Remarks"
                  className="py-4 mb-4 text-black bg-white rounded-none md:py-6"
                  value={inputData.remarks}
                  onChange={handleInputData}
                />
                <Button className="text-black bg-white rounded-none shadow-xl hover:bg-white md:py-6 md:text-lg">
                  <span className="text-transparent bg-clip-text px-3 md:px-6 font-extrabold bg-gradient-to-r from-[#522F8F] to-[#D31A65]">
                    ওয়েবিনারে যুক্ত হন
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </section>

        <h1 className="py-10 text-4xl font-semibold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#522F8F] to-[#D31A65] font-extrabold">
            <span>এক নজরে আমাদের ড্রপশিপারদের সাফল্য</span>
          </span>
        </h1>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <img src="/images/success/1.jpg" alt="Success Story" />
          <img src="/images/success/2.jpg" alt="Success Story" />
          <img src="/images/success/3.jpg" alt="Success Story" />
          <img src="/images/success/4.jpg" alt="Success Story" />
          <img src="/images/success/5.jpg" alt="Success Story" />
          <img src="/images/success/6.jpg" alt="Success Story" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10 mb-10">
  {Array.from({ length: 6 }, (_, i) => (
    <img
      key={i + 1}
      src={`/images/payments/${i + 1}.jpg`}
      className="w-full max-w-[calc(50%-.5rem)] md:max-w-[calc(16.66%-1rem)] h-auto object-cover rounded-lg shadow-md p-2"
      alt={`Payment Method ${i + 1}`}
    />
  ))}
</div>

       
<div className="container mx-auto px-5 md:px-20 mt-10 mb-10">
  <div className="columns-2 md:columns-4 lg:columns-6 gap-4">
    {Array.from({ length: 32 }, (_, i) => (
      <img
        key={i + 1}
        src={`/images/screenshots/${i + 1}.jpg`}
        className="w-full mb-4 rounded-lg shadow-md"
        alt={`Screenshot ${i + 1}`}
        loading="lazy"
        onError={(e) => {
          console.error(`Image failed to load: /images/screenshots/${i + 1}.jpg`);
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
        }}
      />
    ))}
  </div>
</div>



       
        <div className="my-10 text-center">
          <Button
            className="rounded-md bg-gradient-to-r from-[#522F8F] py-5 from-30% to-[#D31A65] px-20"
            onClick={() => navigate('/sign-up')}
          >
            যুক্ত হন
          </Button>
        </div>
        <NewFooter />
      </div>
    </>
  );
}

export default JoinWebinar;