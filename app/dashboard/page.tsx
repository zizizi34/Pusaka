"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus, TrendingUp, Layers } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  createdAt: string;
}

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

  const stats = [
    {
      title: "Total Produk",
      value: products.length,
      description: "Produk dalam sistem",
      icon: Package,
      bgColor: "#F5E6D3",
      textColor: "#995F2F",
      borderColor: "#E8D5C4",
    },
    {
      title: "Total Kategori",
      value: new Set(products.map((p) => p.category)).size,
      description: "Variasi kategori",
      icon: Layers,
      bgColor: "#F0F0F0",
      textColor: "#666666",
      borderColor: "#E0E0E0",
    },
    {
      title: "Total Nilai Stok",
      value: `Rp ${products
        .reduce((acc, p) => acc + p.price, 0)
        .toLocaleString("id-ID")}`,
      description: "Nilai inventory",
      icon: TrendingUp,
      bgColor: "#E8F5E9",
      textColor: "#2E7D32",
      borderColor: "#C8E6C9",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola produk dan lihat overview bisnis Anda
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: "#995F2F" }}
        >
          <Plus size={18} />
          Tambah Produk
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border transition-all duration-200 hover:shadow-md"
              style={{ borderColor: stat.borderColor }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: stat.textColor }}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-xs">{stat.description}</p>
                </div>
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon size={24} style={{ color: stat.textColor }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Products Section */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Produk Terbaru
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {products.length} produk terdaftar
              </p>
            </div>
            <Link
              href="/dashboard/products"
              className="text-sm font-medium"
              style={{ color: "#995F2F" }}
            >
              Lihat Semua →
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-pulse">
              <Package
                size={32}
                className="text-gray-300"
              />
            </div>
            <p className="text-gray-400 mt-3">Memuat data...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium mb-1">Belum ada produk</p>
            <p className="text-gray-400 text-sm mb-6">
              Mulai tambahkan produk untuk mengelola inventori
            </p>
            <Link
              href="/dashboard/products/new"
              className="inline-block text-white px-6 py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#995F2F" }}
            >
              Tambah Produk Pertama
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Nama Produk
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products
                  .slice(-5)
                  .reverse()
                  .map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package size={18} className="text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: "#F5E6D3",
                            color: "#995F2F",
                          }}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString(
                          "id-ID",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="inline-flex text-sm font-medium px-3 py-1.5 rounded-md transition-all"
                          style={{
                            color: "#995F2F",
                          }}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
