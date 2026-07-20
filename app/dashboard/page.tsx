"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  Download,
  Filter,
  Layers,
  Package,
  Plus,
  Sparkles,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  createdAt: string;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  accent: string;
}

const chartBars = [36, 54, 48, 72, 68, 84, 92];
const quickActions = [
  { title: "Add product", description: "Capture a new SKU", href: "/dashboard/products/new", icon: Plus },
  { title: "Import Excel", description: "Batch update inventory", href: "/dashboard/products", icon: Download },
  { title: "Export report", description: "Share a clean summary", href: "/dashboard", icon: Filter },
  { title: "Generate PDF", description: "Send to suppliers", href: "/dashboard", icon: Sparkles },
];

const activityItems = [
  { title: "Product added", description: "A new item was created and published for review.", time: "12 min ago", icon: Plus },
  { title: "Stock adjusted", description: "Inventory levels were updated for premium packaging.", time: "1 hr ago", icon: Warehouse },
  { title: "Category refined", description: "A new segment was created for seasonal products.", time: "3 hrs ago", icon: Boxes },
];

const insightCards = [
  { title: "Low stock", description: "3 SKUs need replenishment", tone: "warning", icon: AlertTriangle },
  { title: "Best seller", description: "Signature bundle is trending", tone: "success", icon: TrendingUp },
  { title: "Highest inventory", description: "Packaging supplies remain strong", tone: "neutral", icon: Package },
];

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem("pusaka_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    setLoading(false);
  }, []);

  const totalValue = products.reduce((acc, product) => acc + product.price * 14, 0);
  const categories = new Set(products.map((product) => product.category)).size;
  const lowStock = Math.max(3, Math.round(products.length * 0.25));

  const stats: StatCard[] = [
    {
      title: "Total products",
      value: products.length,
      change: "+12.4%",
      icon: Package,
      accent: "from-[#edf3e8] to-[#e4ebdb]",
    },
    {
      title: "Categories",
      value: categories,
      change: "+2 new",
      icon: Layers,
      accent: "from-[#f6efe4] to-[#efe1cf]",
    },
    {
      title: "Inventory value",
      value: `Rp ${totalValue.toLocaleString("en-US")}`,
      change: "+8.1%",
      icon: CircleDollarSign,
      accent: "from-[#eef7ef] to-[#dfeedd]",
    },
    {
      title: "Low stock",
      value: lowStock,
      change: "Needs review",
      icon: AlertTriangle,
      accent: "from-[#fff4e8] to-[#fde6c8]",
    },
  ];

  const recentItems = products.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e7da] bg-white px-2.5 py-1 text-xs font-medium text-[#607456] mb-2">
            <Sparkles size={12} />
            Premium operations control
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Welcome back, Administrator. Here&apos;s today&apos;s inventory snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#e5e8df] bg-white px-4 py-2 text-sm font-medium text-[#4b5563] transition hover:border-[#607456] hover:text-[#607456]">
            <Download size={15} />
            Export
          </button>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#607456] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#526342]"
          >
            <Plus size={15} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { label: "This week", active: true },
          { label: "Low stock", active: false },
          { label: "Revenue", active: false },
          { label: "Automation", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              item.active
                ? "bg-[#607456] text-white"
                : "border border-[#e5e8df] bg-white text-[#637060] hover:border-[#607456] hover:text-[#607456]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-[24px] border border-[#ecece6] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#6b7280]">{stat.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#18211a]">{stat.value}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f5f7f2] px-2.5 py-1 text-sm font-medium text-[#607456]">
                    <ArrowUpRight size={14} />
                    {stat.change}
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br ${stat.accent}`}>
                  <Icon size={20} className="text-[#607456]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607456]">Inventory trend</p>
              <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Stock movement</h2>
            </div>
            <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-sm font-medium text-[#607456]">
              +18.2% from last month
            </span>
          </div>

          <div className="mt-6 rounded-[24px] bg-[#fafaf8] p-5">
            <div className="flex h-56 items-end gap-2">
              {chartBars.map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className="w-full rounded-t-[14px] bg-gradient-to-t from-[#607456] via-[#6e835f] to-[#9bb078]" style={{ height: `${height}%` }} />
                  <span className="text-xs text-[#6b7280]">W{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-[#6b7280]">
              <span>Week 1</span>
              <span>Week 7</span>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607456]">Category distribution</p>
              <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Portfolio mix</h2>
            </div>
            <span className="rounded-full bg-[#f8f0e7] px-3 py-1 text-sm font-medium text-[#c7782d]">
              4 active groups
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="relative flex h-36 w-36 items-center justify-center rounded-full"
              style={{ background: "conic-gradient(#607456 0% 42%, #5B7E3C 42% 68%, #C7782D 68% 86%, #E8E8E8 86% 100%)" }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center text-sm font-semibold text-[#2c2c2c]">
                42%
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: "Core goods", percent: "42%", color: "bg-[#607456]" },
                { label: "Premium lines", percent: "26%", color: "bg-[#5B7E3C]" },
                { label: "Seasonal", percent: "18%", color: "bg-[#C7782D]" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-[16px] bg-[#fafaf8] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-[#4b5563]">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2c2c2c]">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607456]">Recent activity</p>
              <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Operations timeline</h2>
            </div>
            <button className="rounded-full border border-[#ecece6] bg-[#fafaf8] px-3 py-1.5 text-sm font-medium text-[#4b5563]">
              View all
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {activityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 rounded-[20px] bg-[#fafaf8] p-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3e8] text-[#607456]">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#18211a]">{item.title}</p>
                      <span className="text-xs font-medium text-[#6b7280]">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#6b7280]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607456]">Quick actions</p>
              <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Keep operations flowing</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="rounded-[20px] border border-[#ecece6] bg-[#fafaf8] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3e8] text-[#607456]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-3 font-semibold text-[#18211a]">{action.title}</h3>
                  <p className="mt-1 text-sm text-[#6b7280]">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#607456]">Recent transactions</p>
              <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Latest inventory updates</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-[#ecece6] bg-[#fafaf8] px-3 py-2 text-sm font-medium text-[#4b5563]">
              <Filter size={14} />
              Filter
            </button>
          </div>

          {loading ? (
            <div className="mt-6 space-y-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-14 animate-pulse rounded-[16px] bg-[#f5f7f2]" />
              ))}
            </div>
          ) : recentItems.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-dashed border-[#e5e7eb] bg-[#fafaf8] p-8 text-center">
              <Package size={28} className="mx-auto text-[#9ca3af]" />
              <p className="mt-3 font-semibold text-[#374151]">No products yet</p>
              <p className="mt-1 text-sm text-[#6b7280]">Add your first product to start tracking inventory.</p>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#ecece6]">
              <table className="min-w-full divide-y divide-[#f0f0ec] text-sm">
                <thead className="bg-[#fafaf8] text-left text-[#6b7280]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Stock</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0ec] bg-white">
                  {recentItems.map((product, index) => {
                    const stock = Math.max(5, 30 - index * 4);
                    const status = index === 0 ? "Healthy" : index === 1 ? "Low" : "Restock";
                    const statusClass = status === "Healthy" ? "bg-[#ecfdf3] text-[#166534]" : status === "Low" ? "bg-[#fff7ed] text-[#c2410c]" : "bg-[#fef2f2] text-[#b91c1c]";
                    return (
                      <tr key={product.id} className="transition hover:bg-[#fafaf8]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[#f3f6ee]">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                              ) : (
                                <Package size={16} className="text-[#607456]" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-[#18211a]">{product.name}</p>
                              <p className="text-xs text-[#6b7280]">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#4b5563]">{product.category}</td>
                        <td className="px-4 py-3 text-[#4b5563]">{stock} units</td>
                        <td className="px-4 py-3 font-semibold text-[#18211a]">Rp {product.price.toLocaleString("en-US")}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>{status}</span>
                        </td>
                        <td className="px-4 py-3 text-[#6b7280]">{new Date(product.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#607456]">Inventory insights</p>
                <h2 className="mt-1 text-xl font-semibold text-[#18211a]">AI-style overview</h2>
              </div>
              <div className="rounded-full bg-[#f4f7ee] px-2.5 py-1 text-xs font-semibold text-[#607456]">
                AI view
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {insightCards.map((item) => {
                const Icon = item.icon;
                const toneClass = item.tone === "warning" ? "bg-[#fff7ed] text-[#c2410c]" : item.tone === "success" ? "bg-[#ecfdf3] text-[#166534]" : "bg-[#f5f7f2] text-[#4b5563]";
                return (
                  <div key={item.title} className="rounded-[20px] border border-[#ecece6] bg-[#fafaf8] p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${toneClass}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#18211a]">{item.title}</p>
                        <p className="text-sm text-[#6b7280]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#607456]">Health score</p>
                <h2 className="mt-1 text-xl font-semibold text-[#18211a]">Stock stability</h2>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-end justify-between">
                <p className="text-4xl font-semibold text-[#18211a]">89%</p>
                <span className="rounded-full bg-[#ecfdf3] px-2.5 py-1 text-sm font-semibold text-[#166534]">
                  Stable
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#f4f5f7]">
                <div className="h-2 rounded-full bg-gradient-to-r from-[#607456] to-[#5B7E3C]" style={{ width: "89%" }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-[#6b7280]">
                <span>Target 95%</span>
                <span>+5% this week</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
