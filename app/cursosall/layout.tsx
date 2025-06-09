import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos con Certificación Profesional ",
  description:
    "Cursos especializados con certificación en ingeniería civil, mecánica, eléctrica e industrial. Formación práctica para profesionales.",
  keywords: [
    "cursos de ingeniería",
    "cursos especializados",
    "formación para ingenieros",
    "certificación profesional",
    "ingeniería civil",
    "ingeniería mecánica",
  ],
  metadataBase: new URL("https://www.clubdeingeniero.com"),
  alternates: {
    canonical: "/cursosall",
    languages: {
      "es-ES": "/es/cursosall",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "Cursos con Certificación Profesional para Ingenieros",
    description:
      "Formación práctica con certificación profesional para ingenieros. Cursos en ingeniería civil, mecánica, eléctrica e industrial.",
    url: "https://www.clubdeingeniero.com/cursosall",
    type: "website",
    locale: "es_ES",
    siteName: "Club de Ingenieros",
    images: [
      {
        url: "https://www.clubdeingeniero.com/clubdeingenieros.png",
        width: 1200,
        height: 630,
        alt: "Cursos con certificado Profesional para ingenieros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos con Certificación ",
    description:
      "Formación práctica con certificación profesional para ingenieros.",
    creator: "@clubingenieros",
    site: "@clubingenieros",
    images: ["https://www.clubdeingeniero.com/clubdeingenieros.png"],
  },
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {children}
      <GoogleAnalytics gaId="G-EK501511RW" /> 
  
  </>;
}
