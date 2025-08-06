'use client';

import { useState, type FormEvent } from 'react';
import type { Widget } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Bot, Send, Loader2 } from 'lucide-react';
import { IncidentWidget } from './IncidentWidget';
import { GenericWidget } from './GenericWidget';
import { contextAwareWidgetChat } from '@/ai/flows/context-aware-widget-chat';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface BaseWidgetProps {
  widget: Widget;
  removeWidget: (id: string) => void;
}

export function BaseWidget({ widget, removeWidget }: BaseWidgetProps) {
  const [chatQuery, setChatQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    setLoading(true);
    try {
      const result = await contextAwareWidgetChat({
        widgetType: widget.type,
        widgetData: widget.data,
        userQuery: chatQuery,
      });
      setSuggestions(result.suggestedActions);
    } catch (error) {
      console.error('Context-aware chat failed:', error);
    } finally {
      setLoading(false);
      setChatQuery('');
    }
  };

  return (
    <Card className="resizable-widget w-[450px] h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-lg">{widget.query}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardDescription className="flex items-center gap-1.5 cursor-help mt-1">
                  <Bot size={14} className="text-primary" />
                  {widget.agent.agentType}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent>
                <p>{widget.agent.agentBehavior}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWidget(widget.id)}>
          <X size={18} />
          <span className="sr-only">Close widget</span>
        </Button>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4">
          {widget.type === 'incident' ? (
            <IncidentWidget incidents={widget.data} />
          ) : (
            <GenericWidget data={widget.data} />
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 pt-4 border-t">
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <Badge key={i} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => setChatQuery(s)}>
                {s}
              </Badge>
            ))}
          </div>
        )}
        <form onSubmit={handleChatSubmit} className="flex w-full items-center gap-2">
          <Input
            placeholder={`Chat with ${widget.agent.agentType}...`}
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !chatQuery.trim()}>
            {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
