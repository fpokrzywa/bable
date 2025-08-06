'use client';

import type { Widget, Problem, Incident, Change } from '@/lib/types';
import { BaseWidget } from './BaseWidget';

interface WidgetContainerProps {
  widgets: Widget[];
  removeWidget: (id: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Problem | Incident | Change>) => void;
}

export function WidgetContainer({ widgets, removeWidget, updateEntity }: WidgetContainerProps) {
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
    <div className="flex flex-wrap gap-4">
      {widgets.map((widget) => (
        <div key={widget.id} className="animate-in fade-in zoom-in-95">
          <BaseWidget 
            widget={widget} 
            removeWidget={removeWidget} 
            updateEntity={updateEntity}
          />
        </div>
      ))}
    </div>
  );
}
