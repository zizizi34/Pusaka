"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  X,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Sparkles,
  MessageCircle,
  ChevronRight,
  Award,
  Layers,
  HelpCircle,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductData {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image: string;
  images?: string[];
  stock?: number;
  sku?: string;
  origin?: string;
  material?: string;
  technique?: string;
  dimensions?: string;
  weight?: string;
  philosophy?: string;
  careInstructions?: string[];
  rating?: number;
  reviewsCount?: number;
  soldCount?: number;
}

interface CartEntry {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const DETAILED_DEFAULT_PRODUCTS: ProductData[] = [
  {
    id: '1',
    name: 'Outer Batik Marun Floral',
    price: 450000,
    category: 'Batik',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Outer batik dengan motif bernuansa marun yang membawa keindahan wastra ke dalam gaya sehari-hari. Dibuat dengan siluet longgar kontemporer yang anggun, memberikan kenyamanan fleksibel untuk dikenakan di berbagai suasana resmi maupun santai.',
    stock: 12,
    sku: 'PSK-BTK-01',
    origin: 'Solo, Jawa Tengah',
    material: 'Katun Primisima Halus & Serat Rayon Lembut',
    technique: 'Batik Cap Kombinasi Tulis Pewarna Ramah Lingkungan',
    dimensions: 'All Size (Lingkar Dada 110 cm, Panjang Baju 72 cm)',
    weight: '320 gram',
    philosophy: 'Motif floral marun melambangkan keteduhan, keanggunan, serta kehangatan hidup. Garis sulur dedaunan merefleksikan pertumbuhan yang senantiasa selaras dengan kebaikan alam sekitar.',
    careInstructions: [
      'Cuci tangan secara lembut menggunakan sabun lerak atau sampo berformula lembut.',
      'Hindari memeras kain terlalu kuat guna menjaga kerapian serat katun alami.',
      'Jemur di area yang teduh dan berangin tanpa terpapar terik matahari langsung.',
      'Setrika pada suhu sedang dengan membalik bagian dalam atau memakai kain pelapis.',
    ],
    rating: 5,
    reviewsCount: 42,
    soldCount: 128,
  },
  {
    id: '2',
    name: 'Kemeja Batik Biru Emas',
    price: 525000,
    category: 'Batik',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Kemeja batik dengan palet biru samudra dan ornamen keemasan untuk tampilan berwibawa dengan sentuhan tradisi. Dilengkapi furing katun hero yang menyerap keringat dan adem dipakai sepanjang hari.',
    stock: 8,
    sku: 'PSK-BTK-02',
    origin: 'Pekalongan, Jawa Tengah',
    material: 'Katun Primisima Mercerized (Kualitas Ekspor)',
    technique: 'Batik Cap Halus Dua Sisi & Furing Hero Katun',
    dimensions: 'Tersedia ukuran M (LD 104), L (LD 108), XL (LD 112)',
    weight: '350 gram',
    philosophy: 'Harmoni warna biru laut dan kilau emas terinspirasi dari kemegahan pesisir Nusantara masa lampau, memancarkan simbol ketenangan batin dan keluhuran budi.',
    careInstructions: [
      'Pisahkan dari pakaian berwarna terang pada pencucian awal.',
      'Gunakan air dingin dan deterjen cair tanpa pemutih.',
      'Jemur dalam kondisi dibalik di tempat teduh.',
      'Setrika pada suhu katun di sisi dalam kemeja.',
    ],
    rating: 4.9,
    reviewsCount: 36,
    soldCount: 94,
  },
  {
    id: '3',
    name: 'Kain Tenun Ikat Sumba',
    price: 1250000,
    category: 'Tenun Ikat',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Kain tenun ikat asli Sumba Timur yang dirangkai helai demi helai melalui keterampilan tangan penenun lokal selama berbulan-bulan. Menggunakan benang serat kapas alami dan pewarna nabati otentik seperti akar mengkudu dan daun nila.',
    stock: 4,
    sku: 'PSK-TNN-03',
    origin: 'Sumba Timur, Nusa Tenggara Timur',
    material: 'Serat Kapas Alami Pintal Tangan (Handspun Cotton)',
    technique: 'Tenun Ikat Gedog Tradisional dengan Pewarna Alami',
    dimensions: 'Panjang 240 cm x Lebar 115 cm',
    weight: '750 gram',
    philosophy: 'Figur kuda (njara) dan pohon andung menyimbolkan kekuatan, kepemimpinan, keberanian, dan penghormatan kepada para leluhur penjaga tanah Sumba.',
    careInstructions: [
      'Dry clean atau cuci angin secara berkala tanpa direndam air berlebihan.',
      'Gunakan air lerak murni bila perlu membersihkan noda kecil.',
      'Simpan dalam gulungan rapi di tempat kering dan bersih.',
      'Sertakan pengharum rempah alami seperti cengkeh di lemari.',
    ],
    rating: 5,
    reviewsCount: 28,
    soldCount: 52,
  },
  {
    id: '4',
    name: 'Selendang Sutra Batik',
    price: 320000,
    category: 'Batik',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Selendang sutra dengan motif batik yang jatuh anggun di bahu. Sangat manis disematkan sebagai aksen busana resmi, selendang kebaya pesta, maupun scarf elegan untuk acara istimewa.',
    stock: 15,
    sku: 'PSK-SLD-04',
    origin: 'Yogyakarta',
    material: 'Sutra ATBM Halus & Berkilau Alami',
    technique: 'Batik Tulis Halus Canting Tembaga',
    dimensions: 'Panjang 180 cm x Lebar 55 cm',
    weight: '180 gram',
    philosophy: 'Ornamen sulur lembut mencerminkan kelemahlembutan budi pekerti serta keluwesan wanita dalam meniti setiap langkah kehidupan.',
    careInstructions: [
      'Khusus cuci tangan dengan air dingin dan sampo khusus sutra.',
      'Jangan memeras atau mengeringkan dengan mesin putar.',
      'Bentangkan di atas handuk bersih di area teduh.',
      'Gunakan suhu sutra saat menyetrika.',
    ],
    rating: 4.8,
    reviewsCount: 19,
    soldCount: 88,
  },
  {
    id: '5',
    name: 'Kebaya Modern Putih',
    price: 680000,
    category: 'Pakaian Adat',
    image: 'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Siluet kebaya kartini modern yang mempertemukan kesucian warna putih dengan detail bordir manual bernilai seni tinggi. Potongan feminin yang anggun namun tetap leluasa saat dikenakan beraktivitas.',
    stock: 6,
    sku: 'PSK-KBY-05',
    origin: 'Bandung & Tasikmalaya, Jawa Barat',
    material: 'Katun Brokat Halus & Furing Rayon Dingin',
    technique: 'Bordir Tangan Halus dengan Kancing Bungkus Eksklusif',
    dimensions: 'Tersedia S (LD 88), M (LD 94), L (LD 100)',
    weight: '300 gram',
    philosophy: 'Kebaya putih mencerminkan ketulusan budi, kesucian niat, dan pesona abadi wanita Indonesia yang bersahaja.',
    careInstructions: [
      'Cuci lembut secara terpisah menggunakan kantung pelindung cuci.',
      'Gunakan deterjen bebas pemutih klorin.',
      'Gantung dengan hanger empuk berbusa.',
      'Setrika suhu rendah hingga sedang.',
    ],
    rating: 4.9,
    reviewsCount: 31,
    soldCount: 74,
  },
  {
    id: '6',
    name: 'Batik Pria Slim Fit',
    price: 410000,
    category: 'Batik',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Kemeja batik dengan potongan ramping kontemporer untuk pilihan busana harian pria modern. Nyaman dan berkelas dikenakan untuk keperluan kerja, rapat, maupun silaturahmi perayaan.',
    stock: 14,
    sku: 'PSK-BTK-06',
    origin: 'Solo, Jawa Tengah',
    material: 'Katun Primisima Dobby Halus Bertekstur',
    technique: 'Batik Cap Presisi dengan Pola Nyambung Tailor',
    dimensions: 'Size M (LD 104 cm), L (LD 108 cm), XL (LD 112 cm)',
    weight: '310 gram',
    philosophy: 'Pola geometris Parang Barong menyimbolkan keteguhan hati, integritas kepemimpinan, dan semangat pantang menyerah.',
    careInstructions: [
      'Cuci deterjen ramah kain dan hindari pengering mesin putaran tinggi.',
      'Jemur di area berangin terlindung atap.',
      'Setrika dengan uap untuk merapikan tekstur dobby.',
    ],
    rating: 4.7,
    reviewsCount: 22,
    soldCount: 110,
  },
  {
    id: '7',
    name: 'Tas Rotan Tradisional',
    price: 215000,
    category: 'Kerajinan',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Tas anyaman rotan alami dengan lapisan furing motif batik khas di bagian dalam. Desain bulat etnik yang unik, ringan dibawa bepergian santai atau melengkapi gaya liburan tropis.',
    stock: 9,
    sku: 'PSK-RTN-07',
    origin: 'Lombok, Nusa Tenggara Barat',
    material: 'Serat Rotan Asli & Tali Kulit Sintetis Nabati',
    technique: 'Anyaman Tangan Tradisional & Pengasapan Tempurung Kelapa',
    dimensions: 'Diameter 20 cm x Tebal 7 cm, Panjang Tali 120 cm',
    weight: '380 gram',
    philosophy: 'Anyaman rotan yang saling merajut erat melambangkan gotong royong dan kesatuan hati dalam masyarakat adat Nusantara.',
    careInstructions: [
      'Bersihkan debu sela anyaman dengan kuas halus atau lap kering.',
      'Hindari terkena air tergenang dalam waktu lama.',
      'Bila terasa lembap, angin-anginkan di udara terbuka berangin.',
    ],
    rating: 4.9,
    reviewsCount: 45,
    soldCount: 160,
  },
  {
    id: '8',
    name: 'Kalung Manik Dayak',
    price: 185000,
    category: 'Aksesoris',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Aksesori manik khas suku Dayak dengan perpaduan warna berani yang sarat makna. Dirangkai dengan benang nilon kuat dan pengait tahan karat yang tahan lama.',
    stock: 20,
    sku: 'PSK-AKS-08',
    origin: 'Kalimantan Timur',
    material: 'Manik Kaca Halus & Benang Nilon Berlapis Lilin',
    technique: 'Rangkaian Tangan Tradisional (Handcrafted)',
    dimensions: 'Panjang Kalung 45 cm (Dapat disesuaikan)',
    weight: '120 gram',
    philosophy: 'Warna kuning, merah, dan hitam pada motif Dayak melambangkan keagungan surga, keberanian jiwa, dan keteguhan bumi pertiwi.',
    careInstructions: [
      'Simpan di dalam pouch kain saat tidak dikenakan.',
      'Hindari semprotan parfum atau zat kimia pekat secara langsung.',
      'Bersihkan permukaan manik dengan kain microfiber kering.',
    ],
    rating: 5,
    reviewsCount: 17,
    soldCount: 65,
  },
];

// Mapping for Home page IDs ('def-1' through 'def-8')
const HOMEPAGE_PRODUCTS_MAP: Record<string, ProductData> = {
  'def-1': {
    id: 'def-1',
    name: 'Baju Batik Wanita Modern',
    category: 'Batik',
    price: 2000000,
    image: '/assets/batik_shirt.png',
    images: ['/assets/batik_shirt.png', 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop'],
    description: 'Batik autentik berkualitas tinggi dengan sentuhan modern khas Nusantara. Dibuat langsung oleh pembatik terampil dengan cita rasa estetika tinggi.',
    stock: 5,
    sku: 'PSK-DEF-01',
    origin: 'Solo, Jawa Tengah',
    material: 'Katun Primisima Berstandar Ekspor',
    technique: 'Batik Tulis Halus Canting Tradisional',
    dimensions: 'All Size (Lingkar Dada 105 cm, Panjang 70 cm)',
    weight: '300 gram',
    philosophy: 'Kombinasi motif klasik dan potongan modern melambangkan kesinambungan warisan budaya yang tak lekang oleh masa.',
    careInstructions: [
      'Cuci tangan dengan air dingin dan sabun lerak alami.',
      'Jangan diperas kuat dan jemur di tempat teduh.',
      'Setrika suhu sedang dari bagian dalam pakaian.',
    ],
    rating: 5,
    reviewsCount: 24,
    soldCount: 78,
  },
  'def-2': {
    id: 'def-2',
    name: 'Kain Tenun Sumba Tradisional',
    category: 'Tenun Ikat',
    price: 1500000,
    image: '/assets/handwoven_textile.png',
    images: ['/assets/handwoven_textile.png', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'],
    description: 'Tenun ikat khas Nusantara dibuat langsung oleh penenun lokal dengan alat tenun bukan mesin, menghasilkan tekstur yang khas dan bernilai seni tinggi.',
    stock: 3,
    sku: 'PSK-DEF-02',
    origin: 'Sumba Timur, NTT',
    material: 'Serat Kapas Alam & Pewarna Akar Tumbuhan',
    technique: 'Tenun Ikat Gedog Tradisional',
    dimensions: 'Panjang 220 cm x Lebar 110 cm',
    weight: '700 gram',
    philosophy: 'Setiap goresan motif merupakan doa keselamatan dan penghormatan terhadap alam serta leluhur.',
    careInstructions: ['Dry clean atau cuci angin.', 'Hindari perendaman air berlebih.', 'Simpan dalam gulungan kain bersih.'],
    rating: 5,
    reviewsCount: 30,
    soldCount: 45,
  },
  'def-3': {
    id: 'def-3',
    name: 'Wayang Kulit Klasik',
    category: 'Kerajinan',
    price: 1800000,
    image: '/assets/wayang_puppet.png',
    images: ['/assets/wayang_puppet.png', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop'],
    description: 'Karya seni wayang kulit khas Jawa dengan detail tatahan tangan yang sangat teliti dan pewarnaan prada emas asli.',
    stock: 7,
    sku: 'PSK-DEF-03',
    origin: 'Bantul, D.I. Yogyakarta',
    material: 'Kulit Kerbau Pilihan & Tangkai Tanduk Kerbau Asli',
    technique: 'Tatahan Manual & Sungging Prada Emas Halus',
    dimensions: 'Tinggi Tokoh 65 cm (Tinggi Total dengan Gapit 85 cm)',
    weight: '450 gram',
    philosophy: 'Tokoh pewayangan melambangkan keteguhan moral, kebijaksanaan, dan harmoni hidup jagad cilik dan jagad gede.',
    careInstructions: ['Bersihkan debu dengan kuas halus.', 'Simpan di tempat kering terhindar dari lembap.', 'Beri kapur barus alami di kotak penyimpanan.'],
    rating: 4.9,
    reviewsCount: 15,
    soldCount: 38,
  },
  'def-4': {
    id: 'def-4',
    name: 'Outer Batik Motif Parang',
    category: 'Batik',
    price: 2200000,
    image: '/assets/batik_shirt.png',
    images: ['/assets/batik_shirt.png', 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop'],
    description: 'Motif parang klasik yang memancarkan keanggunan budaya. Cocok digunakan untuk acara gala formal maupun menghadiri konferensi internasional.',
    stock: 4,
    sku: 'PSK-DEF-04',
    origin: 'Yogyakarta',
    material: 'Katun Primisima Halus & Tenun Sutra Campuran',
    technique: 'Batik Tulis Halus Canting',
    dimensions: 'All Size (Lingkar Dada 108 cm, Panjang 75 cm)',
    weight: '330 gram',
    philosophy: 'Motif Parang menyimbolkan ombak samudra yang tak pernah berhenti bergulir, menggambarkan tekad yang tak pernah patah.',
    careInstructions: ['Cuci tangan lembut dengan sabun lerak.', 'Jemur di tempat teduh.', 'Setrika suhu sedang dari bagian dalam.'],
    rating: 5,
    reviewsCount: 29,
    soldCount: 62,
  },
  'def-5': {
    id: 'def-5',
    name: 'Aksesoris Manik Tradisional',
    category: 'Aksesoris',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop'],
    description: 'Kalung dan aksesoris etnik handmade dengan ornamen khas manik-manik Nusantara yang memikat.',
    stock: 18,
    sku: 'PSK-DEF-05',
    origin: 'Kalimantan Timur',
    material: 'Manik Kaca Halus & Pengait Logam Kuningan',
    technique: 'Anyaman Manik Tangan Manual',
    dimensions: 'Panjang 50 cm',
    weight: '140 gram',
    philosophy: 'Setiap butir manik membawa kehangatan persaudaraan dan keindahan ragam adat Nusantara.',
    careInstructions: ['Simpan di kantung perhiasan.', 'Jauhkan dari zat kimia pekat.'],
    rating: 4.8,
    reviewsCount: 12,
    soldCount: 50,
  },
  'def-6': {
    id: 'def-6',
    name: 'Kemeja Batik Katun Pria',
    category: 'Batik',
    price: 1750000,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'],
    description: 'Kemeja batik katun premium adem dan nyaman digunakan. Dirancang khusus bagi Anda yang mendambakan kenyamanan maksimal dengan estetika formal.',
    stock: 9,
    sku: 'PSK-DEF-06',
    origin: 'Pekalongan, Jawa Tengah',
    material: 'Katun Primisima Berkualitas Tinggi',
    technique: 'Batik Tulis Kombinasi Cap Halus',
    dimensions: 'M, L, XL',
    weight: '340 gram',
    philosophy: 'Warna alam mencerminkan kerendahan hati dan kedamaian hidup.',
    careInstructions: ['Cuci terpisah dengan air dingin.', 'Jemur di area teduh.'],
    rating: 4.9,
    reviewsCount: 18,
    soldCount: 84,
  },
  'def-7': {
    id: 'def-7',
    name: 'Wayang Golek Ukir Kayu',
    category: 'Kerajinan',
    price: 1950000,
    image: '/assets/wayang_puppet.png',
    images: ['/assets/wayang_puppet.png'],
    description: 'Kerajinan wayang golek kayu khas Sunda dengan pahatan ekspresif dan busana kain tradisional bertabur payet.',
    stock: 5,
    sku: 'PSK-DEF-07',
    origin: 'Bandung, Jawa Barat',
    material: 'Kayu Albasia/Lame Pilihan & Kain Satin Brokat',
    technique: 'Ukir Pahatan Tangan & Sungging Manual',
    dimensions: 'Tinggi 55 cm',
    weight: '850 gram',
    philosophy: 'Wayang Golek mengajarkan ketajaman budi pekerti serta kemampuan membedakan kebaikan dan kebatilan.',
    careInstructions: ['Bersihkan dengan kuas lembut kering.', 'Hindari ruangan lembap.'],
    rating: 4.8,
    reviewsCount: 11,
    soldCount: 30,
  },
  'def-8': {
    id: 'def-8',
    name: 'Batik Tulis Sutra Elegan',
    category: 'Batik',
    price: 3100000,
    image: '/assets/batik_shirt.png',
    images: ['/assets/batik_shirt.png'],
    description: 'Batik sutra tulis premium dengan pewarna alami yang mewah. Mahakarya seni tekstil untuk penikmat keindahan autentik.',
    stock: 2,
    sku: 'PSK-DEF-08',
    origin: 'Solo, Jawa Tengah',
    material: '100% Sutra ATBM Super',
    technique: 'Batik Tulis Canting Tangan Penuh (Full Tulis)',
    dimensions: 'Panjang 260 cm x Lebar 115 cm',
    weight: '280 gram',
    philosophy: 'Kelembutan sutra dan kerumitan motif tulis mencerminkan kesabaran paripurna dan keagungan budi luhur.',
    careInstructions: ['Khusus dry clean profesional atau cuci lerak dingin.', 'Jangan terkena setrika panas langsung.'],
    rating: 5,
    reviewsCount: 14,
    soldCount: 22,
  },
};

function parseProduct(value: unknown): ProductData | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;

  const product = value as Record<string, unknown>;
  const price = typeof product.price === 'number' ? product.price : Number(product.price);
  if (typeof product.id !== 'string' || typeof product.name !== 'string' || !Number.isFinite(price)) return null;

  const rawImage = typeof product.image === 'string' && product.image.trim() ? product.image : '/assets/batik_shirt.png';
  const category = typeof product.category === 'string' ? product.category : 'Kriya Nusantara';

  return {
    id: product.id,
    name: product.name,
    price,
    category,
    description: typeof product.description === 'string' ? product.description : undefined,
    image: rawImage,
    images: [rawImage],
    stock: typeof product.stock === 'number' && Number.isFinite(product.stock) ? product.stock : 10,
    sku: typeof product.sku === 'string' ? product.sku : `PSK-${product.id.slice(0, 6).toUpperCase()}`,
    origin: 'Nusantara, Indonesia',
    material: 'Bahan Alami Berkualitas Prima',
    technique: 'Buatan Tangan / Kriya Autentik',
    dimensions: 'Standar Kerajinan / Pakaian',
    weight: '350 gram',
    philosophy: 'Karya ini dirancang dengan melestarikan nilai estetika budaya Nusantara yang kaya akan makna dan kehangatan tradisi.',
    careInstructions: [
      'Rawat dengan kelembutan sesuai petunjuk bahan alami.',
      'Hindari penggunaan pemutih berbahan kimia keras.',
      'Simpan di tempat bersih dan kering dengan sirkulasi udara baik.',
    ],
    rating: 5,
    reviewsCount: 16,
    soldCount: 45,
  };
}

const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Ratna Sulistyo',
    location: 'Jakarta Selatan',
    date: '2 minggu lalu',
    rating: 5,
    comment: 'Kainnya sangat halus dan motifnya rapi sekali. Warna aslinya bahkan lebih anggun daripada di foto. Dikemas dengan box eksklusif dan ada kartu kisah filosofinya, sangat berkelas!',
  },
  {
    id: 2,
    name: 'Dimas Wicaksono',
    location: 'Surabaya',
    date: '1 bulan lalu',
    rating: 5,
    comment: 'Puas sekali belanja di Pusaka. Pengiriman cepat dan packing berlapis pelindung. Kualitas wastranya membuktikan bahwa karya perajin lokal kita punya standar internasional.',
  },
  {
    id: 3,
    name: 'Anindya Putri',
    location: 'Bandung',
    date: '1 bulan lalu',
    rating: 5,
    comment: 'Jahitannya presisi dan potongannya pas di badan. Dipakai acara pernikahan seharian tetap adem dan tidak mudah kusut. Pasti akan order koleksi motif lainnya!',
  },
];

const ProductDetail = () => {
  const params = useParams();
  const productId = typeof params?.id === 'string' ? params.id : '';
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'filosofi' | 'spesifikasi' | 'perawatan' | 'pengiriman'>('filosofi');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchDetail = async () => {
      let product: ProductData | null = null;

      // 1. Check local detailed list or home page map
      const foundInDetailed = DETAILED_DEFAULT_PRODUCTS.find((item) => item.id === productId);
      if (foundInDetailed) {
        product = foundInDetailed;
      } else if (HOMEPAGE_PRODUCTS_MAP[productId]) {
        product = HOMEPAGE_PRODUCTS_MAP[productId];
      }

      // 2. If not found in defaults, check Database API
      if (!product) {
        try {
          const res = await fetch(`/api/products/${productId}`);
          if (res.ok) {
            product = parseProduct(await res.json());
          }
        } catch (error) {
          console.warn('Gagal fetch detail produk dari API:', error);
        }
      }

      // 3. Fallback to localStorage products
      if (!product) {
        try {
          const stored = localStorage.getItem('pusaka_products');
          if (stored) {
            const parsed: unknown = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              product = parsed
                .map(parseProduct)
                .find((item): item is ProductData => item !== null && item.id === productId) || null;
            }
          }
        } catch (error) {
          console.warn('Gagal memuat data produk lokal:', error);
        }
      }

      // 4. Fallback if id was numeric like '1' but matched with 'def-1' or vice versa
      if (!product) {
        if (productId.startsWith('def-')) {
          const numId = productId.replace('def-', '');
          product = DETAILED_DEFAULT_PRODUCTS.find((item) => item.id === numId) || null;
        } else {
          product = HOMEPAGE_PRODUCTS_MAP[`def-${productId}`] || null;
        }
      }

      if (active) {
        setProductData(product);
        setSelectedImageIndex(0);
        setLoading(false);
      }
    };

    void fetchDetail();
    return () => {
      active = false;
    };
  }, [productId]);

  // Gallery images list
  const galleryImages = useMemo(() => {
    if (!productData) return [];
    if (productData.images && productData.images.length > 0) {
      return productData.images;
    }
    return [productData.image];
  }, [productData]);

  // Related products
  const relatedProducts = useMemo(() => {
    return DETAILED_DEFAULT_PRODUCTS.filter((item) => item.id !== productId)
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: `Rp ${item.price.toLocaleString('id-ID')}`,
        image: item.image,
        category: item.category,
        description: item.description,
        rating: item.rating || 5,
      }));
  }, [productId]);

  const handleAddToCart = () => {
    if (!productData) return;

    try {
      const stored = localStorage.getItem('pusaka_cart');
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      const cart: CartEntry[] = Array.isArray(parsed)
        ? parsed.filter(
            (item): item is CartEntry =>
              typeof item === 'object' &&
              item !== null &&
              typeof item.id === 'string' &&
              typeof item.quantity === 'number',
          )
        : [];

      const existing = cart.find((item) => item.id === productData.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: productData.id,
          name: productData.name,
          price: productData.price,
          image: productData.image,
          quantity,
        });
      }

      localStorage.setItem('pusaka_cart', JSON.stringify(cart));
      setToastMessage(`${quantity}x ${productData.name} berhasil ditambahkan ke keranjang.`);
    } catch (error) {
      console.warn('Gagal menyimpan produk ke keranjang:', error);
      setToastMessage('Produk belum dapat ditambahkan. Silakan coba lagi.');
    }
  };

  const handleDirectWhatsApp = () => {
    if (!productData) return;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const message = `Halo Pusaka Nusantara, saya tertarik dengan karya *${productData.name}* (Rp ${productData.price.toLocaleString('id-ID')}). Jumlah yang diinginkan: ${quantity} buah.\n\nTautan: ${currentUrl}\nApakah stok ini masih tersedia? Terima kasih!`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.share) {
        await navigator.share({
          title: productData?.name || 'Pusaka Nusantara',
          text: `Lihat keindahan ${productData?.name} di Pusaka Nusantara:`,
          url: window.location.href,
        });
      } else if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage('Tautan produk berhasil disalin ke clipboard.');
      }
    } catch (error) {
      console.warn('Gagal berbagi tautan:', error);
      setToastMessage('Tautan produk disalin.');
    }
  };

  const stockAvailable = productData?.stock ?? 10;
  const canAddQuantity = quantity < stockAvailable;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f0] text-[#28221d] antialiased">
      <Navbar />

      <AnimateProductToast message={toastMessage} onClose={() => setToastMessage(null)} />

      {loading ? (
        <section className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
          <div className="mb-6 h-5 w-64 animate-pulse rounded-lg bg-[#e8e2d7]" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-4">
              <div className="aspect-[4/5] w-full animate-pulse rounded-3xl bg-[#eae5dc]" />
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square animate-pulse rounded-2xl bg-[#eae5dc]" />
                <div className="aspect-square animate-pulse rounded-2xl bg-[#eae5dc]" />
                <div className="aspect-square animate-pulse rounded-2xl bg-[#eae5dc]" />
              </div>
            </div>
            <div className="space-y-6 py-2">
              <div className="h-4 w-32 animate-pulse rounded bg-[#e8e2d7]" />
              <div className="h-12 w-4/5 animate-pulse rounded-xl bg-[#e8e2d7]" />
              <div className="h-8 w-1/3 animate-pulse rounded-lg bg-[#e8e2d7]" />
              <div className="h-20 animate-pulse rounded-xl bg-[#e8e2d7]" />
              <div className="h-14 animate-pulse rounded-full bg-[#e8e2d7]" />
              <div className="h-32 animate-pulse rounded-2xl bg-[#e8e2d7]" />
            </div>
          </div>
        </section>
      ) : !productData ? (
        <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 pt-32 text-center sm:px-6 sm:pt-36">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#eee6dc] text-[#a75e3b] shadow-inner">
            <ShoppingBag className="h-9 w-9 stroke-[1.5]" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a75e3b]">
            Karya Tidak Ditemukan
          </p>
          <h1 className="font-italiana text-3xl text-[#28221d] sm:text-4xl md:text-5xl">
            Produk ini belum atau tidak tersedia.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6d655e]">
            Karya yang Anda tuju mungkin sedang diperbarui oleh perajin atau telah diarsipkan ke dalam ruang koleksi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#30231c] px-6 text-sm font-medium text-white transition-all hover:bg-[#49372d] hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" /> Jelajahi Katalog
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#d8d0c5] bg-white px-6 text-sm font-medium text-[#493e36] transition-colors hover:border-[#30231c]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Breadcrumbs & Navigation Bar */}
          <div className="pt-20 sm:pt-22 md:pt-24 pb-2.5 sm:pb-3 border-b border-[#e9e3da] bg-[#fbf9f5]/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-[11px] sm:text-xs text-[#7e746b]">
                <Link href="/" className="transition-colors hover:text-[#a75e3b] shrink-0">
                  Beranda
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#b8afa4] shrink-0" />
                <Link href="/catalog" className="transition-colors hover:text-[#a75e3b] shrink-0">
                  Katalog
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#b8afa4] shrink-0" />
                <span className="font-medium text-[#a75e3b] shrink-0">{productData.category || 'Kriya'}</span>
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#b8afa4] shrink-0" />
                <span className="max-w-[130px] sm:max-w-xs truncate font-medium text-[#28221d]">
                  {productData.name}
                </span>
              </nav>

              <Link
                href="/catalog"
                className="hidden items-center gap-1.5 text-xs font-semibold text-[#665a50] transition-colors hover:text-[#a75e3b] sm:inline-flex shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Katalog
              </Link>
            </div>
          </div>

          {/* Main Product Showcase Section */}
          <section className="px-4 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pt-6">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1fr_1.15fr] lg:gap-8 xl:gap-12">
                {/* Left Column: Visual Presentation & Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-3 sm:space-y-4 lg:sticky lg:top-24"
                >
                  {/* Main Image Container */}
                  <div className="group relative aspect-[4/5] max-h-[340px] sm:max-h-[420px] md:max-h-[460px] lg:max-h-[min(480px,calc(100vh-190px))] xl:max-h-[520px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e5dfd4] bg-[#eae5dc] shadow-[0_4px_24px_rgba(40,34,29,0.06)]">
                    <img
                      src={galleryImages[selectedImageIndex] || productData.image}
                      alt={productData.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/batik_shirt.png';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    {/* Badge Top Left */}
                    <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        <Sparkles className="h-3 w-3 text-[#f2b972]" /> 100% Buatan Tangan
                      </span>
                    </div>

                    {/* Wishlist Button Top Right */}
                    <button
                      type="button"
                      onClick={() => {
                        setLiked((val) => !val);
                        setToastMessage(
                          !liked ? `"${productData.name}" ditambahkan ke favorit.` : 'Dihapus dari favorit.',
                        );
                      }}
                      aria-label={liked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                      className="absolute right-3 top-3 sm:right-5 sm:top-5 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#4a3f36] shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:text-[#a75e3b] active:scale-95"
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                          liked ? 'fill-[#b94a34] text-[#b94a34]' : 'text-current'
                        }`}
                      />
                    </button>

                    {/* Bottom Tag */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between text-white">
                      <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm">
                        Kriya Nusantara Autentik
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-medium text-white/80">
                        {selectedImageIndex + 1} / {galleryImages.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery (if multiple) */}
                  {galleryImages.length > 1 && (
                    <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 pt-0.5">
                      {galleryImages.map((imgSrc, idx) => {
                        const isSelected = idx === selectedImageIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            aria-label={`Lihat foto ${idx + 1}`}
                            className={`relative aspect-square w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                              isSelected
                                ? 'border-[#a75e3b] shadow-md ring-2 ring-[#a75e3b]/20'
                                : 'border-[#e4ded4] opacity-75 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={imgSrc}
                              alt={`${productData.name} view ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Craftsmanship Guarantees Strip */}
                  <div className="grid grid-cols-3 gap-2 rounded-xl sm:rounded-2xl border border-[#e8e2d7] bg-white/70 p-2 sm:p-2.5 sm:p-3 backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center">
                      <ShieldCheck className="mb-0.5 h-4 w-4 sm:h-5 sm:w-5 text-[#607456]" />
                      <span className="text-[10px] font-bold text-[#30231c] sm:text-xs">100% Orisinil</span>
                      <span className="text-[8px] text-[#786e64] sm:text-[10px]">Kurasi Budaya</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-[#e8e2d7] px-1 text-center">
                      <Truck className="mb-0.5 h-4 w-4 sm:h-5 sm:w-5 text-[#a75e3b]" />
                      <span className="text-[10px] font-bold text-[#30231c] sm:text-xs">Kemasan Aman</span>
                      <span className="text-[8px] text-[#786e64] sm:text-[10px]">Lapisan Ganda</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <RefreshCw className="mb-0.5 h-4 w-4 sm:h-5 sm:w-5 text-[#607456]" />
                      <span className="text-[10px] font-bold text-[#30231c] sm:text-xs">Garansi Retur</span>
                      <span className="text-[8px] text-[#786e64] sm:text-[10px]">7 Hari Kembali</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Information, Pricing, & Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  {/* Category & Region Pill */}
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#c89577]/40 bg-[#c89577]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a75e3b]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a75e3b]" />
                        {productData.category || 'Kriya Nusantara'}
                      </span>
                      {productData.origin && (
                        <span className="text-[11px] sm:text-xs font-medium text-[#7a6f65]">
                          • {productData.origin}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[#8c8277]">
                      {productData.sku || `PSK-${productData.id}`}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-italiana text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-normal leading-tight tracking-[-0.03em] text-[#28221d]">
                    {productData.name}
                  </h1>

                  {/* Rating & Social Proof */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 border-b border-[#e9e3da] pb-2.5 text-xs">
                    <div className="flex items-center gap-1" aria-label={`Rating ${productData.rating || 5} dari 5`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                            i < Math.floor(productData.rating || 5)
                              ? 'fill-[#d08a40] text-[#d08a40]'
                              : 'text-[#dfd7cc]'
                          }`}
                        />
                      ))}
                      <span className="ml-0.5 text-xs font-bold text-[#28221d]">
                        {(productData.rating || 5).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-[#8c8277]">
                      ({productData.reviewsCount || 38} ulasan)
                    </span>
                    <span className="text-[#b8afa4]">|</span>
                    <span className="text-[11px] sm:text-xs font-medium text-[#607456]">
                      Terjual {productData.soldCount || 85}+ karya
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-[#e8e2d7] bg-white p-3 sm:p-4 shadow-sm">
                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#8c8277]">Harga Karya</p>
                    <div className="mt-0.5 flex flex-wrap items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#28221d]">
                        Rp {productData.price.toLocaleString('id-ID')}
                      </span>
                      <span className="rounded-full bg-[#f1ece4] px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#63574c]">
                        Bebas PPN
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="mt-2 flex items-center gap-1.5 sm:gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          stockAvailable > 0 ? 'bg-[#5b7e3c] animate-pulse' : 'bg-[#c44933]'
                        }`}
                      />
                      <span className="text-[11px] sm:text-xs font-medium text-[#4f453d]">
                        {stockAvailable > 0
                          ? `Stok Tersedia (${stockAvailable} unit siap kirim)`
                          : 'Stok sedang habis'}
                      </span>
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-[#685e55] line-clamp-3 lg:line-clamp-4">
                    {productData.description ||
                      'Sebuah karya pilihan yang memadukan keterampilan turun-temurun dengan estetika masa kini, membawa kehangatan budaya Nusantara ke dalam keseharian.'}
                  </p>

                  {/* Key Highlights Quick Specs */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-[#e8e2d7] bg-white/70 p-2 sm:p-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#a75e3b]">Bahan</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs font-medium text-[#30231c]" title={productData.material}>
                        {productData.material || 'Katun & Serat Alami'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#e8e2d7] bg-white/70 p-2 sm:p-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#a75e3b]">Teknik</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs font-medium text-[#30231c]" title={productData.technique}>
                        {productData.technique || 'Buatan Tangan Halus'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#e8e2d7] bg-white/70 p-2 sm:p-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#a75e3b]">Asal Sentra</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs font-medium text-[#30231c]" title={productData.origin}>
                        {productData.origin || 'Solo / Pekalongan'}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Subtotal Selector */}
                  <div className="mt-3 rounded-xl border border-[#e5dfd5] bg-white/60 p-2.5 sm:p-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#514840]">
                          Jumlah Pesanan
                        </p>
                        <p className="text-[10px] text-[#7e7367]">Maks. {stockAvailable} per transaksi</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 sm:h-10 items-center rounded-full border border-[#d6cec2] bg-white shadow-sm">
                          <button
                            type="button"
                            aria-label="Kurangi jumlah pesanan"
                            onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                            disabled={quantity <= 1}
                            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-l-full text-[#514840] transition-colors hover:bg-[#f6f2ec] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span
                            className="min-w-8 text-center text-xs sm:text-sm font-bold text-[#30231c]"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Tambah jumlah pesanan"
                            onClick={() => setQuantity((v) => Math.min(stockAvailable, v + 1))}
                            disabled={!canAddQuantity}
                            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-r-full text-[#514840] transition-colors hover:bg-[#f6f2ec] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#81786f]">Subtotal</p>
                          <p className="text-xs sm:text-sm font-bold text-[#30231c]">
                            Rp {(productData.price * quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Call to Action Buttons */}
                  <div className="mt-3.5 space-y-2">
                    <div className="grid grid-cols-[1fr_auto] gap-2.5">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={stockAvailable === 0}
                        className="inline-flex min-h-11 sm:min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#30231c] px-5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#4a362c] hover:shadow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ShoppingBag className="h-4 w-4" /> Tambah ke Keranjang
                      </button>

                      <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Salin tautan atau bagikan karya"
                        title="Bagikan karya ini"
                        className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#d8d0c5] bg-white text-sm font-medium text-[#493e36] transition-colors hover:border-[#30231c] hover:bg-[#faf7f2]"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Secondary Direct Order / WhatsApp Button */}
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="inline-flex min-h-10 sm:min-h-10.5 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 text-xs font-semibold text-[#127a37] transition-colors hover:bg-[#25D366]/20"
                    >
                      <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Beli Langsung / Konsultasi via WhatsApp
                    </button>
                  </div>

                  {/* Cultural Assurance Banner */}
                  <div className="mt-3.5 sm:mt-4 rounded-xl border border-[#e4ded4] bg-[#fbf9f5] p-3 text-[11px] sm:text-xs text-[#6e6359]">
                    <div className="flex items-start gap-2.5">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#a75e3b]" />
                      <div>
                        <p className="font-semibold text-[#30231c]">Dukungan Keberlanjutan Perajin</p>
                        <p className="mt-0.5 leading-relaxed text-[10px] sm:text-xs">
                          Sebagian hasil penjualan dialokasikan untuk pembinaan dan regenerasi perajin muda di daerah sentra.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Interactive Detailed Tabs Section */}
          <section className="border-t border-[#e8e2d7] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 sm:mb-8 border-b border-[#ece7de]">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6">
                  {[
                    { id: 'filosofi', label: 'Filosofi & Kisah Karya', icon: Layers },
                    { id: 'spesifikasi', label: 'Spesifikasi Lengkap', icon: Info },
                    { id: 'perawatan', label: 'Panduan Perawatan', icon: HelpCircle },
                    { id: 'pengiriman', label: 'Pengiriman & Garansi', icon: Truck },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`inline-flex items-center gap-1.5 sm:gap-2 border-b-2 px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                          isActive
                            ? 'border-[#a75e3b] text-[#a75e3b]'
                            : 'border-transparent text-[#7e7367] hover:text-[#30231c]'
                        }`}
                      >
                        <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[220px]">
                {activeTab === 'filosofi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
                  >
                    <div>
                      <h3 className="font-italiana text-2xl text-[#28221d] sm:text-3xl">
                        Makna &amp; Cerita di Balik Motif
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#685e55] sm:text-base sm:leading-8">
                        {productData.philosophy ||
                          'Setiap ornamen dan gubahan ragam hias pada karya ini terinspirasi dari kearifan leluhur Nusantara. Corak yang dihadirkan bukan sekadar hiasan visual, melainkan doa, simbol keharmonisan, serta penghormatan mendalam terhadap semesta alam.'}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[#685e55] sm:text-base sm:leading-8">
                        Dikerjakan dengan kesabaran tinggi, setiap helai kain atau ukiran membutuhkan ketelitian ekstra dari tangan-tangan terampil yang menjaga keaslian teknik pusaka.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-[#ebe5dc] bg-[#f9f7f2] p-6 sm:p-8">
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#a75e3b]">
                        Nilai Autentisitas Pusaka
                      </h4>
                      <ul className="mt-4 space-y-3 text-xs leading-relaxed text-[#5a5047] sm:text-sm">
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#607456]" />
                          <span>Pewarnaan tradisional alami yang ramah lingkungan dan aman bagi kulit sensitif.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#607456]" />
                          <span>Dibuat terbatas (limited craft) untuk menjaga eksklusivitas karya seni Anda.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#607456]" />
                          <span>Disertai sertifikat kurasi resmi yang mencantumkan nama sentra perajin.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'spesifikasi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-2xl border border-[#ebe5dc] bg-[#fbf9f6]"
                  >
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody className="divide-y divide-[#ebe5dc]">
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Nama Karya &amp; SKU
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">
                            {productData.name} ({productData.sku || `PSK-${productData.id}`})
                          </td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Kategori Produk
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.category || 'Kriya Nusantara'}</td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Material Utama
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.material || 'Katun Primisima Halus'}</td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Teknik Pengerjaan
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.technique || 'Buatan Tangan / Kriya Asli'}</td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Asal Daerah Sentra
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.origin || 'Solo, Jawa Tengah'}</td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Dimensi / Ukuran
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.dimensions || 'Standar Karya'}</td>
                        </tr>
                        <tr className="flex flex-col sm:table-row">
                          <td className="w-1/3 bg-[#f3ede4] px-5 py-3 font-semibold text-[#443a31]">
                            Estimasi Berat
                          </td>
                          <td className="px-5 py-3 text-[#584f46]">{productData.weight || '350 gram'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {activeTab === 'perawatan' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    {(productData.careInstructions && productData.careInstructions.length > 0
                      ? productData.careInstructions
                      : [
                          'Cuci lembut secara manual dengan sabun lerak atau sampo ringan.',
                          'Hindari pemakaian deterjen pemutih keras.',
                          'Jemur di tempat teduh yang berangin tanpa terkena sinar matahari terik langsung.',
                          'Setrika dengan suhu sedang dari sisi dalam pakaian.',
                        ]
                    ).map((instruction, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-2xl border border-[#ebe5dc] bg-[#fbf9f6] p-5"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#30231c] text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <p className="text-xs leading-relaxed text-[#5a5047] sm:text-sm">{instruction}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'pengiriman' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                  >
                    <div className="rounded-2xl border border-[#ebe5dc] bg-[#fbf9f6] p-5 text-center sm:text-left">
                      <Truck className="mb-3 h-6 w-6 text-[#a75e3b]" />
                      <h4 className="text-sm font-bold text-[#30231c]">Waktu Pemrosesan Cepat</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#685e55]">
                        Pesanan diverifikasi dan dikemas rapi dalam 1x24 jam kerja sebelum diserahkan ke jasa ekspedisi.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#ebe5dc] bg-[#fbf9f6] p-5 text-center sm:text-left">
                      <ShieldCheck className="mb-3 h-6 w-6 text-[#607456]" />
                      <h4 className="text-sm font-bold text-[#30231c]">Asuransi Pengiriman Penuh</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#685e55]">
                        Semua paket bernilai di atas Rp 500.000 otomatis dilindungi asuransi pengiriman resmi Pusaka.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#ebe5dc] bg-[#fbf9f6] p-5 text-center sm:text-left">
                      <RefreshCw className="mb-3 h-6 w-6 text-[#30231c]" />
                      <h4 className="text-sm font-bold text-[#30231c]">Kemudahan Pengembalian</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#685e55]">
                        Bila produk diterima dalam keadaan cacat atau tidak sesuai pesanan, garansi ganti baru berlaku 7 hari.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="border-t border-[#e8e2d7] bg-[#fbf9f5] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 sm:mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a75e3b]">
                    Ulasan Pelanggan Terverifikasi
                  </p>
                  <h2 className="font-italiana text-2xl sm:text-3xl text-[#28221d]">
                    Kesan Mereka yang Merawat Pusaka
                  </h2>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl sm:rounded-2xl border border-[#ded8ce] bg-white px-3.5 py-2 shadow-sm">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[#d08a40] text-[#d08a40]" />
                  <span className="text-sm sm:text-base font-bold text-[#28221d]">4.9</span>
                  <span className="text-[11px] sm:text-xs text-[#7e7367]">dari 5.0 (98% Puas)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
                {SAMPLE_REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#e8e2d7] bg-white p-4 sm:p-5 lg:p-6 shadow-[0_4px_20px_rgba(40,34,29,0.03)]"
                  >
                    <div>
                      <div className="mb-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#d08a40] text-[#d08a40]" />
                          ))}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#8c8277]">{review.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm italic leading-relaxed text-[#5a5047]">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5 flex items-center gap-2.5 border-t border-[#f0ece5] pt-3">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#f2ede6] text-xs font-semibold text-[#a75e3b]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#30231c]">{review.name}</p>
                        <p className="text-[9px] sm:text-[10px] text-[#8c8277]">{review.location} • Pembeli Terverifikasi</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Products Section */}
          <section className="border-t border-[#e8e2d7] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a75e3b]">
                    Jelajahi Karya Serupa
                  </p>
                  <h2 className="font-italiana text-2xl sm:text-3xl leading-tight text-[#28221d]">
                    Koleksi Pilihan Lainnya
                  </h2>
                </div>
                <Link
                  href="/catalog"
                  className="hidden items-center gap-1.5 pb-1 text-xs sm:text-sm font-semibold text-[#68412e] transition-colors hover:text-[#a75e3b] sm:inline-flex"
                >
                  Lihat Seluruh Katalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              <div className="mt-6 text-center sm:hidden">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 rounded-full border border-[#cfc5b8] px-5 py-2.5 text-xs font-medium text-[#514840] hover:border-[#30231c]"
                >
                  Lihat Seluruh Katalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
};

function AnimateProductToast({ message, onClose }: { message: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 left-4 right-4 z-[70] flex justify-center sm:bottom-8 sm:left-auto sm:right-8"
          aria-live="polite"
        >
          <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-[#211a14] px-4 py-3.5 text-white shadow-2xl backdrop-blur-md">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#607456] text-white">
              {message.includes('belum dapat') || message.includes('Dihapus') ? (
                <X className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </span>
            <div className="flex-1 text-xs font-medium sm:text-sm">
              <p>{message}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup notifikasi"
              className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetail;
