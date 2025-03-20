import ContactContent from "./ContactContent";

export const metadata = {
  title: "Contact | Moanava",
  description: "Contactez-nous pour plus d'informations sur nos services",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <ContactContent />
    </main>
  );
}
