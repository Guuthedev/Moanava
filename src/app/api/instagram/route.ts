import axios from "axios";
import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function GET() {
  if (!ACCESS_TOKEN) {
    console.error(
      "Token Instagram manquant dans les variables d'environnement"
    );
    return NextResponse.json(
      { error: "Configuration Instagram non disponible" },
      { status: 500 }
    );
  }

  try {
    // Récupérer les médias
    const mediaResponse = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=9&access_token=${ACCESS_TOKEN}`
    );

    // Simuler un nombre de followers (car l'API Instagram de base ne permet plus d'accéder à cette donnée)
    // Dans un environnement de production, cette valeur serait stockée en base de données
    const estimatedFollowers = 1250;

    return NextResponse.json({
      followers: estimatedFollowers,
      media: mediaResponse.data.data || [],
    });
  } catch (error) {
    console.error("Instagram API error:", error);

    // Logs détaillés pour débogage
    if (axios.isAxiosError(error) && error.response) {
      console.error("Réponse d'erreur:", error.response.data);
      console.error("Statut de l'erreur:", error.response.status);
    }

    return NextResponse.json(
      { error: "Erreur lors de la récupération des données Instagram" },
      { status: 500 }
    );
  }
}
