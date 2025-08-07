'use client';

interface GenericWidgetProps {
  data: any;
}

export function GenericWidget({ data }: GenericWidgetProps) {
  return (
    <div className="text-sm @[400px]:text-base h-full">
      {typeof data === 'string' ? <p>{data}</p> : <pre className="whitespace-pre-wrap break-all">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
