"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      className="fixed top-3 sm:top-5 md:top-6 lg:top-7 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[94vw] px-5 sm:px-8 md:px-10 py-2 sm:py-2.5 bg-white/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full border border-white/40 flex items-center justify-between transition-all duration-300"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/assets/Logo_coklat.svg" 
          alt="PUSAKA Logo" 
          width={100} 
          height={40}
          className="h-auto"
        />
      </Link>

      {/* Spacer */}
      <div className="hidden md:block mx-4 md:mx-8"></div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
        <Link 
          href="/" 
          className={`hover:text-[#a5523d] transition-colors ${isHome ? 'text-gray-900' : ''}`}
        >
          Beranda
        </Link>
        <Link 
          href="/catalog" 
          className={`hover:text-[#a5523d] transition-colors ${pathname.startsWith('/catalog') ? 'text-gray-900' : ''}`}
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
        <Link href="/admin/login" className="text-gray-700 hover:text-[#a5523d] transition-colors focus:outline-none">
          <User className="h-5 w-5 stroke-[1.5]" />
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
