
'use client';

import { useRef, createRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import type { Widget, Problem, Incident, Change } from '@/lib/types';
import { BaseWidget } from './BaseWidget';

interface WidgetContainerProps {
  widgets: Widget[];
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
  bringToFront: (id: string) => void;
  toggleMinimizeWidget: (id: string) => void;
}

export function WidgetContainer({ widgets, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget }: WidgetContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, React.RefObject<HTMLDivElement>>());
  const [bounds, setBounds] = useState<{ left: number, top: number, right: number, bottom: number } | string>('parent');


  useEffect(() => {
    if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        // This is a typical width for a widget, we can adjust if needed
        const widgetWidth = 450; 
        const widgetHeight = 400;

        setBounds({
            left: 0,
            top: 0,
            right: containerWidth - widgetWidth,
            bottom: containerHeight - widgetHeight,
        });
    }
  }, [widgets.length]);


  widgets.forEach(widget => {
    if (!nodeRefs.current.has(widget.id)) {
      nodeRefs.current.set(widget.id, createRef<HTMLDivElement>());
    }
  });

  const minimizedWidgets = widgets.filter(w => w.isMinimized);
  const normalWidgets = widgets.filter(w => !w.isMinimized);

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
       {minimizedWidgets.length > 0 && (
        <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
          {minimizedWidgets.map(widget => (
            <BaseWidget 
              key={widget.id}
              widget={widget} 
              removeWidget={removeWidget} 
              updateEntity={updateEntity}
              bringToFront={bringToFront}
              toggleMinimizeWidget={toggleMinimizeWidget}
            />
          ))}
        </div>
      )}

      {normalWidgets.map((widget, index) => {
        const nodeRef = nodeRefs.current.get(widget.id)!;
        return (
          <Draggable
              key={widget.id}
              nodeRef={nodeRef}
              handle=".drag-handle"
              onStart={() => bringToFront(widget.id)}
              defaultPosition={{x: (index % 5) * 40, y: Math.floor(index / 5) * 40}}
              bounds={bounds}
          >
              <div 
                className="absolute" 
                ref={nodeRef}
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
