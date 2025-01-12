import React from 'react'
import { Separator } from '@/components/ui/separator';

const DashBoard = () => {
  return (
    <>
      <div className="wrapper flex flex-col gap-10 mt-2">

        {/* Header Section */}
        <div className="w-full h-6 flex items-center justify-start">
          <div className="flex items-center gap-2">
            <i className="bi bi-speedometer text-primary"></i>
            <span className="font-semibold text-primary">Dashboard</span>
          </div>
        </div>

        <Separator className="bg-slate-100 my-4" />

        {/* Card Section */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">

          {/* Create Task Card */}
          <div className="bg-[#CEE0FF] p-4 rounded-lg shadow-md hover:scale-105 transition-transform ease-linear cursor-pointer flex flex-col items-center justify-center text-center w-full max-w-xs mx-auto">
            <i className="bi bi-clipboard-check text-4xl text-white"></i>
            <div className="mt-3">
              <div className="font-semibold text-lg text-white">Create Task</div>
            </div>
          </div>

          {/* Create Project Card */}
          <div className="bg-[#ECD5FF] p-4 rounded-lg shadow-md hover:scale-105 transition-transform ease-linear cursor-pointer flex flex-col items-center justify-center text-center w-full max-w-xs mx-auto">
            <i className="bi bi-folder-plus text-4xl text-white"></i>
            <div className="mt-3">
              <div className="font-semibold text-lg text-white">Create Project</div>
            </div>
          </div>

          {/* Create Group Task Card */}
          <div className="bg-[#FFC3C5] p-4 rounded-lg shadow-md hover:scale-105 transition-transform ease-linear cursor-pointer flex flex-col items-center justify-center text-center w-full max-w-xs mx-auto">
            <i className="bi bi-person-plus text-4xl text-white"></i>
            <div className="mt-3">
              <div className="font-semibold text-lg text-white">Create Group Task</div>
            </div>
          </div>

        </div>


      </div>


    </>
  )
}

export default DashBoard