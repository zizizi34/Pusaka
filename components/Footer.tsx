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
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-lg sm:min-h-[360px] lg:aspect-[16/6] lg:min-h-0 xl:aspect-[16/5]">
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

          <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:min-h-0 lg:px-10 lg:py-8 xl:px-12">
            {/* Main Content Area */}
            <div className="flex flex-1 flex-col justify-between gap-8 sm:flex-row">
              {/* Left Section - Brand */}
              <div className="flex flex-col justify-between gap-4 sm:w-2/5 lg:w-1/3">
                <div>
                  <div className="mb-3 flex items-center">
                    <Image
                      src="/assets/Logo_putih.svg"
                      alt="PUSAKA Logo"
                      width={140}
                      height={47}
                      className="h-auto w-[120px] sm:w-[140px]"
                    />
                  </div>
                  <p className="max-w-xs font-sans text-xs leading-relaxed text-white">
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
              <div className="grid grid-cols-2 items-start gap-6 sm:flex sm:justify-end sm:gap-10 sm:pt-4 lg:flex-1 lg:justify-center lg:gap-12">
                {/* Company Links */}
                <div className="text-left sm:text-center">
                  <h4 className="mb-2 font-sans text-sm font-bold text-white">Company</h4>
                  <ul className="space-y-1 font-sans text-xs text-white/90">
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
                <div className="text-left sm:text-center">
                  <h4 className="mb-2 font-sans text-sm font-bold text-white">Product</h4>
                  <ul className="space-y-1 font-sans text-xs text-white/90">
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
            <div className="flex flex-col items-start justify-between gap-2 border-t border-white/20 pt-3 font-sans text-xs text-white/70 sm:flex-row sm:items-center">
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
