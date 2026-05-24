"use client";

import React from 'react';
import Link from 'next/link';
import { User, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl bg-white shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] rounded-full px-8 py-3 border border-gray-100/80 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <span className="text-[#a5523d] font-sans font-semibold tracking-wider flex items-center text-sm md:text-base">
          <span className="mr-1.5 text-xs text-[#a5523d]">❖</span>PUSAKA
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
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
      <div className="flex items-center space-x-4">
        {!isHome && (
          <Link href="/cart" className="text-gray-700 hover:text-[#a5523d] transition-colors">
            <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
          </Link>
        )}
        <button className="text-gray-700 hover:text-[#a5523d] transition-colors focus:outline-none">
          <User className="h-5 w-5 stroke-[1.5]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
