"use client";
import { useEffect, useState } from "react";
import NavSidebar from "@/components/ui/NavSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  useEffect(() => {
    // Chỉ chạy trên client
    const saved = window.localStorage.getItem('theme');
    setTheme(saved === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', next);
      return next;
    });
  };

  // Chưa xác định theme thì không render gì (hoặc render loading)
  if (!theme) return null;

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen flex bg-white dark:bg-[#18181b]">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-[#23232a] text-black dark:text-white flex flex-col py-6 px-4 min-h-screen shadow-lg">
          <div className="text-2xl font-bold mb-8 tracking-widest">🎬 TRCON CINEMA</div>
          <NavSidebar />
          <div className="mt-8 text-xs text-gray-400 dark:text-gray-400">Help & Support</div>
          <button
            className="mt-8 px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </aside>
        <main className="flex-1 flex flex-col">
          {/* Header sẽ được truyền từ page con */}
          {/* Nội dung chính */}
          {children}
        </main>
      </div>
    </div>
  );
}
