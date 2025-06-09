import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cursos con certificación ",
  description: "Explora todos nuestros cursos especializados en ingeniería civil, mecánica, eléctrica, industrial y más.",
  openGraph: {
    title: "Cursos con certificación  ",
    description: "Formación práctica con certificación profesional para ingenieros.",
    images: [
      {
        url: "https://www.clubdeingenieros.com/clubdeingenieros.png",
        width: 1200,
        height: 630,
        alt: "Cursos con certificado Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos | Club de Ingenieros",
    description: "Formación práctica con certificación profesional para ingenieros.",
    images: ["https://www.clubdeingenieros.com/clubdeingenieros.png"],
  },
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}