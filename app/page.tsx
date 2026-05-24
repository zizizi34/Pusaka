"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-white select-none overflow-x-hidden">
      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image - Fits the hero screen perfectly */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/assets/home.png"
            alt="Pusaka Nusantara Background"
            fill
            priority
            className="object-fill object-center"
          />
        </div>

        {/* Hero Content Section - Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-xl text-center mt-8">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-gray-900 leading-[1.15] tracking-tight"
          >
            Bangga Belanja <br />
            Produk Lokal
          </motion.h1>

          {/* Wavy Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center my-4"
          >
            <svg
              width="120"
              height="12"
              viewBox="0 0 120 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-900"
            >
              <path
                d="M10 6 C 30 12, 40 0, 60 6 C 80 12, 90 0, 110 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs md:text-sm text-gray-500 font-sans max-w-xs md:max-w-sm leading-relaxed mt-1"
          >
            Platform e-commerce yang menghubungkan kekayaan budaya Indonesia dengan dunia digital.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-6 mt-10 w-full"
          >
            <Link
              href="/catalog"
              className="flex items-center justify-between w-44 md:w-48 px-6 py-3 bg-white border border-gray-500 rounded-full text-sm text-gray-700 hover:border-black hover:text-black shadow-sm transition-all duration-300 group"
            >
              <span className="font-medium">See Product</span>
              <Search className="h-4 w-4 text-gray-500 group-hover:text-black transition-colors stroke-[1.5]" />
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-between w-44 md:w-48 px-6 py-3 bg-white border border-gray-500 rounded-full text-sm text-gray-700 hover:border-black hover:text-black shadow-sm transition-all duration-300 group"
            >
              <span className="font-medium">Cart</span>
              <ShoppingCart className="h-4 w-4 text-gray-500 group-hover:text-black transition-colors stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative bg-white py-32 px-6 md:px-12 lg:px-24 border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight tracking-tight">
                Drive into <br />
                creativity with our <br />
                <span className="script-font text-[#d48358] text-5xl md:text-6xl lg:text-7xl block mt-2 normal-case font-normal leading-none">
                  galeri collection
                </span>
              </h2>
            </div>
            <div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans max-w-lg lg:ml-auto text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Staggered Grid of 6 Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end mt-12">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop"
                  alt="Hands sewing golden fabric"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1627931326442-bd9db93574c8?q=80&w=600&auto=format&fit=crop"
                  alt="Traditional dancers in front of house"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1596120405461-59174b2f1505?q=80&w=600&auto=format&fit=crop"
                  alt="Woman displaying handwoven textile"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=600&auto=format&fit=crop"
                  alt="Couple in traditional red outfit"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
                  alt="Hands touching detailed batik fabric"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden shadow-md group">
                <Image
                  src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop"
                  alt="Balinese dancers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
