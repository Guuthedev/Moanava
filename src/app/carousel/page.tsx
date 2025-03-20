import CarouselDemo from "@/components/carousel-demo";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function CarouselPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary font-montserrat mb-10 text-center">
          Galerie de Destinations
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center font-opensans">
          Découvrez nos plus belles destinations en parcourant cette galerie
          interactive. Cliquez sur une image pour l&apos;agrandir et utilisez
          les flèches pour naviguer.
        </p>
        <CarouselDemo />
      </div>
      <Footer />
    </main>
  );
}
