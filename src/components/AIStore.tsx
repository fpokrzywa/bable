
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Heart, RefreshCw, Zap, Bot, Box, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getAssistants } from '@/services/assistantService';
import type { Assistant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type DisplayAssistant = Assistant & {
    isFavorited: boolean;
    iconComponent?: React.ReactNode;
    iconBg?: string;
};

const iconMap: { [key: string]: { component: React.ReactNode, bg: string } } = {
    'zap': { component: <Zap className="text-green-500" />, bg: 'bg-green-100' },
    'box': { component: <Box className="text-blue-500" />, bg: 'bg-blue-100' },
    'bot': { component: <Bot className="text-pink-500" />, bg: 'bg-pink-100' },
    'sky_box': { component: <Box className="text-sky-500" />, bg: 'bg-sky-100' },
};

const FAVORITES_KEY = 'ai_store_favorites';

export function AIStore() {
  const [assistants, setAssistants] = useState<DisplayAssistant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAssistants = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
        const data = await getAssistants(forceRefresh);
        const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        
        const displayAssistants = data.map(a => {
            const iconInfo = iconMap[a.icon] || { component: <Bot className="text-gray-500" />, bg: 'bg-gray-100' };
            return {
                ...a,
                isFavorited: savedFavorites.includes(a.id),
                iconComponent: iconInfo.component,
                iconBg: iconInfo.bg,
                addedDate: a.addedDate || new Date().toISOString(),
            };
        });

        setAssistants(displayAssistants);
    } catch (err) {
        setError('Failed to load assistants. Please try refreshing.');
        console.error(err);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch assistants from the server."
        });
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssistants();
  }, []);
  
  const toggleFavorite = (id: string) => {
    let newFavorites: string[] = [];
    const updatedAssistants = assistants.map(a => {
      if (a.id === id) {
        return { ...a, isFavorited: !a.isFavorited };
      }
      return a;
    });

    setAssistants(updatedAssistants);
    newFavorites = updatedAssistants.filter(a => a.isFavorited).map(a => a.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const filteredAndSortedAssistants = useMemo(() => {
    let result = assistants.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

    switch (sortOrder) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'favorites':
        result = result.filter(a => a.isFavorited);
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'all':
      default:
        break;
    }
    return result;
  }, [assistants, searchTerm, sortOrder]);

  return (
    <div className="h-full flex flex-col p-6 pt-12 bg-background text-foreground">
      <header className="mb-6">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Welcome to the AI Storefront</h1>
                <p className="text-muted-foreground">Each Assistant is created to help you do a specific set of tasks. Get answers to your questions, brainstorm ideas, create new content, and more!</p>
            </div>
        </div>
      </header>
      
      <div className="flex items-center gap-4 mb-6">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search using assistant name" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" onClick={() => fetchAssistants(true)} disabled={loading}>
            <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
            Refresh
        </Button>
        <span className="text-sm text-muted-foreground">{filteredAndSortedAssistants.length} assistants</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {loading ? (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : error ? (
            <div className="flex flex-col justify-center items-center h-full text-destructive">
                <p>{error}</p>
                <Button variant="link" onClick={() => fetchAssistants(true)}>Try again</Button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedAssistants.map(assistant => (
                <Card key={assistant.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${assistant.iconBg}`}>
                          {assistant.iconComponent}
                        </div>
                        <CardTitle className="text-sm font-semibold">{assistant.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(assistant.id)}>
                        <Heart className={cn("h-4 w-4", assistant.isFavorited && "fill-primary text-primary")} />
                    </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-0">
                    <CardDescription className="text-xs">{assistant.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div className="text-xs bg-gray-100 dark:bg-gray-800 text-muted-foreground rounded-full px-2 py-0.5">
                    {assistant.version}
                    </div>
                </CardFooter>
                </Card>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
