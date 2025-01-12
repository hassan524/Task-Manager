import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/main/firebase';

const Home = () => {
  const myData = useSelector((state) => state.user);
  const [identity, setIdentity] = useState<string | number | null>(null);

  useEffect(() => {
    if (myData?.name) setIdentity(myData.name.charAt(0));
  }, [myData]);

  return (
    <div className="wrapper flex flex-col gap-10 mt-2">

      {/* Header Section */}
      <div className="w-full h-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="bi bi-houses-fill text-primary"></i>
          <span className="font-semibold text-primary">Home</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#f4f4f4] cursor-pointer flex justify-center items-center bg-[#f9f8f8] shadow-md">
          <span className="opacity-50">{identity || ' '}</span>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

        {/* Card 1: Total Completed Projects */}
        <div className="bg-[#CEE0FF] p-4 text-white hover:scale-105 transition-transform ease-linear cursor-pointer md:rounded-3xl rounded-[1.8rem] md:h-40 h-32 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl"
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="0">
          <div className="leading-10">
            <div className="text-3xl font-bold">50</div>
            <div className="font-semibold text-md">Total Completed Projects</div>
          </div>
        </div>

        {/* Card 2: Ongoing Projects */}
        <div className="bg-[#ECD5FF] p-4 text-white hover:scale-105 transition-transform ease-linear cursor-pointer md:rounded-3xl rounded-[1.8rem] md:h-40 h-32 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl"
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
          <div className="leading-10">
            <div className="text-3xl font-bold">25</div>
            <div className="font-semibold text-md">Ongoing Projects</div>
          </div>
        </div>

        {/* Card 3: Completed Group Tasks */}
        <div className="bg-[#FFC3C5] p-4 text-white hover:scale-105 transition-transform ease-linear cursor-pointer md:rounded-3xl rounded-[1.8rem] md:h-40 h-32 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl"
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="400">
          <div className="leading-10">
            <div className="text-3xl font-bold">10</div>
            <div className="font-semibold text-md">Completed Group Tasks</div>
          </div>
        </div>

        {/* Card 4: Completed Tasks */}
        <div className="bg-[#D3F4D4] p-4 text-white hover:scale-105 transition-transform ease-linear cursor-pointer md:rounded-3xl rounded-[1.8rem] md:h-40 h-32 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl"
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="600">
          <div className="leading-10">
            <div className="text-3xl font-bold">100</div>
            <div className="font-semibold text-md">Completed Tasks</div>
          </div>
        </div>
      </div>

      {/* Pending Section */}
      {/* Pending Section */}
      <div className="w-full h-6 flex items-center">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-spinner text-primary"></i>
          <span className="font-semibold text-primary">Pending</span>
        </div>
      </div>

      {/* Pending Cards Section */}
      <div className="flex flex-col w-full gap-8">

        {/* Pending Projects Card */}
        <div className="pending relative w-full min-h-60 bg-slate-50 overflow-x-hidden md:rounded-3xl shadow-lg rounded-[1.8rem]"
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="0">
          <div className="w-full h-10 bg-gradient-to-r from-[#c0c0c0] to-[#f5f5f5] flex items-center px-5 justify-between absolute top-0 left-0 z-10">
            <span className='text-white'>Pending Projects</span>
            <i className="fa-solid fa-clock text-white"></i>
          </div>
          <div className="h-full flex items-center justify-center pt-12"> {/* Add padding-top to offset the fixed header */}
            <img src="/public/nofound.png" alt="" />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-6">

          {/* Pending Group Tasks Card */}
          <div className="pending relative lg:w-1/2 w-full min-h-60 bg-slate-50 overflow-x-hidden md:rounded-3xl shadow-lg rounded-[1.8rem]"
            data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
            <div className="w-full h-10 bg-gradient-to-r from-[#c0c0c0] to-[#f5f5f5] flex items-center px-5 justify-between absolute top-0 left-0 z-10">
              <span className='text-white'>Pending Group Tasks</span>
              <i className="fa-solid fa-clock text-white"></i>
            </div>
            <div className="h-full flex items-center justify-center pt-12"> {/* Add padding-top to offset the fixed header */}
              <img src="/public/nofound.png" alt="" />
            </div>
          </div>

          {/* Pending Tasks Card */}
          <div className="pending relative lg:w-1/2 w-full min-h-60 bg-slate-50 overflow-x-hidden md:rounded-3xl shadow-lg rounded-[1.8rem]"
            data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
            <div className="w-full h-10 bg-gradient-to-r from-[#c0c0c0] to-[#f5f5f5] flex items-center px-5 justify-between absolute top-0 left-0 z-10">
              <span className='text-white'>Pending Tasks</span>
              <i className="fa-solid fa-clock text-white"></i>
            </div>
            <div className="h-full flex items-center justify-center pt-12"> {/* Add padding-top to offset the fixed header */}
              <img src="/public/nofound.png" alt="" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
