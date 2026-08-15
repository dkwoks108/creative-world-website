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
    <article className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle hover:border-border-active shadow-editorial hover:shadow-editorial-lg transition-all space-y-6 group">
      <div className="space-y-4">
        {article.image && (
          <div className="relative h-[200px] w-full rounded-xl overflow-hidden border border-border-subtle group">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-plum/10 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-cream/60 border border-border-subtle text-plum font-medium">
            {article.category}
          </span>
          <div className="flex items-center space-x-1 text-[11px] font-mono text-txt-muted">
            <Clock className="h-3 w-3 text-coral" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="font-display font-normal text-2xl text-plum group-hover:text-coral transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed font-normal">
          {article.description}
        </p>
      </div>

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
        <span className="text-[11px] font-mono text-txt-muted">{article.publishedDate}</span>

        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-plum hover:text-coral group-hover:translate-x-1 transition-all font-semibold"
        >
          <span>READ INSIGHT</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
