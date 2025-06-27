'use client';
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-2xl text-blue-700 tracking-wide">🎬 Movie Admin</div>
        <div className="flex gap-6">
          <Link href="/admin/movie" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Phim</Link>
          <Link href="/admin/actor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Diễn viên</Link>
          <Link href="/admin/gerne" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Thể loại</Link>
          <Link href="/admin/version" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Phiên bản</Link>
        </div>
      </div>
    </nav>
  );
}