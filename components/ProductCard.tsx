"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  category?: string;
  description?: string;
}

const ProductCard = ({ id, name, price, image, rating, category, description }: ProductCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Link
        href={`/product/${id}`}
        className="flex h-full flex-col rounded-2xl border border-[#e8e2d7] bg-white p-2.5 shadow-[0_3px_14px_rgba(47,37,27,0.035)] transition-shadow hover:shadow-[0_12px_30px_rgba(47,37,27,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75e3b] sm:rounded-3xl sm:p-3"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#eeeae3] sm:rounded-2xl">
          <Image
            src={image || '/assets/batik_shirt.png'}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.src = '/assets/batik_shirt.png';
            }}
          />
        </div>

        <div className="flex flex-1 flex-col pt-3">
          {category && (
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a75e3b] sm:text-[10px]">
              {category}
            </span>
          )}
          <h3 className="mb-1 line-clamp-2 min-h-9 text-xs font-semibold leading-5 text-[#30231c] transition-colors group-hover:text-[#a75e3b] sm:text-sm">
            {name}
          </h3>
          {description && (
            <p className="mb-2 line-clamp-2 min-h-8 text-[10px] leading-4 text-[#81786f] sm:text-xs">
              {description}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#30231c] sm:text-sm">{price}</p>
              <div className="mt-1 flex items-center gap-0.5" aria-label={`Rating ${rating} dari 5`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={`h-3 w-3 ${i < rating ? 'fill-[#d08a40] text-[#d08a40]' : 'text-[#ded8ce]'}`}
                  />
                ))}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8e2d7] text-[#514840] transition-colors group-hover:border-[#30231c] group-hover:bg-[#30231c] group-hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
