
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
  toggleFavoriteWidget: (id: string) => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  sidebarState: 'expanded' | 'collapsed';
  sidebarRef: React.RefObject<HTMLDivElement>;
  chatInputRef: React.RefObject<HTMLDivElement>;
}

export const WIDGET_INITIAL_WIDTH = 450;
export const WIDGET_EXPANDED_WIDTH = 750;
export const WIDGET_HEIGHT = 400;

export function WidgetContainer({ widgets, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget, toggleFavoriteWidget, updateWidgetPosition, sidebarState, sidebarRef, chatInputRef }: WidgetContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{[key: string]: DraggableBounds}>({});
  
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
      const sidebarWidth = sidebarState === 'expanded' ? (sidebarRef.current?.offsetWidth ?? 0) : 0;
      const chatInputHeight = chatInputRef.current?.offsetHeight ?? 0;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const newBounds: {[key: string]: DraggableBounds} = {};
      widgets.forEach(widget => {
        const node = nodeRefs.current.get(widget.id)?.current;
        if (node) {
            const currentWidth = node.offsetWidth;
            const currentHeight = node.offsetHeight;
            newBounds[widget.id] = {
              left: sidebarWidth,
              top: 0,
              right: containerWidth - currentWidth,
              bottom: Math.max(0, containerHeight - currentHeight - chatInputHeight),
            };
        }
      });
      setBounds(newBounds);
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(container);
    if(sidebarRef.current) {
        resizeObserver.observe(sidebarRef.current)
    }
     if(chatInputRef.current) {
        resizeObserver.observe(chatInputRef.current)
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [sidebarState, sidebarRef, chatInputRef, widgets]);
  
  const handleStop = (id: string, data: DraggableData) => {
    updateWidgetPosition(id, data.x, data.y);
  };
  
  if (widgets.length === 0) {
    return null;
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
              bounds={bounds[widget.id]}
          >
              <div 
                className="absolute" 
                ref={nodeRef}
                style={{
                    zIndex: widget.zIndex,
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
                      toggleFavoriteWidget={toggleFavoriteWidget}
                  />
              </div>
          </Draggable>
        );
      })}
    </div>
  );
}
