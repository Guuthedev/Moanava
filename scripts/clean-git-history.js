/**
 * Script pour nettoyer l'historique Git des fichiers volumineux
 *
 * Ce script génère les commandes Git nécessaires pour supprimer
 * des fichiers volumineux de l'historique Git.
 *
 * IMPORTANT: Ce script ne modifie pas votre dépôt Git, il génère
 * simplement les commandes à exécuter manuellement.
 */

console.log(`
==========================================================
NETTOYAGE DE L'HISTORIQUE GIT - FICHIERS VOLUMINEUX
==========================================================

Voici les commandes à exécuter pour supprimer les fichiers 
volumineux de votre historique Git (copiez-collez dans PowerShell):

# 1. Supprimer le fichier tetiaroa.mov de l'historique
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch public/images/banger/tetiaroa.mov" --prune-empty --tag-name-filter cat -- --all

# 2. Supprimer d'autres fichiers volumineux si nécessaire (ajoutez d'autres fichiers à la liste)
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch public/images/banger/*.mov public/images/banger/*.mp4" --prune-empty --tag-name-filter cat -- --all

# 3. Nettoyer les références et libérer l'espace
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now

# 4. Vérifier que les fichiers volumineux ont été supprimés
git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -n 10

# 5. Pousser les modifications vers GitHub (ATTENTION: ceci modifie l'historique de façon irréversible)
git push origin main --force

==========================================================
IMPORTANT:
- Ces commandes modifient l'historique Git et peuvent causer des problèmes de synchronisation
  pour les autres membres de l'équipe.
- Assurez-vous de comprendre les conséquences avant d'exécuter git push --force.
- Prévenez vos collaborateurs qu'ils devront faire un git pull --rebase après cette opération.
==========================================================
`);

// Conseil sur les solutions alternatives pour les gros fichiers
console.log(`
ALTERNATIVES POUR GÉRER LES FICHIERS VOLUMINEUX:

1. Git LFS (Large File Storage):
   - Installation: git lfs install
   - Tracking des fichiers: git lfs track "*.mov" "*.mp4"
   - Plus d'infos: https://git-lfs.github.com

2. Hébergement externe:
   - YouTube/Vimeo pour les vidéos
   - Cloudinary pour les images et vidéos
   - AWS S3 pour tout type de fichier

3. Compression:
   - Utilisez le script d'optimisation pour réduire la taille des fichiers
   - node --max-old-space-size=4096 scripts/optimize-media.js
`);
