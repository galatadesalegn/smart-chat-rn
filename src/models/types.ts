export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface AIRequestPayload {
  model: string;
  max_tokens: number;
  messages: { role: Role; content: string }[];
  system?: string;
}
