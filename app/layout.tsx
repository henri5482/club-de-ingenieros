import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import FloatingButtons from './floating-buttons';
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Club de Ingenieros | Cursos diplomados y certificaciones",
    template: "%s | Club de Ingenieros",
  },
  description: "Cursos especializados con certificado para profesionales y estudiantes. Mejora tus habilidades con formación práctica de alto nivel. Certificaciones reconocidas en el sector.",
  keywords: [
    "cursos de ingeniería",
    "formación para ingenieros",
    "capacitación ingenieria",
    "especializaciones en ingeniería",
    "ingeniería civil",
    "ingeniería mecánica",
    "ingeniería eléctrica",
    "ingeniería industrial",
    "ingeniería de sistemas",
    "cursos técnicos para ingenieros",
    "certificaciones ingeniería",
    "actualización profesional ingenieros",
    "maestrías en ingeniería",
    "diplomados en ingeniería",
    "Club de Ingenieros"
  ].join(", "),
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://www.clubdeingeniero.com'), // REEMPLAZA CON TU DOMINIO REAL
  openGraph: {
    title: 'Club de Ingenieros | Cursos Especializados para Ingenieros',
    description: 'Formación de alto nivel en todas las ramas de la ingeniería. Cursos prácticos con certificación reconocida para impulsar tu carrera profesional.',
    url: 'https://www.clubdeingeniero.com/', // REEMPLAZA CON TU DOMINIO REAL
    siteName: 'Club de Ingenieros',
    images: [
      {
        url: 'https://www.clubdeingeniero.com/clubdeingenieros.png', // RUTA A TU IMAGEN DE OPEN GRAPH
        width: 1200,
        height: 630,
        alt: 'Cursos Especializados en Ingeniería para Profesionales',
      },
    ],
    locale: 'es_ES', // o 'es_PE' si está enfocado en Perú
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club de Ingenieros | Formación Especializada',
    description: 'Cursos y certificaciones en ingeniería civil, mecánica, eléctrica, industrial y más. Actualiza tus conocimientos con expertos.',
    creator: '@ClubIngenieros', // OPCIONAL: REEMPLAZA CON TU USUARIO DE TWITTER
    images: ['https://www.clubdeingenieros.com/clubdeingenieros.png'], // RUTA A TU IMAGEN DE TWITTER
  },
  alternates: {
    canonical: 'https://www.clubdeingenieros.com', // IMPORTANTE PARA SEO
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={font.variable}>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons />
    <GoogleAnalytics gaId="G-EK501511RW" /> 
      </body>
    </html>
  );
}