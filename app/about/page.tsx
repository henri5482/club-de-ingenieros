// Componente del servidor (NO uses 'use client' aquí)

import { GoogleAnalytics } from "@next/third-parties/google";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "Nosotros | Club de ingenieros: Líderes en Cursos y Diplomados para Ingenieros", // Más específico, incluye "líderes" para posicionamiento
  description: "Descubre a Club de Ingenieros, tu aliado educativo en Ingenieria con más de 10 años de experiencia. Ofrecemos cursos y diplomados de alta calidad para fortalecer tu carrera, con avales de instituciones clave. Conoce nuestra misión de impulsar el desarrollo profesional de los Ingenieros.", // Añadir años de experiencia, calidad, beneficios y misión
  keywords: [
    "Club de Ingenieros",
    "cursos para Ingenieros",
    "diplomados en Ingenieria",
    "capacitación Ingenieros",
    "educación continua Ingenieros",
    "formación profesional Ingenieros",
    "Ingenieros Perú", // Si aplica geográficamente
    "especialización Ingenieros",
    "actualización Ingenieros",
    "calidad educativa Ingenieros",
    "equipo Ingenieros",
    "nuestra historia Ingenieros",
    "misión Ingenieros",
    "visión Ingenieros"
  ],
  openGraph: {
    title: "Nosotros | Club de Ingenieros: Formación de Excelencia para Ingenieros", // Título atractivo y conciso para compartir
    description: "Conoce Club de Ingenieros, empresa líder en educación para Ingeneiros. Más de 10 años de experiencia formando profesionales con cursos y diplomados de alto impacto. Impulsa tu carrera con nosotros.", // Descripción detallada para Open Graph
    url: "https://www.clubdeingeniero.com/about", // ¡Importante! Asegúrate de usar tu dominio real y la URL exacta de esta página
    siteName: "JEDteam",
    images: [
      {
        url: "https://www.clubdeingeniero.com/clubdeingenieros.png", // Considera una imagen específica para la sección "Sobre Nosotros"
        width: 1200,
        height: 630,
        alt: "Club de Ingenieros- Expertos en Educación de Ingenieria" // Alt text más descriptivo
      }
    ],
    locale: "es_PE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | JEDteam: Impulsando la Carrera del Enfermero", // Título conciso para Twitter
    description: "JEDteam: Expertos en cursos y diplomados para enfermeros. Conoce nuestra trayectoria y cómo te ayudamos a crecer profesionalmente.", // Descripción para Twitter
    images: ["https://www.clubdeingeniero.com/clubdeingenieros.png"],
    site: "@JEDteamOficial", // Considera un handle de Twitter si lo tienes
    creator: "@JEDteamOficial" // Si eres el creador o un equipo específico
  },
  alternates: {
    canonical: "https://www.clubdeingeniero.com/about" // URL canónica para esta página
  },
  robots: { // Asegúrate de que los robots indexen y sigan esta página
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: { // Añade tus códigos de verificación si los tienes
    google: 'TU_GOOGLE_VERIFICATION_CODE',
    yandex: 'TU_YANDEX_VERIFICATION_CODE',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
          <GoogleAnalytics gaId="G-EK501511RW" /> 
      
      {/* Schema Markup para la Organización Educativa */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization", // Tipo de organización educativa
            "name": "JEDteam",
            "url": "https://www.clubdeingeniero.com/", // URL de tu sitio web principal
            "logo": "https://www.clubdeingeniero.com/clubdeingenieros.png", // Asegúrate de que esta URL sea correcta
            "description": "Club de Ingenieros es una empresa educativa líder dedicada a ofrecer cursos y diplomados de alta calidad para profesionales de Ingenieria, con el objetivo de fortalecer sus habilidades y avanzar en su carrera.",
           
          })
        }}
      />
    </>
  );
}