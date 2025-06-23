import FloatingButtons from '@/app/floating-buttons';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Curso de Hidrología Aplicada con PISCO, R y HEC-HMS | Club de Ingenieros',
  verification: {
    google: "s7rwNtOiZLTsTJkm10Dj-B1CNfnpkSjX7iDkXcjEVF4",
  },
  description:
    'Curso virtual profesional para dominar el análisis hidrológico aplicado con datos PISCO y SENAMHI, Quantile Mapping en R y modelado distribuido con HEC-HMS. Certificación digital de 120 horas académicas. Aprende con herramientas como QGIS, R, Excel y más.',
   keywords: [
    'curso hidrología aplicada',
    'curso PISCO SENAMHI',
    'Quantile Mapping R',
    'simulación hidrológica HEC-HMS',
    'curso R hidrología',
    'modelado hidrológico distribuido',
    'QGIS cuencas hidrográficas',
    'curso online hidrología Perú',
    'curso SIG hidrológico',
    'curso HEC-HMS con certificado',
    'Club de Ingenieros hidrología',
    'hidrología ambiental',
    'corrección de datos climáticos',
    'curso certificado hidrología',
    'curso hidrología Perú'
  ],

  openGraph: {
    title: 'Curso Virtual: Hidrología Aplicada con PISCO, R y HEC-HMS | Club de Ingenieros',
    description:
      'Domina el análisis de cuencas con datos de PISCO y SENAMHI, aplica Quantile Mapping en R y simula eventos con HEC-HMS. Curso online certificado por Educare Internacional y la Cámara de Comercio de Lima.',
    url: 'https://www.clubdeingeniero.com/lanzamiento/hidrologia-pisco-senamhi',
    type: 'website',
    images: [
      {
        url: 'https://www.clubdeingeniero.com/hidrologia-aplicada-con-pisco/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Curso de Hidrología Aplicada con QGIS, R y HEC-HMS - Club de Ingenieros',
        type: 'image/jpeg',
      },
    ],
    siteName: 'Club de Ingenieros',
    locale: 'es_PE',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@ClubIngenierosPE',
    creator: '@ClubIngenierosPE',
    title: 'Curso Profesional de Hidrología Aplicada con R y HEC-HMS',
     description:
      'Aprende modelado hidrológico y simulación distribuida con HEC-HMS, corrección de datos climáticos en R y análisis de datos de PISCO y SENAMHI. Curso certificado de 120 horas académicas.',
    images: {
      url: 'https://www.clubdeingeniero.com/hidrologia-aplicada-con-pisco/banner.webp',
      alt: 'Curso profesional de QGIS, R y HEC-HMS para análisis de cuencas',
    },
  },

  alternates: {
    canonical: 'https://www.clubdeingeniero.com/lanzamiento/hidrologia-pisco-senamhi',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  metadataBase: new URL('https://www.clubdeingeniero.com'),
  authors: [
    {
      name: 'Club de Ingenieros',
      url: 'https://www.clubdeingeniero.com',
    },
  ],
  category: 'Hidrología, Ingeniería Civil, SIG, Recursos Hídricos',
  creator: 'Club de Ingenieros',
  publisher: 'Club de Ingenieros',
};


export default function AnalisisCuencasLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingButtons />
    <GoogleAnalytics gaId="G-EK501511RW" /> 
    </>
  );
}