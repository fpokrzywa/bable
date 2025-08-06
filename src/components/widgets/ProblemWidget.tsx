'use client';

import { useState, useEffect, useRef } from 'react';
import type { Problem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { ProblemEditForm } from './ProblemEditForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface ProblemWidgetProps {
  widgetId: string;
  problems: Problem[];
  onTextSelect: (text: string) => void;
  updateProblem: (widgetId: string, problemNumber: string, updatedData: Partial<Problem>) => void;
}

export function ProblemWidget({ widgetId, problems, onTextSelect, updateProblem }: ProblemWidgetProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
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

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
  };

  const handleBack = () => {
    setSelectedProblem(null);
  };
  
  const handleProblemUpdate = (values: Partial<Problem>) => {
    if (editingProblem) {
      updateProblem(widgetId, editingProblem.number, values);
      setEditingProblem(null);
      // Also update the selected problem if it's the one being edited
      if(selectedProblem && selectedProblem.number === editingProblem.number) {
        setSelectedProblem({...selectedProblem, ...values});
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      {/* Problems List */}
      <div className={cn("transition-transform duration-300 ease-in-out", {
        '-translate-x-full': selectedProblem
      })}>
        {problems.map((problem, index) => (
          <div 
            key={index} 
            className="mb-4 p-2 rounded-md hover:bg-accent/50"
          >
            <Dialog onOpenChange={(open) => !open && setEditingProblem(null)}>
              <DialogTrigger asChild>
                <p 
                  className="font-medium cursor-pointer"
                  onClick={() => setEditingProblem(problem)}
                >
                  {problem.number}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Problem {editingProblem?.number}</DialogTitle>
                </DialogHeader>
                {editingProblem && <ProblemEditForm problem={editingProblem} onSubmit={handleProblemUpdate} />}
              </DialogContent>
            </Dialog>

            <p 
              className="text-sm text-muted-foreground cursor-pointer"
              onClick={() => handleSelectProblem(problem)}
            >
              {problem.short_description}
            </p>
          </div>
        ))}
      </div>

      {/* Details Pane */}
      <div className={cn(
        "absolute top-0 right-0 h-full w-full bg-card p-4 transition-transform duration-300 ease-in-out",
        "flex flex-col",
        selectedProblem ? 'translate-x-0' : 'translate-x-full'
      )}>
        {selectedProblem && (
           <ScrollArea className="h-full">
            <div className="flex items-center justify-between mb-4">
               <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleBack}>
                <ArrowLeft size={18} />
              </Button>
               <h3 className="font-semibold">{selectedProblem.number}</h3>
               <div className="w-7"/>
            </div>

            <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-muted-foreground">Short Description</h4>
                  <p>{selectedProblem.short_description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Description</h4>
                  <p>{selectedProblem.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Workaround</h4>
                  <p>{selectedProblem.workaround}</p>
                </div>
                 <div>
                  <h4 className="font-medium text-muted-foreground">Cause</h4>
                  <p>{selectedProblem.cause}</p>
                </div>
            </div>
           </ScrollArea>
        )}
      </div>
    </div>
  );
}
