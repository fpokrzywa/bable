

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Widget, SavedQuery, Problem, Incident, Change, User, Workspace } from '@/lib/types';
import { generateWidgetFromQuery } from '@/ai/flows/generate-widget-from-query';
import { agentSpecificWidget } from '@/ai/flows/agent-specific-widget';
import { saveQueryWithVoiceText } from '@/ai/flows/save-query-with-voice-text';
import { generateOverviewSummary } from '@/ai/flows/generate-overview-summary';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { WidgetContainer, WIDGET_INITIAL_HEIGHT, WIDGET_INITIAL_WIDTH } from '@/components/widgets/WidgetContainer';
import { ChatInput } from '@/components/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { getIncidents } from '@/services/servicenow';
import { getCompanyById } from '@/services/companyService';
import { getUserProfile, getCachedUserData, updateCachedWorkspaces, getCachedWorkspace } from '@/services/userService';
import { getSampleData } from '@/services/sampleDataService';
import { getWorkspaces, saveWorkspace, deleteWorkspace } from '@/services/workspaceService';
import { Menu, Sparkle, Loader2, Save, Edit, X as XIcon, Disc, Pencil, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWorkspaceSync } from '@/hooks/use-workspace-sync';
import { BaseWidget } from './widgets/BaseWidget';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Profile } from './Profile';
import { AIStore } from './AIStore';
import { PromptCatalog } from './PromptCatalog';
import { UserManagement } from './UserManagement';
import { RoleManagement } from './RoleManagement';
import { CompanyManagement } from './CompanyManagement';
import { CompanyEdit } from './CompanyEdit';
import { FindAnswersPanel } from './FindAnswersPanel';


type ViewType = 'dashboard' | 'ai-store' | 'prompt-catalog' | 'profile' | 'user-management' | 'role-management' | 'company-management' | 'company-edit' | string;

export function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedFindAnswersId, setSelectedFindAnswersId] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [favorites, setFavorites] = useState<Widget[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
  const { toast } = useToast();
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [nextZIndex, setNextZIndex] = useState(1);
  const [lastRestorePosition, setLastRestorePosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [openWorkspaces, setOpenWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceToEdit, setWorkspaceToEdit] = useState<Workspace | null>(null);
  const [workspaceAction, setWorkspaceAction] = useState<'create' | 'edit' | 'load' | 'forget' | 'save' | null>(null);
  const [isWorkspaceListOpen, setIsWorkspaceListOpen] = useState(false);
  
  const [isDraggingWidget, setIsDraggingWidget] = useState(false);
  const [isManualSaving, setIsManualSaving] = useState(false);

  const activeWorkspace = openWorkspaces.find(ws => ws.workspaceId === currentWorkspaceId) || null;
  const MAX_OPEN_SESSIONS = parseInt(process.env.NEXT_PUBLIC_WORKSPACE_OPEN_SESSIONS || '3', 10);
  
  // Workspace synchronization
  const {
    isChecking: isSyncingWorkspaces,
    lastSyncTime,
    syncNow: syncWorkspacesNow,
    enabled: syncEnabled
  } = useWorkspaceSync({
    user,
    workspaces,
    onWorkspacesChanged: (updatedWorkspaces) => {
      setWorkspaces(updatedWorkspaces);
    },
    onWorkspacesDeleted: (deletedIds) => {
      // Remove deleted workspaces from open sessions
      const remainingOpen = openWorkspaces.filter(ws => !deletedIds.includes(ws.workspaceId));
      setOpenWorkspaces(remainingOpen);
      
      // If current workspace was deleted, switch to first available or clear
      if (currentWorkspaceId && deletedIds.includes(currentWorkspaceId)) {
        if (remainingOpen.length > 0) {
          setCurrentWorkspaceId(remainingOpen[0].workspaceId);
          loadWorkspaceUI(remainingOpen[0]);
        } else {
          setCurrentWorkspaceId(null);
          setWidgets([]);
        }
      }
    },
    enabled: process.env.NEXT_PUBLIC_WORKSPACE_SYNC_ENABLED !== 'false',
    intervalMs: parseInt(process.env.NEXT_PUBLIC_WORKSPACE_SYNC_INTERVAL || '30000', 10),
    showNotifications: process.env.NEXT_PUBLIC_WORKSPACE_SYNC_NOTIFICATIONS !== 'false'
  });

  const loadUserData = () => {
    // First try to get cached data from login
    const cachedData = getCachedUserData();
    
    if (cachedData.user && cachedData.workspaces.length >= 0) {
      // Use cached data immediately
      setUser(cachedData.user);
      setWorkspaces(cachedData.workspaces);
      setLoadingWorkspaces(false);
      return;
    }

    // Fallback to fetching if no cached data (shouldn't happen after login)
    fetchUserDataFallback();
  };

  const fetchUserDataFallback = async () => {
    const session = localStorage.getItem('session');
    if (!session) return;
    const userEmail = JSON.parse(session).email;
    if (!userEmail) return;

    setLoading(true);
    try {
      const profile = await getUserProfile(userEmail);
      setUser(profile);

      if (profile) {
        const workspacesData = await getWorkspaces(profile.userId);
        setWorkspaces(workspacesData);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
      setLoadingWorkspaces(false);
    }
  };
  
  useEffect(() => {
    loadUserData();
  }, []);

  const useDebouncedEffect = (effect: () => void, deps: any[], delay: number) => {
      const callback = useCallback(effect, deps);
      useEffect(() => {
          const handler = setTimeout(() => {
              callback();
          }, delay);

          return () => {
              clearTimeout(handler);
          };
      }, [callback, delay]);
  };
    
  // Debounced auto-save for workspace changes
  useDebouncedEffect(() => {
      if (activeWorkspace && user && !loading && !isWorkspaceModalOpen && !isDraggingWidget && !isManualSaving) {
        handleQuickSaveWorkspace(true);
      }
  }, [widgets, activeWorkspace, user, isDraggingWidget, isManualSaving], 1000);
  
  const handleProfileUpdate = () => {
    // Refresh user data from server and update cache
    fetchUserDataFallback();
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    
    // Check if this is a Find Answers item
    const findAnswersItems = ['it-support-guides', 'my-support-guides', 'hr-policies', 'niea-guides', 'adept-guides'];
    if (findAnswersItems.includes(view)) {
      setSelectedFindAnswersId(view);
    } else {
      setSelectedFindAnswersId(null);
    }
    
    // Refresh user data when switching to profile view to get latest changes
    if (view === 'profile') {
      fetchUserDataFallback();
    }
  };

  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    setCurrentView('company-edit');
  };

  const handleBackToCompanyList = () => {
    setSelectedCompany(null);
    setCurrentView('company-management');
  };

  const handleMainWorkspace = () => {
    // Switch to dashboard view
    setCurrentView('dashboard');
    
    // Clear current workspace (no active workspace selected)
    setCurrentWorkspaceId(null);
    
    // Minimize all current widgets
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => ({ ...widget, isMinimized: true }))
    );
    
    // Keep all open workspaces - just deselect the current one
    // This preserves the workspace buttons at the top
  };

  const renderDashboardView = () => (
    <main className="absolute inset-0 z-0">
      {isMobile ? (
        <div className="p-4 space-y-4" style={{ paddingTop: mobileHeaderHeight, paddingBottom: chatInputAreaHeight }}>
          {normalWidgets.map(widget => (
            <div key={widget.id} className="h-auto">
              <BaseWidget
                widget={widget}
                removeWidget={removeWidget}
                updateEntity={updateEntity}
                bringToFront={bringToFront}
                toggleMinimizeWidget={toggleMinimizeWidget}
                toggleFavoriteWidget={toggleFavoriteWidget}
              />
            </div>
          ))}
        </div>
      ) : (
        <WidgetContainer 
          widgets={normalWidgets} 
          removeWidget={removeWidget} 
          updateEntity={updateEntity}
          bringToFront={bringToFront}
          toggleMinimizeWidget={toggleMinimizeWidget}
          toggleFavoriteWidget={toggleFavoriteWidget}
          updateWidgetPosition={updateWidgetPosition}
          updateWidgetDimensions={updateWidgetDimensions}
          sidebarState={state}
          sidebarRef={sidebarRef}
          chatInputRef={chatInputRef}
          setIsDragging={setIsDraggingWidget}
        />
      )}
      
      <div 
        className="absolute inset-0 flex flex-col items-center pointer-events-none" 
        style={{ paddingLeft: !isMobile && sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px`: '0' }}
      >
        {normalWidgets.length === 0 && (
          <div className="flex flex-col h-full w-full max-w-xl mx-auto items-center text-center p-4" style={{ paddingBottom: isMobile ? chatInputAreaHeight : '6rem' }}>
            <div className="flex-grow flex flex-col justify-center items-center">
              <Image
                src="/bablephish_logo.svg"
                alt="BabelPhish Logo"
                width={100}
                height={100}
                className="mx-auto mb-6 opacity-50"
              />
              <h1 className="text-2xl font-bold text-muted-foreground mb-4">
                Welcome to BabelPhish
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Start by typing a command or query below to create your first widget.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pointer-events-auto">
                <p className="text-sm text-muted-foreground mb-4 text-center col-span-full">Quick browse items</p>
                <div className="space-y-2 col-span-full">
                  {starterPrompts.map((prompt, index) => {
                    const Icon = prompt.icon;
                    return (
                      <Button 
                        key={index}
                        variant="link"
                        className="w-full justify-start h-auto py-3 px-4 text-left text-sm bg-transparent pointer-events-auto rounded-lg"
                        onClick={() => handleStarterPrompt(prompt.query)}
                      >
                        <Icon className="mr-3 text-primary" size={20}/>
                        {prompt.text}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboardView();
      case 'ai-store':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <AIStore />
          </div>
        );
      case 'prompt-catalog':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <PromptCatalog />
          </div>
        );
      case 'profile':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <Profile user={user} onProfileUpdate={handleProfileUpdate} isPage={true} />
            </div>
          </div>
        );
      case 'user-management':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <UserManagement />
            </div>
          </div>
        );
      case 'role-management':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <RoleManagement />
            </div>
          </div>
        );
      case 'company-management':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <CompanyManagement onEditCompany={handleEditCompany} />
            </div>
          </div>
        );
      case 'company-edit':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <CompanyEdit 
              company={selectedCompany} 
              onBack={handleBackToCompanyList}
              onSave={handleBackToCompanyList}
            />
          </div>
        );
      default:
        // Check if this is a Find Answers item
        if (selectedFindAnswersId) {
          return (
            <div className="flex-1 flex">
              <FindAnswersPanel 
                findAnswersId={selectedFindAnswersId}
                onClose={() => {
                  setSelectedFindAnswersId(null);
                  setCurrentView('dashboard');
                }}
              />
              <div className="flex-1 flex">
                <div className="flex flex-1 bg-gray-50">
                  <div className="flex flex-col transition-all duration-300 ease-in-out flex-1">
                    {/* Chat Header */}
                    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base truncate">ODIN</span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                          <select className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                            <option>GPT-4o</option>
                            <option>GPT-4</option>
                            <option>Claude-3.5</option>
                            <option>Gemini Pro</option>
                          </select>
                          <button className="px-2 py-1 sm:px-4 sm:py-1 bg-orange-600 text-white rounded text-xs sm:text-sm hover:bg-orange-700 transition-colors">
                            Prompts
                          </button>
                          <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 text-gray-600 rounded text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 flex flex-col px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-4xl w-full mx-auto">
                          <h2 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center">
                            Please ask ODIN your questions
                          </h2>
                          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center px-2">
                            Ask a question or add files to the conversation using the paperclip icon.
                          </p>
                        </div>
                      </div>

                      {/* Chat Input */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="flex items-center space-x-2 sm:space-x-3 bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
                            <button className="p-1 sm:p-2 text-gray-400 hover:text-orange-600 transition-colors flex-shrink-0 relative" title="Upload files">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                              </svg>
                            </button>
                            <input 
                              type="text" 
                              placeholder="Ask a question..." 
                              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base min-w-0" 
                            />
                            <button className="p-1 sm:p-2 text-gray-400 hover:text-orange-600 transition-colors flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" x2="12" y1="19" y2="22"></line>
                              </svg>
                            </button>
                            <button className="p-2 sm:p-3 transition-colors flex-shrink-0 rounded-lg text-gray-400 hover:text-orange-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path d="m22 2-7 20-4-9-9-4Z"></path>
                                <path d="M22 2 11 13"></path>
                              </svg>
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3 justify-start">
                            <button key="web-search" className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-gray-400">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                              </svg>
                              <span className="hidden sm:inline">Web Search</span>
                              <span className="sm:hidden">Web</span>
                            </button>
                            <button key="research" className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-gray-400">
                                <path d="M3 3v18h18"></path>
                                <path d="M18 17V9"></path>
                                <path d="M13 17V5"></path>
                                <path d="M8 17v-3"></path>
                              </svg>
                              <span>Research</span>
                            </button>
                            <button key="help-with-this" className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-gray-400">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                <circle cx="9" cy="9" r="2"></circle>
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                              </svg>
                              <span className="hidden sm:inline">Help me with this</span>
                              <span className="sm:hidden">Image</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Handle other dynamic views
        if (currentView !== 'dashboard' && currentView !== 'ai-store' && currentView !== 'prompt-catalog' && 
            currentView !== 'profile' && currentView !== 'user-management' && currentView !== 'role-management' && 
            currentView !== 'company-management' && currentView !== 'company-edit') {
          const title = currentView.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          
          return (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center py-12">
                  <h1 className="text-2xl font-semibold mb-4">{title}</h1>
                  <p className="text-muted-foreground">Content for {title.toLowerCase()} will be available here.</p>
                </div>
              </div>
            </div>
          );
        }
        return renderDashboardView();
    }
  };
  
  const fetchWorkspaces = async (userId: string, forceRefresh = false) => {
    if (!userId) return;
    
    // Use cached data first if not forcing refresh
    if (!forceRefresh) {
      const { workspaces: cachedWorkspaces } = getCachedUserData();
      if (cachedWorkspaces.length > 0) {
        setWorkspaces(cachedWorkspaces);
        setLoadingWorkspaces(false);
        return;
      }
    }
    
    setLoadingWorkspaces(true);
    try {
        const data = await getWorkspaces(userId);
        setWorkspaces(data);
        updateCachedWorkspaces(data);
    } catch (error) {
        console.error("Failed to fetch workspaces", error);
    } finally {
        setLoadingWorkspaces(false);
    }
  };
  
  const refreshWorkspaces = () => {
    if (user) {
      syncWorkspacesNow();
    }
  };


  useEffect(() => {
    if (!activeWorkspace) {
      setWidgets([]);
    }
  }, [activeWorkspace]);
  
  const bringToFront = (id: string, isSummaryOrChat?: boolean) => {
    setWidgets(prevWidgets => {
      const currentMaxZ = prevWidgets.reduce((max, w) => Math.max(max, w.zIndex), 0) || 1;
      const newZIndex = isSummaryOrChat ? 100 : currentMaxZ + 1;
  
      return prevWidgets.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w);
    });
  };
  
  const createWidgetFromDefinition = (widgetDef: Omit<Widget, 'id' | 'isMinimized'>, id?: string) => {
    const newZIndex = nextZIndex;
    setNextZIndex(newZIndex + 1);

    const sidebarWidth = state === 'expanded' && sidebarRef.current ? sidebarRef.current.offsetWidth : 0;
    const workspaceWidth = window.innerWidth - sidebarWidth;
    const workspaceHeight = window.innerHeight;
    
    // Add some randomness to avoid perfect stacking
    const randomOffsetX = Math.floor(Math.random() * 50) - 25; 
    const randomOffsetY = Math.floor(Math.random() * 50) - 25;

    const initialX = sidebarWidth + (workspaceWidth / 2) - (WIDGET_INITIAL_WIDTH / 2) + randomOffsetX;
    const initialY = (workspaceHeight / 2) - (WIDGET_INITIAL_HEIGHT / 2) + randomOffsetY;
    
    const newWidget: Widget = {
      ...widgetDef,
      id: id || Date.now().toString(),
      isMinimized: false,
      x: widgetDef.x ?? initialX,
      y: widgetDef.y ?? initialY,
      width: widgetDef.width ?? WIDGET_INITIAL_WIDTH,
      height: widgetDef.height ?? WIDGET_INITIAL_HEIGHT,
    };
    
    setWidgets((prev) => [...prev, newWidget]);
  }

  const handleCreateWidget = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    const lowerCaseQuery = query.toLowerCase();

    let newWidgetDef: Omit<Widget, 'id' | 'zIndex' | 'isMinimized'> | null = null;
    
    try {
      if (lowerCaseQuery.includes('@servicenow')) {
        // Get the user's company URL for ServiceNow integration
        let serviceNowUrl: string | undefined;
        if (user?.company_id) {
          try {
            const companyId = typeof user.company_id === 'object' ? user.company_id.$oid : user.company_id;
            const company = await getCompanyById(companyId);
            serviceNowUrl = company?.url;
            
            if (!serviceNowUrl) {
              toast({
                variant: 'destructive',
                title: 'Configuration Required',
                description: 'ServiceNow Instance URL is not configured for your company. Please contact your administrator.',
              });
              return;
            }
          } catch (error) {
            console.error('Failed to get company ServiceNow URL:', error);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not retrieve company configuration. Using default ServiceNow instance.',
            });
          }
        }
        
        const incidentData = await getIncidents(serviceNowUrl);
        newWidgetDef = {
          query: serviceNowUrl ? `ServiceNow Records (${new URL(serviceNowUrl).hostname})` : 'ServiceNow Records',
          data: incidentData,
          agent: { agentType: 'Incident Agent', agentBehavior: 'Manages and resolves incidents.' },
          type: 'incident',
          isFavorited: false,
        };
      } else if (lowerCaseQuery.includes('@incident')) {
        const incidentData = await getSampleData('incident');
        newWidgetDef = {
          query: 'Incidents',
          data: incidentData,
          agent: { agentType: 'Incident Agent', agentBehavior: 'Manages and resolves incidents.' },
          type: 'incident',
          isFavorited: false,
        };

      } else if (lowerCaseQuery.includes('@change')) {
         const changeData = await getSampleData('change_request');
        newWidgetDef = {
          query: 'Changes',
          data: changeData,
          agent: { agentType: 'Change Agent', agentBehavior: 'Manages and tracks change requests.' },
          type: 'change',
          isFavorited: false,
        };

      } else if (lowerCaseQuery.includes('@problem')) {
        const problemData = await getSampleData('problem');
        newWidgetDef = {
          query: 'Problem',
          data: problemData,
          agent: { agentType: 'Problem Agent', agentBehavior: 'Manages and resolves problems.' },
          type: 'problem',
          isFavorited: false,
        };
      } else if (lowerCaseQuery.includes('@summary')) {
        const allWidgetData = widgets.map(w => ({ type: w.type, query: w.query, data: w.data }));
        const result = await generateOverviewSummary({ widgetData: allWidgetData });
  
        newWidgetDef = {
          query: 'Overview Summary',
          data: result.summary,
          agent: { agentType: 'Summary Agent', agentBehavior: 'Provides a summary of all open widgets.' },
          type: 'generic',
          isFavorited: false,
        };
      } else {
        const allWorkspacesData = openWorkspaces.flatMap(ws => {
            try {
              const widgetsInWorkspace: Widget[] = JSON.parse(ws.workspace_data);
              return widgetsInWorkspace.map(w => ({ type: w.type, query: w.query, data: w.data }));
            } catch (e) {
              console.error(`Could not parse workspace data for ${ws.workspace_name}`, e);
              return [];
            }
          });

          const result = await generateWidgetFromQuery({ query, workspaceData: allWorkspacesData });
          
          if (result.workspace_to_load) {
            const workspaceToLoad = workspaces.find(ws => ws.workspace_name.toLowerCase().includes(result.workspace_to_load!.toLowerCase()));
            if (workspaceToLoad) {
              setWorkspaceAction('load');
              handleWorkspaceListSelect(workspaceToLoad);
            } else {
              toast({ variant: 'destructive', title: 'Not Found', description: `Workspace "${result.workspace_to_load}" not found.` });
            }
          }
          
          const agent = await agentSpecificWidget({ widgetData: result.answer });
    
          newWidgetDef = {
            query: query,
            data: result.answer,
            agent: agent,
            type: 'generic',
            isFavorited: false,
          };
      }

      if (newWidgetDef) {
        const fullWidgetDef = {
          ...newWidgetDef,
          zIndex: newWidgetDef.type === 'generic' ? 100 : nextZIndex,
        };
        createWidgetFromDefinition(fullWidgetDef);
      }
    } catch (error) {
      console.error('Failed to create widget:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not create widget. The AI service may be temporarily unavailable. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuery = async (query: string, name: string) => {
    if (!query.trim() || !name.trim()) return;
    try {
      const result = await saveQueryWithVoiceText({ queryName: name, queryText: query });
      if (result.success) {
        setSavedQueries(prev => [...prev, { name, query }]);
        toast({
          title: 'Query Saved',
          description: `"${name}" has been saved successfully.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Failed to save query:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the query.',
      });
    }
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleMinimizeWidget = (id: string) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => {
        if (widget.id === id) {
          const isMinimized = !widget.isMinimized;
          let newPosition = {};
          if (!isMinimized) { // Restoring
            const newX = lastRestorePosition.x + 20;
            const newY = lastRestorePosition.y + 20;
            setLastRestorePosition({ x: newX, y: newY });
            newPosition = { x: newX, y: newY };
          }
          return { ...widget, isMinimized, ...newPosition };
        }
        return widget;
      })
    );
  };
  
  const handleRestoreFavorite = (fav: Widget) => {
    const activeWidget = widgets.find(w => w.id === fav.id);
    if (!activeWidget) {
       // Create a new widget instance from the favorite definition
       createWidgetFromDefinition({ ...fav, isFavorited: true }, fav.id);
    } else {
      // If widget is just minimized, un-minimize it and bring to front
      if (activeWidget.isMinimized) {
        toggleMinimizeWidget(activeWidget.id);
      }
      bringToFront(activeWidget.id);
    }
  };

 const toggleFavoriteWidget = (id: string) => {
    let widgetToToggle: Widget | undefined = widgets.find(w => w.id === id);
    if (!widgetToToggle) {
      widgetToToggle = favorites.find(f => f.id === id);
    }
    if (!widgetToToggle) return;
  
    const isCurrentlyFavorited = widgetToToggle.isFavorited;
  
    // Update the widget in the main widgets array if it exists
    setWidgets(prev => 
      prev.map(w => 
        w.id === id ? { ...w, isFavorited: !isCurrentlyFavorited } : w
      )
    );
  
    // Update the favorites list
    if (!isCurrentlyFavorited) {
      // Add to favorites if not already there
      setFavorites(prev => {
        if (prev.some(f => f.id === id)) {
          return prev.map(f => f.id === id ? { ...widgetToToggle!, isFavorited: true } : f);
        }
        return [...prev, { ...widgetToToggle!, isFavorited: true }];
      });
    } else {
      // Remove from favorites
      setFavorites(prev => prev.filter(f => f.id !== id));
    }
  };


  const updateWidgetPosition = (id: string, x: number, y: number) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget =>
        widget.id === id ? { ...widget, x, y } : widget
      )
    );
  };

  const updateWidgetDimensions = (id: string, width: number, height: number) => {
    setWidgets(prevWidgets =>
        prevWidgets.map(widget =>
            widget.id === id ? { ...widget, width, height } : widget
        )
    );
  };


  const updateEntity = (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => {
    const updateInData = (data: any[]) =>
      data.map((entity: any) =>
        entity.number === entityNumber ? { ...entity, ...updatedData } : entity
      );
  
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => {
        if (widget.id === widgetId && (widget.type === 'problem' || widget.type === 'incident' || widget.type === 'change')) {
          if (!Array.isArray(widget.data)) return widget;
          return { ...widget, data: updateInData(widget.data) };
        }
        return widget;
      })
    );
  
    setFavorites(prevFavorites =>
      prevFavorites.map(fav => {
        if (fav.id === widgetId && (fav.type === 'problem' || fav.type === 'incident' || fav.type === 'change')) {
          if (!Array.isArray(fav.data)) return fav;
          return { ...fav, data: updateInData(fav.data) };
        }
        return fav;
      })
    );
  };
  
  const handleWorkspaceAction = (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => {
    setWorkspaceAction(action);
    if (action === 'create') {
        setWorkspaceName('');
        setWorkspaceToEdit(null);
        setIsWorkspaceModalOpen(true);
    } else if (action === 'edit') {
        if (user) fetchWorkspaces(user.userId, true); // Force refresh when editing
        setIsWorkspaceListOpen(true);
    } else if (action === 'forget') {
        handleDeleteWorkspace();
    } else if (action === 'load') {
        if (user) fetchWorkspaces(user.userId);
        setIsWorkspaceListOpen(true);
    } else if (action === 'save') {
        handleQuickSaveWorkspace();
    }
  };
    
    const handleQuickSaveWorkspace = async (silent = false) => {
        if (!activeWorkspace || !activeWorkspace.workspace_name) {
            if (!silent) handleWorkspaceAction('create');
            return;
        }
        if (!user) return;
        
        // If this is a manual save (not silent), set the flag
        if (!silent) {
            setIsManualSaving(true);
        }
        
        const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest }) => rest);
        const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex }) => ({
            id,
            x: Math.round(x || 0),
            y: Math.round(y || 0),
            width: width || WIDGET_INITIAL_WIDTH,
            height: height || WIDGET_INITIAL_HEIGHT,
            zIndex,
        }));



        const workspace_data = JSON.stringify(widgetContent);
        const cordinates = JSON.stringify(widgetCoordinates);
        
        const result = await saveWorkspace({
            userId: user.userId,
            workspace_name: activeWorkspace.workspace_name,
            workspace_data,
            cordinates,
            workspaceId: activeWorkspace.workspaceId
        });

        if (result) {
            if (!silent) {
                toast({ title: 'Success', description: `Workspace "${activeWorkspace.workspace_name}" saved.`, duration: 2000 });
            }
            // After saving, only refresh workspaces list but don't reload UI to avoid position conflicts
            if (user) {
                await fetchWorkspaces(user.userId, true);
            }
        } else {
            if (!silent) {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to save workspace.' });
            }
        }
        
        // Clear manual saving flag after a delay for manual saves
        if (!silent) {
            setTimeout(() => {
                setIsManualSaving(false);
            }, 2000);
        }
    };

    const handleSaveWorkspace = async () => {
      if (!user || !workspaceName.trim()) {
        toast({ variant: 'destructive', title: 'Error', description: 'User not found or workspace name is empty.' });
        return;
      }
    
      setLoading(true);
      setIsManualSaving(true);
      const isCreating = workspaceAction === 'create';
      const isEditing = workspaceAction === 'edit' && workspaceToEdit;
    
      let workspace_data: string;
      let cordinates: string | undefined;
    
      if (isCreating) {
        const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest }) => rest);
        const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex }) => ({
          id,
          x: Math.round(x || 0),
          y: Math.round(y || 0),
          width: width || WIDGET_INITIAL_WIDTH,
          height: height || WIDGET_INITIAL_HEIGHT,
          zIndex,
        }));
        workspace_data = JSON.stringify(widgetContent);
        cordinates = JSON.stringify(widgetCoordinates);
      } else if (isEditing) {
        workspace_data = workspaceToEdit.workspace_data;
        cordinates = workspaceToEdit.cordinates;
      } else {
        // Fallback for saving an unnamed workspace (shouldn't happen with the new flow)
        const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest }) => rest);
         const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex }) => ({
          id,
          x: Math.round(x || 0),
          y: Math.round(y || 0),
          width: width || WIDGET_INITIAL_WIDTH,
          height: height || WIDGET_INITIAL_HEIGHT,
          zIndex,
        }));
        workspace_data = JSON.stringify(widgetContent);
        cordinates = JSON.stringify(widgetCoordinates);
      }
    
      const workspaceIdToSave = isCreating ? undefined : workspaceToEdit!.workspaceId;
    
      const result = await saveWorkspace({
        userId: user.userId,
        workspace_name: workspaceName,
        workspace_data,
        cordinates,
        workspaceId: workspaceIdToSave,
      });
      setLoading(false);
    
      if (result) {
        toast({ title: 'Success', description: `Workspace "${workspaceName}" saved.`, duration: 2000 });
        
        await fetchWorkspaces(user.userId, true);
    
        if (isCreating) {
          const newWorkspace = { ...result, last_accessed: new Date().toISOString() };
          setOpenWorkspaces(prev => [...prev, newWorkspace]);
          setCurrentWorkspaceId(newWorkspace.workspaceId);
        } else if (isEditing) {
          // Update the open workspace tab with the new name
          setOpenWorkspaces(prev =>
            prev.map(ws =>
              ws.workspaceId === workspaceToEdit.workspaceId
                ? { ...ws, workspace_name: workspaceName }
                : ws
            )
          );
        }
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to save workspace.' });
      }
      
      // Clear manual saving flag after a delay to allow auto-save to resume
      setTimeout(() => {
        setIsManualSaving(false);
      }, 2000);
      
      setIsWorkspaceModalOpen(false);
      setWorkspaceName('');
      setWorkspaceToEdit(null);
    };
    
    const handleDeleteWorkspace = async () => {
        if (!activeWorkspace) {
            toast({ variant: 'destructive', title: 'Error', description: 'No active workspace to forget.' });
            return;
        }
        
        setLoading(true);
        const success = await deleteWorkspace(activeWorkspace.workspaceId);
        setLoading(false);
        if (success) {
            const deletedId = activeWorkspace.workspaceId;
            setWorkspaces(prev => prev.filter(ws => ws.workspaceId !== deletedId));
            closeWorkspace(deletedId);
            toast({ title: 'Success', description: `Workspace "${activeWorkspace.workspace_name}" has been forgotten.`, duration: 2000 });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to forget workspace.' });
        }
    };
    
    const loadWorkspaceUI = (workspace: Workspace) => {
        try {
            if (workspace.workspace_data && workspace.workspace_data.trim() !== '') {
                const contentData = JSON.parse(workspace.workspace_data);
                if (workspace.cordinates) {
                    const layoutData = JSON.parse(workspace.cordinates);
                    console.log('Loading coordinates from workspace:', layoutData);
                    const layoutMap = new Map(layoutData.map((l: any) => [l.id, l]));
                    const mergedWidgets = contentData.map((widget: any) => ({
                        ...widget,
                        ...(layoutMap.get(widget.id) || {}),
                    }));
                    console.log('Final merged widgets being set:', mergedWidgets.map(w => ({
                        id: w.id,
                        x: w.x,
                        y: w.y, 
                        width: w.width,
                        height: w.height
                    })));
                    setWidgets(mergedWidgets);
                } else {
                    // Fallback for old format
                    setWidgets(contentData);
                }
            } else {
                setWidgets([]);
            }
        } catch (error) {
            console.error("Failed to parse workspace data", error);
            toast({variant: "destructive", title: "Error", description: "Could not load workspace."})
        }
    }
    
    const loadWorkspaceDirectly = (workspace: Workspace) => {
        // Always switch to dashboard view when loading a workspace
        setCurrentView('dashboard');
        
        // Check if workspace is already open
        if (openWorkspaces.find(ws => ws.workspaceId === workspace.workspaceId)) {
            setCurrentWorkspaceId(workspace.workspaceId);
            loadWorkspaceUI(workspace);
            return;
        }

        // Check workspace limit
        if (openWorkspaces.length >= MAX_OPEN_SESSIONS) {
            toast({
                variant: 'destructive',
                title: 'Limit Reached',
                description: `You can only have ${MAX_OPEN_SESSIONS} workspaces open at a time.`
            });
            return;
        }
        
        // Add to open workspaces and load
        setOpenWorkspaces(prev => [...prev, workspace]);
        setCurrentWorkspaceId(workspace.workspaceId);
        loadWorkspaceUI(workspace);
    };
    
    const handleWorkspaceListSelect = (workspace: Workspace) => {
        setIsWorkspaceListOpen(false);
        if (workspaceAction === 'load') {
            if (openWorkspaces.find(ws => ws.workspaceId === workspace.workspaceId)) {
                setCurrentWorkspaceId(workspace.workspaceId);
                loadWorkspaceUI(workspace);
                return;
            }

            if (openWorkspaces.length >= MAX_OPEN_SESSIONS) {
                toast({
                    variant: 'destructive',
                    title: 'Limit Reached',
                    description: `You can only have ${MAX_OPEN_SESSIONS} workspaces open at a time.`
                });
                return;
            }
            
            setOpenWorkspaces(prev => [...prev, workspace]);
            setCurrentWorkspaceId(workspace.workspaceId);
            loadWorkspaceUI(workspace);
        } else if (workspaceAction === 'edit') {
            setWorkspaceToEdit(workspace);
            setWorkspaceName(workspace.workspace_name);
            setIsWorkspaceModalOpen(true);
        }
    };

    const switchWorkspace = (workspaceId: string) => {
        const workspaceToSwitch = openWorkspaces.find(ws => ws.workspaceId === workspaceId);
        if (workspaceToSwitch) {
            setCurrentWorkspaceId(workspaceId);
            loadWorkspaceUI(workspaceToSwitch);
        }
    }
    
    const closeWorkspace = (workspaceId: string) => {
        const remainingWorkspaces = openWorkspaces.filter(ws => ws.workspaceId !== workspaceId);
        setOpenWorkspaces(remainingWorkspaces);

        if (currentWorkspaceId === workspaceId) {
            if (remainingWorkspaces.length > 0) {
                const newCurrent = remainingWorkspaces[0];
                setCurrentWorkspaceId(newCurrent.workspaceId);
                loadWorkspaceUI(newCurrent);
            } else {
                setCurrentWorkspaceId(null);
                setWidgets([]); // Clear widgets if no workspace is open
            }
        }
    };


  const normalWidgets = widgets.filter(w => !w.isMinimized);
  const minimizedWidgets = widgets.filter(w => w.isMinimized && !favorites.some(fav => fav.id === w.id));

  const starterPrompts = [
    { text: 'Get my incidents', query: '@incident', icon: Sparkle },
    { text: 'Show me high priority changes', query: '@change high priority', icon: Sparkle },
    { text: 'Are there any recurring problems?', query: '@problem recurring', icon: Sparkle },
  ];

  const handleStarterPrompt = (query: string) => {
    handleCreateWidget(query);
  };

  const renderSidebar = () => (
    <AppSidebar 
      user={user}
      minimizedWidgets={minimizedWidgets} 
      favoritedWidgets={favorites}
      onRestoreWidget={toggleMinimizeWidget}
      onRestoreFavorite={handleRestoreFavorite}
      onProfileUpdate={handleProfileUpdate}
      workspaces={workspaces}
      onLoadWorkspace={loadWorkspaceDirectly}
      onWorkspaceAction={handleWorkspaceAction}
      currentView={currentView}
      onViewChange={handleViewChange}
      onMainWorkspace={handleMainWorkspace}
      onRefreshWorkspaces={refreshWorkspaces}
      isSyncingWorkspaces={isSyncingWorkspaces}
      syncEnabled={syncEnabled}
      lastSyncTime={lastSyncTime}
      activeWorkspaceId={currentWorkspaceId}
    />
  );
  
  const mobileHeaderHeight = 56; // 14 * 4
  const chatInputAreaHeight = 96; // 24 * 4
  
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
        <div ref={sidebarRef} className="z-50">
          <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
            {renderSidebar()}
          </Sidebar>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {renderCurrentView()}
        
        {/* Header for mobile and desktop workspaces */}
        {isMobile ? (
            <header className="absolute top-0 left-0 right-0 p-2 flex items-center justify-between z-30" style={{ height: mobileHeaderHeight }}>
                <Button variant="ghost" size="icon" onClick={() => setOpenMobile(true)}>
                <Menu />
                </Button>
                {activeWorkspace && (
                <div className="text-sm font-semibold truncate px-2">
                    {activeWorkspace.workspace_name}
                </div>
                )}
                <div className="w-10"></div>
            </header>
         ) : (
            // Only show workspace buttons when on dashboard view
            currentView === 'dashboard' && (
                <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 p-4 bg-transparent z-30 pointer-events-none">
                  <div className="flex items-center justify-center gap-2 pointer-events-auto">
                    {openWorkspaces.map(ws => (
                    <TooltipProvider key={ws.workspaceId}>
                        <div className="group relative flex flex-col items-center">
                            <Button
                            variant={ws.workspaceId === currentWorkspaceId ? "secondary" : "ghost"}
                            size="sm"
                            className="rounded-full px-6 py-2 h-auto shadow-lg"
                            onClick={() => switchWorkspace(ws.workspaceId)}
                            >
                            {ws.workspace_name}
                            </Button>
                            <div className="flex items-center justify-end w-full gap-1 mt-2 h-6 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleQuickSaveWorkspace()}><Save size={14} /></Button>
                                </TooltipTrigger>
                                <TooltipContent>Save</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                        setWorkspaceAction('edit');
                                        setWorkspaceToEdit(ws);
                                        setWorkspaceName(ws.workspace_name);
                                        setIsWorkspaceModalOpen(true);
                                }}><Pencil size={14} /></Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => closeWorkspace(ws.workspaceId)}><XIcon size={14} /></Button>
                                </TooltipTrigger>
                                <TooltipContent>Close</TooltipContent>
                            </Tooltip>
                            </div>
                        </div>
                    </TooltipProvider>
                    ))}
                  </div>
                </div>
            )
         )}
        
        {/* Chat Input - only show for dashboard view */}
        {currentView === 'dashboard' && (
            <div ref={chatInputRef} className={cn("z-40 transition-transform duration-300 ease-in-out absolute bottom-0 left-0 right-0")} style={{ paddingLeft: !isMobile && sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px`: '0' }}>
                <div className="p-4 bg-transparent w-full max-w-xl mx-auto">
                    <ChatInput onSubmit={handleCreateWidget} onSave={handleSaveQuery} loading={loading} widgets={widgets} onWorkspaceAction={handleWorkspaceAction} user={user} />
                </div>
            </div>
        )}
      </div>
        <Dialog open={isWorkspaceModalOpen} onOpenChange={setIsWorkspaceModalOpen}>
            <DialogContent size="form">
                <DialogHeader>
                    <DialogTitle>{workspaceAction === 'create' ? 'Create' : 'Edit'} Workspace</DialogTitle>
                    <DialogDescription>
                        {workspaceAction === 'create' 
                            ? "Give your workspace a name to save the current layout."
                            : `Renaming workspace: ${workspaceToEdit?.workspace_name}`
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="workspace-name" className="text-right">Name</Label>
                        <Input
                            id="workspace-name"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSaveWorkspace} disabled={!workspaceName.trim() || loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Dialog open={isWorkspaceListOpen} onOpenChange={setIsWorkspaceListOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{workspaceAction === 'load' ? 'Load Workspace' : 'Edit Workspace'}</DialogTitle>
                    <DialogDescription>
                        {workspaceAction === 'load' 
                            ? "Select a saved workspace to load it onto your dashboard."
                            : "Select a workspace to edit its name."
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {loadingWorkspaces ? <Loader2 className="mx-auto animate-spin" /> : (
                        <div className="space-y-2">
                            {workspaces.map(ws => (
                                <Button key={ws.workspaceId} variant="ghost" className="w-full justify-start" onClick={() => handleWorkspaceListSelect(ws)}>
                                    {ws.workspace_name}
                                </Button>
                            ))}
                            {workspaces.length === 0 && <p className="text-sm text-muted-foreground text-center">No saved workspaces found.</p>}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
