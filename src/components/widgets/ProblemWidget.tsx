'use client';

import { useState, useEffect, useRef } from 'react';
import type { Problem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface ProblemWidgetProps {
  problems: Problem[];
  onTextSelect: (text: string) => void;
}

export function ProblemWidget({ problems, onTextSelect }: ProblemWidgetProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
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
  
  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      {/* Problems List */}
      <div className={cn("transition-transform duration-300 ease-in-out", {
        '-translate-x-full': selectedProblem
      })}>
        {problems.map((problem, index) => (
          <div 
            key={index} 
            className="mb-4 p-2 rounded-md hover:bg-accent/50 cursor-pointer"
            onClick={() => handleSelectProblem(problem)}
          >
            <p className="font-medium">{problem.number}</p>
            <p className="text-sm text-muted-foreground">{problem.short_description}</p>
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Workaround</h4>
                  <p>
                    Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                  </p>
                </div>
                 <div>
                  <h4 className="font-medium text-muted-foreground">Cause</h4>
                  <p>
                    Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
                  </p>
                </div>
            </div>
           </ScrollArea>
        )}
      </div>
    </div>
  );
}
