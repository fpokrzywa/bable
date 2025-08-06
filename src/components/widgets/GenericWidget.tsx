'use client';

interface GenericWidgetProps {
  data: any;
}

export function GenericWidget({ data }: GenericWidgetProps) {
  return (
    <div className="text-xs font-mono bg-muted/50 p-2 rounded-md h-full">
      <pre className="whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
