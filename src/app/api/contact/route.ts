import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuration du transporteur avec les variables d'environnement
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Mot de passe d'application Google
  },
  secure: true,
});

// Interface simplifiée pour les données du formulaire
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  sendConfirmation?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Extraire les données du corps de la requête
    const data = await request.json();
    const { name, email, message, sendConfirmation } = data as ContactFormData;

    // Validation manuelle des données
    if (!name || name.trim().length < 2) {
      return NextResponse.json({
        success: false,
        message: "Le nom est requis et doit contenir au moins 2 caractères",
      });
    }

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Une adresse email valide est requise",
      });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({
        success: false,
        message:
          "Le message est requis et doit contenir au moins 10 caractères",
      });
    }

    // Création du contenu de l'email pour l'administrateur
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || "contact@moanava.com",
      to: process.env.EMAIL_TO || "contact@moanava.com",
      subject: `Nouveau message de contact de ${name}`,
      replyTo: email,
      text: `
        Nom: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message du formulaire de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; border-left: 4px solid #ddd; padding-left: 15px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color: #666; margin-top: 30px; font-size: 12px;">
            Ce message a été envoyé depuis le formulaire de contact de ${
              process.env.SITE_NAME || "Moanava"
            }.
          </p>
        </div>
      `,
    };

    // Si demandé, envoi d'un email de confirmation à l'utilisateur
    if (sendConfirmation) {
      const userMailOptions = {
        from: process.env.EMAIL_FROM || "contact@moanava.com",
        to: email,
        subject: `Merci pour votre message | Moanava`,
        text: `
          Je vous remercie d'avoir pris contact avec moi.
          
          Votre message a bien été reçu, et je vous recontacterai dans les plus brefs délais pour répondre à votre demande.
          
          Je suis ravie de pouvoir vous accompagner dans la création de votre projet.
          
          "Voyagez sereins, je trace votre chemin".
          
          À très bientôt,
          Johanna, Travel Planneur
          Moanava.com
          
          #################
          Votre message sur Moanava.com :
          ${message}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #00aed1;">Merci pour votre message</h2>
            
            <p>Je vous remercie d'avoir pris contact avec moi.</p>
            
            <p>Votre message a bien été reçu, et je vous recontacterai dans les plus brefs délais pour répondre à votre demande.</p>
            
            <p>Je suis ravie de pouvoir vous accompagner dans la création de votre projet.</p>
            
            <p style="font-style: italic; color: #00aed1;">"Voyagez sereins, je trace votre chemin".</p>
            
            <p style="margin-top: 20px;">À très bientôt,</p>
            <p><strong>Johanna, Travel Planneur</strong><br>
            <a href="https://moanava.com" style="color: #00aed1; text-decoration: none;">Moanava.com</a></p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 14px;"><strong>Votre message sur Moanava.com :</strong></p>
              <p style="color: #666; font-size: 14px; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${message.replace(
                /\n/g,
                "<br>"
              )}</p>
            </div>
          </div>
        `,
      };

      try {
        // Envoi des emails
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(userMailOptions),
        ]);
        console.log("Emails envoyés avec succès à l'admin et à l'utilisateur");
      } catch (emailError) {
        console.error("Erreur lors de l'envoi des emails:", emailError);
        throw emailError;
      }
    } else {
      // Envoi uniquement à l'administrateur
      try {
        await transporter.sendMail(adminMailOptions);
        console.log("Email envoyé avec succès à l'admin uniquement");
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email admin:", emailError);
        throw emailError;
      }
    }

    // Log des informations (à supprimer en production)
    console.log("Formulaire reçu:", { name, email, message, sendConfirmation });

    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès!",
    });
  } catch (error) {
    console.error("Erreur dans la route API contact:", error);
    return NextResponse.json({
      success: false,
      message: "Une erreur est survenue lors du traitement de votre demande",
    });
  }
}
