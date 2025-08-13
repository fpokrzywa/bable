
'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings, User, PanelLeft, LayoutGrid, Heart, LogOut, FolderKanban, FolderPlus, Store, Library, Bot, Briefcase } from 'lucide-react';
import type { Widget, User as UserType, Workspace } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Profile } from '../Profile';
import { useRouter } from 'next/navigation';
import { Settings as SettingsPage } from '../Settings';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

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
            <AccordionTrigger className="hover:no-underline">
                <SidebarMenuButton tooltip="AI Tools" variant="ghost" className="w-full justify-start">
                    <Bot />
                    {(state === 'expanded' || isMobile) && <span className="truncate">AI Tools</span>}
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 border-l pl-2">
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
            <AccordionTrigger className="hover:no-underline">
                 <SidebarMenuButton tooltip="Workspace" variant="ghost" className="w-full justify-start">
                    <Briefcase />
                    {(state === 'expanded' || isMobile) && <span className="truncate">Workspace</span>}
                </SidebarMenuButton>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="ml-7 flex flex-col gap-1 border-l pl-2">
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
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Create Workspace"
                            variant="ghost"
                            onClick={() => handleActionClick('create')}
                            className="w-full justify-start"
                        >
                            <FolderPlus />
                            <span className="truncate">Create Workspace</span>
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
            <SidebarMenuButton tooltip="AI Store" variant="ghost" className="w-full">
                <Store />
                {(state === 'expanded' || isMobile) && <span className="truncate">AI Store</span>}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
          <Link href="/prompt-catalog" className="w-full">
            <SidebarMenuButton tooltip="Prompt Catalog" variant="ghost">
                <Library />
                {(state === 'expanded' || isMobile) && <span className="truncate">Prompt Catalog</span>}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />

        <SidebarMenuItem onClick={() => isMobile && setOpenMobile(false)}>
            <Link href="/dashboard" className="w-full">
                <SidebarMenuButton tooltip="Back to Dashboard" variant="ghost">
                    <LayoutGrid />
                    {(state === 'expanded' || isMobile) && <span className="truncate">Back to Dashboard</span>}
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
        
        {workspaces.map((ws) => (
            <SidebarMenuItem key={ws.workspaceId} onClick={() => handleWorkspaceClick(ws)}>
                <SidebarMenuButton tooltip={ws.workspace_name} variant="ghost">
                    <FolderKanban />
                    {(state === 'expanded' || isMobile) && <span className="truncate">{ws.workspace_name}</span>}
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip="Create Workspace"
                variant="ghost"
                onClick={() => handleActionClick('create')}
            >
                <FolderPlus />
                {(state === 'expanded' || isMobile) && <span className="truncate">Create Workspace</span>}
            </SidebarMenuButton>
        </SidebarMenuItem>
    </>
  );

  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu>
            <div className="flex items-center justify-between p-2 group-data-[collapsible=icon]:justify-center">
              <Link href="/home">
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
                  <span>Babel</span><span className="text-primary">Phish</span>
                </span>
              </Link>
              <SidebarTrigger asChild>
                  <SidebarMenuButton tooltip="Toggle Sidebar" variant="ghost" className="h-8 w-8">
                      <PanelLeft />
                      <span className="sr-only">Toggle Sidebar</span>
                  </SidebarMenuButton>
              </SidebarTrigger>
            </div>
            
            <SidebarSeparator className="my-2" />

            {state === 'expanded' && !isMobile ? mainContent : nonAccordionContent}
            
            {(state === 'expanded' && !isMobile) ? <SidebarSeparator className="my-2"/> : null}

          {favoritedWidgets.length > 0 && (
            <React.Fragment key="favorites-section">
              <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />
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
                <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />
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

          <div className="mt-auto"/>
           <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings" variant="ghost">
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
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={user?.email || 'User'}
                  variant="ghost"
                >
                  <User />
                  {(state === 'expanded' || isMobile) && <span className="truncate">{user?.email || 'User'}</span>}
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
          <SidebarSeparator className="my-1" />
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" variant="ghost" onClick={handleLogout}>
              <LogOut />
              {(state === 'expanded' || isMobile) && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}
