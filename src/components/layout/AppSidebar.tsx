'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Settings, User, PanelLeft, PanelRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  return (
    <>
      <SidebarHeader className="h-16 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            'h-8 w-8 transition-transform',
            isCollapsed && 'rotate-180'
          )}
        >
          <PanelLeft />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2 flex-grow flex flex-col items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" size="icon" variant="ghost">
              <Settings />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="User"
              size="icon"
              variant="ghost"
              className="bg-primary/20 text-primary hover:text-primary"
            >
              <User />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="h-16" />
    </>
  );
}
