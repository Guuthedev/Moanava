"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  thumbnail_url?: string;
}

export default function InstagramFeed() {
  const [followers, setFollowers] = useState<number>(0);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayFollowers, setDisplayFollowers] = useState<number>(0);

  useEffect(() => {
    async function fetchInstagramData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get("/api/instagram", {
          timeout: 10000, // 10 secondes timeout
        });

        const { followers, media } = response.data;

        // Vérifier que nous avons des données valides
        if (Array.isArray(media) && media.length > 0) {
          setPosts(media);
          setFollowers(followers || 0);
        } else {
          throw new Error("Format de données Instagram invalide");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données Instagram:",
          error
        );

        let message =
          "Impossible de charger les données Instagram. Veuillez réessayer plus tard.";

        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            message =
              "La requête a pris trop de temps. Veuillez réessayer plus tard.";
          } else if (error.response) {
            // Erreur serveur
            if (error.response.status >= 500) {
              message =
                "Le serveur Instagram est temporairement indisponible. Veuillez réessayer plus tard.";
            }
            // Erreur d'authentification
            else if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              message = "Accès aux données Instagram non autorisé.";
            }
          }
        }

        setError(message);
        // En cas d'erreur, définir un tableau vide pour les posts
        setPosts([]);
        setFollowers(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  // Animation du compteur de followers
  useEffect(() => {
    if (followers > 0) {
      const duration = 2000; // 2 secondes pour l'animation
      const increment = Math.ceil(followers / (duration / 50)); // Incrément tous les 50ms
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= followers) {
          setDisplayFollowers(followers);
          clearInterval(timer);
        } else {
          setDisplayFollowers(current);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [followers]);

  // Placeholder pour les images pendant le chargement
  const placeholderPosts = Array(9)
    .fill(null)
    .map((_, index) => (
      <div
        key={`placeholder-${index}`}
        className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden animate-pulse"
      />
    ));

  return (
    <div className="container mx-auto px-4">
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          {followers > 0 && (
            <div className="text-center mb-8">
              <p className="text-xl font-bold text-primary">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {displayFollowers.toLocaleString()}
                </motion.span>{" "}
                <span className="text-secondary">abonnés</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isLoading
              ? placeholderPosts
              : posts.map((post) => (
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={post.id}
                    className="relative aspect-square rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-xl group"
                  >
                    <Image
                      src={post.media_url}
                      alt={post.caption || "Publication Instagram"}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/80",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
                      )}
                    >
                      <p className="text-white text-sm line-clamp-2">
                        {post.caption || "Voir sur Instagram"}
                      </p>
                    </div>
                  </a>
                ))}
          </div>
        </>
      )}

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/moanava_travel/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition-colors duration-300"
        >
          Suivre sur Instagram
        </a>
      </div>
    </div>
  );
}
