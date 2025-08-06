'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Bookmark, Loader2, Sparkles } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="relative mx-auto">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Please type your message here"
        className="w-full rounded-full h-14 pl-6 pr-16 bg-card/80 border-primary focus-visible:ring-primary/50 text-base"
        disabled={loading}
      />
      <Button type="submit" size="icon" disabled={loading || !query.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-primary/20 hover:bg-primary/30 text-primary">
        {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
