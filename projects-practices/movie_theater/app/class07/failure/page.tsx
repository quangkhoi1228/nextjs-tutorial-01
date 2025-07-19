'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentFailurePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại!</h1>
      <p>Bạn sẽ được chuyển về trang chủ sau 5 giây...</p>
    </div>
  );
}