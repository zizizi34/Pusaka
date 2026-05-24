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

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
    <footer className="relative bg-pusaka-black text-white pt-24 pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nusa_penida_footer.png"
          alt="Nusa Penida Landscape"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pusaka-black via-pusaka-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-3xl font-serif font-bold tracking-tighter mb-6 block">
              <span className="text-accent-gold mr-1">❖</span> PUSAKA
            </span>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Mempromosikan kekayaan budaya Indonesia melalui koleksi produk lokal berkualitas tinggi dan otentik.
            </p>
            <div className="flex space-x-4 mt-8">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Program Kami</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Karir</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Batik Solo</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Tenun Ikat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-accent-gold transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Pusaka Nusantara. All Rights Reserved.</p>
          <p>Membanggakan Budaya Bangsa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
