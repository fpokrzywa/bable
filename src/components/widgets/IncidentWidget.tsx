
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Incident } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { IncidentEditForm } from './IncidentEditForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface IncidentWidgetProps {
  widgetId: string;
  incidents: Incident[];
  onTextSelect: (text: string) => void;
  updateIncident: (widgetId: string, incidentNumber: string, updatedData: Partial<Incident>) => void;
}

export function IncidentWidget({ widgetId, incidents, onTextSelect, updateIncident }: IncidentWidgetProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
        onTextSelect(selection);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mouseup', handleMouseUp);

    return () => {
      container?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onTextSelect]);

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleBack = () => {
    setSelectedIncident(null);
  };
  
  const handleIncidentUpdate = (values: Partial<Incident>) => {
    if (editingIncident) {
      updateIncident(widgetId, editingIncident.number, values);
      setEditingIncident(null);
      if(selectedIncident && selectedIncident.number === editingIncident.number) {
        setSelectedIncident({...selectedIncident, ...values});
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      {/* Incidents List */}
      <div className={cn("transition-transform duration-300 ease-in-out", {
        '-translate-x-full': selectedIncident
      })}>
        {incidents.map((incident) => (
          <div 
            key={incident.number}
            className="mb-4 p-2 rounded-md hover:bg-accent/50"
          >
            <Dialog onOpenChange={(open) => !open && setEditingIncident(null)}>
              <DialogTrigger asChild>
                <p 
                  className="font-medium cursor-pointer"
                  onClick={() => setEditingIncident(incident)}
                >
                  {incident.number}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Incident {editingIncident?.number}</DialogTitle>
                </DialogHeader>
                {editingIncident && <IncidentEditForm incident={editingIncident} onSubmit={handleIncidentUpdate} />}
              </DialogContent>
            </Dialog>

            <p 
              className="text-sm text-muted-foreground cursor-pointer"
              onClick={() => handleSelectIncident(incident)}
            >
              {incident.short_description}
            </p>
          </div>
        ))}
      </div>

      {/* Details Pane */}
      <div className={cn(
        "absolute top-0 right-0 h-full w-full bg-card p-4 transition-transform duration-300 ease-in-out",
        "flex flex-col",
        selectedIncident ? 'translate-x-0' : 'translate-x-full'
      )}>
        {selectedIncident && (
           <ScrollArea className="h-full">
            <div className="flex items-center justify-between mb-4">
               <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleBack}>
                <ArrowLeft size={18} />
              </Button>
               <h3 className="font-semibold">{selectedIncident.number}</h3>
               <div className="w-7"/>
            </div>

            <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-muted-foreground">Short Description</h4>
                  <p>{selectedIncident.short_description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">State</h4>
                  <p>{selectedIncident.state}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Priority</h4>
                  <p>{selectedIncident.priority}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Assigned To</h4>
                  <p>{selectedIncident.assigned_to}</p>
                </div>
                 <div>
                  <h4 className="font-medium text-muted-foreground">Description</h4>
                  <p>{selectedIncident.description}</p>
                </div>
            </div>
           </ScrollArea>
        )}
      </div>
    </div>
  );
}
