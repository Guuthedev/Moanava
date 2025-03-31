import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { InfoPopup } from "@/components/ui/info-popup";
import { Toaster } from "sonner";

export default function ServerBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="min-h-screen w-full bg-background font-sans antialiased overflow-x-hidden">
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster position="top-center" />
      <InfoPopup />
    </body>
  );
}
