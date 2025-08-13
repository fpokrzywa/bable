
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebar, SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/services/userService';
import { getWorkspaces } from '@/services/workspaceService';
import type { User, Workspace } from '@/lib/types';
import { Profile } from '@/components/Profile';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchInitialData = async () => {
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/');
      return;
    }
    const userEmail = JSON.parse(session).email;
    if (!userEmail) {
      router.push('/');
      return;
    }

    setIsAuthenticated(true);
    setLoading(true);

    try {
        const [profile, workspacesData] = await Promise.all([
            getUserProfile(userEmail),
            getWorkspaces(userEmail)
        ]);
        setUser(profile);
        setWorkspaces(workspacesData);
    } catch (error) {
        console.error("Failed to fetch initial data:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not load user data." });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [router]);
  
  if (!isAuthenticated) {
    return null;
  }

  const renderSidebar = () => (
    <AppSidebar 
      user={user}
      minimizedWidgets={[]} 
      favoritedWidgets={[]}
      onRestoreWidget={() => {}}
      onRestoreFavorite={() => {}}
      onProfileUpdate={fetchInitialData}
      workspaces={workspaces}
      onLoadWorkspace={(ws) => {
        router.push('/dashboard');
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
    return `calc(var(--sidebar-width-icon, 3.5rem))`;
  }

  const PageLoader = () => (
    <div className="flex h-screen w-screen items-center justify-center">
        <Skeleton className="h-full w-16" />
        <div className="flex-1 p-8">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full" />
        </div>
    </div>
  )

  if (loading) {
    return <PageLoader />;
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
        <div className="z-50 h-full">
            <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
              {renderSidebar()}
            </Sidebar>
        </div>
      )}
      
      <div 
        className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out"
        style={{ paddingLeft: calculatePadding() }}
      >
         <main className="flex-1 overflow-y-auto no-scrollbar pt-[calc(5vh)]">
             <div className="max-w-4xl mx-auto px-6">
                <Profile user={user} onProfileUpdate={fetchInitialData} isPage={true} />
             </div>
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

const ProfilePageWithProvider = () => (
    <SidebarProvider defaultOpen={true}>
        <ProfilePage />
    </SidebarProvider>
);

export default ProfilePageWithProvider;
