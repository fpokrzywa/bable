
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebar, SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/services/userService';
import { getWorkspaces, saveWorkspace, deleteWorkspace } from '@/services/workspaceService';
import type { Widget, User, Workspace } from '@/lib/types';
import { AIStore } from '@/components/AIStore';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';


function AIStorePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const { state, openMobile, setOpenMobile, width } = useSidebar();
  const isMobile = useIsMobile();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchUserData = async () => {
    const session = localStorage.getItem('session');
    if (!session) return;
    const userEmail = JSON.parse(session).email;
    if (!userEmail) return;

    setLoading(true);
    const profile = await getUserProfile(userEmail);
    setUser(profile);

    if (profile) {
        try {
            const workspacesData = await getWorkspaces(profile.userId);
            setWorkspaces(workspacesData);
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
        } finally {
            setLoading(false);
        }
    } else {
        setLoading(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, [router]);
  
  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
  
  const renderSidebar = () => (
    <AppSidebar 
      user={user}
      minimizedWidgets={[]} 
      favoritedWidgets={[]}
      onRestoreWidget={() => {}}
      onRestoreFavorite={() => {}}
      onProfileUpdate={fetchUserData}
      workspaces={workspaces}
      onLoadWorkspace={(ws) => {
        router.push('/dashboard');
        // In a real app, you'd have a global state to manage this
        toast({ title: `Switching to ${ws.workspace_name}...`, description: "Redirecting to dashboard."});
      }}
      onWorkspaceAction={(action) => {
        router.push('/dashboard');
        toast({ title: "Redirecting to dashboard to manage workspaces."});
      }}
    />
  );
  
  const mobileHeaderHeight = 56;

  const calculatePadding = () => {
    if (isMobile) return '0px';
    if (state === 'expanded') {
        return `var(--sidebar-width)`;
    }
    return `calc(var(--sidebar-width-icon, 3.5rem) + 1rem)`;
  }


  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-background">
      {isMobile ? (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="p-0 w-[300px] bg-card/95">
             <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetDescription className="sr-only">
                    Navigate through workspaces, favorites, and settings.
                </SheetDescription>
            </SheetHeader>
            {renderSidebar()}
          </SheetContent>
        </Sheet>
      ) : (
        <div ref={sidebarRef} className="z-50 h-full">
            <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
              {renderSidebar()}
            </Sidebar>
        </div>
      )}
      
      <div 
        className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out"
        style={{ paddingLeft: calculatePadding() }}
      >
         <main className="flex-1 overflow-y-auto no-scrollbar">
              <AIStore />
         </main>
         
         {isMobile && (
            <header className="absolute top-0 left-0 right-0 p-2 flex items-center justify-between z-30" style={{ height: mobileHeaderHeight }}>
                <Button variant="ghost" size="icon" onClick={() => setOpenMobile(true)}>
                <Menu />
                </Button>
            </header>
         )}
      </div>
    </div>
  );
}

// Wrapping the page with SidebarProvider to provide context to child components
const AIStorePageWithProvider = () => (
    <SidebarProvider defaultOpen={true}>
        <AIStorePage />
    </SidebarProvider>
);

export default AIStorePageWithProvider;
