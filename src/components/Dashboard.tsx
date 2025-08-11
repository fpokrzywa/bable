
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Widget, SavedQuery, Problem, Incident, Change, User, Workspace, Session } from '@/lib/types';
import { generateWidgetFromQuery } from '@/ai/flows/generate-widget-from-query';
import { agentSpecificWidget } from '@/ai/flows/agent-specific-widget';
import { saveQueryWithVoiceText } from '@/ai/flows/save-query-with-voice-text';
import { generateOverviewSummary } from '@/ai/flows/generate-overview-summary';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { WidgetContainer, WIDGET_HEIGHT, WIDGET_INITIAL_WIDTH } from '@/components/widgets/WidgetContainer';
import { ChatInput } from '@/components/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { getIncidents } from '@/services/servicenow';
import { getUserProfile } from '@/services/userService';
import { getSampleData } from '@/services/sampleDataService';
import { getWorkspaces, saveWorkspace, deleteWorkspace } from '@/services/workspaceService';
import { saveSession, getUserSession } from '@/services/sessionService';
import { Menu, Sparkle, Loader2, Save, Edit, X as XIcon, Disc, Pencil, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { BaseWidget } from './widgets/BaseWidget';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';


export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [favorites, setFavorites] = useState<Widget[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([
    { name: 'Open Incidents', query: 'show me the open incidents' },
    { name: 'My High Priority Tasks', query: 'show my high priority tasks' },
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const { toast } = useToast();
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [nextZIndex, setNextZIndex] = useState(1);
  const [lastRestorePosition, setLastRestorePosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [openWorkspaces, setOpenWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceToEdit, setWorkspaceToEdit] = useState<Workspace | null>(null);
  const [workspaceAction, setWorkspaceAction] = useState<'create' | 'edit' | 'load' | null>(null);
  const [isWorkspaceListOpen, setIsWorkspaceListOpen] = useState(false);
  const [lastSession, setLastSession] = useState<Session | null>(null);
  
  const activeWorkspace = openWorkspaces.find(ws => ws.workspaceId === currentWorkspaceId) || null;
  const MAX_OPEN_SESSIONS = parseInt(process.env.NEXT_PUBLIC_WORKSPACE_OPEN_SESSIONS || '3', 10);

  const fetchUserAndSessionData = async () => {
    const session = localStorage.getItem('session');
    if (!session) return;
    const userEmail = JSON.parse(session).email;
    if (!userEmail) return;

    setLoadingWorkspaces(true);
    const profile = await getUserProfile(userEmail);
    setUser(profile);

    if (profile) {
        try {
            const [workspacesData, sessionData] = await Promise.all([
                getWorkspaces(profile.userId),
                getUserSession(profile.userId)
            ]);

            setWorkspaces(workspacesData);
            if (sessionData) {
                setLastSession(sessionData);
                setSessionId(sessionData.sessionId);
            } else {
                setSessionId(`sess_${Date.now()}`);
            }
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
            // If session/workspace fetch fails, still generate a new session ID
            setSessionId(`sess_${Date.now()}`);
        } finally {
            setLoadingWorkspaces(false);
        }
    } else {
        setLoadingWorkspaces(false);
    }
  };
  
  useEffect(() => {
    fetchUserAndSessionData();
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

    useDebouncedEffect(() => {
        if (user && sessionId && !loadingWorkspaces) {
            const openWorkspaceData = openWorkspaces.map(ws => ({ workspaceId: ws.workspaceId }));
            saveSession({
                sessionId,
                userId: user.userId,
                workspace_data: JSON.stringify(openWorkspaceData),
                active: true,
            });
        }
    }, [user, sessionId, openWorkspaces, loadingWorkspaces], 1000);
    
    // Debounced auto-save for workspace changes
    useDebouncedEffect(() => {
        if (activeWorkspace && user && !loadingWorkspaces) {
            // Check if there are widgets to save to avoid saving an empty layout unnecessarily
            if (widgets.length > 0 || JSON.parse(activeWorkspace.workspace_data || '[]').length > 0) {
                handleQuickSaveWorkspace(true); // Pass true for silent save
            }
        }
    }, [widgets, activeWorkspace, user, loadingWorkspaces], 1000);
  
  const handleProfileUpdate = () => {
    fetchUserAndSessionData();
  };
  
  const fetchWorkspaces = async (userId: string) => {
    if (userId) {
        setLoadingWorkspaces(true);
        getWorkspaces(userId)
            .then(data => setWorkspaces(data))
            .finally(() => setLoadingWorkspaces(false));
    }
  };


  useEffect(() => {
    if (!activeWorkspace) {
        try {
          const savedWidgets = localStorage.getItem('dashboard-widgets');
          if (savedWidgets) {
            const parsedWidgets: Widget[] = JSON.parse(savedWidgets);
            setWidgets(parsedWidgets);
            const maxZIndex = parsedWidgets.reduce((max, w) => Math.max(max, w.zIndex || 0), 0);
            setNextZIndex(maxZIndex + 1);
          }
        } catch (error) {
          console.error("Could not load widgets from localStorage", error);
        }
    }
  }, [activeWorkspace]);

  useEffect(() => {
     if (!activeWorkspace) {
        try {
          const widgetsToSave = widgets.map(w => ({
            id: w.id,
            query: w.query,
            data: w.data,
            agent: w.agent,
            type: w.type,
            zIndex: w.zIndex,
            isMinimized: w.isMinimized,
            isFavorited: w.isFavorited,
            x: w.x,
            y: w.y,
            isExpanded: w.isExpanded,
          }));
          localStorage.setItem('dashboard-widgets', JSON.stringify(widgetsToSave));
        } catch (error) {
            console.error("Could not save widgets to localStorage", error);
        }
     }
  }, [widgets, activeWorkspace]);


  const bringToFront = (id: string) => {
    setWidgets(prevWidgets => {
      const widget = prevWidgets.find(w => w.id === id);
      if (widget && widget.zIndex < nextZIndex) {
        const newZIndex = nextZIndex + 1;
        setNextZIndex(newZIndex);
        return prevWidgets.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w);
      }
      return prevWidgets;
    });
  };
  
  const createWidgetFromDefinition = (widgetDef: Omit<Widget, 'zIndex' | 'isMinimized'>, id?: string) => {
    const newZIndex = nextZIndex;
    setNextZIndex(newZIndex + 1);

    const sidebarWidth = state === 'expanded' && sidebarRef.current ? sidebarRef.current.offsetWidth : 0;
    const workspaceWidth = window.innerWidth - sidebarWidth;
    const workspaceHeight = window.innerHeight;
    
    // Add some randomness to avoid perfect stacking
    const randomOffsetX = Math.floor(Math.random() * 50) - 25; 
    const randomOffsetY = Math.floor(Math.random() * 50) - 25;

    const initialX = sidebarWidth + (workspaceWidth / 2) - (WIDGET_INITIAL_WIDTH / 2) + randomOffsetX;
    const initialY = (workspaceHeight / 2) - (WIDGET_HEIGHT / 2) + randomOffsetY;
    
    const newWidget: Widget = {
      ...widgetDef,
      id: id || Date.now().toString(),
      zIndex: newZIndex,
      isMinimized: false,
      x: widgetDef.x ?? initialX,
      y: widgetDef.y ?? initialY,
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
        const incidentData = await getIncidents();
        newWidgetDef = {
          query: 'ServiceNow Records',
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
        createWidgetFromDefinition(newWidgetDef);
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
        if (user) fetchWorkspaces(user.userId);
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
        if (!activeWorkspace) {
            if (!silent) handleWorkspaceAction('create');
            return;
        }
        if (!user) return;
        
        const workspaceData = JSON.stringify(widgets);
        const result = await saveWorkspace({
            userId: user.userId,
            workspace_name: activeWorkspace.workspace_name,
            workspace_data: workspaceData,
            workspaceId: activeWorkspace.workspaceId
        });

        if (result) {
            if (!silent) {
                toast({ title: 'Success', description: `Workspace "${activeWorkspace.workspace_name}" saved.`, duration: 2000 });
            }
            if (user) fetchWorkspaces(user.userId);
        } else {
            if (!silent) {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to save workspace.' });
            }
        }
    };

    const handleSaveWorkspace = async () => {
        if (!user || !workspaceName.trim()) {
            toast({ variant: 'destructive', title: 'Error', description: 'User not found or workspace name is empty.' });
            return;
        }

        setLoading(true);
        const isCreating = workspaceAction === 'create';
        
        const workspaceData = isCreating ? JSON.stringify(widgets) : (workspaceToEdit ? workspaceToEdit.workspace_data : JSON.stringify(widgets));
        const workspaceIdToSave = isCreating ? undefined : workspaceToEdit!.workspaceId;
        
        const result = await saveWorkspace({
            userId: user.userId,
            workspace_name: workspaceName,
            workspace_data: workspaceData,
            workspaceId: workspaceIdToSave
        });
        setLoading(false);

        if (result) {
            toast({ title: 'Success', description: `Workspace "${workspaceName}" saved.`, duration: 2000 });
            if (user) fetchWorkspaces(user.userId);
            if (isCreating) {
                const newWorkspace = { ...result, last_accessed: new Date().toISOString() };
                setOpenWorkspaces(prev => [...prev, newWorkspace]);
                setCurrentWorkspaceId(newWorkspace.workspaceId);
            } else {
                 setOpenWorkspaces(prev => prev.map(ws => ws.workspaceId === result.workspaceId ? {...ws, workspace_name: workspaceName} : ws));
            }
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to save workspace.' });
        }
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
            const loadedWidgets = JSON.parse(workspace.workspace_data);
            setWidgets(loadedWidgets);
        } catch (error) {
            console.error("Failed to parse workspace data", error);
            toast({variant: "destructive", title: "Error", description: "Could not load workspace."})
        }
    }
    
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

  let starterPrompts = [
    { text: 'Get my incidents', query: '@incident', icon: Sparkle },
    { text: 'Show me high priority changes', query: '@change high priority', icon: Sparkle },
    { text: 'Are there any recurring problems?', query: '@problem recurring', icon: Sparkle },
  ];

  if (lastSession) {
    starterPrompts.unshift({ text: 'Do you want to pick up where you left off last?', query: '__LOAD_LAST_SESSION__', icon: Clock });
  }

  const handleStarterPrompt = (query: string) => {
    if (query === '__LOAD_LAST_SESSION__') {
      if (lastSession) {
          try {
              const workspaceIdsToLoad: {workspaceId: string}[] = JSON.parse(lastSession.workspace_data);
              const workspacesToLoad = workspaces.filter(ws => workspaceIdsToLoad.some(item => item.workspaceId === ws.workspaceId));
              
              setOpenWorkspaces(workspacesToLoad);

              if (workspacesToLoad.length > 0) {
                  const firstWorkspace = workspacesToLoad[0];
                  setCurrentWorkspaceId(firstWorkspace.workspaceId);
                  loadWorkspaceUI(firstWorkspace);
              }
              setLastSession(null);
          } catch(e) {
              console.error("Failed to parse last session data", e);
              toast({variant: "destructive", title: "Error", description: "Could not load last session."});
          }
      }
    } else {
      handleCreateWidget(query);
    }
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
      onLoadWorkspace={(ws) => {
        setWorkspaceAction('load');
        handleWorkspaceListSelect(ws);
      }}
      onWorkspaceAction={handleWorkspaceAction}
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
                    sidebarState={state}
                    sidebarRef={sidebarRef}
                    chatInputRef={chatInputRef}
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
                                src="/phish_logo.png"
                                alt="BabelPhish Logo"
                                width={100}
                                height={100}
                                className="opacity-80 mb-4"
                            />
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                                Hello, <span className="text-primary">{user?.first_name || "Explorer"}</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mt-2">I am BabelPhish, how can I help you?</p>
                        </div>
                        <div className="flex-shrink-0 w-full flex flex-col justify-end">
                            <div className="w-full text-left">
                                <p className="text-sm text-muted-foreground mb-4 text-center">Quick browse items</p>
                                <div className="space-y-2">
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
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 p-4 bg-transparent z-30 pointer-events-none">
              <div className="flex items-center justify-center gap-2 pointer-events-auto">
                <TooltipProvider>
                    {openWorkspaces.map(ws => (
                    <div key={ws.workspaceId} className="group relative flex flex-col items-center">
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
                    ))}
                </TooltipProvider>
              </div>
            </div>
         )}
        
        <div ref={chatInputRef} className={cn("z-40 transition-transform duration-300 ease-in-out absolute bottom-0 left-0 right-0")} style={{ paddingLeft: !isMobile && sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px`: '0' }}>
            <div className="p-4 bg-transparent w-full max-w-xl mx-auto">
                <ChatInput onSubmit={handleCreateWidget} onSave={handleSaveQuery} loading={loading} widgets={widgets} onWorkspaceAction={handleWorkspaceAction} />
            </div>
        </div>
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

    
