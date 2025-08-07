
'use client';

import { useRef, createRef, useState, useEffect } from 'react';
import Draggable, { type DraggableBounds, type DraggableData, type DraggableEvent } from 'react-draggable';
import type { Widget, Problem, Incident, Change } from '@/lib/types';
import { BaseWidget } from './BaseWidget';

interface WidgetContainerProps {
  widgets: Widget[];
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
  bringToFront: (id: string) => void;
  toggleMinimizeWidget: (id: string) => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  sidebarState: 'expanded' | 'collapsed';
  sidebarRef: React.RefObject<HTMLDivElement>;
}

const WIDGET_WIDTH = 450;
const WIDGET_HEIGHT = 400;

export function WidgetContainer({ widgets, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget, updateWidgetPosition, sidebarState, sidebarRef }: WidgetContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DraggableBounds | undefined>(undefined);

  const nodeRefs = useRef(new Map<string, React.RefObject<HTMLDivElement>>());

  widgets.forEach(widget => {
    if (!nodeRefs.current.has(widget.id)) {
      nodeRefs.current.set(widget.id, createRef<HTMLDivElement>());
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBounds = () => {
      const sidebarWidth = sidebarRef.current?.offsetWidth ?? 0;
      const leftBoundary = sidebarState === 'expanded' ? sidebarWidth : 10;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      setBounds({
        left: leftBoundary,
        top: 0,
        right: Math.max(leftBoundary, containerWidth - WIDGET_WIDTH),
        bottom: Math.max(0, containerHeight - WIDGET_HEIGHT),
      });
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(container);
    if(sidebarRef.current) {
        resizeObserver.observe(sidebarRef.current)
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [sidebarState, sidebarRef, widgets.length]);
  
  const handleStop = (id: string, data: DraggableData) => {
    updateWidgetPosition(id, data.x, data.y);
  };
  
  if (widgets.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <div data-ai-hint="empty state robot" className="w-48 h-48 mb-4 rounded-full bg-muted flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Welcome to ServiceNow AI Assist</h2>
            <p className="max-w-md mt-2">
                Your workspace is empty. Try asking for something like "show me open incidents" or "what are the critical changes this week?" to get started.
            </p>
        </div>
    )
  }

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {widgets.map((widget) => {
        const nodeRef = nodeRefs.current.get(widget.id)!;
        
        return (
          <Draggable
              key={widget.id}
              nodeRef={nodeRef}
              handle=".drag-handle"
              onStart={() => bringToFront(widget.id)}
              position={{ x: widget.x ?? 0, y: widget.y ?? 0 }}
              onStop={(e: DraggableEvent, data: DraggableData) => handleStop(widget.id, data)}
              bounds={bounds}
          >
              <div 
                className="absolute" 
                ref={nodeRef}
                style={{
                    zIndex: widget.zIndex, 
                    width: `${WIDGET_WIDTH}px`, 
                    height: `${WIDGET_HEIGHT}px`,
                }}
                onMouseDown={() => bringToFront(widget.id)}
              >
                  <BaseWidget 
                      widget={widget} 
                      removeWidget={removeWidget} 
                      updateEntity={updateEntity}
                      bringToFront={bringToFront}
                      toggleMinimizeWidget={toggleMinimizeWidget}
                  />
              </div>
          </Draggable>
        );
      })}
    </div>
  );
}
