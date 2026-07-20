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
  X,
} from "lucide-react";

const menuGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/dashboard/products", label: "Products", icon: Package, exact: false },
      { href: "/dashboard/products/new", label: "Add Product", icon: Plus, exact: true },
      { href: "/dashboard/categories", label: "Categories", icon: Boxes, exact: false },
      { href: "/dashboard/inventory", label: "Inventory", icon: Warehouse, exact: false },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/dashboard/transactions", label: "Transactions", icon: ShoppingBag, exact: false },
      { href: "/dashboard/reports", label: "Reports", icon: TrendingUp, exact: false },
      { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const dm = darkMode;

  return (
    <div className={`flex min-h-screen ${dm ? "bg-[#0d1210]" : "bg-[#f0f2ed]"}`}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${dm ? "bg-[#141a13] border-r border-white/[0.07]" : "bg-white border-r border-[#e5e8df]"}`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#607456] to-[#4c6640] text-xs font-bold text-white shadow">
              P
            </div>
            <div>
              <p className={`text-sm font-bold tracking-wide ${dm ? "text-white" : "text-[#18211a]"}`}>PUSAKA</p>
              <p className={`text-[10px] font-medium ${dm ? "text-white/35" : "text-[#aab8a2]"}`}>Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`flex h-6 w-6 items-center justify-center rounded-lg lg:hidden ${dm ? "text-white/40 hover:bg-white/10" : "text-[#aab8a2] hover:bg-[#f0f3ec]"}`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {menuGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className={`mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${dm ? "text-white/25" : "text-[#b8c4b0]"}`}>
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    (item.exact && pathname === item.href) ||
                    (!item.exact && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150 ${
                        active
                          ? dm
                            ? "bg-[#607456]/20 text-[#9dbb8c]"
                            : "bg-[#edf3e8] text-[#3d5c35]"
                          : dm
                            ? "text-white/50 hover:bg-white/[0.07] hover:text-white"
                            : "text-[#637060] hover:bg-[#f4f6f1] hover:text-[#18211a]"
                      }`}
                    >
                      <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? dm ? "bg-[#607456]/30 text-[#9dbb8c]" : "bg-[#d6e8cc] text-[#3d5c35]"
                          : dm ? "bg-white/[0.07]" : "bg-[#f4f6f1]"
                      }`}>
                        <Icon size={15} />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div className={`border-t px-3 py-3 ${dm ? "border-white/[0.07]" : "border-[#e5e8df]"}`}>
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all ${
              dm
                ? "text-white/35 hover:bg-white/[0.07] hover:text-white/70"
                : "text-[#9caa94] hover:bg-[#f4f6f1] hover:text-[#18211a]"
            }`}
          >
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${dm ? "bg-white/[0.07]" : "bg-[#f4f6f1]"}`}>
              <LogOut size={15} />
            </span>
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top bar */}
        <header className={`sticky top-0 z-30 border-b ${
          dm ? "border-white/[0.07] bg-[#0d1210]/80 backdrop-blur-xl" : "border-[#e5e8df] bg-white/80 backdrop-blur-xl"
        }`}>
          <div className="flex h-[52px] items-center gap-3 px-4 sm:px-6">

            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition lg:hidden ${
                dm ? "text-white/50 hover:bg-white/10" : "text-[#637060] hover:bg-[#f0f3ec]"
              }`}
              aria-label="Open menu"
            >
              <Menu size={17} />
            </button>

            {/* Page label */}
            <p className={`text-sm font-semibold ${dm ? "text-white" : "text-[#18211a]"}`}>
              Dashboard
            </p>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">

              {/* Search */}
              <label className={`hidden items-center gap-2 rounded-lg border px-2.5 py-1.5 sm:flex ${
                dm ? "border-white/10 bg-white/[0.06] text-white/40" : "border-[#e5e8df] bg-[#f7f8f5] text-[#b0bba8]"
              }`}>
                <Search size={13} />
                <input
                  className={`w-28 border-0 bg-transparent text-sm outline-none lg:w-36 ${
                    dm ? "text-white placeholder:text-white/25" : "text-[#18211a] placeholder:text-[#b8c4b0]"
                  }`}
                  placeholder="Search…"
                  aria-label="Search"
                />
              </label>

              {/* Bell */}
              <button
                className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  dm ? "text-white/45 hover:bg-white/10" : "text-[#637060] hover:bg-[#f0f3ec]"
                }`}
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#C7782D]" />
              </button>

              {/* Dark mode */}
              <button
                onClick={() => setDarkMode((v) => !v)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  dm ? "text-white/45 hover:bg-white/10" : "text-[#637060] hover:bg-[#f0f3ec]"
                }`}
                aria-label="Toggle theme"
              >
                {dm ? <SunMedium size={16} /> : <MoonStar size={16} />}
              </button>

              {/* Separator */}
              <div className={`h-5 w-px mx-0.5 ${dm ? "bg-white/10" : "bg-[#e5e8df]"}`} />

              {/* User */}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#607456] to-[#4c6640] text-xs font-bold text-white">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-semibold leading-none ${dm ? "text-white" : "text-[#18211a]"}`}>
                    Administrator
                  </p>
                  <p className={`mt-0.5 text-[11px] ${dm ? "text-white/35" : "text-[#aab8a2]"}`}>
                    {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
