
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
import Image from 'next/image';
import { clearUserData } from '@/services/userService';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

type ViewType = 'dashboard' | 'ai-store' | 'prompt-catalog' | 'profile' | 'settings' | 'user-management' | 'role-management';

interface AppSidebarProps {
    user: UserType | null;
    minimizedWidgets: Widget[];
    favoritedWidgets: Widget[];
    workspaces: Workspace[];
    currentView?: ViewType;
    onViewChange?: (view: ViewType) => void;
    onRestoreWidget: (id: string) => void;
    onRestoreFavorite: (widget: Widget) => void;
    onProfileUpdate: () => void;
    onLoadWorkspace: (workspace: Workspace) => void;
    onWorkspaceAction: (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => void;
    onMainWorkspace?: () => void;
    onRefreshWorkspaces?: () => void;
    isSyncingWorkspaces?: boolean;
    syncEnabled?: boolean;
    lastSyncTime?: Date | null;
}

const SIDEBAR_ACCORDION_STATE = 'sidebarAccordionState';

export function AppSidebar({ user, minimizedWidgets, favoritedWidgets, workspaces, currentView = 'dashboard', onViewChange, onRestoreWidget, onRestoreFavorite, onProfileUpdate, onLoadWorkspace, onWorkspaceAction, onMainWorkspace, onRefreshWorkspaces, isSyncingWorkspaces = false, syncEnabled = true, lastSyncTime }: AppSidebarProps) {
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
    clearUserData();
    router.push('/');
  };
  
  const handleWorkspaceClick = (ws: Workspace) => {
    onLoadWorkspace(ws);
    if(isMobile) setOpenMobile(false);
  }

  const mainContent = (
    <Accordion type="single" collapsible className="w-full space-y-1" value={openAccordionItem} onValueChange={handleAccordionChange}>
        <AccordionItem value="ai-tools">
            <AccordionTrigger className="w-full justify-start rounded-md px-2 hover:bg-sidebar-accent">
                <Bot />
                <span>AI Tools</span>
            </AccordionTrigger>
            <AccordionContent>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start" 
                    isActive={currentView === 'ai-store'}
                    onClick={() => onViewChange?.('ai-store')}
                >
                    <Store />
                    <span>AI Store</span>
                </SidebarMenuButton>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start" 
                    isActive={currentView === 'prompt-catalog'}
                    onClick={() => onViewChange?.('prompt-catalog')}
                >
                    <Library />
                    <span>Prompt Catalog</span>
                </SidebarMenuButton>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="workspace">
            <AccordionTrigger className="w-full justify-start rounded-md px-2 hover:bg-sidebar-accent">
                <Briefcase />
                <span>Workspace</span>
            </AccordionTrigger>
            <AccordionContent>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start" 
                    isActive={currentView === 'dashboard'}
                    onClick={() => onMainWorkspace?.()}
                >
                    <LayoutGrid />
                    <span>Main Workspace</span>
                </SidebarMenuButton>
                
                
                {workspaces.map((ws) => (
                    <SidebarMenuButton key={ws.workspaceId} variant="ghost" className="w-full justify-start" onClick={() => handleWorkspaceClick(ws)}>
                        <FolderKanban />
                        <span className="truncate">{ws.workspace_name}</span>
                    </SidebarMenuButton>
                ))}
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user">
            <AccordionTrigger className="w-full justify-start rounded-md px-2 hover:bg-sidebar-accent">
                 <User />
                 <span>User</span>
            </AccordionTrigger>
            <AccordionContent>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start" 
                    isActive={currentView === 'profile'}
                    onClick={() => onViewChange?.('profile')}
                >
                   <User />
                   <span>Profile</span>
                </SidebarMenuButton>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start" 
                    isActive={currentView === 'settings'}
                    onClick={() => onViewChange?.('settings')}
                >
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="admin">
            <AccordionTrigger className="w-full justify-start rounded-md px-2 hover:bg-sidebar-accent">
                <Users />
                <span>Administration</span>
            </AccordionTrigger>
            <AccordionContent>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start"
                    isActive={currentView === 'user-management'}
                    onClick={() => onViewChange?.('user-management')}
                >
                    <Users />
                    <span>User Management</span>
                </SidebarMenuButton>
                <SidebarMenuButton 
                    variant="ghost" 
                    className="w-full justify-start"
                    isActive={currentView === 'role-management'}
                    onClick={() => onViewChange?.('role-management')}
                >
                    <Settings />
                    <span>Role Management</span>
                </SidebarMenuButton>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );

  const nonAccordionContent = (
    <div className="flex flex-col items-center space-y-1">
        <SidebarMenuItem>
            <SidebarMenuButton 
                tooltip="AI Store" 
                variant="ghost" 
                isActive={currentView === 'ai-store'}
                onClick={() => onViewChange?.('ai-store')}
                className="w-12 h-12 p-0 flex items-center justify-center"
            >
                <Store />
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton 
                tooltip="Prompt Catalog" 
                variant="ghost" 
                isActive={currentView === 'prompt-catalog'}
                onClick={() => onViewChange?.('prompt-catalog')}
                className="w-12 h-12 p-0 flex items-center justify-center"
            >
                <Library />
            </SidebarMenuButton>
        </SidebarMenuItem>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        tooltip="Workspace" 
                        variant="ghost"
                        className="w-12 h-12 p-0 flex items-center justify-center"
                    >
                        <Briefcase />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="ml-2">
                <DropdownMenuItem onClick={() => onMainWorkspace?.()} className="cursor-pointer">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Main Workspace</span>
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
            <SidebarMenuButton 
                tooltip="Profile" 
                variant="ghost" 
                isActive={currentView === 'profile'}
                onClick={() => onViewChange?.('profile')}
                className="w-12 h-12 p-0 flex items-center justify-center"
            >
                <User />
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton 
                tooltip="Settings" 
                variant="ghost" 
                isActive={currentView === 'settings'}
                onClick={() => onViewChange?.('settings')}
                className="w-12 h-12 p-0 flex items-center justify-center"
            >
                <Settings />
            </SidebarMenuButton>
        </SidebarMenuItem>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu>
            <div className={cn("flex items-center justify-between group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:group-data-[state=expanded]:justify-between", (state === 'expanded' || isMobile) ? "p-2 mb-4" : "p-2 mb-2")}>
              <Link href="/home" className="flex items-center gap-2 font-semibold text-xl group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:flex">
                  <Image
                    src="/bablephish_logo.svg"
                    alt="BabelPhish Logo"
                    width={24}
                    height={24}
                    className="flex-shrink-0"
                  />
                  <span className="text-primary">BabelPhish</span>
              </Link>
              <SidebarTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8">
                      <PanelLeft />
                      <span className="sr-only">Toggle Sidebar</span>
                  </Button>
              </SidebarTrigger>
            </div>
            
            <div className={cn("space-y-1", (state === 'expanded' || isMobile) ? "px-2" : "px-0")}>
                {(state === 'expanded' || isMobile) ? mainContent : nonAccordionContent}
            </div>
            
        </SidebarMenu>
      </SidebarContent>
       <div className={cn("mt-auto", (state === 'expanded' || isMobile) ? "p-4" : "p-2 flex justify-center")}>
            <div className="text-sm text-muted-foreground mb-2 group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:block truncate">
                {user?.email || 'User'}
            </div>
           <SidebarMenuButton 
               tooltip="Logout" 
               variant="ghost" 
               onClick={handleLogout} 
               className={cn(
                   (state === 'expanded' || isMobile) 
                       ? "w-full justify-start" 
                       : "w-12 h-12 p-0 flex items-center justify-center"
               )}
           >
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:inline">Logout</span>
           </SidebarMenuButton>
        </div>
    </div>
  );
}
