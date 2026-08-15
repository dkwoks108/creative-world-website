import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-ivory text-txt-primary flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32">
        <Container variant="standard" className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-plum/80 font-medium">
                ERROR 404 — PAGE NOT FOUND
              </span>
            </div>

            <h1 className="font-display font-normal text-4xl sm:text-6xl text-plum tracking-tight">
              Route Does Not Exist.
            </h1>

            <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-md mx-auto font-normal">
              The page or resource you are looking for has been moved, renamed, or is unavailable in our digital growth platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button variant="primary" size="md" icon={<Home className="h-4 w-4" />}>
                Return to Homepage
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="md" icon={<Search className="h-4 w-4" />}>
                Explore Growth Services
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
