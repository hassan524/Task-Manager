import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";
import { useContext } from 'react'
import MyContext from '@/contexts/context'

export function AppSidebar() {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { SetIsLogOutOpen } = useContext(MyContext)


  return (
    <Sidebar>
      {/* <SidebarHeader className="p-4 flex justify-center items-center text-lg font-semibold border-b">
        <div className="w-14 h-14">
          <img src="/public/logo.png" alt="" />
        </div>
      </SidebarHeader> */}

      <SidebarContent className="mt-8">
        <SidebarMenu className="flex flex-col leading-4 font-semibold">
          <NavLink to="home">
            <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
              <i className="bi bi-house-gear-fill mr-3"></i>
              Home
            </SidebarMenuItem>
          </NavLink>
          <NavLink to="dashboard">
            <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
              <i className="bi bi-speedometer mr-3"></i>
              Dashboard
            </SidebarMenuItem>
          </NavLink>
          <div>
            <SidebarMenuItem
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setIsCompletedOpen(!isCompletedOpen)}
            >
              <div className="flex items-center">
                <i className="bi bi-check-circle-fill mr-3"></i>
                Completed
              </div>
              <i
                className={`bi ${
                  isCompletedOpen ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></i>
            </SidebarMenuItem>
            {isCompletedOpen && (
              <div className="pl-8 text-sm">
                <NavLink to="CompletedTask">
                  <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                    <i className="bi bi-check2-all mr-2"></i>
                    Completed Tasks
                  </SidebarMenuItem>
                </NavLink>
                <NavLink to="CompletedGroupTask">
                  <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                    <i className="bi bi-people-fill mr-2"></i>
                    Completed Group Tasks
                  </SidebarMenuItem>
                </NavLink>
                <NavLink to="CompletedProject">
                  <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                    <i className="bi bi-briefcase-fill mr-2"></i>
                    Completed Projects
                  </SidebarMenuItem>
                </NavLink>
              </div>
            )}
          </div>
          <div>
            <SidebarMenuItem
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center">
                <i className="bi bi-gear-fill mr-3"></i>
                Settings
              </div>
              <i
                className={`bi ${
                  isSettingsOpen ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></i>
            </SidebarMenuItem>
            {isSettingsOpen && (
              <div className="pl-8 text-sm">
                <SidebarMenuItem onClick={() => SetIsLogOutOpen(true)} className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                  <i className="bi bi-box-arrow-right mr-2"></i>
                  Log Out
                </SidebarMenuItem>
              </div>
            )}
          </div>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t text-sm text-center">
        <i className="bi bi-c-circle mr-1"></i>
        Copyright 2025 MyApp
      </SidebarFooter>
    </Sidebar>
  );
}
