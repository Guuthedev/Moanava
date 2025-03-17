import { useState } from "react";
import ButtonCTA from "./ButtonCTA";
import VideoOptimized from "./VideoOptimized";

export default function VideoDemo() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Liste des vidéos exemple
  const videos = [
    {
      title: "Polynésie",
      src: "/videos/polynesie.mp4",
      posterSrc: "/videos/thumbnails/polynesie.webp",
      description: "Découvrez les eaux cristallines de la Polynésie française",
    },
    {
      title: "Mexique",
      src: "/videos/mexique.mp4",
      posterSrc: "/videos/thumbnails/mexique.webp",
      description: "Plongez dans la culture fascinante du Mexique",
    },
    {
      title: "Japon",
      src: "/videos/japon.mp4",
      posterSrc: "/videos/thumbnails/japon.webp",
      description: "Explorez les traditions et la modernité du Japon",
    },
  ];

  // Utiliser le premier vidéo comme sélection par défaut si aucun n'est sélectionné
  const currentVideo = selectedVideo
    ? videos.find((video) => video.src === selectedVideo)
    : videos[0];

  // Vérification de sécurité pour TypeScript
  if (!currentVideo) {
    return <div>Vidéo non disponible</div>;
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-montserrat text-center mb-6">
        Nos vidéos optimisées
      </h2>

      {/* Vidéo principale */}
      <div className="max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden shadow-xl">
        <VideoOptimized
          src={currentVideo.src}
          posterSrc={currentVideo.posterSrc}
          alt={currentVideo.title}
          width={1280}
          height={720}
          controls
          lazyLoad={false}
          priority
        />
      </div>

      {/* Informations vidéo */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
        <p className="text-gray-700 mb-4">{currentVideo.description}</p>

        <ButtonCTA size="sm" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Masquer les détails" : "Voir les détails techniques"}
        </ButtonCTA>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold mb-2">Comment ça fonctionne :</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Les vidéos MP4/MOV d&apos;origine sont converties en WebM (codec
                VP9)
              </li>
              <li>
                Réduction de poids moyenne de 60-80% sans perte visible de
                qualité
              </li>
              <li>Thumbnails auto-générées au format WebP optimisé</li>
              <li>
                Chargement paresseux (lazy-loading) pour économiser la bande
                passante
              </li>
              <li>
                Prévisualisation avec image avant lecture pour expérience
                utilisateur améliorée
              </li>
              <li>
                Compatibilité avec tous les navigateurs modernes (fallback MP4)
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Liste des autres vidéos */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 px-4">Autres destinations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {videos.map((video) => (
            <div
              key={video.src}
              className={`
                rounded-lg overflow-hidden shadow-md cursor-pointer transition-all
                ${
                  selectedVideo === video.src
                    ? "ring-4 ring-primary"
                    : "hover:shadow-lg"
                }
              `}
              onClick={() => setSelectedVideo(video.src)}
            >
              <div className="aspect-video relative overflow-hidden">
                <VideoOptimized
                  src={video.src}
                  posterSrc={video.posterSrc}
                  alt={video.title}
                  width={400}
                  height={225}
                  controls={false}
                  lazyLoad={true}
                  className="w-full h-full"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium">{video.title}</h4>
                <p className="text-sm text-gray-600 truncate">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
