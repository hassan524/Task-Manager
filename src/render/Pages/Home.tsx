import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';



const Home = () => {

  const myData = useSelector((state) => state.user);
  const [identity, setIdentity] = useState<string | number | null>(null);

  useEffect(() => {
    if (myData?.name) {
      const name = myData.name;
      setIdentity(name.charAt(0));
    } else {
      console.warn('myData.name is undefined or null.');
    }
  }, [myData]);


  return (
    <>

      <div className="wrapper flex flex-col gap-5 mt-2">

        <div className="w-full h-6 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <i className="bi bi-houses-fill text-primary"></i>
            <span className='font-semibold text-primary'>Home</span>
          </div>

          <div className="w-8 h-8 rounded-full border border-[#f4f4f4] cursor-pointer flex justify-center items-center bg-[#f9f8f8]">
            <span className='opacity-50'>{identity ? identity : ' '}</span>
          </div>

        </div>

        <div className="rounded-3xl grid lg:grid-cols-4 md:grid-cols-2  overflow-hidden md:gap-2 gap-5">
          <div className="bg-[#fafafa]  h-44 flex flex-col justify-center items-center text-center">
            <div className="">50</div>
            <div className="">Total completed tasks</div>
          </div>
          <div className="bg-[#fafafa]  h-44 flex flex-col justify-center items-center text-center">
            <div className="">50</div>
            <div className="">Total completed tasks</div>
          </div>
          <div className="bg-[#fafafa]  h-44 flex flex-col justify-center items-center text-center">
            <div className="">50</div>
            <div className="">Total completed tasks</div>
          </div>
          <div className="bg-[#fafafa]  h-44 flex flex-col justify-center items-center text-center">
            <div className="">50</div>
            <div className="">Total completed tasks</div>
          </div>
        </div>

      </div>


    </>
  )
}

export default Home