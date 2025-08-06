

'use client';

import { useState, useEffect } from 'react';
import type { Widget, SavedQuery, Problem, Incident, Change } from '@/lib/types';
import { generateWidgetFromQuery } from '@/ai/flows/generate-widget-from-query';
import { agentSpecificWidget } from '@/ai/flows/agent-specific-widget';
import { saveQueryWithVoiceText } from '@/ai/flows/save-query-with-voice-text';

import { Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { WidgetContainer } from '@/components/widgets/WidgetContainer';
import { ChatInput } from '@/components/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([
    { name: 'Open Incidents', query: 'show me the open incidents' },
    { name: 'My High Priority Tasks', query: 'show my high priority tasks' },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setOpen, state } = useSidebar();
  const [nextZIndex, setNextZIndex] = useState(1);

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  const bringToFront = (id: string) => {
    setWidgets(prevWidgets => {
      const widget = prevWidgets.find(w => w.id === id);
      if (widget && widget.zIndex < nextZIndex - 1) {
        const newZIndex = nextZIndex;
        setNextZIndex(newZIndex + 1);
        return prevWidgets.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w);
      }
      return prevWidgets;
    });
  };

  const handleCreateWidget = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    const lowerCaseQuery = query.toLowerCase();
    const widgetId = Date.now().toString();
    const newZIndex = nextZIndex;
    setNextZIndex(newZIndex + 1);


    let newWidget: Widget | null = null;

    if (lowerCaseQuery.includes('incident')) {
      const incidentData: Incident[] = [
        { number: `INC${widgetId}-1`, short_description: 'User unable to login', priority: '1 - Critical', state: 'New', assigned_to: 'John Doe', description: 'User is getting an invalid password error when trying to log in to the portal.' },
        { number: `INC${widgetId}-2`, short_description: 'Email server is down', priority: '1 - Critical', state: 'In Progress', assigned_to: 'Jane Smith', description: 'The primary email server is not responding. All email services are down.' },
        { number: `INC${widgetId}-3`, short_description: 'Cannot connect to VPN', priority: '2 - High', state: 'On Hold', assigned_to: 'John Doe', description: 'Users are reporting that they cannot connect to the corporate VPN. The connection times out.' },
        { number: `INC${widgetId}-4`, short_description: 'Printer not working', priority: '3 - Moderate', state: 'New', assigned_to: 'Jane Smith', description: 'The printer on the 3rd floor is not printing. It is showing a paper jam error, but there is no paper jam.' },
        { number: `INC${widgetId}-5`, short_description: 'Software installation request', priority: '4 - Low', state: 'Closed', assigned_to: 'John Doe', description: 'Request to install Adobe Photoshop on a new marketing team member\'s laptop.' },
      ];
      newWidget = {
        id: widgetId,
        query: 'Incidents',
        data: incidentData,
        agent: { agentType: 'Incident Agent', agentBehavior: 'Manages and resolves incidents.' },
        type: 'incident',
        zIndex: newZIndex,
      };

    } else if (lowerCaseQuery.includes('change')) {
      const changeData: Change[] = [
        { number: `CHG${widgetId}-1`, short_description: 'Upgrade production server firmware', type: 'Standard', state: 'Scheduled', assigned_to: 'Admin Team', justification: 'Firmware update includes critical security patches.', implementation_plan: 'Follow standard server update procedure during maintenance window.' },
        { number: `CHG${widgetId}-2`, short_description: 'Deploy new CRM application to production', type: 'Normal', state: 'Assess', assigned_to: 'DevOps Team', justification: 'New CRM provides enhanced features for the sales team.', implementation_plan: 'Deploy using blue-green deployment strategy.' },
        { number: `CHG${widgetId}-3`, short_description: 'Firewall rule change for new service', type: 'Emergency', state: 'Authorize', assigned_to: 'Network Team', justification: 'A critical vulnerability requires an immediate firewall rule update.', implementation_plan: 'Apply rule immediately and monitor for impact.' },
        { number: `CHG${widgetId}-4`, short_description: 'Patch database servers for security vulnerability', type: 'Normal', state: 'Implement', assigned_to: 'DBA Team', justification: 'Address a known SQL injection vulnerability.', implementation_plan: 'Take a snapshot, apply the patch, and run verification tests.' },
        { number: `CHG${widgetId}-5`, short_description: 'Migrate email services to cloud provider', type: 'Standard', state: 'Review', assigned_to: 'Cloud Team', justification: 'Reduce on-premise infrastructure costs and improve reliability.', implementation_plan: 'Migrate mailboxes in batches over the weekend.' },
      ];
      newWidget = {
        id: widgetId,
        query: 'Changes',
        data: changeData,
        agent: { agentType: 'Change Agent', agentBehavior: 'Manages and tracks change requests.' },
        type: 'change',
        zIndex: newZIndex,
      };

    } else if (lowerCaseQuery.includes('problem')) {
      const problemData: Problem[] = [
        {
          number: `PRB${widgetId}-1`,
          short_description: 'Recurring network outages in building B',
          description: 'Users in building B are experiencing intermittent network connectivity loss, typically between 2 PM and 4 PM on weekdays.',
          workaround: 'Users can switch to the guest Wi-Fi network as a temporary solution, but it has limited access to internal resources.',
          cause: 'Initial investigation points to a faulty network switch on the 3rd floor of building B. Further diagnostics are needed to confirm.',
        },
        {
          number: `PRB${widgetId}-2`,
          short_description: 'CRM application performance degradation',
          description: 'The CRM application has been running significantly slower than usual, affecting all users. Page load times have increased by over 200%.',
          workaround: 'Clearing browser cache and restarting the application provides temporary relief, but the issue returns within an hour.',
          cause: 'The root cause is suspected to be an inefficient database query that is triggered frequently by a new reporting feature.',
         },
      ];
  
      newWidget = {
        id: widgetId,
        query: 'Problem',
        data: problemData,
        agent: { agentType: 'Problem Agent', agentBehavior: 'Manages and resolves problems.' },
        type: 'problem',
        zIndex: newZIndex,
      };
    } else {
        const result = await generateWidgetFromQuery({ query });
        const agent = await agentSpecificWidget({ widgetData: result.widgetData });
  
        newWidget = {
          id: widgetId,
          query: query,
          data: JSON.parse(result.widgetData),
          agent: agent,
          type: 'generic',
          zIndex: newZIndex,
        };
    }

    if (newWidget) {
      setWidgets((prev) => [...prev, newWidget]);
    }
    
    setLoading(false);
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

  const updateEntity = (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => {
        if (widget.id === widgetId && (widget.type === 'problem' || widget.type === 'incident' || widget.type === 'change')) {
          return {
            ...widget,
            data: widget.data.map((entity: any) =>
              entity.number === entityNumber ? { ...entity, ...updatedData } : entity
            ),
          };
        }
        return widget;
      })
    );
  };


  return (
    <div className="flex h-screen bg-background">
      <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen items-center">
        <div className={cn("flex flex-col w-full h-full relative", widgets.length > 0 ? "flex-1" : "h-full justify-center items-center")}>
            <WidgetContainer 
              widgets={widgets} 
              removeWidget={removeWidget} 
              updateEntity={updateEntity}
              bringToFront={bringToFront}
            />
          <div className="fixed bottom-4 right-4 p-4 bg-transparent w-full max-w-xl">
              <ChatInput onSubmit={handleCreateWidget} onSave={handleSaveQuery} loading={loading} />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
