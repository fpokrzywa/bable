'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Bookmark, ShieldCheck, Settings, LogOut } from 'lucide-react';
import type { SavedQuery } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface AppSidebarProps {
  savedQueries: SavedQuery[];
  onQuerySelect: (query: string) => void;
}

export function AppSidebar({ savedQueries, onQuerySelect }: AppSidebarProps) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </Button>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">ServiceNow</span>
            <span className="text-xs text-muted-foreground -mt-1">AI Assist</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" isActive>
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Bookmark size={16} /> Saved Queries
          </SidebarGroupLabel>
          <SidebarMenu>
            {savedQueries.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onQuerySelect(item.query)}
                  tooltip={item.query}
                >
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center w-full gap-2 p-2 rounded-md hover:bg-sidebar-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/40x40" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden">
                      <span className="font-medium text-sidebar-foreground">Admin User</span>
                      <span className="text-muted-foreground text-xs">admin@example.com</span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
