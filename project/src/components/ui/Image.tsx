import { useState, useEffect, useMemo } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loadingStrategy?: 'lazy' | 'eager';
  placeholderSrc?: string;
  onLoad?: () => void;
}

const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+';

export function Image({
  src,
  alt,
  width,
  height,
  className = '',
  loadingStrategy = 'lazy',
  placeholderSrc = defaultPlaceholder,
  onLoad,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [error, setError] = useState(false);

  // Optimize image URL for different sizes
  const optimizedSrc = useMemo(() => {
    if (error) return placeholderSrc;
    if (!width || !height) return src;

    try {
      const url = new URL(src);
      
      // Add size parameters for common image CDNs
      if (url.hostname.includes('unsplash.com')) {
        url.searchParams.set('w', width.toString());
        url.searchParams.set('h', height.toString());
        url.searchParams.set('q', '80');
        url.searchParams.set('fit', 'crop');
        url.searchParams.set('auto', 'format');
      }
      
      return url.toString();
    } catch {
      // If URL parsing fails, return original src
      return src;
    }
  }, [src, width, height, error, placeholderSrc]);

  useEffect(() => {
    const img = new window.Image();
    img.src = optimizedSrc;
    
    img.onload = () => {
      setCurrentSrc(optimizedSrc);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setError(true);
      setIsLoading(false);
      console.error(`Failed to load image: ${optimizedSrc}`);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [optimizedSrc, onLoad]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
        backgroundColor: '#f1f1f1' 
      }}
      role="img"
      aria-label={alt}
    >
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loadingStrategy}
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={() => setError(true)}
        {...props}
      />
      
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          role="presentation"
        />
      )}
      
      {error && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          role="alert"
        >
          <span className="text-sm text-gray-500">Görsel yüklenemedi</span>
        </div>
      )}
    </div>
  );
} 