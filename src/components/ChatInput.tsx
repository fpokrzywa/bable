
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Bookmark, Loader2, Sparkles, AlertCircle, FileWarning, GitBranch } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSubmit: (query: string) => void;
  onSave: (query: string, name: string) => void;
  loading: boolean;
}

const commands = [
  { name: 'Incidents', query: '@incident', description: 'View and manage incidents', icon: AlertCircle },
  { name: 'Changes', query: '@change', description: 'View and manage change requests', icon: GitBranch },
  { name: 'Problems', query: '@problem', description: 'View and manage problems', icon: FileWarning },
];

export function ChatInput({ onSubmit, onSave, loading }: ChatInputProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [thinkingDots, setThinkingDots] = useState('.');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setThinkingDots(dots => {
          if (dots.length >= 3) return '.';
          return dots + '.';
        });
      }, 500);
    } else {
      setThinkingDots('.');
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast({ variant: 'destructive', title: 'Voice Error', description: 'Could not start voice recognition.' });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [toast]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    onSubmit(query);
    setQuery('');
    setShowCommandMenu(false);
  };
  
  const handleListen = () => {
    if (!recognitionRef.current) {
        toast({ variant: 'destructive', title: 'Unsupported', description: 'Voice recognition is not supported in your browser.' });
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleCommandSelect = (commandQuery: string) => {
    setQuery(commandQuery);
    setShowCommandMenu(false);
    onSubmit(commandQuery);
    setQuery('');
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="relative w-full">
          <Popover open={loading}>
          <PopoverTrigger asChild>
              <div>
              <Input
                  ref={inputRef}
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Please type your message here"
                  className="w-full rounded-full h-14 pl-6 pr-16 bg-card/80 border-primary focus-visible:ring-primary/50 text-base"
                  disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !query.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-primary/20 hover:bg-primary/30 text-primary">
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  <span className="sr-only">Send</span>
              </Button>
              </div>
          </PopoverTrigger>
          <PopoverContent 
              side="top" 
              align="center" 
              className="w-auto py-1 px-3 mb-2 text-sm text-muted-foreground"
              sideOffset={10}
          >
              Thinking{thinkingDots}
          </PopoverContent>
          </Popover>
      </form>
      <Popover open={showCommandMenu} onOpenChange={setShowCommandMenu}>
          <PopoverTrigger asChild>
              <Button variant="link" className="text-xs text-muted-foreground self-start p-0 h-auto">Use Commands</Button>
          </PopoverTrigger>
          <PopoverContent 
              className="w-[400px] p-2 mb-2" 
              align="start"
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                inputRef.current?.focus();
              }}
          >
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2">Commands</p>
              {commands.map((command) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.name}
                    type="button"
                    className="w-full text-left p-2 rounded-md hover:bg-accent flex items-start gap-3"
                    onClick={() => handleCommandSelect(command.query)}
                  >
                    <Icon className="w-8 h-8 p-1.5 bg-muted rounded-md mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{command.name}</p>
                      <p className="text-xs text-muted-foreground">{command.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
      </Popover>
    </div>
  );
}
