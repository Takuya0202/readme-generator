import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormItem } from './components/FormItem';
import { FormItem_int } from './components/FormItem_int';
import { FormItem_any } from './components/FormItem_any';
import Sidebar from './components/Sidebar';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    people: 0,
    period: '',
    stack: '',
    effort: '',
    trouble: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 入力時にエラーをクリア
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const token = import.meta.env.VITE_API_TOKEN;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      // nullableフィールドの処理
      const payload = {
        ...formData,
        effort: formData.effort || null,
        trouble: formData.trouble || null,
      };

      const res = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // バリデーションエラー (422)
      if (res.status === 422) {
        const data = await res.json();
        if (data.status === 'validation' && data.fields) {
          setErrors(data.fields);
          toast.error('入力内容を確認してください');
        } else {
          toast.error('エラーが発生しました');
        }
        return;
      }

      if (!res.ok) {
        throw new Error('プロジェクトの作成に失敗しました');
      }

      const data = await res.json();
      toast.success('プロジェクトを作成しました');

      // プロジェクト詳細ページに遷移
      if (data.id || data.data?.id) {
        navigate(`/projects/${data.id || data.data.id}`);
      }
    } catch (error) {
      console.error('プロジェクトの作成に失敗しました:', error);
      toast.error('プロジェクトの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-2xl font-bold text-center mb-2">
          最小限の入力でREADMEを作成
        </h1>
        <p className="text-center mb-8">
          ハッカソンやチーム制作の成果を、伝わるREADMEに整理します。
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-gray-300 p-8"
        >
          <h2 className="font-bold text-lg mb-6">
            まずは基本情報を入力してください
          </h2>

          <FormItem
            label="アプリ名"
            required
            value={formData.name}
            error={errors.name}
            onChange={(v) => handleChange('name', v)}
          />
          <FormItem
            label="課題"
            required
            textarea
            value={formData.problem}
            error={errors.problem}
            onChange={(v) => handleChange('problem', v)}
          />
          <FormItem_int
            label="チーム人数"
            value={formData.people}
            error={errors.people}
            onChange={(v) => handleChange('people', v)}
          />
          <FormItem
            label="開発期間"
            value={formData.period}
            error={errors.period}
            onChange={(v) => handleChange('period', v)}
          />
          <FormItem
            label="技術スタック"
            value={formData.stack}
            error={errors.stack}
            onChange={(v) => handleChange('stack', v)}
          />

          <hr className="border-t border-gray-200 mb-4" />

          <p className="my-[20px] text-gray-500">任意項目</p>

          <FormItem_any
            label="工夫・改善点"
            textarea
            value={formData.effort}
            error={errors.effort}
            onChange={(v) => handleChange('effort', v)}
          />
          <FormItem_any
            label="苦労した点"
            textarea
            value={formData.trouble}
            error={errors.trouble}
            onChange={(v) => handleChange('trouble', v)}
          />

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>生成しています...</span>
                </>
              ) : (
                <span>READMEを作成</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
