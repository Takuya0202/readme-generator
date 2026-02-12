import { SidebarItem } from './SidebarItem';
import Logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import type { Project, ProjectsResponse } from '../../types/projects';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = Cookies.get('token');

        // tokenがない場合はログインページへ
        if (!token) {
          nav('/login');
          return;
        }

        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/projects`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          nav('/login');
          return;
        }
        const data: ProjectsResponse = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error('プロジェクトの取得に失敗しました:', error);
      }
    };
    getProjects();
  }, [nav]);

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Cookies.remove('token');
        toast.success('ログアウトしました');
        nav('/login');
      } else {
        toast.error('ログアウトに失敗しました');
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
      toast.error('ログアウトに失敗しました');
    }
  };

  return (
    <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col h-full">
      <div>
        <div className="flex items-center">
          <img src={Logo} alt="" className="h-[60px]" />
          <div className="mx-[8px] text-[18px]">readme generator</div>
        </div>

        <button
          className="w-full mb-6 bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
          onClick={() => nav('/projects')}
        >
          + 新しいプロジェクト
        </button>

        <hr className="border-t border-gray-200 mb-4" />

        <div className="text-sm text-gray-600 space-y-2">
          {projects.map((project) => (
            <SidebarItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 text-gray-700 rounded-lg py-2 font-medium hover:bg-gray-300 transition-colors"
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
