
'use client';

import { useState, type FormEvent } from 'react';
import type { Widget, Problem, Incident, Change } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Bot, Send, Loader2, Minus } from 'lucide-react';
import { GenericWidget } from './GenericWidget';
import { contextAwareWidgetChat } from '@/ai/flows/context-aware-widget-chat';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { EntityWidget } from './EntityWidget';

interface BaseWidgetProps {
  widget: Widget;
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
  bringToFront: (id: string) => void;
  toggleMinimizeWidget: (id: string) => void;
}

export function BaseWidget({ widget, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget }: BaseWidgetProps) {
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

  const handleTextSelection = (text: string) => {
    if (text) {
      setChatQuery(text);
    }
  };
  
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'incident':
      case 'problem':
      case 'change':
        return <EntityWidget widgetId={widget.id} type={widget.type} entities={widget.data} onTextSelect={handleTextSelection} updateEntity={updateEntity} />;
      case 'generic':
      default:
        return <GenericWidget data={widget.data} />;
    }
  };

  return (
    <Card 
      className="resizable-widget w-full h-full flex flex-col bg-card/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="drag-handle cursor-move">
        <CardHeader className="flex flex-row items-start justify-between p-4">
            <div className="flex-1">
            <CardTitle className="text-lg @[400px]:text-xl @[500px]:text-2xl">{widget.query}</CardTitle>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <CardDescription className="flex items-center gap-1.5 cursor-help mt-1 text-xs @[400px]:text-sm">
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
        <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleMinimizeWidget(widget.id)}>
                <Minus size={18} />
                <span className="sr-only">Minimize widget</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWidget(widget.id)}>
                <X size={18} />
                <span className="sr-only">Close widget</span>
            </Button>
        </div>
        </CardHeader>
      </div>


      <CardContent className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full pr-4">
          {renderWidgetContent()}
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 pt-4 border-t">
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <Badge key={i} variant="outline" className="cursor-pointer hover:bg-accent text-xs @[400px]:text-sm" onClick={() => setChatQuery(s)}>
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
            className='text-xs @[400px]:text-sm'
          />
          <Button type="submit" size="icon" disabled={loading || !chatQuery.trim()}>
            {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
