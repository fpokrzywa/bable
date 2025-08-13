
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

export function PromptCatalog() {
  const [prompts, setPrompts] = useState<DisplayPrompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('All Assistants');
  const [selectedTask, setSelectedTask] = useState('Select Task...');
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState('Select Functional Area...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('common-prompts');


  const fetchPrompts = async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await getPrompts();
        setPrompts(data.map(p => ({ ...p, isFavorited: false })));
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
    setPrompts(prev => 
        prev.map(p => p.id === id ? {...p, isFavorited: !p.isFavorited} : p)
    );
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

  const renderPromptGrid = (promptList: DisplayPrompt[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Button variant="ghost" onClick={fetchPrompts} disabled={loading}>
                <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
                Refresh
            </Button>
        </div>

        <div className="mt-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium">Assistant</label>
                    <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{assistants.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Task</label>
                     <Select value={selectedTask} onValueChange={setSelectedTask}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{tasks.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Functional Area</label>
                     <Select value={selectedFunctionalArea} onValueChange={setSelectedFunctionalArea}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
        
        <TabsContent value="common-prompts" className="flex-grow flex flex-col mt-0">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-destructive">
                  {error}
                </div>
              ) : (
                renderPromptGrid(filteredPrompts)
              )}
            </div>
        </TabsContent>
        <TabsContent value="favorite-prompts" className="flex-grow flex flex-col mt-0">
             <div className="flex-1 overflow-y-auto no-scrollbar">
              {favoritedPrompts.length === 0 ? (
                 <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">You haven't favorited any prompts yet.</p>
                </div>
              ) : (
                renderPromptGrid(favoritedPrompts)
              )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
