import Image from "next/image";
import { useState } from "react";

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ImageOptimized({
  src,
  alt,
  width = 1200,
  height = 800,
  className = "",
  priority = false,
}: ImageOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Utiliser directement la version optimisée WebP si dans /destinations/
  // Si l'image est déjà optimisée ou n'est pas dans le dossier destinations, l'utiliser telle quelle
  const optimizedSrc =
    src.includes("/destinations/") &&
    !src.includes("/optimized/") &&
    !src.endsWith(".webp")
      ? src
          .replace(/\.(jpg|jpeg|JPG|JPEG)$/, ".webp")
          .replace("/destinations/", "/destinations/optimized/")
      : src;

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={80}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"}
          ${className}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
