
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings, User, PanelLeft, LayoutGrid } from 'lucide-react';
import type { Widget } from '@/lib/types';

interface AppSidebarProps {
    minimizedWidgets: Widget[];
    onRestoreWidget: (id: string) => void;
}

export function AppSidebar({ minimizedWidgets, onRestoreWidget }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  return (
    <>
      <SidebarHeader className="h-16 flex items-center justify-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <PanelLeft />
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
        {minimizedWidgets.length > 0 && <SidebarSeparator className="my-4" />}
        <SidebarMenu>
            {minimizedWidgets.map((widget) => (
                 <SidebarMenuItem key={widget.id}>
                    <SidebarMenuButton
                        tooltip={widget.query}
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => onRestoreWidget(widget.id)}
                    >
                        <LayoutGrid />
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="h-16" />
    </>
  );
}
