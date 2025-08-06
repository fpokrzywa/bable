'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, User } from 'lucide-react';

export function AppSidebar() {
  return (
    <>
      <SidebarHeader className="h-16" />

      <SidebarContent className="p-2 flex-grow justify-center">
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" size="icon" variant="ghost">
                <Settings />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="User" size="icon" variant="ghost" className="bg-primary/20 text-primary hover:text-primary">
                <User />
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="h-16"/>
    </>
  );
}
