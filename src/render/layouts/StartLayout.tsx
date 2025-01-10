// import React, { useEffect } from 'react'; 
import { Outlet } from 'react-router-dom';

const StartLayout = () => {

  return (
    <div
      className="w-[100vw] h-[100vh] bg-cover md:bg-hero-pattern custom-md:bg-hero-pattern2 bg-hero-pattern3 relative"
      data-aos="fade-left"
      data-aos-duration="1000"
    >
      <div className="h-full z-50 custom-md:mx-[5rem] mx-[1.5rem] gap-7 flex lg:flex-row flex-col lg:justify-between justify-center lg:items-center items-start">
        <div className="flex flex-col items-start">
          <div className="Start-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLayout;
