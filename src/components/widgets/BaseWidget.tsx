

'use client';

import { useState, type FormEvent, useRef, useCallback, useEffect } from 'react';
import type { Widget, Problem, Incident, Change, ChatMessage } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Bot, Minus, Heart, MessageCircle } from 'lucide-react';
import { GenericWidget } from './GenericWidget';
import { contextAwareWidgetChat } from '@/ai/flows/context-aware-widget-chat';
import { EntityWidget } from './EntityWidget';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';
import { WIDGET_EXPANDED_WIDTH, WIDGET_INITIAL_WIDTH, WIDGET_INITIAL_HEIGHT } from './WidgetContainer';
import { useIsMobile } from '@/hooks/use-mobile';

interface BaseWidgetProps {
  widget: Widget;
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
  bringToFront: (id: string, isSummaryOrChat?: boolean) => void;
  toggleMinimizeWidget: (id: string) => void;
  toggleFavoriteWidget: (id: string) => void;
  onResize?: (id: string, width: number, height: number) => void;
  onPositionChange?: (id: string, x: number, y: number) => void;
}

export function BaseWidget({ widget, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget, toggleFavoriteWidget, onResize, onPositionChange }: BaseWidgetProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(widget.type === 'generic');
  const [loading, setLoading] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [chatPanelWidth, setChatPanelWidth] = useState(375);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedEntityForChat, setSelectedEntityForChat] = useState<Incident | Problem | Change | null>(null);
  const isMobile = useIsMobile();
  
  // Track the last reported size to prevent infinite loops
  const lastReportedSize = useRef<{width: number, height: number} | null>(null);
  
  // Resize state
  const [isCustomResizing, setIsCustomResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialWidgetSize, setInitialWidgetSize] = useState({ width: 0, height: 0 });
  const [initialWidgetPos, setInitialWidgetPos] = useState({ x: 0, y: 0 });
  
  // ResizeObserver to detect when the card is resized via CSS resize handle
  useEffect(() => {
    if (!widgetRef.current || !onResize || isMobile) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          
          // Only trigger if size actually changed significantly
          const currentWidget = widget;
          const currentWidth = currentWidget.width || WIDGET_INITIAL_WIDTH;
          const currentHeight = currentWidget.height || WIDGET_INITIAL_HEIGHT;
          
          const widthChanged = Math.abs(width - currentWidth) > 5;
          const heightChanged = Math.abs(height - currentHeight) > 5;
          
          // Also check against last reported size to prevent loops
          const lastSize = lastReportedSize.current;
          const differentFromLast = !lastSize || 
            Math.abs(width - lastSize.width) > 5 || 
            Math.abs(height - lastSize.height) > 5;
          
          if ((widthChanged || heightChanged) && differentFromLast) {
            lastReportedSize.current = { width: Math.round(width), height: Math.round(height) };
            onResize(widget.id, Math.round(width), Math.round(height));
          }
        }
      }, 100); // Debounce by 100ms
    });
    
    resizeObserver.observe(widgetRef.current);
    
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [widget.id, widget.width, widget.height, onResize, isMobile]);

  // Custom resize handling
  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    if (isMobile || !widgetRef.current || !onResize) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsCustomResizing(true);
    setResizeDirection(direction);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    
    const rect = widgetRef.current.getBoundingClientRect();
    setInitialWidgetSize({ width: rect.width, height: rect.height });
    setInitialWidgetPos({ x: widget.x || 0, y: widget.y || 0 });
    
    bringToFront(widget.id);
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isCustomResizing || !resizeDirection || !onResize || !widgetRef.current) return;
    
    const deltaX = e.clientX - initialMousePos.x;
    const deltaY = e.clientY - initialMousePos.y;
    
    let newWidth = initialWidgetSize.width;
    let newHeight = initialWidgetSize.height;
    let newX = initialWidgetPos.x;
    let newY = initialWidgetPos.y;
    
    const minWidth = 350;
    const minHeight = 250;
    
    // Handle different resize directions
    if (resizeDirection.includes('e')) { // East (right)
      newWidth = Math.max(minWidth, initialWidgetSize.width + deltaX);
    }
    if (resizeDirection.includes('w')) { // West (left)
      const widthChange = Math.min(deltaX, initialWidgetSize.width - minWidth);
      newWidth = initialWidgetSize.width - widthChange;
      newX = initialWidgetPos.x + widthChange;
    }
    if (resizeDirection.includes('s')) { // South (bottom)
      newHeight = Math.max(minHeight, initialWidgetSize.height + deltaY);
    }
    if (resizeDirection.includes('n')) { // North (top)
      const heightChange = Math.min(deltaY, initialWidgetSize.height - minHeight);
      newHeight = initialWidgetSize.height - heightChange;
      newY = initialWidgetPos.y + heightChange;
    }
    
    // Apply the changes
    if (onResize && (newWidth !== initialWidgetSize.width || newHeight !== initialWidgetSize.height)) {
      onResize(widget.id, Math.round(newWidth), Math.round(newHeight));
    }
    
    if (onPositionChange && (newX !== initialWidgetPos.x || newY !== initialWidgetPos.y)) {
      onPositionChange(widget.id, Math.round(newX), Math.round(newY));
    }
  }, [isCustomResizing, resizeDirection, initialMousePos, initialWidgetSize, initialWidgetPos, onResize, onPositionChange, widget.id]);

  const handleCustomResizeEnd = useCallback(() => {
    setIsCustomResizing(false);
    setResizeDirection(null);
  }, []);

  // Mouse event listeners for resizing
  useEffect(() => {
    if (isCustomResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleCustomResizeEnd);
      document.body.style.cursor = resizeDirection ? `${resizeDirection}-resize` : 'default';
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleCustomResizeEnd);
        document.body.style.cursor = 'default';
      };
    }
  }, [isCustomResizing, handleResizeMove, handleCustomResizeEnd, resizeDirection]);


  // Set chat panel to exactly half the widget width for equal split (50/50)
  useEffect(() => {
    if (isChatOpen && widgetRef.current) {
        const halfWidth = widgetRef.current.offsetWidth / 2;
        setChatPanelWidth(halfWidth);
    }
  }, [isChatOpen, widget.width]);


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
  
  const clearChatMessages = () => {
    setChatMessages([]);
  };

  const toggleChat = () => {
    if (!isChatOpen) {
      bringToFront(widget.id, true);
    }
    setIsChatOpen(prev => {
        if (!prev === false) {
            setSelectedEntityForChat(null);
        }
        return !prev;
    });
  }
  
  const handleChatSubmit = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    
    const userMessage: ChatMessage = { role: 'user', content: query };
    const newMessages: ChatMessage[] = [...chatMessages, userMessage];
    setChatMessages(newMessages);

    if (!isChatOpen) {
      toggleChat();
    }
    
    try {
      const result = await contextAwareWidgetChat({
        widgetType: widget.type,
        widgetData: widget.data,
        userQuery: query,
        selectedEntityData: selectedEntityForChat ?? undefined,
        chatHistory: newMessages.slice(0, -1).map(m => ({role: m.role === 'user' ? 'user' : 'model', content: m.content})),
      });
      const aiResponse: ChatMessage = { role: 'model', content: result.suggestedActions.join('\n') || "I don't have any specific suggestions for that." };
      setChatMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('Context-aware chat failed:', error);
      const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, I encountered an error.' };
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
        { role: 'model', content: `What would you like to ask about "${text}"?` }
      ]);
    }
  };
  
  const handleEntitySelectForChat = (entity: Incident | Problem | Change) => {
    setSelectedEntityForChat(entity);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    setChatMessages(prev => [
      ...prev,
      { role: 'model', content: `Now focusing on ${widget.type} ${entity.number}. What would you like to know?` }
    ]);
  };
  
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'incident':
      case 'problem':
      case 'change':
        if (!Array.isArray(widget.data)) {
          return <GenericWidget data="Data is not in the correct format." />;
        }
        const entities = widget.data.map((e: any) => 
            Object.entries(e).reduce((acc, [key, value]) => {
                acc[key] = typeof value === 'object' && value !== null && 'value' in value ? (value as any).value : value;
                return acc;
            }, {} as any)
        );
        return <EntityWidget widgetId={widget.id} type={widget.type} entities={entities} onTextSelect={handleTextSelection} updateEntity={updateEntity} onEntitySelectForChat={handleEntitySelectForChat} />;
      case 'generic':
      default:
        return <GenericWidget data={widget.data} />;
    }
  };

  const getWidgetWidth = () => {
    if (isMobile) return '100%';
    if (widget.width) return widget.width;
    if (isChatOpen) return WIDGET_EXPANDED_WIDTH;
    return WIDGET_INITIAL_WIDTH;
  };

  return (
    <Card 
      className={cn(
        "w-full h-full flex flex-col bg-card/80 backdrop-blur-sm overflow-hidden",
        !isMobile && "resizable-widget"
      )}
      ref={widgetRef}
      style={{ 
        width: getWidgetWidth(),
        height: isMobile ? 'auto' : widget.height,
      }}
    >
      <div className={cn(!isMobile && "drag-handle cursor-move")} onDoubleClick={() => toggleMinimizeWidget(widget.id)}>
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
        {/* Resize handles - only show on desktop */}
        {!isMobile && (
          <>
            {/* Corner handles */}
            <div className="resize-handle resize-nw" onMouseDown={(e) => handleResizeStart('nw', e)} />
            <div className="resize-handle resize-ne" onMouseDown={(e) => handleResizeStart('ne', e)} />
            <div className="resize-handle resize-sw" onMouseDown={(e) => handleResizeStart('sw', e)} />
            <div className="resize-handle resize-se" onMouseDown={(e) => handleResizeStart('se', e)} />
            
            {/* Edge handles */}
            <div className="resize-handle resize-n" onMouseDown={(e) => handleResizeStart('n', e)} />
            <div className="resize-handle resize-s" onMouseDown={(e) => handleResizeStart('s', e)} />
            <div className="resize-handle resize-w" onMouseDown={(e) => handleResizeStart('w', e)} />
            <div className="resize-handle resize-e" onMouseDown={(e) => handleResizeStart('e', e)} />
          </>
        )}
        
        <div className={cn("flex h-full", isResizing ? 'cursor-col-resize select-none' : '')}>
            <div className="h-full flex-1 overflow-auto no-scrollbar" style={{ width: isChatOpen ? `calc(100% - ${chatPanelWidth}px)` : '100%' }}>
              <div className="p-4 h-full">
                {renderWidgetContent()}
              </div>
            </div>
            
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
                        onClear={clearChatMessages}
                    />
                </div>
              </>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
