"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus, Trash2, Edit2, Search, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku?: string;
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

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Gagal mengambil data produk dari database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini dari database?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const updated = products.filter((p) => p.id !== id);
          setProducts(updated);
          // Also cleanup localStorage if any
          localStorage.removeItem("pusaka_products");
          alert("Produk berhasil dihapus dari database!");
        } else {
          alert("Gagal menghapus produk");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Terjadi kesalahan saat menghapus produk");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#18211a] sm:text-3xl">Manajemen Produk</h1>
          <p className="text-[#637060] text-sm mt-1">Kelola semua produk dalam sistem (Tersinkron Database MySQL)</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C7782D] hover:bg-[#b06826] text-white px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold shadow-sm"
        >
          <Plus size={17} />
          Tambah Produk
        </Link>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-[#e5e8df] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-[#607456]" />
          <h3 className="font-semibold text-[#18211a] text-sm">Filter &amp; Pencarian</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab8a2]" />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-[#e5e8df] rounded-lg text-sm text-[#18211a] placeholder:text-[#b8c4b0] focus:outline-none focus:ring-2 focus:ring-[#607456]/30 focus:border-[#607456] transition-all"
            />
          </div>
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#e5e8df] rounded-lg text-sm text-[#18211a] focus:outline-none focus:ring-2 focus:ring-[#607456]/30 focus:border-[#607456] transition-all"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#e5e8df] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin">
              <Package className="text-[#aab8a2]" size={28} />
            </div>
            <p className="text-[#637060] mt-4 text-sm">Memuat data produk dari database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f6f1] mb-4">
              <Package size={26} className="text-[#aab8a2]" />
            </div>
            <p className="text-[#18211a] font-semibold mb-1">
              {products.length === 0 ? "Belum ada produk di database" : "Tidak ada produk yang sesuai"}
            </p>
            <p className="text-[#637060] text-sm mb-6">
              {products.length === 0
                ? "Mulai tambahkan produk untuk menyimpan ke database MySQL"
                : "Coba ubah filter pencarian Anda"}
            </p>
            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 bg-[#C7782D] hover:bg-[#b06826] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Plus size={15} />
              {products.length === 0 ? "Tambah Produk Pertama" : "Tambah Produk Baru"}
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f7f8f5] border-b border-[#e5e8df]">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#637060] uppercase tracking-wide">Nama Produk</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#637060] uppercase tracking-wide">Kategori</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#637060] uppercase tracking-wide">Harga</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#637060] uppercase tracking-wide">Stock</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#637060] uppercase tracking-wide">Tanggal</th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold text-[#637060] uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2ed]">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#f7f8f5] transition-colors">
                      <td className="px-5 py-3.5 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#edf3e8] flex-shrink-0 overflow-hidden">
                            {product.image && product.image !== "/assets/product-placeholder.svg" ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={16} className="text-[#607456]" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-[#18211a] block">{product.name}</span>
                            {product.sku && <span className="text-xs text-[#8c9489]">{product.sku}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#edf3e8] text-[#3d5c35]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#18211a]">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-5 py-3.5 text-sm">
                        <span className={`inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full text-xs ${(product.stock ?? 0) <= 5
                            ? "bg-red-50 text-red-700"
                            : (product.stock ?? 0) <= 15
                              ? "bg-amber-50 text-amber-700"
                              : "bg-[#edf3e8] text-[#3d5c35]"
                          }`}>
                          {product.stock ?? 0} unit
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#637060]">
                        {new Date(product.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/dashboard/products/${product.id}/edit`}
                            className="inline-flex items-center gap-1.5 text-[#607456] hover:text-[#3d5c35] text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-[#edf3e8] transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
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
            <div className="px-5 py-3.5 bg-[#f7f8f5] border-t border-[#e5e8df] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-[#637060]">
                Menampilkan <span className="font-semibold text-[#18211a]">{filteredProducts.length}</span> dari{" "}
                <span className="font-semibold text-[#18211a]">{products.length}</span> produk
              </p>
              <p className="text-xs text-[#637060]">
                Total Nilai:{" "}
                <span className="font-semibold text-[#18211a]">
                  Rp {filteredProducts.reduce((acc, p) => acc + (p.price * (p.stock || 1)), 0).toLocaleString("id-ID")}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
