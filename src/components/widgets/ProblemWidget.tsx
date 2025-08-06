'use client';

import type { Problem } from '@/lib/types';

interface ProblemWidgetProps {
  problems: Problem[];
}

export function ProblemWidget({ problems }: ProblemWidgetProps) {
  return (
    <div>
      {problems.map((problem, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium">{problem.number}</p>
          <p className="text-sm text-muted-foreground">{problem.short_description}</p>
        </div>
      ))}
    </div>
  );
}
