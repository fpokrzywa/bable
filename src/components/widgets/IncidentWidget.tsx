'use client';

import type { Incident } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface IncidentWidgetProps {
  incidents: Incident[];
}

const priorityVariant = {
  '1 - Critical': 'destructive',
  '2 - High': 'destructive',
  '3 - Moderate': 'secondary',
  '4 - Low': 'outline',
  '5 - Planning': 'outline',
} as const;

export function IncidentWidget({ incidents }: IncidentWidgetProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidents.map((incident) => (
          <TableRow key={incident.number}>
            <TableCell className="font-medium">{incident.number}</TableCell>
            <TableCell>{incident.short_description}</TableCell>
            <TableCell>
              <Badge variant={priorityVariant[incident.priority as keyof typeof priorityVariant] || 'default'}>
                {incident.priority}
              </Badge>
            </TableCell>
            <TableCell>{incident.state}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
