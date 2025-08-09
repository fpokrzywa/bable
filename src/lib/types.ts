

export interface Incident {
  id: string;
  sys_id: string;
  number: string;
  short_description: string;
  priority: string;
  state: string;
  assigned_to: string;
  description: string;
}

export interface Problem {
  sys_id: string;
  number: string;
  short_description: string;
  description: string;
  workaround: string;
  cause: string;
}

export interface Change {
  sys_id: string;
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
  isExpanded?: boolean;
}

export interface SavedQuery {
  name: string;
  query: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}


export interface User {
    _id: any;
    userId: string;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    bio?: string;
    avatar?: string;
}
