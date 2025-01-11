import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar() {

    return (
        <Sidebar >
          <SidebarHeader />
          <SidebarContent >
            <SidebarGroup />
            <div className="p-4">Hassan</div>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
    )
  }
  