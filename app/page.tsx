"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart, Heart, Sparkles, Check, PackageOpen, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock?: number;
  description?: string;
  image: string;
  rating?: number;
  isNew?: boolean;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "def-1",
    name: "Baju Batik Wanita Modern",
    category: "Batik",
    price: 2000000,
    image: "/assets/batik_shirt.png",
    description: "Batik autentik berkualitas tinggi dengan sentuhan modern khas Nusantara.",
    rating: 5,
  },
  {
    id: "def-2",
    name: "Kain Tenun Sumba Tradisional",
    category: "Tenun Ikat",
    price: 1500000,
    image: "/assets/handwoven_textile.png",
    description: "Tenun ikat khas Nusantara dibuat langsung oleh penenun lokal.",
    rating: 5,
  },
  {
    id: "def-3",
    name: "Wayang Kulit Klasik",
    category: "Kerajinan",
    price: 1800000,
    image: "/assets/wayang_puppet.png",
    description: "Karya seni wayang khas Jawa dengan detail tatahan tangan halus.",
    rating: 4,
  },
  {
    id: "def-4",
    name: "Outer Batik Motif Parang",
    category: "Batik",
    price: 2200000,
    image: "/assets/batik_shirt.png",
    description: "Motif parang klasik yang memancarkan keanggunan budaya.",
    rating: 5,
  },
  {
    id: "def-5",
    name: "Aksesoris Manik Tradisional",
    category: "Aksesoris",
    price: 350000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    description: "Kalung dan aksesoris etnik handmade dengan ornamen khas.",
    rating: 5,
  },
  {
    id: "def-6",
    name: "Kemeja Batik Katun Pria",
    category: "Batik",
    price: 1750000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    description: "Kemeja batik katun premium adem dan nyaman digunakan.",
    rating: 4,
  },
  {
    id: "def-7",
    name: "Wayang Golek Ukir Kayu",
    category: "Kerajinan",
    price: 1950000,
    image: "/assets/wayang_puppet.png",
    description: "Kerajinan wayang golek kayu dengan pahatan ekspresif.",
    rating: 4,
  },
  {
    id: "def-8",
    name: "Batik Tulis Sutra Elegan",
    category: "Batik",
    price: 2100000,
    image: "/assets/batik_shirt.png",
    description: "Batik tulis eksklusif dengan bahan sutra pilihan bernilai seni tinggi.",
    rating: 5,
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch data dari database dan localStorage
  const loadAllProducts = async () => {
    let dbProducts: Product[] = [];
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          dbProducts = data.map((item: any) => ({
            ...item,
            price: Number(item.price),
            rating: item.rating || 5,
            isNew: true, // Tag user-added products as new
          }));
        }
      }
    } catch (err) {
      console.warn("Gagal fetch produk dari database:", err);
    }

    // Periksa juga localStorage
    let localProducts: Product[] = [];
    try {
      const stored = localStorage.getItem("pusaka_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          localProducts = parsed.map((item: any) => ({
            ...item,
            price: Number(item.price),
            rating: item.rating || 5,
            isNew: true,
          }));
        }
      }
    } catch (err) {
      console.warn("Gagal fetch produk dari localStorage:", err);
    }

    // Gabungkan produk baru dari DB dan LocalStorage (hindari duplicate ID / Nama)
    const userProducts: Product[] = [...dbProducts];
    for (const lp of localProducts) {
      if (!userProducts.some((p) => p.id === lp.id || (p.name && lp.name && p.name.toLowerCase() === lp.name.toLowerCase()))) {
        userProducts.push(lp);
      }
    }

    // Gabungkan produk user (paling atas / baru) dengan default showcase items
    const combined: Product[] = [...userProducts];
    for (const dp of DEFAULT_PRODUCTS) {
      if (!combined.some((p) => p.name.toLowerCase() === dp.name.toLowerCase())) {
        combined.push(dp);
      }
    }

    setProducts(combined);
    setLoading(false);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  // Filter daftar kategori yang unik
  const categoriesList = useMemo(() => {
    const baseCategories = ["All Categories", "Batik", "Tenun Ikat", "Kerajinan", "Aksesoris", "Pakaian Adat"];
    const customCats = products
      .map((p) => p.category)
      .filter((cat): cat is string => typeof cat === "string" && cat.trim() !== "" && !baseCategories.some((b) => b.toLowerCase() === cat.toLowerCase()));
    return [...baseCategories, ...Array.from(new Set(customCats))];
  }, [products]);

  // Filter produk berdasarkan pencarian dan kategori yang dipilih
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === "All Categories" ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(product.category.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (product: Product) => {
    setToastMessage(`"${product.name}" berhasil ditambahkan ke keranjang belanja!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <main className="relative w-full bg-white select-none overflow-x-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#18211a] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-7 h-7 rounded-full bg-[#607456] flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20 md:pt-16">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/home.svg')",
            backgroundAttachment: "fixed",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-white/10 md:bg-white/0" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[72px] font-serif font-bold text-gray-900 leading-[1.05] tracking-[-0.03em] max-w-4xl">
              Bangga Belanja <span className="block mt-3">Produk Lokal</span>
            </h1>

            <div className="mt-5 w-20 h-1 rounded-full bg-gradient-to-r from-[#d48358] to-[#e8a571]" />

            <p className="mt-6 text-sm sm:text-sm md:text-base text-gray-600 font-sans max-w-3xl leading-7 px-2 sm:px-0">
              Platform e-commerce yang menghubungkan kekayaan budaya Indonesia dengan dunia digital.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:items-center">
              <a
                href="#products-section"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-900 hover:text-gray-900 hover:shadow-md cursor-pointer"
              >
                See Product
                <Search className="h-4 w-4 text-gray-500 stroke-[1.5]" />
              </a>
              <Link
                href="/catalog"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md"
              >
                Catalog
                <ShoppingCart className="h-4 w-4 text-white stroke-[1.5]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative bg-white py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
            <div className="flex flex-col justify-start">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-italiana text-gray-900 leading-[1.02] tracking-[-0.04em]">
                Drive into <br />
                creativity with our
              </h2>
              <p className="text-4xl md:text-[3.75rem] lg:text-[4.5rem] italianno-regular text-[#d48358] mt-2 mb-8 leading-none tracking-[-0.02em]">
                Galeri Collection
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans max-w-lg text-left">
                Menghadirkan mahakarya budaya Nusantara dari pengrajin terpilih. Setiap helai kain, pahatan kayu, dan ornamen tradisional membawa kisah leluhur yang abadi.
              </p>
            </div>
          </div>

          {/* Staggered Grid of 6 Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop"
                  alt="Hands sewing golden fabric"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[3/2] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="/assets/traditional_dancers.png"
                  alt="Traditional dancers in front of house"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="/assets/handwoven_textile.png"
                  alt="Woman displaying handwoven textile"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=600&auto=format&fit=crop"
                  alt="Couple in traditional red outfit"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
                  alt="Hands touching detailed batik fabric"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[3/2] w-full rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop"
                  alt="Balinese dancers"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Produk Lokal Berkualitas */}
      <section id="products-section" className="relative bg-white py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-visible scroll-mt-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 opacity-60 pointer-events-none z-0">
          <Image
            src="/assets/bunga.svg"
            alt="Decorative Flower"
            width={360}
            height={360}
            className="w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 opacity-55 pointer-events-none z-0">
          <Image
            src="/assets/awan.svg"
            alt="Decorative Cloud"
            width={350}
            height={350}
            className="w-full h-full"
          />
        </div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 md:w-40 md:h-40 opacity-40 pointer-events-none z-0">
          <Image
            src="/assets/bundar.svg"
            alt="Decorative Circle"
            width={160}
            height={160}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <h2 className="font-italiana text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight mb-3">
              Temukan Produk Budaya
            </h2>
            <p className="font-italiana text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight mb-1">
              Terbaik dari Seluruh
            </p>
            <p className="font-italiana text-3xl md:text-4xl lg:text-5xl text-[#d48358] mb-4 leading-snug">
              Indonesia
            </p>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto mb-6">
              Menghadirkan produk autentik buatan pengrajin dan berbagai desain dari seluruh Indonesia dengan inovasi terkini.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8 relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Produk Budaya Indonesia (Batik, Tenun, Wayang)..."
                  className="w-full px-6 py-3 md:py-4 border-b-2 border-gray-300 focus:border-[#d48358] outline-none text-sm md:text-base font-sans transition-colors placeholder:text-gray-400"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : (
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 relative z-10">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gray-900 text-white border border-gray-900 shadow-md scale-105"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-12">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-gray-50 p-2 border border-gray-100">
                  <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                  <div className="h-8 bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="relative z-10 py-16 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f8efe9] text-[#d48358] mb-4">
                <PackageOpen size={30} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Tidak ada produk ditemukan
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6 font-sans">
                {searchQuery
                  ? `Tidak ada produk dengan kata kunci "${searchQuery}". Coba kata kunci lain atau bersihkan pencarian.`
                  : "Belum ada produk untuk kategori ini."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-xs md:text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-12">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  className="group flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.08 }}
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative mb-2 md:mb-3">
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                        {product.image && product.image.trim() !== "" ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/assets/batik_shirt.png";
                            }}
                          />
                        ) : (
                          <img
                            src="/assets/batik_shirt.png"
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}

                        {/* Badge Baru jika ditambahkan user */}
                        {product.isNew && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C7782D] text-white shadow-sm flex items-center gap-1 z-10">
                            <Sparkles className="w-2.5 h-2.5" /> Baru
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleLike(product.id)}
                          className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-300 z-10"
                          aria-label="Wishlist"
                        >
                          <Heart
                            className={`h-3 md:h-4 w-3 md:w-4 transition-colors ${
                              likedProducts[product.id]
                                ? "text-red-500 fill-red-500"
                                : "text-gray-700 hover:text-red-500"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mb-2">
                      <span className="text-[10px] md:text-xs font-semibold text-[#d48358] uppercase tracking-wider block mb-0.5">
                        {product.category}
                      </span>
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-[#d48358] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-500 mb-1 line-clamp-1 font-sans">
                        {product.description || "Produk lokal autentik berkualitas prima"}
                      </p>
                      <p className="text-xs md:text-sm font-bold text-gray-900 mb-1">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-[10px] md:text-xs ${
                              i < (product.rating || 5) ? "text-[#FFA500]" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] hover:bg-[#b06826] active:scale-[0.98] text-white rounded-lg text-[10px] md:text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm mt-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick link to catalog */}
          <div className="text-center relative z-10 pt-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:border-gray-900 text-gray-800 text-xs md:text-sm font-medium transition-all hover:gap-3"
            >
              Lihat Seluruh Katalog Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
