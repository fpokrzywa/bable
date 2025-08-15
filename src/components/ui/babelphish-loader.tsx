'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BabelPhishLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BabelPhishLoader({ size = 'md', className }: BabelPhishLoaderProps) {
  const sizeClasses = {
    sm: {
      container: 'w-16 h-16',
      ring: 'w-16 h-16 border-2',
      logo: { width: 24, height: 24 }
    },
    md: {
      container: 'w-24 h-24',
      ring: 'w-24 h-24 border-[3px]',
      logo: { width: 36, height: 36 }
    },
    lg: {
      container: 'w-32 h-32',
      ring: 'w-32 h-32 border-4',
      logo: { width: 48, height: 48 }
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn('relative flex items-center justify-center', currentSize.container, className)}>
      {/* Spinning ring */}
      <div
        className={cn(
          'absolute rounded-full border-primary/30 border-t-primary animate-spin',
          currentSize.ring
        )}
        style={{
          animationDuration: '1.5s',
        }}
      />
      
      {/* Floating BabelPhish logo */}
      <div className="absolute flex items-center justify-center animate-float">
        <Image
          src="/bablephish_logo.svg"
          alt="BabelPhish Logo"
          width={currentSize.logo.width}
          height={currentSize.logo.height}
          className="flex-shrink-0"
        />
      </div>
    </div>
  );
}

interface BabelPhishFullScreenLoaderProps {
  message?: string;
}

export function BabelPhishFullScreenLoader({ message = "Logging you in..." }: BabelPhishFullScreenLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const loaderContent = (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <BabelPhishLoader size="lg" />
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );

  // Fallback to regular render if document.body is not available
  if (typeof document === 'undefined' || !document.body) {
    return loaderContent;
  }

  return createPortal(loaderContent, document.body);
}