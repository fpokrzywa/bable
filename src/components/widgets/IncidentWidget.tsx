
'use client';

import type { Incident } from '@/lib/types';

interface IncidentWidgetProps {
  incidents: Incident[];
}

export function IncidentWidget({ incidents }: IncidentWidgetProps) {
  return (
    <div>
      {incidents.map((incident) => (
        <div key={incident.number} className="mb-4">
          <p className="font-medium">{incident.number}</p>
          <p className="text-sm text-muted-foreground">{incident.short_description}</p>
        </div>
      ))}
    </div>
  );
}
