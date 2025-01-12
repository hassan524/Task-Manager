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

export function AppSidebar() {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 flex justify-center items-center text-lg font-semibold border-b">
        <div className="w-14 h-14">
          <img src="/public/logo.png" alt="" />
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}

      <SidebarContent className="mt-8">
        <SidebarMenu className="flex flex-col leading-4 font-semibold">

          <NavLink to='home'>
            <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
              <i className="bi bi-house-gear-fill mr-3"></i>
              Home
            </SidebarMenuItem>
          </NavLink>

          {/* Dashboard */}
          <NavLink to='dashboard'>
            <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
              <i className="bi bi-speedometer mr-3"></i>
              Dashboard
            </SidebarMenuItem>
          </NavLink>

          {/* Notifications */}
          <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
            <i className="bi bi-bell-fill mr-3"></i>
            Notifications
          </SidebarMenuItem>

          {/* Completed (Parent) */}
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
                className={`bi ${isCompletedOpen ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
              ></i>
            </SidebarMenuItem>

            {/* Completed (Children) */}
            {isCompletedOpen && (
              <div className="pl-8 text-sm">
                <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                  <i className="bi bi-check2-all mr-2"></i>
                  Completed Tasks
                </SidebarMenuItem>
                <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                  <i className="bi bi-people-fill mr-2"></i>
                  Completed Group Tasks
                </SidebarMenuItem>
                <SidebarMenuItem className="flex hover:bg-slate-100 items-center px-4 py-2 cursor-pointer">
                  <i className="bi bi-briefcase-fill mr-2"></i>
                  Completed Projects
                </SidebarMenuItem>
              </div>
            )}
          </div>

          {/* Settings */}
          <SidebarMenuItem className="flex hover:bg-slate-200 items-center px-4 py-3 cursor-pointer">
            <i className="bi bi-gear-fill mr-3"></i>
            Settings
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4 border-t text-sm text-center">
        <i className="bi bi-c-circle mr-1"></i>
        Copyright 2025 MyApp
      </SidebarFooter>
    </Sidebar>
  );
}
