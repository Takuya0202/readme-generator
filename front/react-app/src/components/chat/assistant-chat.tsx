import { Bot } from 'lucide-react';

interface props {
  content: string;
}

export function AssistantChat({ content }: props) {
  return (
    <div className="flex items-start gap-2">
      {/* aiあいこん */}
      <div className="bg-[#e5f5ff] rounded-full flex items-center justify-center w-12 h-12">
        <Bot className="text-[#004caf] h-5 w-5" />
      </div>

      {/* メッセージ */}
      <div className="p-6 bg-white rounded-2xl border border-gray max-w-[1200px]">
        <p className="text-black text-[18px]">{content}</p>
      </div>
    </div>
  );
}
