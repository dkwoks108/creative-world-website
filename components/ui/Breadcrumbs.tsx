import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href ? `https://creativeworld.in${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <nav aria-label="Breadcrumb" className="inline-flex items-center space-x-2 text-xs font-mono text-txt-muted">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-border-subtle" />}
              {isLast || !item.href ? (
                <span className="text-signal-cyan font-semibold">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-txt-primary transition-colors flex items-center space-x-1"
                >
                  {idx === 0 && <Home className="h-3 w-3 mr-1" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
