"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  TrendingUp,
  Warehouse,
  X,
} from "lucide-react";

const menuGroups = [
  {
    label: "Menu utama",
    items: [
      { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Pengelolaan",
    items: [
      { href: "/dashboard/products", label: "Produk", icon: Package, exact: false },
      { href: "/dashboard/products/new", label: "Tambah produk", icon: Plus, exact: true },
      { href: "/dashboard/categories", label: "Kategori", icon: Boxes, exact: false },
      { href: "/dashboard/inventory", label: "Persediaan", icon: Warehouse, exact: false },
    ],
  },
  {
    label: "Toko",
    items: [
      { href: "/dashboard/transactions", label: "Transaksi", icon: ShoppingBag, exact: false },
      { href: "/dashboard/reports", label: "Laporan", icon: TrendingUp, exact: false },
      { href: "/dashboard/settings", label: "Pengaturan", icon: Settings, exact: false },
    ],
  },
];

export default function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const menuItems = menuGroups.flatMap((group) => group.items);
  const currentPage =
    menuItems.find((item) => pathname === item.href) ??
    menuItems.find((item) => pathname.startsWith(`${item.href}/`));
  const pageTitle = currentPage?.label ?? "Ringkasan";

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#202820]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          className="fixed inset-0 z-40 bg-[#18211a]/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[#e8ebe5] bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-[#edf0eb] px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#607456] text-lg font-bold text-white shadow-sm">
              P
            </span>
            <span>
              <span className="block text-sm font-bold tracking-[0.12em] text-[#202820]">
                PUSAKA
              </span>
              <span className="mt-0.5 block text-xs text-[#8a9387]">
                Panel pengelola
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#768073] hover:bg-[#f4f6f2] lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Navigasi admin" className="flex-1 overflow-y-auto px-3 py-6">
          {menuGroups.map((group) => (
            <div key={group.label} className="mb-7 last:mb-0">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a0a89d]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? pathname === item.href
                    : pathname === item.href ||
                      (pathname.startsWith(`${item.href}/`) &&
                        pathname !== "/dashboard/products/new");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                        active
                          ? "bg-[#edf3e8] text-[#3d5c35]"
                          : "text-[#657064] hover:bg-[#f6f7f4] hover:text-[#263126]"
                      }`}
                    >
                      <Icon
                        size={17}
                        strokeWidth={active ? 2 : 1.8}
                        className={active ? "text-[#55734b]" : "text-[#879184]"}
                      />
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight size={14} className="text-[#82947a]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#edf0eb] p-3">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#778174] transition-colors hover:bg-[#fbf2ef] hover:text-[#a14f3d]"
            >
              <LogOut size={17} />
              Keluar dari akun
            </button>
          </form>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center border-b border-[#e8ebe5] bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg text-[#657064] hover:bg-[#f4f6f2] lg:hidden"
            aria-label="Buka menu"
          >
            <Menu size={19} />
          </button>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#929b8f]">
              PUSAKA / ADMIN
            </p>
            <h1 className="mt-0.5 text-base font-semibold text-[#202820]">
              {pageTitle}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3 border-l border-[#edf0eb] pl-3 sm:pl-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3e8] text-xs font-bold text-[#4c6640]">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold leading-5 text-[#303a30]">
                Administrator
              </p>
              <p className="text-[11px] leading-4 text-[#899286]">
                Akses pengelola
              </p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
