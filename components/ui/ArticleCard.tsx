import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { InsightArticle } from '@/types';

interface ArticleCardProps {
  article: InsightArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-6 group h-full">
      <div className="space-y-4">
        {article.image && (
          <div className="relative h-[200px] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
            <Image
              src={article.image}
              alt={article.title}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-all duration-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-xs font-semibold uppercase tracking-wider">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#00CFFF]">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={12} />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00CFFF] transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {article.description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs font-semibold">
        <span className="text-slate-400">{article.publishedDate}</span>

        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-white hover:text-[#00CFFF] transition-colors"
        >
          <span>READ INSIGHT</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
