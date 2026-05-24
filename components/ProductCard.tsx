"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
}

const ProductCard = ({ id, name, price, image, rating }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/product/${id}`}>
        <div className="relative aspect-product overflow-hidden rounded-xl bg-pusaka-gray">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-pusaka-black hover:text-accent-maroon transition-colors shadow-sm">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < rating ? 'text-accent-gold fill-accent-gold' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">{rating}.0</span>
        </div>
        
        <h3 className="font-serif text-lg font-medium text-pusaka-black group-hover:text-accent-gold transition-colors">
          {name}
        </h3>
        
        <div className="flex justify-between items-center">
          <p className="text-pusaka-black font-semibold">{price}</p>
          <button className="p-2 border border-pusaka-border rounded-lg hover:bg-pusaka-black hover:text-white transition-all duration-300">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
