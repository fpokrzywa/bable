
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
  const { toggleSidebar, state } = useSidebar();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/');
  };
  
  return (
    <>
      <SidebarHeader className="h-16 flex items-center justify-between p-2">
        <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
                <PanelLeft />
            </Button>
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="p-2 flex-grow">
        {favoritedWidgets.length > 0 && (
          <>
            <SidebarMenu>
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
                            variant="ghost"
                            onClick={() => onRestoreWidget(widget.id)}
                        >
                            <LayoutGrid />
                             {(state === 'expanded' || isMobile) && <span className="truncate">{widget.query}</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="p-2">
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
          <SidebarSeparator className="my-1" />
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" variant="ghost" onClick={handleLogout}>
              <LogOut />
              {(state === 'expanded' || isMobile) && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
