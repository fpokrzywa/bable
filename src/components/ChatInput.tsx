'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Bookmark, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSubmit: (query: string) => void;
  onSave: (query: string, name: string) => void;
  loading: boolean;
}

export function ChatInput({ onSubmit, onSave, loading }: ChatInputProps) {
  const [query, setQuery] = useState('');
  const [saveName, setSaveName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

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

  const handleSave = () => {
    onSave(query, saveName);
    setSaveName('');
    // Close popover, need to manage open state
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a command or ask a question..."
        className="flex-1"
        disabled={loading}
      />
      <Button type="button" size="icon" variant="ghost" onClick={handleListen} disabled={loading}>
        <Mic className={isListening ? 'text-destructive' : ''} />
        <span className="sr-only">Use voice</span>
      </Button>
      <Button type="submit" size="icon" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Send />}
        <span className="sr-only">Send</span>
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" size="icon" variant="outline" disabled={!query.trim() || loading}>
            <Bookmark />
            <span className="sr-only">Save query</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Save Query</h4>
              <p className="text-sm text-muted-foreground">
                Save this query for future use.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="query">Query</Label>
                <Input id="query" defaultValue={query} className="col-span-2 h-8" readOnly />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={saveName} onChange={e => setSaveName(e.target.value)} className="col-span-2 h-8" placeholder="e.g., Open Incidents" />
              </div>
               <Button onClick={handleSave} disabled={!saveName.trim()}>Save</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </form>
  );
}
