/**
 * Script d'optimisation de médias unifié (images + vidéos)
 *
 * IMPORTANT: Exécuter ce script avec la commande:
 * node --max-old-space-size=4096 scripts/optimize-media.js
 *
 * Le paramètre max-old-space-size=4096 est nécessaire car l'optimisation des images,
 * particulièrement les plus volumineuses, consomme beaucoup de mémoire.
 * Sans cette allocation supplémentaire, le script risque de provoquer une erreur
 * "JavaScript heap out of memory" lorsqu'il traite de nombreuses images ou des
 * images très grandes.
 */

import { exec } from "child_process";
import { existsSync, promises as fsPromises, statSync } from "fs";
import path from "path";
import sharp from "sharp";
import { promisify } from "util";

const execAsync = promisify(exec);

// Configuration globale
const CONFIG = {
  // Chemins pour les images (multiple sources)
  imageSources: [
    {
      sourceDir: path.join(process.cwd(), "public", "images", "destinations"),
    },
    {
      sourceDir: path.join(process.cwd(), "public", "images", "johanna"),
    },
    {
      sourceDir: path.join(process.cwd(), "public", "images", "logo"),
    },
    {
      sourceDir: path.join(process.cwd(), "public", "images", "divers"),
    },
  ],
  imageQuality: 80,

  // Chemins pour les vidéos
  videos: {
    sourceDir: path.join(process.cwd(), "public", "videos"),
    thumbnailsDir: path.join(process.cwd(), "public", "videos", "thumbnails"),
  },
  // Activer/désactiver certaines fonctionnalités
  features: {
    optimizeImages: true,
    optimizeVideos: true,
    replaceOriginals: true,
    skipOptimized: true, // Option pour ignorer les images déjà optimisées
  },
};

// ----------------- GESTION DES DOSSIERS -----------------

// Créer les dossiers nécessaires s'ils n'existent pas
async function ensureDirsExist() {
  // Pour les vidéos, on garde seulement le dossier des miniatures
  if (CONFIG.features.optimizeVideos) {
    if (!existsSync(CONFIG.videos.thumbnailsDir)) {
      await fsPromises.mkdir(CONFIG.videos.thumbnailsDir, { recursive: true });
      console.log(`Dossier de miniatures créé: ${CONFIG.videos.thumbnailsDir}`);
    }
  }
}

// ----------------- OPTIMISATION DES IMAGES -----------------

// Fonction pour vérifier si une image est déjà optimisée
function isImageAlreadyOptimized(originalPath) {
  try {
    const webpPath = originalPath.replace(/\.[^.]+$/, ".webp");

    // Vérifier si la version WebP existe déjà
    if (existsSync(webpPath)) {
      const originalStats = statSync(originalPath);
      const webpStats = statSync(webpPath);

      // Si la version WebP est plus récente que l'original, on considère qu'elle est à jour
      if (webpStats.mtime > originalStats.mtime) {
        return true;
      }

      // Si la version WebP est significativement plus petite que l'original (au moins 10% d'économie)
      const originalSize = originalStats.size;
      const webpSize = webpStats.size;
      const savings = 100 - (webpSize / originalSize) * 100;

      if (savings > 10) {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error(
      `Erreur lors de la vérification de l'optimisation: ${err.message}`
    );
    return false;
  }
}

// Fonction pour vérifier si une vidéo est déjà optimisée
function isVideoAlreadyOptimized(originalPath) {
  try {
    const webmPath = originalPath.replace(/\.[^.]+$/, ".webm");
    const fileName = path.basename(originalPath, path.extname(originalPath));
    const thumbnailPath = path.join(
      CONFIG.videos.thumbnailsDir,
      `${fileName}.webp`
    );

    // Vérifier si la version WebM et la miniature existent déjà
    if (existsSync(webmPath) && existsSync(thumbnailPath)) {
      const originalStats = statSync(originalPath);
      const webmStats = statSync(webmPath);

      // Si la version WebM est plus récente que l'original, on considère qu'elle est à jour
      if (webmStats.mtime > originalStats.mtime) {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error(
      `Erreur lors de la vérification de l'optimisation de vidéo: ${err.message}`
    );
    return false;
  }
}

// Fonction pour trouver toutes les images dans un dossier
async function findImages(dir) {
  try {
    const entries = await fsPromises.readdir(dir, { withFileTypes: true });

    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.includes("thumbnails")) {
        const subFiles = await findImages(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
        files.push(fullPath);
      }
    }

    return files;
  } catch (err) {
    console.error(`Erreur lors de la recherche d'images: ${err.message}`);
    return [];
  }
}

// Fonction pour optimiser une image
async function optimizeImage(filePath) {
  // Vérifier si l'image est déjà optimisée
  if (CONFIG.features.skipOptimized && isImageAlreadyOptimized(filePath)) {
    console.log(`${path.basename(filePath)} - Déjà optimisée, ignorée.`);
    return {
      originalPath: filePath,
      optimizedPath: null,
      originalSize: 0,
      newSize: 0,
      skipped: true,
    };
  }

  // Calculer le chemin de sortie dans le même dossier
  const outputPath = filePath.replace(/\.[^.]+$/, ".webp");

  try {
    // Obtenir la taille originale
    const stats = statSync(filePath);
    const originalSize = stats.size / 1024; // en KB

    // Optimiser l'image
    process.stdout.write(`Optimisation de ${path.basename(filePath)}... `);

    await sharp(filePath)
      .webp({ quality: CONFIG.imageQuality })
      .toFile(outputPath);

    // Obtenir la nouvelle taille
    const newStats = statSync(outputPath);
    const newSize = newStats.size / 1024; // en KB
    const savings = (100 - (newSize / originalSize) * 100).toFixed(2);

    console.log(
      `terminé! (${originalSize.toFixed(2)} KB → ${newSize.toFixed(
        2
      )} KB, économie: ${savings}%)`
    );

    return {
      originalPath: filePath,
      optimizedPath: outputPath,
      originalSize,
      newSize,
      skipped: false,
    };
  } catch (err) {
    console.log(`ÉCHEC! Erreur: ${err.message}`);
    return {
      originalPath: filePath,
      optimizedPath: null,
      originalSize: 0,
      newSize: 0,
      skipped: false,
    };
  }
}

// Fonction principale d'optimisation des images
async function optimizeImages() {
  try {
    console.log("\n--- OPTIMISATION DES IMAGES ---");

    let allOptimizedFiles = [];
    let totalOriginalSizeAll = 0;
    let totalNewSizeAll = 0;
    let totalSkipped = 0;

    // Traiter chaque source d'images
    for (const source of CONFIG.imageSources) {
      console.log(`\nTraitement du dossier: ${source.sourceDir}`);

      // Trouver toutes les images dans cette source
      const imageFiles = await findImages(source.sourceDir);
      console.log(`Nombre d'images trouvées: ${imageFiles.length}`);

      if (imageFiles.length === 0) {
        console.log("Aucune image trouvée à optimiser dans ce dossier.");
        continue;
      }

      // Variables pour les statistiques de cette source
      let totalOriginalSize = 0;
      let totalNewSize = 0;
      const optimizedFiles = [];

      // Optimiser chaque image
      for (const file of imageFiles) {
        const result = await optimizeImage(file);

        if (result.skipped) {
          totalSkipped++;
          continue;
        }

        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        totalOriginalSizeAll += result.originalSize;
        totalNewSizeAll += result.newSize;

        if (result.optimizedPath) {
          optimizedFiles.push(result);
          allOptimizedFiles.push(result);
        }
      }

      // Afficher les statistiques pour cette source
      if (optimizedFiles.length > 0) {
        const totalSavings = (
          100 -
          (totalNewSize / totalOriginalSize) * 100
        ).toFixed(2);
        console.log(`\nOptimisation terminée pour ${source.sourceDir}!`);
        console.log(
          `Taille originale: ${(totalOriginalSize / 1024).toFixed(2)} MB`
        );
        console.log(`Nouvelle taille: ${(totalNewSize / 1024).toFixed(2)} MB`);
        console.log(`Économie: ${totalSavings}%`);
      }
    }

    // Afficher les statistiques globales
    console.log("\n--- RÉSUMÉ DE L'OPTIMISATION DES IMAGES ---");
    console.log(
      `Total des images traitées: ${allOptimizedFiles.length + totalSkipped}`
    );
    console.log(`Images ignorées (déjà optimisées): ${totalSkipped}`);
    console.log(`Images optimisées: ${allOptimizedFiles.length}`);

    if (allOptimizedFiles.length > 0) {
      const totalSavingsAll = (
        100 -
        (totalNewSizeAll / totalOriginalSizeAll) * 100
      ).toFixed(2);
      console.log(
        `Taille originale totale: ${(totalOriginalSizeAll / 1024).toFixed(
          2
        )} MB`
      );
      console.log(
        `Nouvelle taille totale: ${(totalNewSizeAll / 1024).toFixed(2)} MB`
      );
      console.log(`Économie totale: ${totalSavingsAll}%`);
    }

    return { success: true, optimizedFiles: allOptimizedFiles };
  } catch (err) {
    console.error("Erreur lors de l'optimisation des images:", err);
    return { success: false, optimizedFiles: [] };
  }
}

// Fonction pour remplacer une image originale par sa version optimisée
async function replaceOriginalWithOptimized(originalPath, _optimizedPath) {
  try {
    // Supprimer directement l'original
    await fsPromises.unlink(originalPath);
    console.log(`Remplacé: ${path.basename(originalPath)}`);
    return true;
  } catch (err) {
    console.error(
      `Erreur lors du remplacement de ${path.basename(originalPath)}: ${
        err.message
      }`
    );
    return false;
  }
}

// Fonction pour remplacer toutes les images optimisées
async function replaceOriginals(optimizedFiles) {
  console.log("\n--- SUPPRESSION DES IMAGES ORIGINALES ---");

  if (!optimizedFiles || optimizedFiles.length === 0) {
    console.log("Aucune image optimisée à traiter.");
    return false;
  }

  console.log(`${optimizedFiles.length} images originales à supprimer`);

  let successCount = 0;
  let failCount = 0;

  // Supprimer chaque image originale
  for (const file of optimizedFiles) {
    const success = await replaceOriginalWithOptimized(
      file.originalPath,
      file.optimizedPath
    );
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log("\nSuppression terminée!");
  console.log(`Images originales supprimées avec succès: ${successCount}`);
  console.log(`Échecs: ${failCount}`);

  return successCount > 0;
}

// ----------------- OPTIMISATION DES VIDÉOS -----------------

// Fonction pour vérifier si FFmpeg est installé
async function checkFFmpeg() {
  try {
    await execAsync("ffmpeg -version");
    return true;
  } catch (err) {
    console.error(
      "FFmpeg n'est pas installé ou n'est pas accessible dans le PATH."
    );
    console.error(
      "Veuillez installer FFmpeg: https://ffmpeg.org/download.html"
    );
    console.error("Erreur:", err.message);
    return false;
  }
}

// Fonction pour trouver toutes les vidéos
async function findVideos(dir) {
  try {
    const entries = await fsPromises.readdir(dir, { withFileTypes: true });

    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.includes("thumbnails")) {
        const subFiles = await findVideos(fullPath);
        files.push(...subFiles);
      } else if (
        entry.isFile() &&
        /\.(mp4|mov|avi|wmv|flv|mkv)$/i.test(entry.name)
      ) {
        files.push(fullPath);
      }
    }

    return files;
  } catch (err) {
    console.error(`Erreur lors de la recherche de vidéos: ${err.message}`);
    return [];
  }
}

// Fonction pour optimiser une vidéo
async function optimizeVideo(filePath) {
  // Vérifier si la vidéo est déjà optimisée
  if (CONFIG.features.skipOptimized && isVideoAlreadyOptimized(filePath)) {
    console.log(`${path.basename(filePath)} - Déjà optimisée, ignorée.`);
    return {
      originalPath: filePath,
      optimizedPath: null,
      originalSize: 0,
      newSize: 0,
      skipped: true,
    };
  }

  // Calculer les chemins de sortie
  const outputPath = filePath.replace(/\.[^.]+$/, ".webm");
  const fileName = path.basename(filePath, path.extname(filePath));
  const thumbnailPath = path.join(
    CONFIG.videos.thumbnailsDir,
    `${fileName}.webp`
  );

  // Créer le dossier des miniatures si nécessaire
  const thumbnailParentDir = path.dirname(thumbnailPath);
  if (!existsSync(thumbnailParentDir)) {
    await fsPromises.mkdir(thumbnailParentDir, { recursive: true });
  }

  try {
    // Obtenir la taille originale
    const stats = await fsPromises.stat(filePath);
    const originalSize = stats.size / (1024 * 1024); // en MB

    // Optimiser la vidéo - conversion en WebM (VP9) avec une bonne qualité
    console.log(`Optimisation de ${path.basename(filePath)}...`);

    await execAsync(
      `ffmpeg -y -i "${filePath}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${outputPath}"`
    );

    // Créer une miniature (thumbnail) de la vidéo au format WebP
    console.log(`Création de la miniature pour ${path.basename(filePath)}...`);
    await execAsync(
      `ffmpeg -y -i "${filePath}" -vf "select=eq(n\\,0)" -q:v 3 "${thumbnailPath}"`
    );

    // Obtenir la nouvelle taille
    const newStats = await fsPromises.stat(outputPath);
    const newSize = newStats.size / (1024 * 1024); // en MB
    const savings = (100 - (newSize / originalSize) * 100).toFixed(2);

    console.log(
      `Terminé! (${originalSize.toFixed(2)} MB → ${newSize.toFixed(
        2
      )} MB, économie: ${savings}%)`
    );
    console.log(`Miniature créée: ${path.basename(thumbnailPath)}`);

    return {
      originalPath: filePath,
      optimizedPath: outputPath,
      originalSize,
      newSize,
      skipped: false,
    };
  } catch (err) {
    console.log(`ÉCHEC! Erreur: ${err.message}`);
    return {
      originalPath: filePath,
      optimizedPath: null,
      originalSize: 0,
      newSize: 0,
      skipped: false,
    };
  }
}

// Fonction principale d'optimisation des vidéos
async function optimizeVideos() {
  try {
    console.log("\n--- OPTIMISATION DES VIDÉOS ---");

    // Vérifier si FFmpeg est installé
    const ffmpegInstalled = await checkFFmpeg();
    if (!ffmpegInstalled) {
      return { success: false, optimizedFiles: [] };
    }

    // Trouver toutes les vidéos
    const videoFiles = await findVideos(CONFIG.videos.sourceDir);
    console.log(`Nombre de vidéos trouvées: ${videoFiles.length}`);

    if (videoFiles.length === 0) {
      console.log("Aucune vidéo trouvée dans le dossier public/videos.");
      console.log(
        "Assurez-vous que vos vidéos sont au format MP4, MOV, AVI, WMV, FLV ou MKV."
      );
      return { success: true, optimizedFiles: [] };
    }

    // Variables pour les statistiques
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    let skippedCount = 0;
    let processedCount = 0;
    const optimizedFiles = [];

    // Optimiser chaque vidéo
    for (const file of videoFiles) {
      const result = await optimizeVideo(file);

      if (result.skipped) {
        skippedCount++;
        continue;
      }

      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      processedCount++;

      if (result.optimizedPath) {
        optimizedFiles.push(result);
      }
    }

    // Afficher les statistiques
    console.log("\n--- RÉSUMÉ DE L'OPTIMISATION DES VIDÉOS ---");
    console.log(`Total des vidéos trouvées: ${videoFiles.length}`);
    console.log(`Vidéos ignorées (déjà optimisées): ${skippedCount}`);
    console.log(`Vidéos optimisées: ${processedCount}`);

    if (processedCount > 0) {
      const totalSavings = (
        100 -
        (totalNewSize / totalOriginalSize) * 100
      ).toFixed(2);
      console.log(
        `Taille originale totale: ${totalOriginalSize.toFixed(2)} MB`
      );
      console.log(`Nouvelle taille totale: ${totalNewSize.toFixed(2)} MB`);
      console.log(`Économie totale: ${totalSavings}%`);
    }

    return { success: true, optimizedFiles };
  } catch (err) {
    console.error("Erreur lors de l'optimisation des vidéos:", err);
    return { success: false, optimizedFiles: [] };
  }
}

// ----------------- FONCTION PRINCIPALE -----------------

// Fonction principale qui orchestre tout le processus
async function optimizeAllMedia() {
  console.log("=== DÉMARRAGE DE L'OPTIMISATION DES MÉDIAS ===");

  try {
    // Créer le dossier pour les miniatures de vidéos
    await ensureDirsExist();

    let optimizedImages = [];
    let optimizedVideos = [];

    // Optimiser les images si activé
    if (CONFIG.features.optimizeImages) {
      const imagesResult = await optimizeImages();
      if (imagesResult.success) {
        optimizedImages = imagesResult.optimizedFiles;
      }
    }

    // Optimiser les vidéos si activé
    if (CONFIG.features.optimizeVideos) {
      const videosResult = await optimizeVideos();
      if (videosResult.success) {
        optimizedVideos = videosResult.optimizedFiles;
      }
    }

    // Remplacer les originaux si activé (supprimer les fichiers originaux)
    if (CONFIG.features.replaceOriginals) {
      if (optimizedImages.length > 0) {
        await replaceOriginals(optimizedImages);
      }

      if (optimizedVideos.length > 0) {
        await replaceOriginals(optimizedVideos);
      }
    }

    console.log("\n=== OPTIMISATION DES MÉDIAS TERMINÉE ===");
    console.log("\nPour utiliser ces médias optimisés dans votre projet:");
    console.log(
      "1. Images: Utilisez le composant <Image> en référençant les fichiers .webp"
    );
    console.log(
      "2. Vidéos: Utilisez le composant <video> en référençant les fichiers .webm"
    );
    console.log(
      "3. Les miniatures des vidéos sont disponibles dans le dossier 'thumbnails'"
    );
  } catch (err) {
    console.error("Erreur globale:", err);
  }
}

// Exécuter la fonction principale
optimizeAllMedia();
