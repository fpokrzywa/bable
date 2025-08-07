
'use client';

import { useState, type FormEvent, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Bot, User, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ChatPanelProps {
  messages: ChatMessage[];
  loading: boolean;
  onSubmit: (query: string) => void;
  agentType: string;
  onClose: () => void;
}

export function ChatPanel({ messages, loading, onSubmit, agentType, onClose }: ChatPanelProps) {
  const [query, setQuery] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
    setQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="p-3 flex items-center justify-between">
        <h4 className="font-semibold text-sm">Chat with {agentType}</h4>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <PanelLeft size={18} />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-auto no-scrollbar" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={cn('flex items-start gap-3', message.sender === 'user' ? 'justify-end' : 'justify-start')}>
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn('rounded-lg px-3 py-2 max-w-[80%] text-sm', 
                message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
              {message.sender === 'user' && (
                 <Avatar className="w-8 h-8 border">
                    <AvatarFallback><User size={18} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {loading && (
             <div className='flex items-start gap-3 justify-start'>
                <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className='rounded-lg px-3 py-2 max-w-[80%] text-sm bg-muted flex items-center'>
                    <Loader2 className="animate-spin h-5 w-5" />
                </div>
             </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="Your message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="text-xs"
          />
          <Button type="submit" size="icon" disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="animate-spin" size={16}/> : <Send size={16} />}
          </Button>
        </form>
      </div>
    </div>
  );
}
