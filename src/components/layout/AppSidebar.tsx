
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
import { Settings, User, PanelLeft, LayoutGrid, Heart, LogOut, FolderKanban, FolderPlus } from 'lucide-react';
import type { Widget, User as UserType, Workspace } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Profile } from '../Profile';
import { useRouter } from 'next/navigation';
import { Settings as SettingsPage } from '../Settings';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import React from 'react';


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
  const { state } = useSidebar();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isWorkspacePopoverOpen, setIsWorkspacePopoverOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/');
  };
  
  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarTrigger asChild>
                    <SidebarMenuButton tooltip="Toggle Sidebar" variant="ghost">
                        <PanelLeft />
                        <span className="sr-only">Toggle Sidebar</span>
                    </SidebarMenuButton>
                </SidebarTrigger>
            </SidebarMenuItem>
            
            <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />

            {workspaces.length === 0 ? (
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Create Workspace"
                        variant="ghost"
                        onClick={() => onWorkspaceAction('create')}
                    >
                        <FolderPlus />
                        {(state === 'expanded' || isMobile) && <span className="truncate">Create Workspace</span>}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ) : (
                <Popover open={isWorkspacePopoverOpen} onOpenChange={setIsWorkspacePopoverOpen}>
                    <PopoverTrigger asChild>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="My Workspaces"
                                variant="ghost"
                            >
                                <FolderKanban />
                                {(state === 'expanded' || isMobile) && <span className="truncate">My Workspaces</span>}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </PopoverTrigger>
                    <PopoverContent
                        side="right"
                        align="start"
                        className="w-[200px] p-1"
                    >
                        {workspaces.map((ws) => (
                            <Button
                                key={ws.workspaceId}
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => {
                                    onLoadWorkspace(ws);
                                    setIsWorkspacePopoverOpen(false);
                                }}
                            >
                                {ws.workspace_name}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
            )}


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

          <SidebarSeparator className="my-1 md:mt-auto group-data-[collapsible=icon]:hidden" />
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
                  tooltip="User"
                  variant="ghost"
                >
                  <User />
                  {(state === 'expanded' || isMobile) && <span>User</span>}
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
          <SidebarSeparator className="my-1 group-data-[collapsible=icon]:hidden" />
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
