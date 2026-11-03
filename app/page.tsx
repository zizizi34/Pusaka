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
    <main className="relative w-full overflow-x-hidden bg-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#18211a] px-5 py-3 text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
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
      <section className="relative flex min-h-[min(760px,92svh)] w-full items-center overflow-hidden bg-[#241b16] pt-24 sm:pt-20">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/home.svg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211812]/85 via-[#211812]/60 to-[#211812]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211812]/35 via-transparent to-[#211812]/10" />

        <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl text-left"
          >
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs">
              <span className="h-px w-8 bg-[#e6a47b]" />
              Pusaka · Kriya Nusantara
            </p>
            <h1 className="max-w-3xl font-serif text-[clamp(2.75rem,6.5vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
              Karya lokal,{" "}
              <span className="font-italiana italic text-[#efb18a]">cerita</span>
              <br className="hidden sm:block" /> yang terus hidup.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Temukan batik, tenun, dan kerajinan pilihan dari para perajin lokal—dibuat dengan tangan, membawa cerita dari Nusantara.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#products-section"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f7f2eb] px-6 text-sm font-semibold text-[#30231c] transition-colors hover:bg-white sm:w-auto"
              >
                Jelajahi karya
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/catalog"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
              >
                Lihat katalog
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/25 pt-5 text-xs font-medium tracking-wide text-white/75 sm:text-sm">
              <span>Batik &amp; wastra</span>
              <span className="h-1 w-1 rounded-full bg-[#e6a47b]" />
              <span>Tenun Nusantara</span>
              <span className="h-1 w-1 rounded-full bg-[#e6a47b]" />
              <span>Kriya pilihan</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1.1fr_0.9fr] md:items-end lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a75e3b]">
                01 <span className="mx-2 text-[#c8b7a5]">/</span> Cerita dalam karya
              </p>
              <h2 className="max-w-2xl font-italiana text-4xl leading-[1.05] tracking-[-0.035em] text-[#28221d] sm:text-5xl lg:text-6xl">
                Satu negeri, banyak cara bercerita.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <p className="max-w-md text-sm leading-7 text-[#6d655e] md:text-base md:leading-8 md:text-right">
                Dari helai tenun hingga gerak tari, budaya tumbuh lewat tangan dan kebiasaan yang terus dijaga.
              </p>
              <a
                href="#products-section"
                className="inline-flex items-center gap-2 border-b border-[#a75e3b]/40 pb-1 text-sm font-semibold text-[#68412e] transition-colors hover:border-[#a75e3b] hover:text-[#a75e3b]"
              >
                Lihat karya pilihan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            <div className="group relative col-span-2 aspect-[5/3] overflow-hidden rounded-2xl bg-[#e9e3da] sm:rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop"
                alt="Perajin mengerjakan kain dengan tangan"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">Proses &amp; ketekunan</p>
                <h3 className="font-italiana text-xl sm:text-2xl">Detail yang dikerjakan tangan</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e3da] sm:rounded-3xl">
              <Image
                src="/assets/handwoven_textile.png"
                alt="Kain tenun tradisional dengan motif berwarna"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">Tekstur &amp; tradisi</p>
                <h3 className="font-italiana text-lg leading-tight sm:text-xl">Tenun, simpul demi simpul</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e3da] sm:rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=800&auto=format&fit=crop"
                alt="Pasangan mengenakan busana tradisional"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">Ragam Nusantara</p>
                <h3 className="font-italiana text-lg leading-tight sm:text-xl">Busana yang punya makna</h3>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e3da] sm:rounded-3xl">
              <Image
                src="/assets/traditional_dancers.png"
                alt="Penari tradisional di depan rumah adat"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">Gerak &amp; perayaan</p>
                <h3 className="font-italiana text-lg leading-tight sm:text-xl">Tradisi yang terus bergerak</h3>
              </div>
            </div>

            <div className="group relative col-span-2 aspect-[5/3] overflow-hidden rounded-2xl bg-[#e9e3da] sm:rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                alt="Detail motif pada kain batik"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">Batik &amp; wastra</p>
                <h3 className="font-italiana text-xl sm:text-2xl">Motif, dibuat perlahan</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Produk Lokal Berkualitas */}
      <section id="products-section" className="scroll-mt-20 bg-[#f7f5f0] px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a75e3b]">
                02 <span className="mx-2 text-[#c8b7a5]">/</span> Pilihan perajin
              </p>
              <h2 className="font-italiana text-4xl leading-[1.05] tracking-[-0.035em] text-[#28221d] sm:text-5xl lg:text-6xl">
                Karya untuk dibawa pulang.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d655e] md:text-base">
                Pilih benda yang terasa dekat—dibuat dengan keterampilan, bahan, dan cerita yang berbeda.
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="product-search" className="sr-only">Cari produk</label>
              <input
                id="product-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari batik, tenun, kerajinan..."
                className="w-full rounded-xl border border-[#ded8ce] bg-white py-3.5 pl-4 pr-11 text-sm text-[#28221d] outline-none transition-colors placeholder:text-[#9b938a] focus:border-[#a75e3b] focus:ring-2 focus:ring-[#a75e3b]/10"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#83796f] hover:bg-[#f1ede6] hover:text-[#28221d]"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#83796f]" />
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="relative z-10 mb-8 flex flex-wrap items-center gap-2 border-b border-[#e5dfd5] pb-6">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                    isActive
                      ? "border-[#30231c] bg-[#30231c] text-white"
                      : "border-[#ded8ce] bg-white/70 text-[#685e55] hover:border-[#a75e3b] hover:text-[#814a31]"
                  }`}
                >
                  {cat === "All Categories" ? "Semua" : cat}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="relative z-10 mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[#e8e2d7] bg-white p-2.5 sm:p-3">
                  <div className="mb-3 aspect-[4/5] rounded-xl bg-[#eae6df]" />
                  <div className="mb-2 h-3 w-1/3 rounded bg-[#eae6df]" />
                  <div className="mb-3 h-4 w-3/4 rounded bg-[#eae6df]" />
                  <div className="h-9 rounded-lg bg-[#eae6df]" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="relative z-10 py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#eee6dc] text-[#a75e3b]">
                <PackageOpen size={30} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-[#30231c]">
                Belum ada karya yang cocok
              </h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-[#776e64]">
                {searchQuery
                  ? `Kami belum menemukan produk dengan kata kunci "${searchQuery}". Coba kata lain atau hapus pencarian.`
                  : "Belum ada produk dalam kategori ini."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#30231c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#49372d]"
              >
                Hapus filter
              </button>
            </div>
          ) : (
            <div className="relative z-10 mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white p-2.5 shadow-[0_3px_14px_rgba(47,37,27,0.035)] transition-shadow hover:shadow-[0_12px_30px_rgba(47,37,27,0.10)] sm:rounded-3xl sm:p-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.08 }}
                >
                  <div className="flex h-full flex-col">
                    {/* Image Box */}
                    <div className="relative">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#eeeae3] sm:rounded-2xl">
                        <Link href={`/product/${product.id}`} className="absolute inset-0 z-0 block">
                          {product.image && product.image.trim() !== "" ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/assets/batik_shirt.png";
                              }}
                            />
                          ) : (
                            <img
                              src="/assets/batik_shirt.png"
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                          )}
                        </Link>

                        {/* Badge Baru jika ditambahkan user */}
                        {product.isNew && (
                          <span className="pointer-events-none absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-[#a75e3b] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white shadow-sm sm:left-3 sm:top-3 sm:text-[10px]">
                            <Sparkles className="w-2.5 h-2.5" /> Baru
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(product.id);
                          }}
                          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-[#514840] shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-[#a75e3b] sm:right-3 sm:top-3"
                          aria-label={likedProducts[product.id] ? "Hapus dari favorit" : "Tambah ke favorit"}
                          aria-pressed={Boolean(likedProducts[product.id])}
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              likedProducts[product.id]
                                ? "text-red-500 fill-red-500"
                                : "text-current"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col pt-3">
                      <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a75e3b] sm:text-[10px]">
                        {product.category}
                      </span>
                      <Link href={`/product/${product.id}`} className="block">
                        <h3 className="mb-1 line-clamp-2 min-h-9 text-xs font-semibold leading-5 text-[#30231c] transition-colors hover:text-[#a75e3b] group-hover:text-[#a75e3b] sm:text-sm">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mb-2 line-clamp-2 min-h-8 text-[10px] leading-4 text-[#81786f] sm:text-xs">
                        {product.description || "Produk lokal autentik berkualitas prima"}
                      </p>
                      <p className="mb-1 text-xs font-bold text-[#30231c] sm:text-sm">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <div className="mb-3 flex items-center gap-0.5" aria-label={`Rating ${product.rating || 5} dari 5`}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            aria-hidden="true"
                            className={`text-[10px] ${
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
                    className="mt-auto flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#30231c] px-2 text-[10px] font-medium text-white transition-colors hover:bg-[#49372d] active:scale-[0.98] sm:text-xs"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Tambah ke keranjang
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick link to catalog */}
          <div className="text-center relative z-10 pt-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border border-[#cfc5b8] px-6 py-3 text-xs font-medium text-[#514840] transition-all hover:gap-3 hover:border-[#30231c] hover:text-[#30231c] sm:text-sm"
            >
              Lihat seluruh katalog
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
