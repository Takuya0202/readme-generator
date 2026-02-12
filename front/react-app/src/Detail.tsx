import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import type { Chat, ChatsResponse } from '../types/chat';
import { UserChat } from './components/chat/user-chat';
import { AssistantChat } from './components/chat/assistant-chat';
import { AssistantMarkdown } from './components/chat/assistant-markdown';

export default function Detail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    const getContent = async () => {
      try {
        const token = import.meta.env.VITE_API_TOKEN;
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/projects/${projectId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data: ChatsResponse = await res.json();
        setChats(data.data);
      } catch (error) {
        console.error('プロジェクトの取得に失敗しました:', error);
      }
    };
    getContent();
  }, [projectId]);
  return (
    <main className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col gap-4 p-10 flex-1 overflow-y-auto">
        {chats.map((chat) => {
          switch (chat.role) {
            case 'user':
              return (
                <div key={chat.id} className="flex justify-end">
                  <UserChat content={chat.content} />
                </div>
              );
            case 'assistant':
              if (chat.format === 'text') {
                return (
                  <div key={chat.id} className="flex justify-start">
                    <AssistantChat content={chat.content} />
                  </div>
                );
              }
              else {
                return (
                  <div className='flex justify-start' key={chat.id}>
                    <AssistantMarkdown
                     content={chat.content}
                      />
                  </div>
                )
              }
          }
        })}
      </div>
    </main>
  );
}
