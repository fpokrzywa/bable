
'use client';

import { useRef, createRef, useState, useEffect } from 'react';
import Draggable, { type DraggableBounds, type DraggableData, type DraggableEvent } from 'react-draggable';
import type { Widget, Problem, Incident, Change } from '@/lib/types';
import { BaseWidget } from './BaseWidget';
import Image from 'next/image';

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
}

export const WIDGET_INITIAL_WIDTH = 450;
export const WIDGET_EXPANDED_WIDTH = 750;
export const WIDGET_HEIGHT = 400;

export function WidgetContainer({ widgets, removeWidget, updateEntity, bringToFront, toggleMinimizeWidget, toggleFavoriteWidget, updateWidgetPosition, sidebarState, sidebarRef }: WidgetContainerProps) {
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
      const sidebarWidth = sidebarRef.current?.offsetWidth ?? 0;
      const leftBoundary = sidebarState === 'expanded' ? sidebarWidth : 10;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const newBounds: {[key: string]: DraggableBounds} = {};
      widgets.forEach(widget => {
        const node = nodeRefs.current.get(widget.id)?.current;
        if (node) {
            const currentWidth = node.offsetWidth;
            newBounds[widget.id] = {
              left: 0,
              top: 0,
              right: Math.max(0, containerWidth - currentWidth),
              bottom: Math.max(0, containerHeight - WIDGET_HEIGHT),
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

    return () => {
      resizeObserver.disconnect();
    };
  }, [sidebarState, sidebarRef, widgets]);
  
  const handleStop = (id: string, data: DraggableData) => {
    updateWidgetPosition(id, data.x, data.y);
  };
  
  if (widgets.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground -mt-20">
            <Image 
              src="https://storage.googleapis.com/aip-dev-images-public/studio-assets/babel_fish_logo_with_tag.png" 
              alt="Babel Fish Logo" 
              width={500} 
              height={250}
              className="opacity-20"
              priority
            />
        </div>
    )
  }

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {widgets.map((widget) => {
        const nodeRef = nodeRefs.current.get(widget.id)!;
        // The widget now determines its own expanded state
        // For initial placement and boundary calculation, we might need a hint
        // or just let it reflow. For simplicity, we'll use a fixed expanded width hint
        // The actual width is controlled by BaseWidget's internal state now.

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
                className="absolute transition-all duration-150 ease-in-out" 
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
