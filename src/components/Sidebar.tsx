import React from 'react'
import { Sidebar, SidebarProvider, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui//button';

const Sidebar = () => {
    return (
        <SidebarProvider>
            <SidebarTrigger>
                <Button>Open Sidebar</Button>
            </SidebarTrigger>

            <Sidebar>
                <SidebarHeader>
                    <h2>Sidebar Header</h2>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <a href="#">Dashboard</a>
                        <a href="#">Projects</a>
                        <a href="#">Tasks</a>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <Button variant="outline">Logout</Button>
                </SidebarFooter>
            </Sidebar>

            <div>
                <h1>Main Content</h1>
            </div>
        </SidebarProvider>
    )
}

export default Sidebar