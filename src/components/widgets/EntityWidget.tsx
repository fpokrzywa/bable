
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Incident, Problem, Change } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EntityEditForm } from './EntityEditForm';

type Entity = Incident | Problem | Change;

interface EntityWidgetProps {
  widgetId: string;
  type: 'incident' | 'problem' | 'change';
  entities: Entity[];
  onTextSelect: (text: string) => void;
  updateEntity: (widgetId: string, entityNumber: string, updatedData: Partial<Entity>) => void;
  onEntitySelectForChat: (entity: Entity) => void;
}

const entityFieldMapping = {
  incident: {
    title: 'Incident',
    fields: {
      short_description: 'Short Description',
      state: 'State',
      priority: 'Priority',
      assigned_to: 'Assigned To',
      description: 'Description',
    },
  },
  problem: {
    title: 'Problem',
    fields: {
      short_description: 'Short Description',
      description: 'Description',
      workaround: 'Workaround',
      cause: 'Cause',
    },
  },
  change: {
    title: 'Change',
    fields: {
      short_description: 'Short Description',
      type: 'Type',
      state: 'State',
      assigned_to: 'Assigned To',
      justification: 'Justification',
      implementation_plan: 'Implementation Plan',
    },
  },
};

export function EntityWidget({ widgetId, type, entities, onTextSelect, updateEntity, onEntitySelectForChat }: EntityWidgetProps) {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
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

  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleBack = () => {
    setSelectedEntity(null);
  };
  
  const handleEntityUpdate = (values: Partial<Entity>) => {
    if (editingEntity) {
      updateEntity(widgetId, editingEntity.number, values);
      setEditingEntity(null);
      if(selectedEntity && selectedEntity.number === editingEntity.number) {
        setSelectedEntity({...selectedEntity, ...values});
      }
    }
  };

  const { title: entityTitle, fields } = entityFieldMapping[type];

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden text-sm @[400px]:text-base">
      <div className={cn("transition-transform duration-300 ease-in-out", {
        '-translate-x-full': selectedEntity
      })}>
        {entities.map((entity) => (
          <div 
            key={entity.number}
            className="mb-4 p-2 rounded-md hover:bg-accent/50"
          >
            <p 
              className="font-medium cursor-pointer"
              onClick={() => onEntitySelectForChat(entity)}
            >
              {entity.number}
            </p>

            <p 
              className="text-muted-foreground cursor-pointer text-xs @[400px]:text-sm"
              onClick={() => handleSelectEntity(entity)}
            >
              {entity.short_description}
            </p>
          </div>
        ))}
      </div>

      <div className={cn(
        "absolute top-0 right-0 h-full w-full bg-card p-4 transition-transform duration-300 ease-in-out",
        "flex flex-col",
        selectedEntity ? 'translate-x-0' : 'translate-x-full'
      )}>
        {selectedEntity && (
           <ScrollArea className="h-full">
            <div className="flex items-center justify-between mb-4">
               <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleBack}>
                <ArrowLeft size={18} />
              </Button>
               <h3 className="font-semibold">{selectedEntity.number}</h3>
                <Dialog onOpenChange={(open) => !open && setEditingEntity(null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingEntity(selectedEntity)}>
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {entityTitle} {editingEntity?.number}</DialogTitle>
                    </DialogHeader>
                    {editingEntity && <EntityEditForm type={type} entity={editingEntity} onSubmit={handleEntityUpdate} />}
                  </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
              {Object.entries(fields).map(([key, label]) => (
                <div key={key}>
                  <h4 className="font-medium text-muted-foreground">{label}</h4>
                  <p>{(selectedEntity as any)[key]}</p>
                </div>
              ))}
            </div>
           </ScrollArea>
        )}
      </div>
    </div>
  );
}
