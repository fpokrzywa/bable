
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Heart, RefreshCw, Loader2, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from './ui/badge';
import { getPrompts } from '@/services/promptService';
import type { Prompt } from '@/lib/types';

type DisplayPrompt = Prompt & { isFavorited: boolean };

const assistants = ['All Assistants', 'ODIN', 'NOW Assist Guru', 'Prompt Architect', 'ADEPT Guru', 'NIEA Guru'];
const tasks = ['Select Task...', 'Content Creation', 'Brainstorming', 'Explanation', 'Summarization', 'Question Generation'];
const functionalAreas = ['Select Functional Area...', 'Marketing', 'Creative', 'Education', 'Research', 'Human Resources'];

const PROMPTS_CACHE_KEY = 'promptCatalogCache';

export function PromptCatalog() {
  const [prompts, setPrompts] = useState<DisplayPrompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('All Assistants');
  const [selectedTask, setSelectedTask] = useState('Select Task...');
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState('Select Functional Area...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('common-prompts');


  const fetchPrompts = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (!forceRefresh) {
        const cachedPrompts = sessionStorage.getItem(PROMPTS_CACHE_KEY);
        if (cachedPrompts) {
            try {
                const parsedPrompts = JSON.parse(cachedPrompts);
                setPrompts(parsedPrompts);
                setLoading(false);
                return;
            } catch (e) {
                console.error("Failed to parse cached prompts", e);
                sessionStorage.removeItem(PROMPTS_CACHE_KEY);
            }
        }
    } else {
        sessionStorage.removeItem(PROMPTS_CACHE_KEY);
    }

    try {
        const data = await getPrompts();
        const displayPrompts = data.map(p => ({ ...p, isFavorited: false }));
        setPrompts(displayPrompts);
        sessionStorage.setItem(PROMPTS_CACHE_KEY, JSON.stringify(displayPrompts));
    } catch (err) {
        setError('Failed to load prompts. Please try again later.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const toggleFavorite = (id: string) => {
    const newPrompts = prompts.map(p => p.id === id ? {...p, isFavorited: !p.isFavorited} : p);
    setPrompts(newPrompts);
    if (sessionStorage.getItem(PROMPTS_CACHE_KEY)) {
        sessionStorage.setItem(PROMPTS_CACHE_KEY, JSON.stringify(newPrompts));
    }
  };
  
  const applyFilters = (items: DisplayPrompt[]) => {
      return items.filter(prompt => {
        const searchMatch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
        const assistantMatch = selectedAssistant === 'All Assistants' || prompt.assistant === selectedAssistant;
        const taskMatch = selectedTask === 'Select Task...' || prompt.task === selectedTask;
        const functionalAreaMatch = selectedFunctionalArea === 'Select Functional Area...' || prompt.functionalArea === selectedFunctionalArea;
        return searchMatch && assistantMatch && taskMatch && functionalAreaMatch;
      });
  }

  const filteredPrompts = useMemo(() => {
    return applyFilters(prompts);
  }, [prompts, searchTerm, selectedAssistant, selectedTask, selectedFunctionalArea]);
  
  const favoritedPrompts = useMemo(() => {
    const favorites = prompts.filter(p => p.isFavorited);
    return applyFilters(favorites);
  }, [prompts, searchTerm, selectedAssistant, selectedTask, selectedFunctionalArea]);
  
  const hasFavorites = useMemo(() => prompts.some(p => p.isFavorited), [prompts]);
  
  const handleRefresh = () => {
    fetchPrompts(true);
  };

  const renderPromptGrid = (promptList: DisplayPrompt[], emptyMessage: string) => {
    if (loading) {
      return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }
    if (error) {
      return <div className="flex items-center justify-center h-full text-destructive">{error}</div>;
    }
    if (promptList.length === 0) {
      return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground">{emptyMessage}</p></div>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promptList.map(prompt => (
          <Card key={prompt.id} className="group relative flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xs font-normal text-muted-foreground">{prompt.assistant}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2" onClick={() => toggleFavorite(prompt.id)}>
                  <Heart className={cn("h-4 w-4", prompt.isFavorited && "fill-primary text-primary")} />
                </Button>
              </div>
              <p className="font-semibold text-sm pt-2">{prompt.title}</p>
            </CardHeader>
            <CardContent className="flex-1 p-4 pt-0">
              <CardDescription className="text-xs">{prompt.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-end">
              <div className="flex-wrap gap-2 flex">
                  {prompt.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Pencil className="h-4 w-4" />
                  </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-6 bg-background text-foreground">
      <header className="mb-6">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Prompt Catalog</h1>
                <p className="text-muted-foreground">Discover and use pre-built prompts to get the most out of your AI assistants. Browse by category, assistant, or search for specific use cases.</p>
            </div>
        </div>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <div className='flex justify-between items-center border-b'>
            <TabsList className="bg-transparent p-0">
                <TabsTrigger value="common-prompts" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none">Common Prompts</TabsTrigger>
                {hasFavorites && (
                    <TabsTrigger value="favorite-prompts" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none">Favorite Prompts</TabsTrigger>
                )}
            </TabsList>
            <Button variant="ghost" onClick={handleRefresh} disabled={loading}>
                <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
                Refresh
            </Button>
        </div>

        <div className="mt-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium">Assistant</label>
                    <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                        <SelectTrigger><SelectValue /></SelectValue>
                        <SelectContent>{assistants.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Task</label>
                     <Select value={selectedTask} onValueChange={setSelectedTask}>
                        <SelectTrigger><SelectValue /></SelectValue>
                        <SelectContent>{tasks.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Functional Area</label>
                     <Select value={selectedFunctionalArea} onValueChange={setSelectedFunctionalArea}>
                        <SelectTrigger><SelectValue /></SelectValue>
                        <SelectContent>{functionalAreas.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search prompts..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
            <TabsContent value="common-prompts" className="mt-0">
                {renderPromptGrid(filteredPrompts, "No prompts match your criteria.")}
            </TabsContent>
            <TabsContent value="favorite-prompts" className="mt-0">
                {renderPromptGrid(favoritedPrompts, "You haven't favorited any prompts yet.")}
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
