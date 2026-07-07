"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

const CATEGORIES = [
  "Batik",
  "Tenun Ikat",
  "Kerajinan",
  "Aksesori",
  "Pakaian Adat",
  "Alat Musik",
  "Lainnya",
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Batik",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.price) {
        alert("Nama produk dan harga harus diisi");
        setLoading(false);
        return;
      }

      const storedProducts = localStorage.getItem("pusaka_products");
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        price: parseInt(formData.price),
        createdAt: new Date().toISOString(),
      };

      products.push(newProduct);
      localStorage.setItem("pusaka_products", JSON.stringify(products));

      alert("Produk berhasil ditambahkan!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
          <p className="text-gray-500 mt-1">Isi formulir di bawah untuk menambahkan produk baru</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={20} className="text-gray-600" />
              <label className="block text-lg font-semibold text-gray-900">
                Foto Produk
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center border-2 border-gray-200">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Belum ada gambar</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Area */}
              <div className="flex-1 flex items-center">
                <label className="w-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group">
                    <Upload size={32} className="mx-auto mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Klik atau drag gambar di sini
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, atau format gambar lainnya (Max 5MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Batik Mega Mendung"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Harga (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Contoh: 250000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
              {formData.price && (
                <p className="text-sm text-gray-600 font-medium">
                  💰 Rp {parseInt(formData.price).toLocaleString("id-ID")}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Deskripsi Produk
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan detail produk, bahan, ukuran, dan spesifikasi lainnya..."
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/dashboard/products"
              className="px-6 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-medium rounded-lg transition-all hover:bg-gray-50"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
