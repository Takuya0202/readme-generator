import { FormItem } from "../components/FormItem";
import { FormItem_any } from "../components/FormItem_any";
import { FormItem_int } from "../components/FormItem_int";
import "../index.css";
import Logo from '../assets/logo.png'
import File from '../assets/file.png'
import { SidebarItem } from "../components/SidebarItem";



export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
        <div className="flex items-center">
          <img src={Logo} alt="" className="h-[60px]"/>
          <div className="mx-[8px] text-[18px]">readme generator</div>
        </div>

        <button className="w-full mb-6 bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700">
          ＋ 新しいチャット
        </button>

        <hr className="border-t border-gray-200 mb-4" />

        <div className="text-sm text-gray-600 space-y-2">
          <SidebarItem title="天気アプリのREADME" icon={File} />
          <SidebarItem title="寄付支援アプリのREADME" icon={File} />
          <SidebarItem title="天気アプリのREADME" icon={File} />
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

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-gray-300 p-8">
          <h2 className="font-bold text-lg mb-6">
            まずは基本情報を入力してください
          </h2>

          <FormItem label="アプリ名" required placeholder="例：天気予報アプリ" />
          <FormItem label="課題" required textarea placeholder="どんな課題を解決しますか？" />
          <FormItem label="解消方法" required textarea placeholder="どのように課題を解決しますか？" />
          <FormItem_int label="人数" required placeholder="例：3" />
          <FormItem label="期間" required placeholder="例：2週間" />
          <FormItem label="技術スタック" required placeholder="例：React, TypeScript, Node.js" />

          <hr className="border-t border-gray-200 mb-4" />

          <p className="my-[20px] text-gray-500">任意項目</p>

          <FormItem_any label="解消方法" required textarea placeholder="どんな工夫や改善をしましたか？" />
          <FormItem_any label="苦労した点" required textarea placeholder="どんな困難があり、どう乗り越えましたか？" />

          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
              READMEを作成
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
