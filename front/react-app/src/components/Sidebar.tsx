import { SidebarItem } from "./SidebarItem";
import Logo from '../assets/logo.png';
import { useEffect, useState } from "react";
import type { Project, ProjectsResponse } from "../../types/projects";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [projects , setProjects ] = useState<Project[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_API_TOKEN;
  const nav = useNavigate();
  useEffect(() => {
    const getProjects = async () => {
        try {
            const response = await fetch(`${baseUrl}/projects` , {
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
              }
            });
            if (response.status === 401) {
              // ログイン画面にリダイレクトさせる。
            }
            const data : ProjectsResponse = await response.json();
            setProjects(data.data);
        } catch (error) {
            console.error('プロジェクトの取得に失敗しました:', error);
        }
    }
    getProjects();
}, [])
  return (
    <aside className="w-64 bg-white border-r px-4 py-6">
    <div className="flex items-center">
      <img src={Logo} alt="" className="h-[60px]" />
      <div className="mx-[8px] text-[18px]">readme generator</div>
    </div>

    <button className="w-full mb-6 bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
    onClick={() => nav('/projects')}>
      + 新しいプロジェクト
    </button>

    <hr className="border-t border-gray-200 mb-4" />

    <div className="text-sm text-gray-600 space-y-2">
      {projects.map((project) => (
        <SidebarItem
          key={project.id}
          project={project}
          />
      ))}
    </div>
  </aside>
  )
}