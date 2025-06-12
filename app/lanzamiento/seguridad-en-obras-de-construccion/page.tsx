import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seguridad en Obras de Construcción | Certificación OSHA | Club de Ingenieros',
  description: 'Curso certificado sobre normativas de seguridad en construcción según estándares OSHA. Certificación internacional incluida. Aprenda con expertos en seguridad industrial.',
  keywords: ['seguridad en obras', 'OSHA', 'normativas construcción', 'certificación internacional', 'protección laboral'],
  openGraph: {
    title: 'Seguridad en Obras de Construcción | Certificación OSHA',
    description: 'Curso certificado sobre normativas de seguridad en construcción',
    url: 'https://clubdeingenieros.com/cursos/seguridad-en-obras-de-construccion',
    type: 'website',
    images: [
      {
        url: 'https://clubdeingenieros.com/images/og-seguridad.jpg',
        width: 1200,
        height: 630,
        alt: 'Curso de Seguridad en Obras',
      },
    ],
    siteName: 'Club de Ingenieros',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguridad en Obras de Construcción | Certificación OSHA',
    description: 'Curso certificado sobre normativas de seguridad en construcción',
    images: ['https://clubdeingenieros.com/images/og-seguridad.jpg'],
  },
  alternates: {
    canonical: 'https://clubdeingenieros.com/cursos/seguridad-en-obras-de-construccion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function SeguridadObrasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Seguridad en Obras de Construcción",
            "description": "Curso certificado sobre normativas de seguridad en construcción según estándares OSHA",
            "provider": {
              "@type": "Organization",
              "name": "Club de Ingenieros",
              "sameAs": "https://clubdeingenieros.com"
            },
            "educationalCredentialAwarded": "Certificación OSHA",
            "image": "https://clubdeingenieros.com/images/og-seguridad.jpg",
            "offers": {
              "@type": "Offer",
              "price": "999",
              "priceCurrency": "PEN"
            }
          })
        }}
      />

      <Navbar  />
      
      {/* Breadcrumbs para SEO */}
      <nav aria-label="Ruta de navegación" className="container mx-auto px-4 py-3 text-sm">
        <ol className="flex space-x-2">
          <li><Link href="/" className="text-blue-600 hover:underline">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/cursos" className="text-blue-600 hover:underline">Cursos</Link></li>
          <li>/</li>
          <li className="text-gray-600">Seguridad en Obras</li>
        </ol>
      </nav>

      {/* Hero section con semántica mejorada */}
      <section aria-labelledby="main-heading" className="relative bg-blue-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-white text-blue-800 px-4 py-2 rounded-full font-medium mb-4">
              Nuevo Curso Certificado
            </span>
            <h1 id="main-heading" className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Seguridad en <span className="text-yellow-300">Obras de Construcción</span>
            </h1>
            <p className="text-xl mb-8">
              Cumple con todas las normativas vigentes y protege a tu equipo
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition-all shadow-lg">
              ¡Quiero Certificarme!
            </button>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/seguridad-hero.jpg"
              alt="Equipo de construcción usando equipos de seguridad"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Resto del contenido... */}
      <Footer  />
    </div>
  );
}