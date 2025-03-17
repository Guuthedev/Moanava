import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface VideoOptimizedProps {
  src: string; // Chemin de la vidéo
  posterSrc?: string; // Image de prévisualisation (thumbnail)
  alt: string; // Texte alternatif
  width?: number; // Largeur
  height?: number; // Hauteur
  className?: string; // Classes CSS
  autoPlay?: boolean; // Lecture automatique
  controls?: boolean; // Afficher les contrôles
  muted?: boolean; // Muet par défaut
  loop?: boolean; // Boucle
  preload?: "auto" | "metadata" | "none"; // Préchargement
  priority?: boolean; // Priorité de chargement pour le poster
  lazyLoad?: boolean; // Ne charger la vidéo qu'au clic sur le poster
}

export default function VideoOptimized({
  src,
  posterSrc,
  alt,
  width = 1280,
  height = 720,
  className = "",
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  preload = "metadata",
  priority = false,
  lazyLoad = true,
}: VideoOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optimiser le chemin de la vidéo si nécessaire (ex: format WebM pour les vidéos MP4)
  const optimizedSrc =
    src.endsWith(".mp4") && !src.includes("/optimized/")
      ? src.replace("/videos/", "/videos/optimized/").replace(".mp4", ".webm")
      : src;

  // Utiliser ImageOptimized pour le poster si fourni
  const optimizedPosterSrc =
    posterSrc?.includes("/destinations/") && !posterSrc.includes("/optimized/")
      ? posterSrc
          .replace(/\.(jpg|jpeg|JPG|JPEG)$/, ".webp")
          .replace("/destinations/", "/destinations/optimized/")
      : posterSrc;

  // Gestionnaire de clic pour le chargement différé
  const handlePosterClick = () => {
    if (lazyLoad && videoRef.current) {
      // Charger la vidéo
      videoRef.current.src = optimizedSrc;
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Erreur de lecture vidéo:", err));
    }
  };

  // Événements de chargement vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnd = () => {
      if (!loop) setIsPlaying(false);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnd);

    // Si on ne fait pas de lazy loading, on charge la vidéo directement
    if (!lazyLoad) {
      video.src = optimizedSrc;
      video.load();
      if (autoPlay) {
        video
          .play()
          .catch((err) => console.error("Erreur de lecture auto:", err));
      }
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnd);
    };
  }, [lazyLoad, autoPlay, optimizedSrc, loop]);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isLoading ? "bg-gray-100 animate-pulse" : "",
        className
      )}
      style={{ width: width || "100%", height: height || "auto" }}
    >
      {/* Image poster en lazy loading */}
      {lazyLoad && optimizedPosterSrc && !isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={handlePosterClick}
        >
          <Image
            src={optimizedPosterSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn(
              "w-full h-full object-cover",
              "duration-700 ease-in-out",
              isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />

          {/* Bouton play */}
          <div className="absolute flex items-center justify-center w-20 h-20 bg-primary/80 rounded-full hover:bg-primary hover:scale-110 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-10 h-10 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Vidéo */}
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover",
          isLoading || (lazyLoad && !isPlaying) ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500"
        )}
        width={width}
        height={height}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        preload={lazyLoad ? "none" : preload}
        poster={lazyLoad ? undefined : optimizedPosterSrc}
        src={lazyLoad ? undefined : optimizedSrc}
        aria-label={alt}
      >
        {!lazyLoad && (
          <>
            {/* Sources alternatives pour compatibilité navigateurs */}
            <source
              src={optimizedSrc.replace(".webm", ".mp4")}
              type="video/mp4"
            />
            <source src={optimizedSrc} type="video/webm" />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </>
        )}
      </video>
    </div>
  );
}
