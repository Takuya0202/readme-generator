export interface Chat {
  id: number;
  role: 'user' | 'assistant';
  format: 'text' | 'markdown';
  content: string;
}

export interface ChatsResponse {
  data: Chat[];
}
