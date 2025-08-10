
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
import { Settings, User, PanelLeft, LayoutGrid, Heart, LogOut } from 'lucide-react';
import type { Widget, User as UserType } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Profile } from '../Profile';
import { useRouter } from 'next/navigation';
import { Settings as SettingsPage } from '../Settings';
import { useIsMobile } from '@/hooks/use-mobile';


interface AppSidebarProps {
    user: UserType | null;
    minimizedWidgets: Widget[];
    favoritedWidgets: Widget[];
    onRestoreWidget: (id: string) => void;
    onRestoreFavorite: (widget: Widget) => void;
    onProfileUpdate: () => void;
}

export function AppSidebar({ user, minimizedWidgets, favoritedWidgets, onRestoreWidget, onRestoreFavorite, onProfileUpdate }: AppSidebarProps) {
  const { state } = useSidebar();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/');
  };
  
  return (
    <div className="flex flex-col h-full">
      <SidebarContent>
        <SidebarMenu className="h-full">
            <SidebarMenuItem>
                <SidebarTrigger asChild>
                    <SidebarMenuButton tooltip="Toggle Sidebar" variant="ghost">
                        <PanelLeft />
                        <span className="sr-only">Toggle Sidebar</span>
                    </SidebarMenuButton>
                </SidebarTrigger>
            </SidebarMenuItem>

          {favoritedWidgets.length > 0 && (
            <>
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
            </>
          )}
          {minimizedWidgets.length > 0 && (
              <>
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
              </>
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
