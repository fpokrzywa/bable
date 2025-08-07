
'use client';

import { useState, type FormEvent, useRef, useCallback, useEffect } from 'react';
import type { Widget, Problem, Incident, Change, ChatMessage } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Bot, Minus, Heart, MessageCircle } from 'lucide-react';
import { GenericWidget } from './GenericWidget';
import { contextAwareWidgetChat } from '@/ai/flows/context-aware-widget-chat';
import { ScrollArea } from '../ui/scroll-area';
import { EntityWidget } from './EntityWidget';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';

interface BaseWidgetProps {
  widget: Widget;
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
  bringToFront: (id: string) => void;
  toggleMinimizeWidget: (id: string) => void;
  toggleFavoriteWidget: (id: string) => void;
}

export function BaseWidget({ widget, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget, toggleFavoriteWidget }: BaseWidgetProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [chatPanelWidth, setChatPanelWidth] = useState(widgetRef.current ? widgetRef.current.offsetWidth / 2 : 375);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (widgetRef.current) {
        setChatPanelWidth(widgetRef.current.offsetWidth / 2);
    }
  }, [isChatOpen]);


  const handleResize = useCallback((e: MouseEvent) => {
    if (isResizing && widgetRef.current) {
      const widgetRect = widgetRef.current.getBoundingClientRect();
      const newChatWidth = widgetRect.right - e.clientX;
      
      const totalWidth = widgetRef.current.offsetWidth;
      const minWidth = 200;
      const maxWidth = totalWidth - 250;
      
      if (newChatWidth > minWidth && newChatWidth < maxWidth) {
        setChatPanelWidth(newChatWidth);
      }
    }
  }, [isResizing]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    } else {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  }
  
  const handleChatSubmit = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    
    const userMessage: ChatMessage = { sender: 'user', text: query };
    setChatMessages(prev => [...prev, userMessage]);

    if (!isChatOpen) {
      toggleChat();
    }
    
    try {
      const result = await contextAwareWidgetChat({
        widgetType: widget.type,
        widgetData: widget.data,
        userQuery: query,
      });
      const aiResponse: ChatMessage = { sender: 'ai', text: result.suggestedActions.join('\n') || "I don't have any specific suggestions for that." };
      setChatMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('Context-aware chat failed:', error);
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I encountered an error.' };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSelection = (text: string) => {
    if (text) {
      if (!isChatOpen) {
        toggleChat();
      }
      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: `What would you like to ask about "${text}"?` }
      ]);
    }
  };
  
  const handleEntitySelectForChat = (entity: Incident | Problem | Change) => {
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    setChatMessages(prev => [
      ...prev,
      { sender: 'ai', text: `What would you like to know about ${widget.type} ${entity.number}?` }
    ]);
  };
  
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'incident':
      case 'problem':
      case 'change':
        return <EntityWidget widgetId={widget.id} type={widget.type} entities={widget.data} onTextSelect={handleTextSelection} updateEntity={updateEntity} onEntitySelectForChat={handleEntitySelectForChat} />;
      case 'generic':
      default:
        return <GenericWidget data={widget.data} />;
    }
  };

  return (
    <Card 
      className="resizable-widget w-full h-full flex flex-col bg-card/80 backdrop-blur-sm overflow-hidden"
      ref={widgetRef}
    >
      <div className="drag-handle cursor-move" onDoubleClick={() => toggleMinimizeWidget(widget.id)}>
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
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleChat}>
                <MessageCircle size={18} className={isChatOpen ? 'text-primary' : ''} />
                <span className="sr-only">Toggle chat</span>
            </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleFavoriteWidget(widget.id)}>
                <Heart size={18} className={widget.isFavorited ? 'fill-primary text-primary' : ''} />
                <span className="sr-only">Favorite widget</span>
            </Button>
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


      <CardContent className="flex-1 min-h-0 relative p-0">
        <div className={cn("flex h-full", isResizing ? 'cursor-col-resize select-none' : '')}>
            <ScrollArea className="h-full flex-1" style={{ width: isChatOpen ? `calc(100% - ${chatPanelWidth}px)` : '100%' }}>
              <div className="p-6">
                {renderWidgetContent()}
              </div>
            </ScrollArea>
            
            {isChatOpen && (
              <>
                <div 
                  className="w-px h-full cursor-col-resize bg-border/50 hover:bg-border transition-colors"
                  onMouseDown={() => setIsResizing(true)}
                />
                <div style={{ width: `${chatPanelWidth}px` }}>
                    <ChatPanel 
                        messages={chatMessages}
                        loading={loading}
                        onSubmit={handleChatSubmit}
                        agentType={widget.agent.agentType}
                        onClose={toggleChat}
                    />
                </div>
              </>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
