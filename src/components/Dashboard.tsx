'use client';

import { useState } from 'react';
import type { Widget, SavedQuery } from '@/lib/types';
import { generateWidgetFromQuery } from '@/ai/flows/generate-widget-from-query';
import { agentSpecificWidget } from '@/ai/flows/agent-specific-widget';
import { saveQueryWithVoiceText } from '@/ai/flows/save-query-with-voice-text';

import { Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { WidgetContainer } from '@/components/widgets/WidgetContainer';
import { ChatInput } from '@/components/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([
    { name: 'Open Incidents', query: 'show me the open incidents' },
    { name: 'My High Priority Tasks', query: 'show my high priority tasks' },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setOpen } = useSidebar();

  useState(() => {
    setOpen(false);
  });

  const handleCreateWidget = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { widgetData } = await generateWidgetFromQuery({ query });
      let parsedData;
      try {
        parsedData = JSON.parse(widgetData);
      } catch (e) {
        console.error('Failed to parse widget data JSON:', e);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'The AI returned invalid data. Please try a different query.',
        });
        setLoading(false);
        return;
      }

      const { agentType, agentBehavior } = await agentSpecificWidget({ widgetData });

      const isIncident =
        Array.isArray(parsedData) &&
        parsedData.length > 0 &&
        parsedData[0].hasOwnProperty('short_description') &&
        parsedData[0].hasOwnProperty('number');

      const newWidget: Widget = {
        id: Date.now().toString(),
        query,
        data: parsedData,
        agent: { agentType, agentBehavior },
        type: isIncident ? 'incident' : 'generic',
      };

      setWidgets((prev) => [...prev, newWidget]);
    } catch (error) {
      console.error('Failed to generate widget:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate the widget. Please try again.',
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
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar side="left" collapsible="icon" variant="floating">
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-grow p-4 md:p-8">
            <WidgetContainer widgets={widgets} removeWidget={removeWidget} />
          </ScrollArea>
          <div className="p-4 bg-transparent">
            <ChatInput onSubmit={handleCreateWidget} onSave={handleSaveQuery} loading={loading} />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
