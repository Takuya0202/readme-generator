import { useState } from "react";
import { FormItem } from "./components/FormItem";
import { FormItem_int } from "./components/FormItem_int";
import { FormItem_any } from "./components/FormItem_any";
import { SidebarItem } from "./components/SidebarItem";
import Logo from "./assets/logo.png";
import File from "./assets/file.png";
import "./index.css";

export default function App() {
  const [formData, setFormData] = useState({
    appName: "",
    problem: "",
    solution: "",
    members: 0,
    period: "",
    techStack: "",
    improvement: "",
    difficulty: "",
  });

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = import.meta.env.VITE_API_TOKEN;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${baseUrl}/generate-readme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("APIエラー");
      }

      const data = await res.json();

      // APIが { readme: "生成文章" } で返す想定
      setResult(data.readme);

    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
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
          <SidebarItem title="天気アプリのREADME" icon={File} />
          <SidebarItem title="寄付支援アプリのREADME" icon={File} />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-2xl font-bold text-center mb-2">
          最小限の入力でREADMEを作成
        </h1>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-gray-300 p-8">
          <h2 className="font-bold text-lg mb-6">
            まずは基本情報を入力してください
          </h2>

          <FormItem
            label="アプリ名"
            onChange={(v) => handleChange("appName", v)}
          />
          <FormItem
            label="課題"
            textarea
            onChange={(v) => handleChange("problem", v)}
          />
          <FormItem
            label="解消方法"
            textarea
            onChange={(v) => handleChange("solution", v)}
          />
          <FormItem_int
            label="人数"
            onChange={(v) => handleChange("members", Number(v))}
          />
          <FormItem
            label="期間"
            onChange={(v) => handleChange("period", v)}
          />
          <FormItem
            label="技術スタック"
            onChange={(v) => handleChange("techStack", v)}
          />

          <hr className="border-t border-gray-200 my-6" />

          <FormItem_any
            label="工夫した点"
            textarea
            onChange={(v) => handleChange("improvement", v)}
          />
          <FormItem_any
            label="苦労した点"
            textarea
            onChange={(v) => handleChange("difficulty", v)}
          />

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "生成中..." : "READMEを作成"}
            </button>
          </div>
        </div>

        {/* 結果表示 */}
        {result && (
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-xl">
            <h2 className="text-xl font-bold mb-4">生成結果</h2>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
