
'use client';

import type { Change } from '@/lib/types';

interface ChangeWidgetProps {
  changes: Change[];
}

export function ChangeWidget({ changes }: ChangeWidgetProps) {
  return (
    <div>
      {changes.map((change) => (
        <div key={change.number} className="mb-4">
          <p className="font-medium">{change.number}</p>
          <p className="text-sm text-muted-foreground">{change.short_description}</p>
        </div>
      ))}
    </div>
  );
}
