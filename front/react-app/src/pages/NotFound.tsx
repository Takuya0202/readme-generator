import { Link } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center space-y-6 px-4">
        {/* 404アイコン */}
        <div className="flex justify-center">
          <FileQuestion className="w-24 h-24 text-blue-600 opacity-80" />
        </div>

        {/* タイトル */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            ページが見つかりません
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            お探しのページは移動または削除された可能性があります。
            <br />
            URLが正しいかご確認ください。
          </p>
        </div>

        {/* ボタン */}
        <div className="pt-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>プロジェクト一覧に戻る</span>
          </Link>
        </div>

        {/* 追加の情報 */}
        <div className="pt-8 text-sm text-gray-400">
          <p>readme generator</p>
        </div>
      </div>
    </div>
  );
}
