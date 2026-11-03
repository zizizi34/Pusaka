"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ArrowDown, ArrowRight, PackageOpen, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  category?: string;
  description?: string;
}

function parseCatalogProduct(value: unknown): ProductItem | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;

  const item = value as Record<string, unknown>;
  const price = typeof item.price === 'number' ? item.price : Number(item.price);
  if (typeof item.id !== 'string' || typeof item.name !== 'string' || !Number.isFinite(price)) return null;

  return {
    id: item.id,
    name: item.name,
    category: typeof item.category === 'string' ? item.category : undefined,
    price: `Rp ${price.toLocaleString('id-ID')}`,
    image: typeof item.image === 'string' && item.image.trim() ? item.image : '/assets/batik_shirt.png',
    rating: typeof item.rating === 'number' && Number.isFinite(item.rating) ? item.rating : 5,
    description: typeof item.description === 'string' ? item.description : undefined,
  };
}

function parseCatalogProducts(value: unknown): ProductItem[] {
  return Array.isArray(value)
    ? value.flatMap((item) => {
        const product = parseCatalogProduct(item);
        return product ? [product] : [];
      })
    : [];
}

const DEFAULT_CATALOG_PRODUCTS: ProductItem[] = [
  { id: "1", name: "Outer Batik Marun Floral", price: "Rp 450.000", image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop", rating: 5, category: "Batik" },
  { id: "2", name: "Kemeja Batik Biru Emas", price: "Rp 525.000", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop", rating: 4, category: "Batik" },
  { id: "3", name: "Kain Tenun Ikat Sumba", price: "Rp 1.250.000", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", rating: 5, category: "Tenun Ikat" },
  { id: "4", name: "Selendang Sutra Batik", price: "Rp 320.000", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop", rating: 4, category: "Batik" },
  { id: "5", name: "Kebaya Modern Putih", price: "Rp 680.000", image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=600&auto=format&fit=crop", rating: 5, category: "Pakaian Adat" },
  { id: "6", name: "Batik Pria Slim Fit", price: "Rp 410.000", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop", rating: 4, category: "Batik" },
  { id: "7", name: "Tas Rotan Tradisional", price: "Rp 215.000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", rating: 5, category: "Kerajinan" },
  { id: "8", name: "Kalung Manik Dayak", price: "Rp 185.000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", rating: 4, category: "Aksesoris" },
];

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_CATALOG_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      let dbItems: ProductItem[] = [];
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data: unknown = await res.json();
          dbItems = parseCatalogProducts(data);
        }
      } catch (err) {
        console.warn('Gagal ambil data katalog dari API:', err);
      }

      // Check localStorage
      let localItems: ProductItem[] = [];
      try {
        const stored = localStorage.getItem('pusaka_products');
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          localItems = parseCatalogProducts(parsed);
        }
      } catch (err) {
        console.warn('Gagal baca localStorage di katalog:', err);
      }

      const userItems = [...dbItems];
      for (const li of localItems) {
        if (!userItems.some((p) => p.id === li.id || (p.name && li.name && p.name.toLowerCase() === li.name.toLowerCase()))) {
          userItems.push(li);
        }
      }

      const combined = [...userItems];
      for (const di of DEFAULT_CATALOG_PRODUCTS) {
        if (!combined.some((p) => p.name.toLowerCase() === di.name.toLowerCase())) {
          combined.push(di);
        }
      }

      setProducts(combined);
      setLoading(false);
    };

    fetchCatalog();
  }, []);

  const categories = useMemo(() => {
    const base = ['Semua', 'Batik', 'Tenun Ikat', 'Pakaian Adat', 'Alat Musik', 'Kerajinan', 'Aksesoris'];
    const custom = products
      .map((p) => p.category)
      .filter((c): c is string => typeof c === 'string' && c.trim() !== '' && !base.some((b) => b.toLowerCase() === c.toLowerCase()));
    return [...base, ...Array.from(new Set(custom))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        activeCategory === 'Semua' ||
        (p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (p.category && activeCategory.toLowerCase().includes(p.category.toLowerCase()));

      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="relative flex min-h-[min(620px,78svh)] items-center overflow-hidden bg-[#241b16] pt-24 sm:pt-20">
        <Image
          src="/banner_bg.png"
          alt="Tekstur kain tenun tradisional"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211812]/85 via-[#211812]/60 to-[#211812]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211812]/35 via-transparent to-[#211812]/10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12"
        >
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs">
              <span className="h-px w-8 bg-[#e6a47b]" />
              Pusaka · Kriya Nusantara
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,6.5vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
              Setiap karya
              <br className="hidden sm:block" /> punya <span className="font-italiana italic text-[#efb18a]">cerita.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Jelajahi batik, tenun, dan kriya pilihan yang dibuat oleh tangan-tangan terampil di seluruh Nusantara.
            </p>
            <a
              href="#products-section"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f7f2eb] px-6 text-sm font-semibold text-[#30231c] transition-colors hover:bg-white"
            >
              Temukan karya pilihan <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <section id="products-section" className="scroll-mt-20 bg-[#f7f5f0] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a75e3b]">
                Temukan pilihanmu
              </p>
              <h2 className="font-italiana text-4xl leading-[1.05] tracking-[-0.035em] text-[#28221d] sm:text-5xl lg:text-6xl">
                Karya untuk dibawa pulang.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d655e] md:text-base">
                Benda penuh makna, dirawat dalam proses dan diteruskan dari generasi ke generasi.
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="catalog-search" className="sr-only">Cari produk</label>
              <input
                id="catalog-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari batik, tenun, kerajinan..."
                className="w-full rounded-xl border border-[#ded8ce] bg-white py-3.5 pl-4 pr-11 text-sm text-[#28221d] outline-none transition-colors placeholder:text-[#9b938a] focus:border-[#a75e3b] focus:ring-2 focus:ring-[#a75e3b]/10"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
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

          <div className="mb-7 flex flex-wrap items-center gap-2 border-b border-[#e5dfd5] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  activeCategory === cat
                    ? 'border-[#30231c] bg-[#30231c] text-white'
                    : 'border-[#ded8ce] bg-white/70 text-[#685e55] hover:border-[#a75e3b] hover:text-[#814a31]'
                }`}
              >
                {cat === 'Semua' ? 'Semua karya' : cat}
              </button>
            ))}
          </div>

          <div className="mb-5 flex items-center justify-between gap-3 text-xs text-[#81786f] sm:text-sm">
            <p aria-live="polite">
              {loading ? 'Menyiapkan pilihan...' : `${filteredProducts.length} karya ditemukan`}
            </p>
            {searchQuery || activeCategory !== 'Semua' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="inline-flex items-center gap-1 font-medium text-[#814a31] hover:text-[#a75e3b]"
              >
                Hapus filter <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[#e8e2d7] bg-white p-2.5 sm:rounded-3xl sm:p-3">
                  <div className="mb-3 aspect-[4/5] rounded-xl bg-[#eae6df] sm:rounded-2xl" />
                  <div className="mb-2 h-3 w-1/3 rounded bg-[#eae6df]" />
                  <div className="mb-3 h-4 w-3/4 rounded bg-[#eae6df]" />
                  <div className="h-4 w-1/2 rounded bg-[#eae6df]" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#eee6dc] text-[#a75e3b]">
                <PackageOpen size={30} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-[#30231c]">Belum ada karya yang cocok</h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-[#776e64]">
                Coba kata kunci lain atau pilih kategori yang berbeda.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="rounded-full bg-[#30231c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#49372d]"
              >
                Tampilkan semua karya
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/#products-section"
              className="inline-flex items-center gap-2 rounded-full border border-[#cfc5b8] px-6 py-3 text-xs font-medium text-[#514840] transition-all hover:gap-3 hover:border-[#30231c] hover:text-[#30231c] sm:text-sm"
            >
              Kembali ke beranda <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CatalogPage;
