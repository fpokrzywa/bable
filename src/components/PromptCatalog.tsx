
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Heart, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from './ui/badge';

const initialPrompts = [
  {
    id: 1,
    assistant: 'ODIN',
    title: 'ServiceNow Assistant v4',
    description: 'This is my description for this prompt',
    tags: ['marketing', 'creative'],
    isFavorited: false,
    task: 'Content Creation',
    functionalArea: 'Marketing',
  },
  {
    id: 2,
    assistant: 'ODIN',
    title: 'Brainstorm ideas for a new marketing campaign.',
    description: 'Generate creative ideas and strategies for an upcoming marketing campaign.',
    tags: ['Marketing', 'Brainstorming'],
    isFavorited: true,
    task: 'Brainstorming',
    functionalArea: 'Marketing',
  },
  {
    id: 3,
    assistant: 'ODIN',
    title: 'Write a short story about a futuristic city.',
    description: 'Create a captivating short story set in a technologically advanced, futuristic urban environment.',
    tags: ['Creative Writing', 'Fiction'],
    isFavorited: false,
    task: 'Content Creation',
    functionalArea: 'Creative',
  },
  {
    id: 4,
    assistant: 'ODIN',
    title: 'Explain the concept of quantum entanglement simply.',
    description: 'Provide a clear and easy-to-understand explanation of quantum entanglement for a general audience.',
    tags: ['Science', 'Education'],
    isFavorited: false,
    task: 'Explanation',
    functionalArea: 'Education',
  },
  {
    id: 5,
    assistant: 'ODIN',
    title: 'Summarize the key points of the attached research paper.',
    description: 'Condense the essential information and main findings from the provided research paper.',
    tags: ['Summarization', 'Research', 'Files'],
    isFavorited: false,
    task: 'Summarization',
    functionalArea: 'Research',
  },
  {
    id: 6,
    assistant: 'NOW Assist Guru',
    title: 'Generate a list of interview questions for a software engineer role.',
    description: 'Formulate relevant and insightful interview questions suitable for evaluating candidates for a software engineer position.',
    tags: ['Hiring', 'HR'],
    isFavorited: false,
    task: 'Question Generation',
    functionalArea: 'Human Resources',
  },
];

const assistants = ['All Assistants', 'ODIN', 'NOW Assist Guru', 'Prompt Architect', 'ADEPT Guru', 'NIEA Guru'];
const tasks = ['Select Task...', 'Content Creation', 'Brainstorming', 'Explanation', 'Summarization', 'Question Generation'];
const functionalAreas = ['Select Functional Area...', 'Marketing', 'Creative', 'Education', 'Research', 'Human Resources'];

export function PromptCatalog() {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('All Assistants');
  const [selectedTask, setSelectedTask] = useState('Select Task...');
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState('Select Functional Area...');

  const toggleFavorite = (id: number) => {
    setPrompts(prev => 
        prev.map(p => p.id === id ? {...p, isFavorited: !p.isFavorited} : p)
    );
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const searchMatch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
      const assistantMatch = selectedAssistant === 'All Assistants' || prompt.assistant === selectedAssistant;
      const taskMatch = selectedTask === 'Select Task...' || prompt.task === selectedTask;
      const functionalAreaMatch = selectedFunctionalArea === 'Select Functional Area...' || prompt.functionalArea === selectedFunctionalArea;
      return searchMatch && assistantMatch && taskMatch && functionalAreaMatch;
    });
  }, [prompts, searchTerm, selectedAssistant, selectedTask, selectedFunctionalArea]);

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
      
      <Tabs defaultValue="common-prompts" className="flex-grow flex flex-col">
        <div className='flex justify-between items-center border-b'>
            <TabsList className="bg-transparent p-0">
                <TabsTrigger value="common-prompts" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none">BabelPhish Common Prompts</TabsTrigger>
                <TabsTrigger value="your-prompts" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none">Your Prompts</TabsTrigger>
            </TabsList>
            <Button variant="ghost">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
            </Button>
        </div>

        <TabsContent value="common-prompts" className="flex-grow flex flex-col mt-6">
            <div className="p-4 mb-6">
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

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map(prompt => (
                    <Card key={prompt.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xs font-normal text-muted-foreground">{prompt.assistant}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2" onClick={() => toggleFavorite(prompt.id)}>
                                <Heart className={cn("h-4 w-4", prompt.isFavorited && "fill-primary text-primary")} />
                            </Button>
                        </div>
                        <p className="font-semibold text-sm">{prompt.title}</p>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 pt-0">
                        <CardDescription className="text-xs">{prompt.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </CardFooter>
                    </Card>
                ))}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="your-prompts">
            <div className="flex items-center justify-center h-64">
                <p>Your custom prompts will appear here.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
