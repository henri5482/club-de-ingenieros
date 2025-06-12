import { Metadata } from 'next';
import Link from 'next/link';
import coursesData from '../data/courses.json';
import Footer from '../footer';
import Navbar from '../navbar';


interface Course {
  id: string;
  fullTitle: string;
  slug: string;
  shortDescription: string;
  badge?: string;
}

export const metadata: Metadata = {
  title: 'Club de Ingenieros | Cursos Especializados',
  description: 'Descubre nuestros cursos con landing pages completamente personalizadas',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-40">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Nuestros Cursos Exclusivos
        </h1>

        <p className="text-xl text-center text-gray-700 mb-16 max-w-2xl mx-auto">
          Cada curso tiene una landing page completamente única y personalizada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course: Course) => (
            <div 
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <Link href={`/lanzamiento/${course.slug}`} className="block h-full">
                <div className="p-6 h-full flex flex-col">
                  {course.badge && (
                    <span className="self-start px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                      {course.badge}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {course.fullTitle}
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {course.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block w-full text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Ver Landing Page →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}