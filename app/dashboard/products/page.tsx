"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus, Trash2, Edit2, Search, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("pusaka_products");
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      setProducts(parsed);
      setFilteredProducts(parsed);
      const uniqueCategories = Array.from(
        new Set(parsed.map((p: Product) => p.category))
      );
      setCategories(uniqueCategories as string[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("pusaka_products", JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-500 mt-1">
            Kelola semua produk dalam sistem
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
        >
          <Plus size={20} />
          Tambah Produk
        </Link>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter & Pencarian</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin">
              <Package className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 mt-4">Memuat data produk...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">
              {products.length === 0
                ? "Belum ada produk"
                : "Tidak ada produk yang sesuai"}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {products.length === 0
                ? "Mulai tambahkan produk untuk mengelola inventori"
                : "Coba ubah filter pencarian Anda"}
            </p>
            <Link
              href="/dashboard/products/new"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium"
            >
              {products.length === 0
                ? "Tambah Produk Pertama"
                : "Tambah Produk Baru"}
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nama Produk
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                            {product.image &&
                            product.image !==
                              "/assets/product-placeholder.svg" ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                <Package size={20} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString(
                          "id-ID",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/dashboard/products/${product.id}/edit`}
                            className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                          >
                            <Edit2 size={16} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Stats */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold">{filteredProducts.length}</span> dari{" "}
                <span className="font-semibold">{products.length}</span> produk
              </p>
              <p className="text-sm text-gray-600">
                Total Nilai:{" "}
                <span className="font-semibold">
                  Rp{" "}
                  {filteredProducts
                    .reduce((acc, p) => acc + p.price, 0)
                    .toLocaleString("id-ID")}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
