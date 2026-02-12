import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface props {
  projectId: string;
  onSuccess?: () => void;
}

export function CreateChat({ projectId, onSuccess }: props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // エラーをクリア
    setError(null);

    if (!message.trim()) {
      setError('メッセージを入力してください');
      return;
    }

    setIsLoading(true);
    try {
      const token = Cookies.get('token');

      // tokenがない場合はログインページへ
      if (!token) {
        toast.error('ログインが必要です');
        navigate('/login');
        return;
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/projects/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      });

      // 認証エラー (401)
      if (res.status === 401) {
        toast.error('ログインが必要です');
        navigate('/login');
        return;
      }

      // バリデーションエラー (422)
      if (res.status === 422) {
        const data = await res.json();
        if (data.status === 'validation' && data.fields?.message) {
          setError(data.fields.message);
        } else {
          toast.error('入力内容を確認してください');
        }
        return;
      }

      if (!res.ok) {
        throw new Error('チャットの作成に失敗しました');
      }

      toast.success('メッセージを送信しました');
      setMessage('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('チャットの作成に失敗しました:', error);
      toast.error('メッセージの送信に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-t border-gray p-6 flex-shrink-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder={
                isLoading
                  ? 'READMEを生成しています...'
                  : 'READMEの修正内容を入力'
              }
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError(null); // 入力時にエラーをクリア
              }}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray focus:ring-blue-500'
              }`}
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>生成しています...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>送信</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
