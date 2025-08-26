
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Bookmark, Loader2, Sparkles, AlertCircle, FileWarning, GitBranch, BookText, Server, FolderPlus, Edit, Trash2, Save } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Widget, User } from '@/lib/types';


interface ChatInputProps {
  onSubmit: (query: string) => void;
  onSave: (query: string, name: string) => void;
  loading: boolean;
  widgets: Widget[];
  onWorkspaceAction: (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => void;
  user?: User | null;
}

const commands = [
  { name: 'Incidents', query: '@incident', description: 'View and manage incidents', icon: AlertCircle },
  { name: 'Changes', query: '@change', description: 'View and manage change requests', icon: GitBranch },
  { name: 'Problems', query: '@problem', description: 'View and manage problems', icon: FileWarning },
  { name: 'Overview Summary', query: '@summary', description: 'Get a summary of all open widgets', icon: BookText },
  { name: 'Fetch ServiceNow', query: '@servicenow', description: 'Fetch data from ServiceNow', icon: Server },
];

const workspaceCommands = [
  { name: 'Create workspace', action: 'create', description: 'Save the current layout as a new workspace', icon: FolderPlus },
  { name: 'Save workspace', action: 'save', description: 'Save changes to the current workspace', icon: Save },
  { name: 'Edit workspace', action: 'edit', description: 'Update or rename the current workspace', icon: Edit },
  { name: 'Forget workspace', action: 'forget', description: 'Clear the saved workspace from memory', icon: Trash2 },
];

export function ChatInput({ onSubmit, onSave, loading, widgets, onWorkspaceAction, user }: ChatInputProps) {
  const [query, setQuery] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [thinkingDots, setThinkingDots] = useState('.');

  // Filter commands based on user's company association
  const availableCommands = commands.filter(command => {
    // Hide @servicenow command if user has no company
    if (command.query === '@servicenow' && !user?.company_id) {
      return false;
    }
    return true;
  });

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
    setTokenCount(0);
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
    // Estimate tokens: 1 token ~ 4 chars
    setTokenCount(Math.ceil(newQuery.length / 4));
  };

  const handleCommandSelect = (commandQuery: string) => {
    setQuery(commandQuery);
    setShowCommandMenu(false);
    onSubmit(commandQuery);
    setQuery('');
    setTokenCount(0);
  };
  
  const handleWorkspaceAction = (action: 'create' | 'edit' | 'forget' | 'load' | 'save') => {
    onWorkspaceAction(action);
    setShowWorkspaceMenu(false);
    inputRef.current?.focus();
  };

  const isSummaryDisabled = widgets.length === 0;

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
                  className="w-full rounded-full h-14 pl-6 pr-16 bg-card/80 border-primary focus-visible:ring-primary/50 text-base shadow-lg"
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
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
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
                  {availableCommands.map((command) => {
                    const Icon = command.icon;
                    const isDisabled = command.query === '@summary' && isSummaryDisabled;
                    return (
                      <button
                        key={command.name}
                        type="button"
                        className={cn(
                          "w-full text-left p-2 rounded-md hover:bg-accent flex items-start gap-3",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => handleCommandSelect(command.query)}
                        disabled={isDisabled}
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
          <Popover open={showWorkspaceMenu} onOpenChange={setShowWorkspaceMenu}>
              <PopoverTrigger asChild>
                  <Button variant="link" className="text-xs text-muted-foreground self-start p-0 h-auto">Workspace</Button>
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
                  <p className="text-xs text-muted-foreground px-2">Workspace Actions</p>
                  {workspaceCommands.map((command) => {
                    const Icon = command.icon;
                    return (
                      <button
                        key={command.name}
                        type="button"
                        className="w-full text-left p-2 rounded-md hover:bg-accent flex items-start gap-3"
                        onClick={() => handleWorkspaceAction(command.action as 'create' | 'edit' | 'forget' | 'load' | 'save')}
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
      </div>
    </div>
  );
}
