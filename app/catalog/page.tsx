"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = [
    'Semua', 'Batik Solo', 'Tenun Ikat', 'Pakaian Adat', 'Alat Musik', 'Kerajinan', 'Aksesoris'
  ];

  const products = [
    { id: "1", name: "Outer Batik Marun Floral", price: "Rp 450.000", image: "/product_maroon.png", rating: 5 },
    { id: "2", name: "Kemeja Batik Biru Emas", price: "Rp 525.000", image: "/product_blue.png", rating: 4 },
    { id: "3", name: "Kain Tenun Ikat Sumba", price: "Rp 1.250.000", image: "/craft_1.png", rating: 5 },
    { id: "4", name: "Selendang Sutra Batik", price: "Rp 320.000", image: "/product_maroon.png", rating: 4 },
    { id: "5", name: "Kebaya Modern Putih", price: "Rp 680.000", image: "/product_blue.png", rating: 5 },
    { id: "6", name: "Batik Pria Slim Fit", price: "Rp 410.000", image: "/product_maroon.png", rating: 4 },
    { id: "7", name: "Tas Rotan Tradisional", price: "Rp 215.000", image: "/craft_1.png", rating: 5 },
    { id: "8", name: "Kalung Manik Dayak", price: "Rp 185.000", image: "/product_blue.png", rating: 4 },
  ];

  return (
    <main className="min-h-screen pt-20 bg-white">
      <Navbar />

      {/* Sub-Hero Banner */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image 
          src="/banner_bg.png" 
          alt="Weaving Texture" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-6xl font-serif font-bold text-center"
          >
            Merajut Warisan Nusantara
          </motion.h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

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
