
'use client';

import { useState, useEffect } from 'react';
import type { Widget, SavedQuery, Problem } from '@/lib/types';
import { generateWidgetFromQuery } from '@/ai/flows/generate-widget-from-query';
import { agentSpecificWidget } from '@/ai/flows/agent-specific-widget';
import { saveQueryWithVoiceText } from '@/ai/flows/save-query-with-voice-text';

import { Sidebar, SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { WidgetContainer } from '@/components/widgets/WidgetContainer';
import { ChatInput } from '@/components/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
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

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCreateWidget = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);

    // Mock data for the problem widget
    const problemData: Problem[] = [
      { number: 'PRB00012354', short_description: 'Problem Short Description' },
      { number: 'PRB00012354', short_description: 'Problem Short Description' },
      { number: 'PRB00012354', short_description: 'Problem Short Description' },
      { number: 'PRB00012354', short_description: 'Problem Short Description' },
      { number: 'PRB00012354', short_description: 'Problem Short Description' },
    ];

    const newWidget: Widget = {
      id: Date.now().toString(),
      query: 'Problem',
      data: problemData,
      agent: { agentType: 'Problem Agent', agentBehavior: 'Manages and resolves problems.' },
      type: 'problem',
    };

    setWidgets((prev) => [...prev, newWidget]);
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
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar side="left" collapsible="icon" variant={state === 'collapsed' ? 'floating' : 'sidebar'}>
        <AppSidebar />
      </Sidebar>
      <SidebarInset className={cn("flex h-screen", widgets.length > 0 ? "flex-col" : "")}>
        <div className={cn("flex-1 flex flex-col min-h-0", widgets.length === 0 && "justify-center")}>
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
