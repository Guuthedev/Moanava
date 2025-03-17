import { cn } from "@/lib/utils";
import { useState } from "react";
import ImageOptimized from "./ImageOptimized";

export default function ImageDemo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Liste des destinations avec images optimisées
  const destinations = [
    { name: "Polynésie", image: "/images/destinations/polynesie.jpg" },
    { name: "Canaries", image: "/images/destinations/canaries.jpg" },
    { name: "France", image: "/images/destinations/france.JPG" },
    { name: "Indonésie", image: "/images/destinations/indonesie.jpg" },
    { name: "Mongolie", image: "/images/destinations/mongolie.JPG" },
  ];

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-montserrat text-center mb-6">
        Nos destinations avec images optimisées
      </h2>

      {/* Grille d'images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {destinations.map((destination) => (
          <div
            key={destination.name}
            className={cn(
              "cursor-pointer overflow-hidden rounded-lg transition-all shadow-md hover:shadow-xl",
              selectedImage === destination.image ? "ring-4 ring-primary" : ""
            )}
            onClick={() => setSelectedImage(destination.image)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <ImageOptimized
                src={destination.image}
                alt={`Destination ${destination.name}`}
                width={300}
                height={225}
                className="object-cover h-full w-full"
              />
            </div>
            <p className="p-2 text-center font-medium">{destination.name}</p>
          </div>
        ))}
      </div>

      {/* Affichage grande image */}
      {selectedImage && (
        <div className="mt-8">
          <h3 className="text-xl mb-4 text-center">
            Image sélectionnée (optimisée avec WebP)
          </h3>
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <ImageOptimized
              src={selectedImage}
              alt="Destination sélectionnée"
              width={1200}
              height={900}
              priority
              className="w-full h-auto"
            />
          </div>
          <div className="flex justify-center mt-4">
            <div className="bg-gray-100 p-4 rounded-lg text-sm max-w-xl">
              <h4 className="font-bold mb-2">Comment ça fonctionne :</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Les images sont converties en WebP, format d&apos;image
                  moderne offrant une meilleure compression
                </li>
                <li>
                  L&apos;optimisation réduit la taille des fichiers de 60-80%
                  sans perte visible de qualité
                </li>
                <li>
                  Le composant ImageOptimized utilise next/image pour
                  l'optimisation au chargement
                </li>
                <li>
                  Chargement progressif avec effet de flou pour une meilleure
                  expérience utilisateur
                </li>
                <li>
                  Chargement paresseux (lazy-loading) pour n&apos;afficher que
                  les images visibles
                </li>
                <li>
                  Redimensionnement automatique selon l&apos;écran de
                  l&apos;utilisateur
                </li>
                <li>Compatibilité avec tous les navigateurs modernes</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
