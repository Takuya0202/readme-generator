import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupRequest } from '../lib/api';
import Cookies from 'js-cookie';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await signupRequest(email, password);
      const data = response.data;

      // 成功時(200 OK)
      if (data.status === 'success' && data.token) {
        Cookies.set('token', data.token);
        navigate('/projects');
        return;
      }

      // 何らかのエラーメッセージがある場合
      if (data.message) {
        setErrorMessage(data.message);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response: {
            status: number;
            data: {
              status?: string;
              message?: string;
              field?: Record<string, string>;
            };
          };
        };
        const { status, data } = axiosError.response;

        if (status === 400) {
          // エラー時
          setErrorMessage(data.message || 'ユーザー登録に失敗しました');
        } else if (status === 422) {
          // バリデーションエラー時
          if (data.field && typeof data.field === 'object') {
            // 最初のフィールドエラーを表示
            const errors = Object.values(data.field);
            if (errors.length > 0) {
              setErrorMessage(String(errors[0]));
            } else {
              setErrorMessage('入力内容に問題があります');
            }
          } else {
            setErrorMessage('入力内容に問題があります');
          }
        } else {
          setErrorMessage('サーバーエラーが発生しました');
        }
      } else {
        setErrorMessage('通信エラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">新規登録</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64 disabled:opacity-50"
      >
        {loading ? '登録中...' : '登録'}
      </button>

      <p className="text-sm text-gray-600 mt-2">
        既にアカウントをお持ちの方は{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          こちらからログイン
        </Link>
      </p>
    </div>
  );
}
