
'use client';

import ReactMarkdown from 'react-markdown';

interface GenericWidgetProps {
  data: any;
}

export function GenericWidget({ data }: GenericWidgetProps) {
  return (
    <div className="text-sm @[400px]:text-base h-full">
      {typeof data === 'string' ? 
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{data}</ReactMarkdown>
        </div>
        : <pre className="whitespace-pre-wrap break-all">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
