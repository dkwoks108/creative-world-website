import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { InsightArticle } from '@/types';

interface ArticleCardProps {
  article: InsightArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex flex-col justify-between p-6 sm:p-8 border-4 border-black bg-white hover:bg-neutral-50 transition-colors duration-100 space-y-6 group">
      <div className="space-y-4">
        {article.image && (
          <div className="relative h-[200px] w-full border-2 border-black overflow-hidden bg-neutral-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest">
          <span className="px-2 py-0.5 border border-black bg-white text-black">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-neutral-600">
            <Clock size={12} />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-2xl text-black uppercase leading-snug group-hover:underline underline-offset-4">
          {article.title}
        </h3>

        <p className="font-serifBody text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
          {article.description}
        </p>
      </div>

      <div className="pt-4 border-t-2 border-black flex items-center justify-between font-mono text-xs uppercase font-bold">
        <span className="text-neutral-500">{article.publishedDate}</span>

        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-black hover:underline underline-offset-4"
        >
          <span>READ INSIGHT</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

