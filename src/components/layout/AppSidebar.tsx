
'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarSeparator,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings, User, PanelLeft, LayoutGrid, Heart, LogOut, FolderKanban, FolderPlus, Store, Library, Bot, Briefcase, Users, ChevronDown } from 'lucide-react';
import type { Widget, User as UserType, Workspace } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Profile } from '../Profile';
import { useRouter } from 'next/navigation';
import { Settings as SettingsPage } from '../Settings';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

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

export function AppSidebar({ user, minimizedWidgets, favoritedWidgets, workspaces, onRestoreWidget, onRestoreFavorite, onProfileUpdate, onLoadWorkspace, onWorkspaceAction }: AppSidebarProps) {
  const { state, setOpenMobile } = useSidebar();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/');
  };
  
  const handleWorkspaceClick = (ws: Workspace) => {
    onLoadWorkspace(ws);
    if(isMobile) setOpenMobile(false);
  }

  const handleActionClick = (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => {
      onWorkspaceAction(action);
      if(isMobile) setOpenMobile(false);
  }

  const mainContent = (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ai-tools">
            <AccordionTrigger className="hover:no-underline px-2 py-0">
                <div className="flex flex-1 items-center justify-between">
                    <SidebarMenuButton asChild tooltip="AI Tools" variant="ghost" className="w-full justify-start">
                        <div>
                            <Bot />
                            {(state === 'expanded' || isMobile) && <span className="truncate">AI Tools</span>}
                        </div>
                    </SidebarMenuButton>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 pl-2">
                    <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
                        <Link href="/ai-store" className="w-full">
                            <SidebarMenuButton tooltip="AI Store" variant="ghost" className="w-full justify-start">
                                <Store />
                                <span className="truncate">AI Store</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
                        <Link href="/prompt-catalog" className="w-full">
                            <SidebarMenuButton tooltip="Prompt Catalog" variant="ghost" className="w-full justify-start">
                                <Library />
                                <span className="truncate">Prompt Catalog</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </div>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="workspace">
            <AccordionTrigger className="hover:no-underline px-2 py-0">
                <div className="flex flex-1 items-center justify-between">
                    <SidebarMenuButton asChild tooltip="Workspace" variant="ghost" className="w-full justify-start">
                        <div>
                            <Briefcase />
                            {(state === 'expanded' || isMobile) && <span className="truncate">Workspace</span>}
                        </div>
                    </SidebarMenuButton>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 pl-2">
                    <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
                        <Link href="/dashboard" className="w-full">
                            <SidebarMenuButton tooltip="Main Dashboard" variant="ghost" className="w-full justify-start">
                                <LayoutGrid />
                                <span className="truncate">Main Dashboard</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    {workspaces.map((ws) => (
                        <SidebarMenuItem key={ws.workspaceId} onClick={() => handleWorkspaceClick(ws)}>
                            <SidebarMenuButton tooltip={ws.workspace_name} variant="ghost" className="w-full justify-start">
                                <FolderKanban />
                                <span className="truncate">{ws.workspace_name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user">
            <AccordionTrigger className="hover:no-underline px-2 py-0">
                <div className="flex flex-1 items-center justify-between">
                    <SidebarMenuButton asChild tooltip="User" variant="ghost" className="w-full justify-start">
                        <div>
                            <User />
                            {(state === 'expanded' || isMobile) && <span className="truncate">User</span>}
                        </div>
                    </SidebarMenuButton>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 pl-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Profile" variant="ghost" className="w-full justify-start">
                                <User />
                                {(state === 'expanded' || isMobile) && <span>Profile</span>}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </DialogTrigger>
                        <DialogContent size="lg" className="flex flex-col h-[90vh] max-h-[700px] p-0">
                            <DialogHeader className="p-6 pb-0">
                                <DialogTitle>Profile</DialogTitle>
                            </DialogHeader>
                            <Profile user={user} onProfileUpdate={onProfileUpdate} />
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Settings" variant="ghost" className="w-full justify-start">
                                <Settings />
                                {(state === 'expanded' || isMobile) && <span>Settings</span>}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </DialogTrigger>
                        <DialogContent size="lg" className="flex flex-col h-[90vh] max-h-[700px]">
                            <DialogHeader>
                                <DialogTitle>Settings</DialogTitle>
                            </DialogHeader>
                            <SettingsPage />
                        </DialogContent>
                    </Dialog>
                </div>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="admin">
            <AccordionTrigger className="hover:no-underline px-2 py-0">
                <div className="flex flex-1 items-center justify-between">
                    <SidebarMenuButton asChild tooltip="Administration" variant="ghost" className="w-full justify-start">
                        <div>
                            <Users />
                            {(state === 'expanded' || isMobile) && <span className="truncate">Administration</span>}
                        </div>
                    </SidebarMenuButton>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 pl-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="User Management" variant="ghost" className="w-full justify-start">
                            <Users />
                            <span className="truncate">User Management</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );

  const nonAccordionContent = (
    <>
        <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
          <Link href="/ai-store" className="w-full">
            <SidebarMenuButton tooltip="AI Store" variant="ghost">
                <Store />
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
          <Link href="/prompt-catalog" className="w-full">
            <SidebarMenuButton tooltip="Prompt Catalog" variant="ghost">
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
    </>
  );

  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu>
            <div className="flex items-center justify-between p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:group-data-[state=expanded]:justify-between">
              <Link href="/home">
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:inline">
                  <span>Babel</span><span className="text-primary">Phish</span>
                </span>
              </Link>
              <SidebarTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8">
                      <PanelLeft />
                      <span className="sr-only">Toggle Sidebar</span>
                  </Button>
              </SidebarTrigger>
            </div>
            
            {state === 'expanded' || isMobile ? mainContent : nonAccordionContent}
            
          {favoritedWidgets.length > 0 && (
            <React.Fragment key="favorites-section">
              {favoritedWidgets.map((widget) => (
                  <SidebarMenuItem key={widget.id}>
                    <SidebarMenuButton
                      tooltip={widget.query}
                      variant="ghost"
                      onClick={() => onRestoreFavorite(widget)}
                    >
                      <Heart className="text-primary fill-primary" />
                      {(state === 'expanded' || isMobile) && <span className="truncate">{widget.query}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </React.Fragment>
          )}
          {minimizedWidgets.length > 0 && (
              <React.Fragment key="minimized-section">
                {minimizedWidgets.map((widget) => (
                    <SidebarMenuItem key={widget.id}>
                        <SidebarMenuButton
                            tooltip={widget.query}
                            variant="ghost"
                            onClick={() => onRestoreWidget(widget.id)}
                        >
                            <LayoutGrid />
                            {(state === 'expanded' || isMobile) && <span className="truncate">{widget.query}</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </React.Fragment>
          )}

        </SidebarMenu>
      </SidebarContent>
       <div className="mt-auto p-2">
            <div className="p-2 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[state=expanded]:block">
                {(state === 'expanded' || isMobile) && <span className="truncate">{user?.email || 'User'}</span>}
            </div>
           <SidebarMenuButton tooltip="Logout" variant="ghost" onClick={handleLogout}>
              <LogOut />
              {(state === 'expanded' || isMobile) && <span>Logout</span>}
           </SidebarMenuButton>
        </div>
    </div>
  );
}
