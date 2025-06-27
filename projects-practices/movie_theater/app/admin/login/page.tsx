"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem("token", token);
      router.push("/admin/movie");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="token">Token:</label>
        <input
          id="token"
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "12px 0" }}
          placeholder="Paste your token here"
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Đăng nhập</button>
      </form>
    </div>
  );
} 