# Guide d'optimisation des médias - Moanava

Ce document explique comment utiliser les outils d'optimisation d'images et de vidéos dans le projet Moanava.

## Structure des dossiers

```
public/
├── images/
│   ├── destinations/        # Images originales
│   │   ├── optimized/       # Images WebP optimisées
│   │   └── originals/       # Backup des originaux (après remplacement)
│   └── ...
└── videos/
    ├── optimized/          # Vidéos WebM optimisées
    ├── thumbnails/         # Miniatures WebP des vidéos
    └── ...                 # Vidéos originales
```

## Optimisation des images

### 1. Convertir les images JPG/JPEG en WebP

Exécutez le script d'optimisation pour convertir toutes les images du dossier `public/images/destinations` :

```bash
node scripts/optimize-images.js
```

Ce script :

- Convertit les images JPG/JPEG en WebP
- Réduit la taille sans perte de qualité visible (économie moyenne 70-80%)
- Conserve les originaux

### 2. Remplacer les originaux par les versions optimisées

Pour remplacer les images originales par les versions WebP optimisées :

```bash
node scripts/replace-with-optimized.js
```

Ce script :

- Sauvegarde les originaux dans `public/images/destinations/originals/`
- Remplace les JPG/JPEG par les versions WebP
- Met à jour automatiquement les chemins dans le composant `ImageOptimized`

### 3. Utiliser le composant ImageOptimized dans vos pages

```jsx
import ImageOptimized from "@/components/ImageOptimized";

// Dans votre composant :
<ImageOptimized
  src="/images/destinations/polynesie.jpg" // Le chemin reste avec l'extension originale
  alt="Polynésie"
  width={800}
  height={600}
  priority={false} // true pour les images above the fold
/>;
```

Le composant :

- Utilise `next/image` pour optimisation supplémentaire
- Ajoute un effet de chargement progressif
- Gère automatiquement les chemins d'images

## Optimisation des vidéos

### 1. Prérequis : Installation de FFmpeg

Pour optimiser les vidéos, vous devez avoir FFmpeg installé sur votre machine :

- **Windows** : [Télécharger FFmpeg](https://ffmpeg.org/download.html) et ajouter au PATH
- **macOS** : `brew install ffmpeg`
- **Linux** : `sudo apt install ffmpeg`

### 2. Convertir les vidéos en WebM et générer des thumbnails

Exécutez le script d'optimisation vidéo :

```bash
node scripts/optimize-videos.js
```

Ce script :

- Convertit les vidéos MP4/MOV/etc. en format WebM (codec VP9)
- Génère des miniatures WebP pour chaque vidéo
- Réduit considérablement la taille (économie 60-80%)

### 3. Utiliser le composant VideoOptimized dans vos pages

```jsx
import VideoOptimized from "@/components/VideoOptimized";

// Dans votre composant :
<VideoOptimized
  src="/videos/polynesie.mp4" // Le chemin reste avec l'extension originale
  posterSrc="/videos/thumbnails/polynesie.webp"
  alt="Vidéo de la Polynésie"
  width={1280}
  height={720}
  controls={true}
  lazyLoad={true} // Chargement différé activé par défaut
/>;
```

Le composant :

- Affiche d'abord une miniature optimisée
- Charge la vidéo optimisée uniquement au clic (économie de bande passante)
- Fournit un bouton de lecture attrayant
- Assure la compatibilité avec tous les navigateurs

## Avantages de l'optimisation

- **Réduction du poids total** : Gain moyen de 70% pour les images, 60-80% pour les vidéos
- **Chargement plus rapide** : Amélioration significative des performances et du score Core Web Vitals
- **Meilleure UX** : Chargement progressif des images et miniatures vidéo
- **Économie de bande passante** : Moins de données à télécharger pour les visiteurs
- **SEO amélioré** : Les performances sont un facteur de classement Google important

## Bonnes pratiques

1. **Optimisez toujours vos médias** avant de les ajouter au projet
2. **Utilisez toujours les composants optimisés** plutôt que les balises HTML standard
3. **Définissez priority=true** pour les images above-the-fold (visibles sans scroll)
4. **Utilisez lazyLoad=true** pour les vidéos non essentielles
5. **Spécifiez width et height** pour éviter le cumulative layout shift (CLS)

## Compatibilité des formats

- **WebP** : Chrome, Firefox, Safari, Edge (tous les navigateurs modernes)
- **WebM** : Chrome, Firefox, Edge. Safari a un support limité mais le composant fournit un fallback MP4
