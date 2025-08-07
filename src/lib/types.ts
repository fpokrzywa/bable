

export interface Incident {
  number: string;
  short_description: string;
  priority: string;
  state: string;
  assigned_to: string;
  description: string;
}

export interface Problem {
  number: string;
  short_description: string;
  description: string;
  workaround: string;
  cause: string;
}

export interface Change {
  number: string;
  short_description: string;
  type: string;
  state: string;
  assigned_to: string;
  justification: string;
  implementation_plan: string;
}

export interface Agent {
  agentType: string;
  agentBehavior: string;
}

export interface Widget {
  id: string;
  query: string;
  data: any;
  agent: Agent;
  type: 'incident' | 'generic' | 'problem' | 'change';
  zIndex: number;
  isMinimized: boolean;
  isFavorited: boolean;
  x?: number;
  y?: number;
}

export interface SavedQuery {
  name: string;
  query: string;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}
