

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
  type: 'incident' | 'generic' | 'problem' | 'change' | 'change_request';
  zIndex: number;
  isMinimized: boolean;
  isFavorited: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
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
    userId: string;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    bio?: string;
    avatar?: string;
    roles?: string[];
    active: boolean; // Changed to boolean for consistency
    password?: string;
    Company?: string;
    company_id?: {
        $oid: string;
    } | string;
    _id?: any;
}

export interface Workspace {
    workspaceId: string;
    userId: string;
    workspace_name: string;
    workspace_data: string; // JSON string of widgets' content
    cordinates?: string; // JSON string of widgets' layout info
    active?: boolean;
    last_accessed?: string;
}

export interface Prompt {
    _id: {
        $oid: string;
    };
    id: string;
    active: string;
    title: string;
    description: string;
    functionalArea: string;
    task: string;
    tags: string[];
    assistant: string;
    user: string;
    system: string;
    owner: string;
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: string;
  addedDate: string;
}

export interface Company {
  _id?: {
    $oid: string;
  };
  id: string;
  company_name: string;
  chat_bot_name: string;
  "OpenAI API Key": string;
  user_count: number;
  token_allotment: number;
  max_workspace_sessions: number;
  demo_environment: boolean;
  llm_config: string;
}
