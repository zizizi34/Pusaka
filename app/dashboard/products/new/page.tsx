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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
            setFormData((prev) => ({ ...prev, image: dataUrl }));
          }
        };
        img.src = reader.result as string;
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
      let products = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Clean up previously saved massive images to free up space
      products = products.map((p: any) => {
        if (p.image && p.image.length > 200000) {
          return { ...p, image: "" };
        }
        return p;
      });

      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        price: parseInt(formData.price),
        createdAt: new Date().toISOString(),
      };
      products.push(newProduct);
      
      try {
        localStorage.setItem("pusaka_products", JSON.stringify(products));
        alert("Produk berhasil ditambahkan!");
        router.push("/dashboard/products");
      } catch (quotaError) {
        // Fallback if still exceeding quota
        console.error("Quota Exceeded:", quotaError);
        alert("Penyimpanan penuh. Beberapa produk lama akan dihapus agar bisa menyimpan.");
        localStorage.setItem("pusaka_products", JSON.stringify([newProduct]));
        alert("Produk berhasil ditambahkan! (Data lama direset)");
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#e5e8df] rounded-lg text-sm text-[#18211a] placeholder:text-[#b8c4b0] focus:outline-none focus:ring-2 focus:ring-[#607456]/30 focus:border-[#607456] transition-all";
  const labelClass = "block text-sm font-semibold text-[#18211a] mb-1.5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e8df] bg-white text-[#637060] hover:border-[#607456] hover:text-[#607456] transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#18211a] sm:text-3xl">Tambah Produk Baru</h1>
          <p className="text-[#637060] text-sm mt-0.5">Isi formulir di bawah untuk menambahkan produk baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Main Details */}
        <div className="flex-1 w-full space-y-6">
          {/* Media Card */}
          <div className="bg-white rounded-2xl border border-[#e5e8df] p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} className="text-[#607456]" />
              <h2 className="text-lg font-bold text-[#18211a]">Media Produk</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Preview */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-[#f4f6f1] rounded-2xl overflow-hidden flex items-center justify-center border border-[#e5e8df]">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={32} className="mx-auto text-[#aab8a2] mb-2" />
                      <p className="text-xs text-[#b8c4b0]">Belum ada gambar</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Upload */}
              <div className="flex-1 flex items-center">
                <label className="w-full h-full cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <div className="h-full flex flex-col justify-center border-2 border-dashed border-[#d6e8cc] rounded-2xl p-7 text-center hover:border-[#607456] hover:bg-[#f4f8f0] transition-all duration-200 group">
                    <Upload size={32} className="mx-auto mb-3 text-[#aab8a2] group-hover:text-[#607456] transition-colors" />
                    <p className="text-sm font-medium text-[#18211a] mb-1.5">Klik atau drag gambar di sini</p>
                    <p className="text-xs text-[#aab8a2]">PNG, JPG, atau format lainnya (Max 5MB)</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* General Information Card */}
          <div className="bg-white rounded-2xl border border-[#e5e8df] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#18211a]">Informasi Umum</h2>
            
            <div>
              <label className={labelClass}>
                Nama Produk <span className="text-[#C7782D]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Batik Mega Mendung"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Deskripsi Produk</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan detail produk, bahan, ukuran, dan spesifikasi lainnya..."
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Organization & Actions */}
        <div className="w-full lg:w-[360px] space-y-6 flex-shrink-0">
          {/* Organization Card */}
          <div className="bg-white rounded-2xl border border-[#e5e8df] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#18211a]">Kategori & Harga</h2>
            
            <div>
              <label className={labelClass}>
                Kategori <span className="text-[#C7782D]">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Harga (Rp) <span className="text-[#C7782D]">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Contoh: 250000"
                className={inputClass}
                required
              />
              {formData.price && (
                <div className="mt-3 bg-[#f4f8f0] border border-[#d6e8cc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#637060] mb-1">Estimasi Harga Jual</p>
                  <p className="text-lg text-[#607456] font-bold">
                    Rp {parseInt(formData.price).toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white rounded-2xl border border-[#e5e8df] p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#C7782D] hover:bg-[#b06826] text-white font-semibold text-sm rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? "Menyimpan..." : "Simpan Produk"}
              </button>
              <Link
                href="/dashboard/products"
                className="w-full py-3 border border-[#e5e8df] bg-[#fafaf8] text-[#18211a] font-medium text-sm rounded-xl hover:bg-[#f0f2ed] transition-all text-center"
              >
                Batal
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
