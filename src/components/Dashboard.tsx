
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Widget, SavedQuery, Problem, Incident, Change, User } from '@/lib/types';
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
import { Sparkle } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [favorites, setFavorites] = useState<Widget[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([
    { name: 'Open Incidents', query: 'show me the open incidents' },
    { name: 'My High Priority Tasks', query: 'show my high priority tasks' },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { state } = useSidebar();
  const [nextZIndex, setNextZIndex] = useState(1);
  const [lastRestorePosition, setLastRestorePosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = localStorage.getItem('session');
      if (session) {
        const userEmail = JSON.parse(session).email;
        if (userEmail) {
          const profile = await getUserProfile(userEmail);
          setUser(profile);
        }
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [widgets]);


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
      if (lowerCaseQuery.includes('@servicenow') || lowerCaseQuery === 'get my incidents' || lowerCaseQuery === "get my incidents") {
        const incidentData = await getIncidents();
        newWidgetDef = {
          query: 'ServiceNow Records',
          data: incidentData,
          agent: { agentType: 'Incident Agent', agentBehavior: 'Manages and resolves incidents.' },
          type: 'incident',
          isFavorited: false,
        };
      } else if (lowerCaseQuery.includes('@incident')) {
        const incidentData: Incident[] = [
          { id: 'INC001', sys_id: 'INC001', number: `INC001`, short_description: 'User unable to login', priority: '1 - Critical', state: 'New', assigned_to: 'John Doe', description: 'User is getting an invalid password error when trying to log in to the portal.' },
          { id: 'INC002', sys_id: 'INC002', number: `INC002`, short_description: 'Email server is down', priority: '1 - Critical', state: 'In Progress', assigned_to: 'Jane Smith', description: 'The primary email server is not responding. All email services are down.' },
        ];
        newWidgetDef = {
          query: 'Incidents',
          data: incidentData,
          agent: { agentType: 'Incident Agent', agentBehavior: 'Manages and resolves incidents.' },
          type: 'incident',
          isFavorited: false,
        };

      } else if (lowerCaseQuery.includes('@change')) {
        const changeData: Change[] = [
          { sys_id: 'CHG001', number: `CHG001`, short_description: 'Upgrade production server firmware', type: 'Standard', state: 'Scheduled', assigned_to: 'Admin Team', justification: 'Firmware update includes critical security patches.', implementation_plan: 'Follow standard server update procedure during maintenance window.' },
          { sys_id: 'CHG002', number: `CHG002`, short_description: 'Deploy new CRM application to production', type: 'Normal', state: 'Assess', assigned_to: 'DevOps Team', justification: 'New CRM provides enhanced features for the sales team.', implementation_plan: 'Deploy using blue-green deployment strategy.' },
        ];
        newWidgetDef = {
          query: 'Changes',
          data: changeData,
          agent: { agentType: 'Change Agent', agentBehavior: 'Manages and tracks change requests.' },
          type: 'change',
          isFavorited: false,
        };

      } else if (lowerCaseQuery.includes('@problem')) {
        const problemData: Problem[] = [
          {
            sys_id: 'PRB001',
            number: `PRB001`,
            short_description: 'Recurring network outages in building B',
            description: 'Users in building B are experiencing intermittent network connectivity loss, typically between 2 PM and 4 PM on weekdays.',
            workaround: 'Users can switch to the guest Wi-Fi network as a temporary solution, but it has limited access to internal resources.',
            cause: 'Initial investigation points to a faulty network switch on the 3rd floor of building B. Further diagnostics are needed to confirm.',
          },
        ];
    
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
          const result = await generateWidgetFromQuery({ query });
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
          return { ...widget, data: updateInData(widget.data) };
        }
        return widget;
      })
    );
  
    setFavorites(prevFavorites =>
      prevFavorites.map(fav => {
        if (fav.id === widgetId && (fav.type === 'problem' || fav.type === 'incident' || fav.type === 'change')) {
          return { ...fav, data: updateInData(fav.data) };
        }
        return fav;
      })
    );
  };

  const normalWidgets = widgets.filter(w => !w.isMinimized);
  const minimizedWidgets = widgets.filter(w => w.isMinimized && !favorites.some(fav => fav.id === w.id));

  const starterPrompts = [
    { text: 'Get my incidents', query: 'Get my incidents' },
    { text: 'Show me high priority changes', query: '@change high priority' },
    { text: 'Are there any recurring problems?', query: '@problem recurring' },
  ]

  const handleStarterPrompt = (query: string) => {
    handleCreateWidget(query);
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
        <div ref={sidebarRef} className="z-50">
            <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
                <AppSidebar 
                user={user}
                minimizedWidgets={minimizedWidgets} 
                favoritedWidgets={favorites}
                onRestoreWidget={toggleMinimizeWidget}
                onRestoreFavorite={handleRestoreFavorite}
                />
            </Sidebar>
        </div>

        <div className="absolute inset-0">
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
        </div>

        <div 
          className="absolute inset-0 flex flex-col items-center pointer-events-none" 
          style={{ paddingLeft: sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px`: '0' }}
        >
        {normalWidgets.length === 0 && (
             <div className="flex flex-col h-full w-full max-w-xl mx-auto items-center text-center pb-24">
                <div className="flex-grow flex flex-col justify-center items-center">
                    <Image
                        src="/phish_logo.png"
                        alt="Babel Phish Logo"
                        width={100}
                        height={100}
                        className="opacity-80 mb-4"
                    />
                    <h1 className="text-4xl font-bold tracking-tight mt-2">
                        Hello, <span className="text-primary">{user?.username || "Explorer"}</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-2">I am BabelPhish, how can I help you?</p>
                </div>
                <div className="flex-shrink-0 w-full flex flex-col justify-end">
                    <div className="w-full text-left">
                    <p className="text-sm text-muted-foreground mb-4 text-center">Quick browse items</p>
                    <div className="space-y-3">
                        {starterPrompts.map((prompt, index) => (
                            <Button 
                                key={index}
                                variant="link"
                                className="w-full justify-start h-auto py-3 px-4 text-left text-base bg-transparent pointer-events-auto rounded-lg"
                                onClick={() => handleStarterPrompt(prompt.query)}
                            >
                                <Sparkle className="mr-3 text-primary" size={20}/>
                                {prompt.text}
                            </Button>
                        ))}
                    </div>
                    </div>
                </div>
          </div>
        )}
        </div>
        
        <div ref={chatInputRef} className="fixed bottom-0 right-0 left-0 z-40 transition-transform duration-300 ease-in-out" style={{ paddingLeft: sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px`: '0' }}>
            <div className="p-4 bg-transparent w-full max-w-xl mx-auto">
                <ChatInput onSubmit={handleCreateWidget} onSave={handleSaveQuery} loading={loading} widgets={widgets} />
            </div>
        </div>
    </div>
  );
}

    
