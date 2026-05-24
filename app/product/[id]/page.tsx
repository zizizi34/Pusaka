"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Heart, Star, Minus, Plus, Share2, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Maroon');

  const relatedProducts = [
    { id: "2", name: "Kemeja Batik Biru Emas", price: "Rp 525.000", image: "/product_blue.png", rating: 4 },
    { id: "3", name: "Kain Tenun Ikat Sumba", price: "Rp 1.250.000", image: "/craft_1.png", rating: 5 },
    { id: "4", name: "Selendang Sutra Batik", price: "Rp 320.000", image: "/product_maroon.png", rating: 4 },
  ];

  return (
    <main className="min-h-screen pt-20 bg-white">
      <Navbar />

      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Image Gallery */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-2 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 order-2 md:order-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square w-20 md:w-full rounded-lg overflow-hidden bg-pusaka-gray cursor-pointer border-2 border-transparent hover:border-accent-gold transition-all">
                    <Image src="/product_maroon.png" alt="Thumbnail" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="md:col-span-10 relative aspect-[4/5] rounded-2xl overflow-hidden bg-pusaka-gray order-1 md:order-2">
                <Image src="/product_maroon.png" alt="Outer Batik Marun Floral" fill className="object-cover" priority />
                <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-pusaka-black hover:text-accent-maroon transition-all">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-accent-gold fill-accent-gold" />)}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">(48 Reviews)</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-pusaka-black mb-4">
                  Outer Batik Marun Floral
                </h1>
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-bold text-accent-maroon">Rp 450.000</span>
                  <span className="text-xl text-gray-400 line-through">Rp 580.000</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Warna</h4>
                <div className="flex space-x-3">
                  {['#800000', '#1A1A1A', '#000080'].map((color) => (
                    <button 
                      key={color}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-accent-gold scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Ukuran</h4>
                <div className="flex space-x-3">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button 
                      key={size}
                      className={`h-12 w-12 rounded-lg border-2 font-medium transition-all ${selectedSize === size ? 'border-pusaka-black bg-pusaka-black text-white' : 'border-pusaka-border text-gray-600 hover:border-pusaka-black'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col space-y-4 mb-12">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border-2 border-pusaka-border rounded-full px-4 py-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></button>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Hanya sisa 5 stok!</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-4 border-2 border-pusaka-black text-pusaka-black rounded-full font-bold hover:bg-pusaka-gray transition-all">
                    Add to Cart
                  </button>
                  <button className="py-4 bg-pusaka-black text-white rounded-full font-bold hover:bg-accent-maroon transition-all shadow-xl shadow-black/10">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Specs */}
              <div className="border-t border-pusaka-border pt-8">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Spesifikasi Produk</h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between border-b border-pusaka-gray pb-2">
                    <span>Bahan</span>
                    <span className="font-medium text-pusaka-black">Kain Tenun Tangan & Katun</span>
                  </li>
                  <li className="flex justify-between border-b border-pusaka-gray pb-2">
                    <span>Fit</span>
                    <span className="font-medium text-pusaka-black">Regular Fit</span>
                  </li>
                  <li className="flex justify-between border-b border-pusaka-gray pb-2">
                    <span>Instruksi Cuci</span>
                    <span className="font-medium text-pusaka-black">Dry Clean Only</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Media / Video Section */}
      <section className="relative h-[500px] w-full overflow-hidden bg-pusaka-black">
        <Image src="/banner_bg.png" alt="Batik Video" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <button className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30 hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-white fill-white ml-1" />
          </button>
          <blockquote className="max-w-3xl">
            <p className="text-3xl md:text-5xl font-serif italic text-white mb-6">
              "Mari Membatik sampai Budaya kita di Internasional"
            </p>
            <footer className="text-accent-gold font-medium tracking-widest uppercase text-sm">
              — Warisan Nusantara
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif mb-12">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetail;
