"use client";

import React from 'react';
import Link from 'next/link';
import { User, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-fit px-8 md:px-10 py-3.5 md:py-4 bg-white/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full border border-white/40 flex items-center justify-between transition-all duration-300"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <span className="text-[#a5523d] font-sans font-semibold tracking-wider flex items-center text-sm md:text-base whitespace-nowrap">
          <span className="mr-1.5 text-xs text-[#a5523d]">❖</span>PUSAKA
        </span>
      </Link>

      {/* Spacer */}
      <div className="hidden md:block mx-4 md:mx-8"></div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
        <Link 
          href="/" 
          className={`hover:text-[#a5523d] transition-colors ${isHome ? 'text-gray-900 font-semibold' : ''}`}
        >
          Beranda
        </Link>
        <Link 
          href="/catalog" 
          className={`hover:text-[#a5523d] transition-colors ${pathname.startsWith('/catalog') ? 'text-gray-900 font-semibold' : ''}`}
        >
          E-Commerce
        </Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-3 md:space-x-4 md:ml-4">
        {!isHome && (
          <Link href="/cart" className="text-gray-700 hover:text-[#a5523d] transition-colors">
            <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
          </Link>
        )}
        <button className="text-gray-700 hover:text-[#a5523d] transition-colors focus:outline-none">
          <User className="h-5 w-5 stroke-[1.5]" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
