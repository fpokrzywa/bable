

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
import { Settings, User, PanelLeft, LayoutGrid, Heart } from 'lucide-react';
import type { Widget } from '@/lib/types';

interface AppSidebarProps {
    minimizedWidgets: Widget[];
    favoritedWidgets: Widget[];
    onRestoreWidget: (id: string) => void;
    onRestoreFavorite: (widget: Widget) => void;
}

export function AppSidebar({ minimizedWidgets, favoritedWidgets, onRestoreWidget, onRestoreFavorite }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar();
  
  return (
    <>
      <SidebarHeader className="h-16 flex items-center justify-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <PanelLeft />
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2 flex-grow flex flex-col items-center">
        {favoritedWidgets.length > 0 && (
          <>
            <SidebarMenu>
              {favoritedWidgets.map((widget) => (
                <SidebarMenuItem key={widget.id}>
                  <SidebarMenuButton
                    tooltip={widget.query}
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => onRestoreFavorite(widget)}
                  >
                    <Heart className="text-primary fill-primary" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarSeparator className="my-2" />
          </>
        )}
        {minimizedWidgets.length > 0 && (
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
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="p-2 flex flex-col items-center gap-2">
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
      </SidebarFooter>
    </>
  );
}

    