'use client';

import { useState, useEffect, useRef } from 'react';
import type { Change } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChangeEditForm } from '@/components/widgets/ChangeEditForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ChangeWidgetProps {
  widgetId: string;
  changes: Change[];
  onTextSelect: (text: string) => void;
  updateChange: (widgetId: string, changeNumber: string, updatedData: Partial<Change>) => void;
}

export function ChangeWidget({ widgetId, changes, onTextSelect, updateChange }: ChangeWidgetProps) {
  const [selectedChange, setSelectedChange] = useState<Change | null>(null);
  const [editingChange, setEditingChange] = useState<Change | null>(null);
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

  const handleSelectChange = (change: Change) => {
    setSelectedChange(change);
  };

  const handleBack = () => {
    setSelectedChange(null);
  };
  
  const handleChangeUpdate = (values: Partial<Change>) => {
    if (editingChange) {
      updateChange(widgetId, editingChange.number, values);
      setEditingChange(null);
      if(selectedChange && selectedChange.number === editingChange.number) {
        setSelectedChange({...selectedChange, ...values});
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden text-sm @[400px]:text-base">
      {/* Changes List */}
      <div className={cn("transition-transform duration-300 ease-in-out", {
        '-translate-x-full': selectedChange
      })}>
        {changes.map((change) => (
          <div 
            key={change.number}
            className="mb-4 p-2 rounded-md hover:bg-accent/50"
          >
            <Dialog onOpenChange={(open) => !open && setEditingChange(null)}>
              <DialogTrigger asChild>
                <p 
                  className="font-medium cursor-pointer"
                  onClick={() => setEditingChange(change)}
                >
                  {change.number}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Change {editingChange?.number}</DialogTitle>
                </DialogHeader>
                {editingChange && <ChangeEditForm change={editingChange} onSubmit={handleChangeUpdate} />}
              </DialogContent>
            </Dialog>

            <p 
              className="text-muted-foreground cursor-pointer text-xs @[400px]:text-sm"
              onClick={() => handleSelectChange(change)}
            >
              {change.short_description}
            </p>
          </div>
        ))}
      </div>

      {/* Details Pane */}
      <div className={cn(
        "absolute top-0 right-0 h-full w-full bg-card p-4 transition-transform duration-300 ease-in-out",
        "flex flex-col",
        selectedChange ? 'translate-x-0' : 'translate-x-full'
      )}>
        {selectedChange && (
           <ScrollArea className="h-full">
            <div className="flex items-center justify-between mb-4">
               <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleBack}>
                <ArrowLeft size={18} />
              </Button>
               <h3 className="font-semibold">{selectedChange.number}</h3>
               <div className="w-7"/>
            </div>

            <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-muted-foreground">Short Description</h4>
                  <p>{selectedChange.short_description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Type</h4>
                  <p>{selectedChange.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">State</h4>
                  <p>{selectedChange.state}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Assigned To</h4>
                  <p>{selectedChange.assigned_to}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Justification</h4>
                  <p>{selectedChange.justification}</p>
                </div>
                 <div>
                  <h4 className="font-medium text-muted-foreground">Implementation Plan</h4>
                  <p>{selectedChange.implementation_plan}</p>
                </div>
            </div>
           </ScrollArea>
        )}
      </div>
    </div>
  );
}
