import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Copy, Check, Bot } from 'lucide-react';
import { useState } from 'react';

interface props {
  content: string;
}

export function AssistantMarkdown({ content }: props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-2 w-full">
      {/* AIアイコン */}
      <div className="bg-[#e5f5ff] rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0">
        <Bot className="text-[#004caf] h-5 w-5" />
      </div>

      {/* メッセージ */}
      <div className="relative bg-white border border-gray rounded-2xl p-6 flex-1 max-w-[1200px]">
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 p-2 hover:bg-gray rounded transition-colors"
          title={copied ? 'コピーしました！' : 'コピー'}
        >
          {copied ? (
            <Check size={20} className="text-green-600" />
          ) : (
            <Copy size={20} className="text-gray-600" />
          )}
        </button>

        <div className="prose prose-lg prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base max-w-none pr-12">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
