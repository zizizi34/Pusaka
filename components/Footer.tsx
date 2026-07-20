"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Card Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '16 / 5' }}>
          {/* Background Image with Shadow Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/footer.svg"
              alt="Footer Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45"></div>
          </div>

          <div className="relative z-10 px-8 md:px-12 py-6 h-full flex flex-col justify-between">
            {/* Main Content Area */}
            <div className="flex items-start justify-between flex-1">
              {/* Left Section - Brand */}
              <div className="flex flex-col justify-between h-full w-1/4">
                <div>
                  <div className="mb-3 flex items-center">
                    <Image
                      src="/assets/Logo_putih.svg"
                      alt="PUSAKA Logo"
                      width={140}
                      height={47}
                      className="h-auto"
                    />
                  </div>
                  <p className="text-white text-xs leading-relaxed max-w-xs font-sans">
                    Mari kita lestarikan Budaya yang ada di Indonesia sampai ke kancah Internasional
                  </p>
                </div>
                {/* Social Media Icons */}
                <div className="flex gap-2">
                  <Link href="#" className="p-1.5 text-white hover:text-[#C7782D] transition-colors duration-300">
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="p-1.5 text-white hover:text-[#C7782D] transition-colors duration-300">
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="p-1.5 text-white hover:text-[#C7782D] transition-colors duration-300">
                    <TikTok className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="p-1.5 text-white hover:text-[#C7782D] transition-colors duration-300">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Center Section - Company and Product */}
              <div className="flex gap-12 justify-center items-start pt-4 flex-1">
                {/* Company Links */}
                <div className="text-center">
                  <h4 className="text-white font-bold text-sm mb-2 font-sans">Company</h4>
                  <ul className="space-y-1 text-white/90 text-xs font-sans">
                    <li>
                      <Link href="#" className="hover:text-[#C7782D] transition-colors duration-300">
                        Tentang Kami
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#C7782D] transition-colors duration-300">
                        Program Kami
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="hover:text-[#C7782D] transition-colors duration-300">
                        Dashboard Admin
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Product Links */}
                <div className="text-center">
                  <h4 className="text-white font-bold text-sm mb-2 font-sans">Product</h4>
                  <ul className="space-y-1 text-white/90 text-xs font-sans">
                    <li>
                      <Link href="#" className="hover:text-[#C7782D] transition-colors duration-300">
                        Tentang Kami
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#C7782D] transition-colors duration-300">
                        Tentang Kami
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-3 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-white/70 text-xs font-sans gap-2">
              <p>© 2025 Pusaka Budaya Indonesia</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
