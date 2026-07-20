"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative w-full bg-white select-none overflow-x-hidden">
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
            backgroundSize: "cover" 
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
              <Link
                href="/catalog"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-900 hover:text-gray-900 hover:shadow-md"
              >
                See Product
                <Search className="h-4 w-4 text-gray-500 stroke-[1.5]" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md"
              >
                Cart
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
      <section className="relative bg-white py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-visible">
        {/* Decorative Elements - Positioned absolutely in section */}
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
                  placeholder="Cari Produk yogiaku sejalan"
                  className="w-full px-6 py-3 md:py-4 border-b-2 border-gray-300 focus:border-[#d48358] outline-none text-sm md:text-base font-sans transition-colors"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 relative z-10">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              All Categories
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Batik
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Jadi
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Tenun Ikat
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Kerajinan
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Aksesoris
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-12">
            {/* Product Card 1 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 2.000.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[10px] md:text-xs ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 2 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 1.500.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFA500] text-[10px] md:text-xs">★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 3 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/wayang_puppet.png"
                    alt="Wayang"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Wayang</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 1.800.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[10px] md:text-xs ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 4 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 2.200.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFA500] text-[10px] md:text-xs">★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 5 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 2.000.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[10px] md:text-xs ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 6 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 1.750.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFA500] text-[10px] md:text-xs">★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 7 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/wayang_puppet.png"
                    alt="Wayang"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Wayang</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 1.950.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[10px] md:text-xs ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>

            {/* Product Card 8 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative mb-2 md:mb-3">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/batik_shirt.png"
                    alt="Baju Batik Wanita"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300">
                    <Heart className="h-3 md:h-4 w-3 md:w-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Baju Batik Wanita</h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-1 font-medium">Banyak beberapa size</p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1.5">Rp 2.100.000</p>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFA500] text-[10px] md:text-xs">★</span>
                ))}
              </div>
              <button className="w-full px-2 md:px-3 py-1.5 md:py-2 bg-[#C7782D] text-white rounded-lg text-[10px] md:text-xs font-medium hover:opacity-90 transition-opacity duration-300">
                Add to Cart
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
