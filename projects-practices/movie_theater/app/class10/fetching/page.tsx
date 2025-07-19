"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DeepModalButton from "../modal/DeepModalButton";
import { DemoButton } from "../modal/page";

type User = { id: string; name: string; email: string };
const fetcher = (url: string): Promise<User[]> => fetch(url).then((res) => res.json());

// Fetch thường (không cache, không tự refetch)
function UserListBasic() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/class10/fetching/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((d) => setData(d))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Đang tải (fetch thường)...</div>;
  if (error) return <div className="p-8 text-red-600">Lỗi khi tải dữ liệu (fetch thường)!</div>;
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Danh sách User (fetch thường)</h2>
      <ul className="space-y-2">
        {data && data.map((user: User) => (
          <li key={user.id} className="p-3 rounded bg-gray-50 border flex flex-col">
            <span className="font-semibold text-gray-800">{user.name}</span>
            <span className="text-gray-600 text-sm">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
// auto use loading or error khong can phai khai bao state
// Fetch với SWR (có cache, tự động refetch, revalidation)
function UserListSWR() {
  const { data, error, isLoading } = useSWR<User[]>("/class10/fetching/users", fetcher);

  if (isLoading) return <div className="p-8">Đang tải (SWR)...</div>;
  if (error) return <div className="p-8 text-red-600">Lỗi khi tải dữ liệu (SWR)!</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Danh sách User (SWR)</h2>
      <ul className="space-y-2">
        {data && data.map((user: User) => (
          <li key={user.id} className="p-3 rounded bg-gray-50 border flex flex-col">
            <span className="font-semibold text-gray-800">{user.name}</span>
            <span className="text-gray-600 text-sm">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 flex justify-center py-6">
        <DemoButton />
      </div>
      <div>
        <UserListBasic />
        {/* <UserListBasic /> */}
      </div>
      <div>
        <UserListSWR />
        {/* <UserListSWR /> */}
      </div>
      <div className="md:col-span-2 p-8 max-w-3xl mx-auto">
        {/* ... hướng dẫn ... */}
      </div>
    </div>
  );
} 