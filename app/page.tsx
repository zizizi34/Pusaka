"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart } from "lucide-react";
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
                  src="https://images.unsplash.com/photo-1627931326442-bd9db93574c8?q=80&w=600&auto=format&fit=crop"
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
                  src="https://images.unsplash.com/photo-1596120405461-59174b2f1505?q=80&w=600&auto=format&fit=crop"
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
      <section className="relative bg-white py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight tracking-tight mb-6">
              Produk Lokal Berkualitas <br /> dari Seluruh Nusantara
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
              Menghadirkan koleksi produk lokal Indonesia untuk memperkenalkan keragaman budaya dan kualitas terbaik dari berbagai wilayah di nusantara.
            </p>
          </div>

          {/* Filter & Sort Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Atur Hasil
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
              Urutkan Urutan
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Product Card 1 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1570562886111-e80fcca6a029?q=80&w=600&auto=format&fit=crop"
                  alt="Bali Batik Warmth"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Bali Batik Warmth</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 245.000</p>
            </div>

            {/* Product Card 2 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
                  alt="Dye Batik Weaves"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Dye Batik Weaves</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 275.000</p>
            </div>

            {/* Product Card 3 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop"
                  alt="Weaving"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Weaving</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 195.000</p>
            </div>

            {/* Product Card 4 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1604209850907-f01d058e1289?q=80&w=600&auto=format&fit=crop"
                  alt="Bali Batik Weaves"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Bali Batik Weaves</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 225.000</p>
            </div>

            {/* Product Card 5 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1607631814075-e51df1bdc82f?q=80&w=600&auto=format&fit=crop"
                  alt="Bali Batik Warmth"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Bali Batik Warmth</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 245.000</p>
            </div>

            {/* Product Card 6 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1602455074069-c2a4fb74174d?q=80&w=600&auto=format&fit=crop"
                  alt="Dye Batik Weaves"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Dye Batik Weaves</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 275.000</p>
            </div>

            {/* Product Card 7 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1590080876-43f37ca19cec?q=80&w=600&auto=format&fit=crop"
                  alt="Weaving"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Weaving</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 195.000</p>
            </div>

            {/* Product Card 8 */}
            <div className="group">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md mb-4 cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=600&auto=format&fit=crop"
                  alt="Bali Batik Weaves"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">Bali Batik Weaves</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Rp 225.000</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="/catalog"
              className="px-8 py-3.5 md:py-4 bg-gradient-to-r from-[#d48358] to-[#e8a571] rounded-full text-sm md:text-base font-medium text-white hover:shadow-lg transition-all duration-300"
            >
              Lihat produk lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
