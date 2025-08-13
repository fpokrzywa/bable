
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Heart, RefreshCw, Zap, Bot, Box } from 'lucide-react';
import Image from 'next/image';

const assistants = [
  {
    name: 'ODIN',
    description: 'You are a helpful assistant named ODIN, you are a meta-agent....',
    version: 'gpt-4.1',
    icon: 'https://placehold.co/40x40/000000/FFFFFF/png?text=O',
    iconBg: 'bg-black',
  },
  {
    name: 'Prompt Architect',
    description: 'You are a Prompt Architect AI. Your job is to write optimized system prompts and relevant few-shot e...',
    version: 'gpt-4.1',
    icon: <Zap className="text-green-500" />,
    iconBg: 'bg-green-100',
  },
  {
    name: 'ADEPT Guru',
    description: 'Purpose ADEPT Guru is a purpose-built GPT designed to support professionals in the successful delive...',
    version: 'gpt-4.1',
    icon: <Box className="text-blue-500" />,
    iconBg: 'bg-blue-100',
  },
  {
    name: 'NIEA Guru',
    description: 'Persona: You are a highly knowledgeable and helpful ServiceNow Expert AI Assistant. Your primary are...',
    version: 'gpt-4.1',
    icon: <Box className="text-sky-500" />,
    iconBg: 'bg-sky-100',
  },
  {
    name: 'NOW Assist Guru',
    description: 'You are a seasoned expert in ServiceNow development, architecture, and integration with OpenAI techn...',
    version: 'gpt-4.1',
    icon: <Bot className="text-pink-500" />,
    iconBg: 'bg-pink-100',
  },
];


export function AIStore() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssistants = assistants.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-full flex flex-col p-6 bg-background text-foreground">
      <header className="mb-6">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Welcome to the AI Storefront</h1>
                <p className="text-muted-foreground">Each Assistant is created to help you do a specific set of tasks. Get answers to your questions, brainstorm ideas, create new content, and more!</p>
            </div>
            <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
            </Button>
        </div>
      </header>
      
      <div className="flex items-center gap-4 mb-6">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
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
        <span className="text-sm text-muted-foreground">{filteredAssistants.length} assistants</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssistants.map(assistant => (
            <Card key={assistant.name} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${assistant.iconBg}`}>
                      {typeof assistant.icon === 'string' ? 
                        <Image src={assistant.icon} alt={assistant.name} width={24} height={24} /> :
                        assistant.icon
                      }
                    </div>
                    <CardTitle className="text-base font-semibold">{assistant.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{assistant.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="text-xs bg-gray-100 dark:bg-gray-800 text-muted-foreground rounded-full px-2 py-0.5">
                  {assistant.version}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
