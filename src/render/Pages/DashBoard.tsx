import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const DashBoard = () => {
  return (
    <>
      <div className="wrapper flex flex-col gap-10">

        {/* Header Section */}
        <div className="w-full h-6 flex items-center justify-start">
          <div className="flex items-center gap-2">
            <i className="bi bi-speedometer text-primary"></i>
            <span className="font-semibold text-primary">Dashboard</span>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        {/* Projects Section */}
        <div className="wrapper flex flex-col gap-[3rem]">
          <div className="pending relative w-full min-h-96 border border-slate-100 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h3 className="font-semibold text-lg text-slate-600">Your Projects</h3>
              <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                + Add New
              </button>
            </div>
            <Accordion type="single" collapsible className="flex flex-col gap-4">
              <AccordionItem value="project-1">
                <AccordionTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 border border-slate-100 rounded-md hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-folder text-slate-500 text-xl"></i>
                    <div>
                      <span className="font-medium text-slate-600 text-sm">
                        Task Manager Application
                      </span>
                      <div className="text-xs text-slate-400">
                        Created: 12:04:25
                      </div>
                    </div>
                  </div>
                  {/* Custom Icon - Replace the default accordion icon with your custom icon */}
                  <i className="bi bi-three-dots-vertical text-slate-400"></i>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 border border-slate-100 rounded-md bg-slate-50 p-3">
                    <h4 className="text-sm font-semibold text-slate-600 mb-2">
                      Tasks
                    </h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center border border-slate-100 rounded-md p-2 hover:shadow-sm">
                        <span className="text-sm text-slate-600">Task 1</span>
                        <i className="bi bi-three-dots-vertical text-slate-400"></i>
                      </div>
                      <div className="flex justify-between items-center border border-slate-100 rounded-md p-2 hover:shadow-sm">
                        <span className="text-sm text-slate-600">Task 2</span>
                        <i className="bi bi-three-dots-vertical text-slate-400"></i>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

          </div>
        </div>

        {/* Tasks Section */}
        <div className="wrapper mt-8 flex flex-col gap-[3rem]">
          <div className="pending relative w-full min-h-96 border border-slate-100 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h3 className="font-semibold text-lg text-slate-600">Your Tasks</h3>
              <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                + Add Task
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border border-slate-100 rounded-md p-3 bg-slate-50 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <i className="bi bi-clipboard text-slate-500 text-xl"></i>
                  <div>
                    <span className="font-medium text-slate-600 text-sm">Fix Bugs in Dashboard</span>
                    <div className="text-xs text-slate-400">Deadline: 15 Jan 2025</div>
                  </div>
                </div>
                <i className="bi bi-three-dots-vertical text-slate-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Group Tasks Section */}
        <div className="wrapper mt-8 flex flex-col gap-[3rem]">
          <div className="pending relative w-full min-h-96 border border-slate-100 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h3 className="font-semibold text-lg text-slate-600">Your Group Tasks</h3>
              <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                + Add Group Task
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border border-slate-100 rounded-md p-3 bg-slate-50 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <i className="bi bi-people text-slate-500 text-xl"></i>
                  <div>
                    <span className="font-medium text-slate-600 text-sm">Plan Marketing Campaign</span>
                    <div className="text-xs text-slate-400">Due: 20 Jan 2025</div>
                  </div>
                </div>
                <i className="bi bi-three-dots-vertical text-slate-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
