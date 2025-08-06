'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Incident, Problem, Change } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@/components/ui/dialog';

type Entity = Incident | Problem | Change;

const incidentSchema = z.object({
  short_description: z.string().min(1, 'Short description is required'),
  priority: z.string().optional(),
  state: z.string().optional(),
  assigned_to: z.string().optional(),
  description: z.string().optional(),
});

const problemSchema = z.object({
  short_description: z.string().min(1, 'Short description is required'),
  description: z.string().optional(),
  workaround: z.string().optional(),
  cause: z.string().optional(),
});

const changeSchema = z.object({
  short_description: z.string().min(1, 'Short description is required'),
  type: z.string().optional(),
  state: z.string().optional(),
  assigned_to: z.string().optional(),
  justification: z.string().optional(),
  implementation_plan: z.string().optional(),
});

const entitySchemas = {
  incident: incidentSchema,
  problem: problemSchema,
  change: changeSchema,
};

const entityFields: { [key in 'incident' | 'problem' | 'change']: { name: string; label: string; type: 'input' | 'textarea' }[] } = {
  incident: [
    { name: 'short_description', label: 'Short Description', type: 'input' },
    { name: 'priority', label: 'Priority', type: 'input' },
    { name: 'state', label: 'State', type: 'input' },
    { name: 'assigned_to', label: 'Assigned To', type: 'input' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  problem: [
    { name: 'short_description', label: 'Short Description', type: 'input' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'workaround', label: 'Workaround', type: 'textarea' },
    { name: 'cause', label: 'Cause', type: 'textarea' },
  ],
  change: [
    { name: 'short_description', label: 'Short Description', type: 'input' },
    { name: 'type', label: 'Type', type: 'input' },
    { name: 'state', label: 'State', type: 'input' },
    { name: 'assigned_to', label: 'Assigned To', type: 'input' },
    { name: 'justification', label: 'Justification', type: 'textarea' },
    { name: 'implementation_plan', label: 'Implementation Plan', type: 'textarea' },
  ],
};


interface EntityEditFormProps {
  type: 'incident' | 'problem' | 'change';
  entity: Entity;
  onSubmit: (values: Partial<Entity>) => void;
}

export function EntityEditForm({ type, entity, onSubmit }: EntityEditFormProps) {
  const form = useForm({
    resolver: zodResolver(entitySchemas[type]),
    defaultValues: entity,
  });

  const fieldsToRender = entityFields[type];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fieldsToRender.map((fieldInfo) => (
          <FormField
            key={fieldInfo.name}
            control={form.control}
            name={fieldInfo.name as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldInfo.label}</FormLabel>
                <FormControl>
                  {fieldInfo.type === 'textarea' ? <Textarea {...field} /> : <Input {...field} />}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <DialogClose asChild>
          <Button type="submit">Save Changes</Button>
        </DialogClose>
      </form>
    </Form>
  );
}
