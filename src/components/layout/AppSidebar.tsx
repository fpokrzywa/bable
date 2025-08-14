
'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings, User, PanelLeft, LayoutGrid, Heart, LogOut, FolderKanban, Store, Library, Bot, Briefcase, Users, ChevronRight } from 'lucide-react';
import type { Widget, User as UserType, Workspace } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
    user: UserType | null;
    minimizedWidgets: Widget[];
    favoritedWidgets: Widget[];
    workspaces: Workspace[];
    onRestoreWidget: (id: string) => void;
    onRestoreFavorite: (widget: Widget) => void;
    onProfileUpdate: () => void;
    onLoadWorkspace: (workspace: Workspace) => void;
    onWorkspaceAction: (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => void;
}

const SIDEBAR_ACCORDION_STATE = 'sidebarAccordionState';

export function AppSidebar({ user, minimizedWidgets, favoritedWidgets, workspaces, onRestoreWidget, onRestoreFavorite, onProfileUpdate, onLoadWorkspace, onWorkspaceAction }: AppSidebarProps) {
  const { state, setOpenMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [openAccordionItem, setOpenAccordionItem] = useState('');

  useEffect(() => {
    const savedState = sessionStorage.getItem(SIDEBAR_ACCORDION_STATE);
    if (savedState) {
      setOpenAccordionItem(savedState);
    } else {
        if (pathname.startsWith('/ai')) setOpenAccordionItem('ai-tools');
        else if (pathname.startsWith('/dashboard')) setOpenAccordionItem('workspace');
        else if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) setOpenAccordionItem('user');
    }
  }, [pathname]);

  const handleAccordionChange = (value: string) => {
    setOpenAccordionItem(value);
    sessionStorage.setItem(SIDEBAR_ACCORDION_STATE, value);
  };

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/');
  };
  
  const handleWorkspaceClick = (ws: Workspace) => {
    onLoadWorkspace(ws);
    if(isMobile) setOpenMobile(false);
  }

  const mainContent = (
    <Accordion type="single" collapsible className="w-full space-y-1" value={openAccordionItem} onValueChange={handleAccordionChange}>
        <AccordionItem value="ai-tools">
            <AccordionTrigger>
                <SidebarMenuButton tooltip="AI Tools" variant="ghost" className="w-full justify-start">
                    <span><Bot />AI Tools</span>
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent>
                <Link href="/ai-store" passHref>
                    <SidebarMenuButton variant="ghost" className="w-full justify-start" isActive={pathname === '/ai-store'}>
                       <span><Store />AI Store</span>
                    </SidebarMenuButton>
                </Link>
                <Link href="/prompt-catalog" passHref>
                    <SidebarMenuButton variant="ghost" className="w-full justify-start" isActive={pathname === '/prompt-catalog'}>
                       <span><Library />Prompt Catalog</span>
                    </SidebarMenuButton>
                </Link>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="workspace">
            <AccordionTrigger>
                 <SidebarMenuButton tooltip="Workspace" variant="ghost" className="w-full justify-start">
                    <span><Briefcase />Workspace</span>
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent>
                <Link href="/dashboard" passHref>
                    <SidebarMenuButton variant="ghost" className="w-full justify-start" isActive={pathname === '/dashboard'}>
                        <span><LayoutGrid />Main Dashboard</span>
                    </SidebarMenuButton>
                </Link>
                {workspaces.map((ws) => (
                    <SidebarMenuButton key={ws.workspaceId} variant="ghost" className="w-full justify-start" onClick={() => handleWorkspaceClick(ws)}>
                        <FolderKanban />
                        <span className="truncate">{ws.workspace_name}</span>
                    </SidebarMenuButton>
                ))}
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user">
            <AccordionTrigger>
                <SidebarMenuButton tooltip="User" variant="ghost" className="w-full justify-start">
                    <span><User />User</span>
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent>
                <Link href="/profile" passHref>
                    <SidebarMenuButton variant="ghost" className="w-full justify-start" isActive={pathname === '/profile'}>
                       <span><User />Profile</span>
                    </SidebarMenuButton>
                </Link>
                 <Link href="/settings" passHref>
                    <SidebarMenuButton variant="ghost" className="w-full justify-start" isActive={pathname === '/settings'}>
                        <span><Settings />Settings</span>
                    </SidebarMenuButton>
                </Link>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="admin">
            <AccordionTrigger>
                 <SidebarMenuButton tooltip="Administration" variant="ghost" className="w-full justify-start">
                    <span><Users />Administration</span>
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent>
                 <SidebarMenuButton variant="ghost" className="w-full justify-start">
                    <Users />
                    <span>User Management</span>
                </SidebarMenuButton>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );

  const nonAccordionContent = (
    <>
        <SidebarMenuItem>
            <Link href="/ai-store" passHref>
                <SidebarMenuButton asChild tooltip="AI Store" variant="ghost" isActive={pathname === '/ai-store'}>
                    <Store />
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/prompt-catalog" passHref>
                <SidebarMenuButton asChild tooltip="Prompt Catalog" variant="ghost" isActive={pathname === '/prompt-catalog'}>
                    <Library />
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Workspace" variant="ghost">
                        <Briefcase />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="ml-2">
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        <span>Main Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                 {workspaces.map((ws) => (
                    <DropdownMenuItem key={ws.workspaceId} onClick={() => handleWorkspaceClick(ws)} className="cursor-pointer">
                        <FolderKanban className="mr-2 h-4 w-4" />
                        <span>{ws.workspace_name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
        <SidebarMenuItem>
            <Link href="/profile" passHref>
                <SidebarMenuButton asChild tooltip="Profile" variant="ghost" isActive={pathname === '/profile'}>
                    <User />
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <Link href="/settings" passHref>
                <SidebarMenuButton asChild tooltip="Settings" variant="ghost" isActive={pathname === '/settings'}>
                    <Settings />
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    </>
  );

  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu>
            <div className="flex items-center justify-between p-2 mb-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:group-data-[state=expanded]:justify-between">
              <Link href="/home" className="font-semibold text-lg group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:inline">
                  <span>Babel</span><span className="text-primary">Phish</span>
              </Link>
              <SidebarTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8">
                      <PanelLeft />
                      <span className="sr-only">Toggle Sidebar</span>
                  </Button>
              </SidebarTrigger>
            </div>
            
            <div className="px-2 space-y-1">
                {(state === 'expanded' || isMobile) ? mainContent : nonAccordionContent}
            </div>
            
        </SidebarMenu>
      </SidebarContent>
       <div className="mt-auto p-4">
            <div className="text-sm text-muted-foreground mb-2 group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:block truncate">
                {user?.email || 'User'}
            </div>
           <SidebarMenuButton tooltip="Logout" variant="ghost" onClick={handleLogout} className="w-full justify-start">
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:inline">Logout</span>
           </SidebarMenuButton>
        </div>
    </div>
  );
}
