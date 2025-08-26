
'use client';

import { useRef, createRef, useState, useEffect, useCallback } from 'react';
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
  updateWidgetDimensions: (id: string, width: number, height: number) => void;
  sidebarState: 'expanded' | 'collapsed';
  sidebarRef: React.RefObject<HTMLDivElement>;
  chatInputRef: React.RefObject<HTMLDivElement>;
  setIsDragging: (isDragging: boolean) => void;
}

export const WIDGET_INITIAL_WIDTH = 450;
export const WIDGET_EXPANDED_WIDTH = 750;
export const WIDGET_INITIAL_HEIGHT = 400;


export function WidgetContainer({ 
    widgets, 
    removeWidget, 
    updateEntity, 
    bringToFront, 
    toggleMinimizeWidget, 
    toggleFavoriteWidget, 
    updateWidgetPosition, 
    updateWidgetDimensions,
    sidebarState, 
    sidebarRef, 
    chatInputRef,
    setIsDragging
}: WidgetContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{[key: string]: DraggableBounds}>({});
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  const nodeRefs = useRef(new Map<string, React.RefObject<HTMLDivElement>>());

  widgets.forEach(widget => {
    if (!nodeRefs.current.has(widget.id)) {
      nodeRefs.current.set(widget.id, createRef<HTMLDivElement>());
    }
  });

  const updateAllBounds = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const newBounds: {[key: string]: DraggableBounds} = {};
    widgets.forEach(widget => {
      const node = nodeRefs.current.get(widget.id)?.current;
      if (node) {
          const currentWidth = node.offsetWidth;
          const currentHeight = node.offsetHeight;
          newBounds[widget.id] = {
            left: 0,
            top: 0,
            right: containerWidth - currentWidth,
            bottom: containerHeight - currentHeight,
          };
      }
    });
    setBounds(newBounds);
  }, [widgets]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateAllBounds);
    resizeObserver.observe(container);
    if(sidebarRef.current) resizeObserver.observe(sidebarRef.current);
    if(chatInputRef.current) resizeObserver.observe(chatInputRef.current);
    
    // Store observer to disconnect it later
    resizeObserverRef.current = resizeObserver;

    return () => {
      resizeObserver.disconnect();
    };
  }, [sidebarState, sidebarRef, chatInputRef, widgets, updateAllBounds]);
  
  const handleDragStop = (id: string, data: DraggableData) => {
    updateWidgetPosition(id, data.x, data.y);
    setIsDragging(false);
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
              onStart={() => {
                bringToFront(widget.id);
                setIsDragging(true);
              }}
              onStop={(e: DraggableEvent, data: DraggableData) => handleDragStop(widget.id, data)}
              position={{ x: widget.x ?? 0, y: widget.y ?? 0 }}
              bounds={bounds[widget.id]}
          >
              <div 
                className="absolute" 
                ref={nodeRef}
                style={{
                    zIndex: widget.zIndex,
                    width: widget.width || WIDGET_INITIAL_WIDTH,
                    height: widget.height || WIDGET_INITIAL_HEIGHT,
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
                      onResize={updateWidgetDimensions}
                      onPositionChange={updateWidgetPosition}
                  />
              </div>
          </Draggable>
        );
      })}
    </div>
  );
}
