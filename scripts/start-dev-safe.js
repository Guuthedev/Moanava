/**
 * Ce script vérifie si un serveur est déjà en cours d'exécution sur le port 3000
 * Si le port est libre, il lance le serveur
 * Si le port est occupé, il affiche un message et ne lance pas de serveur
 */

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lockFile = path.join(__dirname, "..", ".dev-server-lock");

// Fonction pour vérifier si le port 3000 est déjà utilisé
function checkPort(callback) {
  const isWindows = process.platform === "win32";

  // Commande différente selon l'OS
  const command = isWindows
    ? 'powershell -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Measure-Object | Select-Object -ExpandProperty Count"'
    : "lsof -i:3000 | grep LISTEN | wc -l";

  exec(command, (error, stdout) => {
    const count = parseInt(stdout.trim(), 10);
    callback(count > 0);
  });
}

// Vérifier si un fichier de verrouillage existe
if (fs.existsSync(lockFile)) {
  console.log("\x1b[33mVérification du fichier de verrouillage...\x1b[0m");

  // Lire le PID du fichier de verrouillage
  const pid = fs.readFileSync(lockFile, "utf8");

  // Vérifier si le processus avec ce PID existe toujours
  const isWindows = process.platform === "win32";
  const command = isWindows
    ? `powershell -Command "Get-Process -Id ${pid} -ErrorAction SilentlyContinue | Measure-Object | Select-Object -ExpandProperty Count"`
    : `ps -p ${pid} | grep -v PID | wc -l`;

  exec(command, (error, stdout) => {
    const processExists = parseInt(stdout.trim(), 10) > 0;

    if (!processExists) {
      console.log(
        "\x1b[33mLe fichier de verrouillage existe mais le processus est mort. Suppression du verrou.\x1b[0m"
      );
      fs.unlinkSync(lockFile);
      checkPort(startServer);
    } else {
      // Le processus existe toujours
      console.log(
        "\x1b[31mUn serveur de développement est déjà en cours d'exécution (PID: " +
          pid +
          ").\x1b[0m"
      );
    }
  });
} else {
  // Pas de fichier de verrouillage, vérifier le port
  checkPort(startServer);
}

// Fonction pour démarrer le serveur si le port est libre
function startServer(portInUse) {
  if (portInUse) {
    console.log(
      "\x1b[31mLe port 3000 est déjà utilisé. Impossible de démarrer le serveur.\x1b[0m"
    );
    return;
  }

  // Créer le fichier de verrouillage avec le PID actuel
  fs.writeFileSync(lockFile, process.pid.toString());

  // Ajouter un gestionnaire pour supprimer le fichier de verrouillage à la sortie
  process.on("SIGINT", () => {
    console.log("\x1b[33mSuppression du fichier de verrouillage...\x1b[0m");
    if (fs.existsSync(lockFile)) {
      fs.unlinkSync(lockFile);
    }
    process.exit();
  });

  // Démarrer le serveur de développement
  console.log("\x1b[32mDémarrage du serveur de développement...\x1b[0m");
  const npmExec = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = exec(`${npmExec} run dev`);

  // Rediriger stdout et stderr
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on("exit", () => {
    console.log(
      "\x1b[33mLe serveur de développement s'est arrêté. Suppression du fichier de verrouillage...\x1b[0m"
    );
    if (fs.existsSync(lockFile)) {
      fs.unlinkSync(lockFile);
    }
    process.exit();
  });
}
