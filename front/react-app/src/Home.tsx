import { useState } from 'react';
import { FormItem } from './components/FormItem';
import { FormItem_int } from './components/FormItem_int';
import { FormItem_any } from './components/FormItem_any';
import { SidebarItem } from './components/SidebarItem';
import Logo from './assets/logo.png';
import File from './assets/file.png';
import './index.css';

export default function App() {
  const [formData, setFormData] = useState({
    appName: '',
    problem: '',
    solution: '',
    members: 0,
    period: '',
    techStack: '',
    improvement: '',
    difficulty: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  // プロジェクト一覧を取得（GET /api/projects）
  const fetchProjects = async () => {
    setSidebarLoading(true);
    setSidebarError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: "application/json",
        },
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("プロジェクト一覧APIがJSONを返していません");
      }

      const data = Array.isArray(json.data) ? json.data : [];
      setProjects(data);
    } catch (e: any) {
      setSidebarError(e.message ?? "プロジェクト一覧の取得に失敗しました");
    } finally {
      setSidebarLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // フォーム送信（POST /api/projects）→ 成功したら一覧を再取得
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 既存の FormItem コンポーネントを壊さないため、DOM から値を拾う
    const appNameInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="例：天気予報アプリ"]'
    );
    const problemTextarea = document.querySelector<HTMLTextAreaElement>(
      'textarea[placeholder="どんな課題を解決しますか？"]'
    );
    const solutionTextarea = document.querySelector<HTMLTextAreaElement>(
      'textarea[placeholder="どのように課題を解決しますか？"]'
    );
    const membersInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="例：3"]'
    );
    const periodInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="例：2週間"]'
    );
    const techStackInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="例：React, TypeScript, Node.js"]'
    );
    const improvementsTextarea = document.querySelector<HTMLTextAreaElement>(
      'textarea[placeholder="どんな工夫や改善をしましたか？"]'
    );
    const difficultiesTextarea = document.querySelector<HTMLTextAreaElement>(
      'textarea[placeholder="どんな困難があり、どう乗り越えましたか？"]'
    );

    const payload = {
      name: appNameInput?.value ?? "",
      problem: problemTextarea?.value ?? "",
      solution: solutionTextarea?.value ?? "",
      membersCount: membersInput?.value ? Number(membersInput.value) : null,
      period: periodInput?.value ?? "",
      techStack: techStackInput?.value ?? "",
      improvements: improvementsTextarea?.value ?? "",
      difficulties: difficultiesTextarea?.value ?? "",
    };

    try {
      setLoading(true);

      const token = import.meta.env.VITE_API_TOKEN;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${baseUrl}/generate-readme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error('APIエラー');
      }

      const data = await res.json();

      // APIが { readme: "生成文章" } で返す想定
      setResult(data.readme);
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
        <div className="flex items-center">
          <img src={Logo} alt="" className="h-[60px]" />
          <div className="mx-[8px] text-[18px]">readme generator</div>
        </div>

        <button className="w-full mb-6 bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700">
          ＋ 新しいチャット
        </button>

        <hr className="border-t border-gray-200 mb-4" />

        <div className="text-sm text-gray-600 space-y-2">
          {sidebarLoading && (
            <div className="text-xs text-gray-400">読み込み中...</div>
          )}
          {sidebarError && (
            <div className="text-xs text-red-500 break-words">
              {sidebarError}
            </div>
          )}
          {!sidebarLoading && !sidebarError && projects.length === 0 && (
            <div className="text-xs text-gray-400">
              まだプロジェクトがありません
            </div>
          )}
          {projects.map((p) => (
            <SidebarItem key={p.id} title={p.name} icon={File} />
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-2xl font-bold text-center mb-2">
          最小限の入力でREADMEを作成
        </h1>
        <p className="text-center mb-8">
          ハッカソンやチーム制作の成果を、伝わるREADMEに整理します。
        </p>

        {/* フォーム全体を <form> で囲む */}
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-gray-300 p-8"
        >
          <h2 className="font-bold text-lg mb-6">
            まずは基本情報を入力してください
          </h2>

          <FormItem
            label="アプリ名"
            onChange={(v) => handleChange('appName', v)}
          />
          <FormItem
            label="課題"
            required
            textarea
            onChange={(v) => handleChange('problem', v)}
          />
          <FormItem
            label="解消方法"
            required
            textarea
            onChange={(v) => handleChange('solution', v)}
          />
          <FormItem_int
            label="人数"
            onChange={(v) => handleChange('members', Number(v))}
          />
          <FormItem label="期間" onChange={(v) => handleChange('period', v)} />
          <FormItem
            label="技術スタック"
            onChange={(v) => handleChange('techStack', v)}
          />

          <hr className="border-t border-gray-200 mb-4" />

          <p className="my-[20px] text-gray-500">任意項目</p>

          <FormItem_any
            label="解消方法"
            required
            textarea
            onChange={(v) => handleChange('improvement', v)}
          />
          <FormItem_any
            label="苦労した点"
            required
            textarea
            onChange={(v) => handleChange('difficulty', v)}
          />

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? '生成中...' : 'READMEを作成'}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm break-words">
              {error}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}