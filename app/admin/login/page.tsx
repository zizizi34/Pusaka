"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Login gagal. Silakan coba lagi.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f2ed] px-4 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-[#e5e8df] bg-white p-8 shadow-[0_16px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.18em] text-[#607456]"
        >
          PUSAKA
        </Link>
        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3e8] text-[#3d5c35]">
          <LockKeyhole size={22} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-[#18211a]">
          Login Admin
        </h1>
        <p className="mt-2 text-sm text-[#637060]">
          Masuk untuk mengelola produk dan memperbarui stok.
        </p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-[#374238]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-[#dfe4da] px-4 py-3 text-sm text-[#18211a] outline-none transition focus:border-[#607456] focus:ring-2 focus:ring-[#607456]/15"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#374238]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#dfe4da] px-4 py-3 text-sm text-[#18211a] outline-none transition focus:border-[#607456] focus:ring-2 focus:ring-[#607456]/15"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#607456] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4c6640] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Memeriksa..." : "Masuk ke Admin"}
          </button>
        </form>
      </div>
    </main>
  );
}
