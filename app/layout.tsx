import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import { FilmProvider } from "../components/FilmContext";
import ProjectModal from "../components/ProjectModal";
import VideoLightbox from "../components/VideoLightbox";
import CaseStudyModal from "../components/CaseStudyModal";
import ArchiveModal from "../components/ArchiveModal";

export const metadata: Metadata = {
  title: "CLUVION — The AI Film House",
  description:
    "The AI film house for brands that think in cinema. Cinematic brand films, ad variations, product films, and AI micro-dramas without physical shoots, sets, crews, or flights.",
  keywords: [
    "AI film studio",
    "AI production house",
    "Cinematic brand films",
    "AI micro dramas",
    "Performance UGC",
    "Cluvion",
    "AI commercials",
  ],
  authors: [{ name: "Cluvion Studio" }],
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title: "CLUVION — The AI Film House",
    description:
      "Same cinema. A fraction of the invoice. Cinematic brand films, ad variations, and AI micro-dramas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070709] text-[#F4F4F6] min-h-screen antialiased selection:bg-accent/30 selection:text-white font-secondary">
        {/* Subtle Ambient Film Grain */}
        <div className="film-grain-overlay" aria-hidden="true" />
        
        {/* Subtle Cinema Vignette */}
        <div className="cinema-vignette" aria-hidden="true" />

        <FilmProvider>
          <SmoothScroll>
            {children}
            <ProjectModal />
            <VideoLightbox />
            <CaseStudyModal />
            <ArchiveModal />
          </SmoothScroll>
        </FilmProvider>
      </body>
    </html>
  );
}
