"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Boxes,
  LayoutDashboard,
  LogOut,
  Menu,
  MoonStar,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  SunMedium,
  TrendingUp,
  Warehouse,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/dashboard/products",
      label: "Product Management",
      icon: Package,
      exact: false,
    },
    {
      href: "/dashboard/products/new",
      label: "Add Product",
      icon: Plus,
      exact: true,
    },
    {
      href: "/dashboard",
      label: "Categories",
      icon: Boxes,
      exact: false,
    },
    {
      href: "/dashboard",
      label: "Inventory",
      icon: Warehouse,
      exact: false,
    },
    {
      href: "/dashboard",
      label: "Transactions",
      icon: ShoppingBag,
      exact: false,
    },
    {
      href: "/dashboard",
      label: "Reports",
      icon: TrendingUp,
      exact: false,
    },
    {
      href: "/dashboard",
      label: "Settings",
      icon: Settings,
      exact: false,
    },
  ];

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-[#0f1411] text-white" : "bg-[#f6f7f2] text-[#18211a]"}`}>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#e7ebdf] bg-white/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-transform duration-300 ease-out lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "border-white/10 bg-[#171d17]/90" : "border-[#e7ebdf] bg-white/80"}`}
      >
        <div className="rounded-[24px] border border-[#ecece6] bg-gradient-to-br from-[#607456] to-[#5B7E3C] p-4 text-white shadow-[0_10px_30px_rgba(96,116,86,0.25)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold backdrop-blur-sm">
              P
            </div>
            <div>
              <p className="text-lg font-semibold">PUSAKA</p>
              <p className="text-sm text-white/80">Inventory OS</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-[16px] px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-[#607456] to-[#5B7E3C] text-white shadow-[0_10px_30px_rgba(96,116,86,0.18)]"
                    : darkMode
                      ? "text-[#d7dfd3] hover:bg-white/10"
                      : "text-[#4b5563] hover:bg-[#f5f7f2]"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${active ? "bg-white/15" : darkMode ? "bg-white/10" : "bg-[#edf3e8]"}`}>
                  <Icon size={18} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={`mt-4 rounded-[20px] border p-3 ${darkMode ? "border-white/10 bg-white/10" : "border-[#ecece6] bg-[#fafaf8]"}`}>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-[14px] bg-[#f4f2eb] px-4 py-3 text-sm font-semibold text-[#2c2c2c] transition hover:bg-[#eae7de]"
          >
            <LogOut size={16} />
            Sign out
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1">
        <header className={`sticky top-0 z-30 border-b px-4 py-4 sm:px-6 lg:px-8 ${darkMode ? "border-white/10 bg-[#121712]/90 backdrop-blur-xl" : "border-[#ecece6] bg-white/80 backdrop-blur-xl"}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition lg:hidden ${darkMode ? "border-white/10 bg-white/10" : "border-[#ecece6] bg-[#f8f8f5]"}`}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-[#2c2c2c]"}`}>Operations Overview</p>
                <p className={`text-sm ${darkMode ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Inventory management system</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <label className={`hidden items-center gap-2 rounded-[16px] border px-3 py-2 text-sm sm:flex ${darkMode ? "border-white/10 bg-white/10 text-[#d7dfd3]" : "border-[#ecece6] bg-[#fafaf8] text-[#6b7280]"}`}>
                <Search size={16} />
                <input
                  className={`w-36 border-0 bg-transparent outline-none sm:w-44 ${darkMode ? "text-white placeholder:text-[#8f9a8a]" : "placeholder:text-[#9ca3af]"}`}
                  placeholder="Search"
                  aria-label="Search"
                />
              </label>
              <button className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${darkMode ? "border-white/10 bg-white/10 text-[#d7dfd3]" : "border-[#ecece6] bg-[#fafaf8] text-[#2c2c2c]"}`} aria-label="Notifications">
                <Bell size={18} />
              </button>
              <button
                onClick={() => setDarkMode((value) => !value)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${darkMode ? "border-white/10 bg-white/10 text-[#d7dfd3]" : "border-[#ecece6] bg-[#fafaf8] text-[#2c2c2c]"}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
              </button>
              <div className={`flex items-center gap-3 rounded-[16px] border px-3 py-2 ${darkMode ? "border-white/10 bg-white/10" : "border-[#ecece6] bg-[#fafaf8]"}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#607456] to-[#5B7E3C] font-semibold text-white">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-[#2c2c2c]"}`}>Administrator</p>
                  <p className={`text-xs ${darkMode ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
