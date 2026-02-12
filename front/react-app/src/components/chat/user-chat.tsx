import { User } from 'lucide-react';

interface props {
  content: string;
}
export function UserChat({ content }: props) {
  return (
    <div className="flex items-start gap-2">
      {/* メッセージ */}
      <div className="bg-light-gray rounded-2xl p-4 max-w-[460px]">
        <p className="text-black text-[18px]">{content}</p>
      </div>
      {/* ユーザーアイコン */}
      <div className="flex items-center justify-center rounded-full bg-gray w-12 h-12">
        <User className="text-gray h-5 w-5" />
      </div>
    </div>
  );
}
