export interface Incident {
  number: string;
  short_description: string;
  priority: string;
  state: string;
  assigned_to: string;
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
  type: 'incident' | 'generic';
}

export interface SavedQuery {
  name: string;
  query: string;
}
