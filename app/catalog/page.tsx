"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ChevronRight, PackageOpen } from 'lucide-react';
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
          const data = await res.json();
          if (Array.isArray(data)) {
            dbItems = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              price: `Rp ${Number(item.price).toLocaleString('id-ID')}`,
              image: item.image || '/assets/batik_shirt.png',
              rating: item.rating || 5,
              description: item.description,
            }));
          }
        }
      } catch (err) {
        console.warn('Gagal ambil data katalog dari API:', err);
      }

      // Check localStorage
      let localItems: ProductItem[] = [];
      try {
        const stored = localStorage.getItem('pusaka_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            localItems = parsed.map((item: any) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              price: `Rp ${Number(item.price).toLocaleString('id-ID')}`,
              image: item.image || '/assets/batik_shirt.png',
              rating: item.rating || 5,
              description: item.description,
            }));
          }
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
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        activeCategory === 'Semua' ||
        (p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (p.category && activeCategory.toLowerCase().includes(p.category.toLowerCase()));

      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <main className="min-h-screen pt-20 bg-white">
      <Navbar />

      {/* Sub-Hero Card Banner */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '16 / 5' }}>
            {/* Background Image with Shadow Overlay */}
            <Image 
              src="/banner_bg.png" 
              alt="Weaving Texture" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Content */}
            <div className="relative z-10 px-8 md:px-16 h-full flex flex-col justify-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-3xl md:text-5xl font-bold mb-3 font-serif"
              >
                Merajut Warisan Nusantara
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-sm md:text-base font-sans max-w-lg"
              >
                Menghubungkan pengrajin lokal dengan pembeli di seluruh Indonesia
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-pusaka-black">
              Temukan Produk Budaya Terbaik...
            </h2>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-12">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Batik, Tenun, atau Kerajinan..."
                className="w-full border-b-2 border-pusaka-border py-4 px-12 text-lg focus:border-accent-gold outline-none transition-colors font-sans"
              />
              <Search className="absolute left-2 top-4.5 h-6 w-6 text-gray-400" />
            </div>

            {/* Category Tags */}
            <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4 justify-start md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat 
                    ? 'bg-pusaka-black text-white shadow-lg' 
                    : 'bg-pusaka-gray text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-72" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <PackageOpen size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">Tidak ada produk ditemukan untuk kriteria ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="mt-20 text-center">
            <button className="px-12 py-4 border border-pusaka-black text-pusaka-black rounded-full font-medium hover:bg-pusaka-black hover:text-white transition-all duration-300">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CatalogPage;
