import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import fs from "fs/promises";
import Image from "next/image";
import Link from "next/link";
import path from "path";

interface Temario {
  title: string;
  items: string[];
}

interface CourseDetails {
  date: string;
  duration: string;
  level: string;
  offer: string;
}

interface Profesor {
  nombre: string;
  imagen: string;
  usuarioSocial?: string;
  enlacePerfil?: string;
}

interface Course {
  id: string;
  about?: string;
  slug: string;
  src: string;
  name: string;
  precio?: number;
  descuento?: number;
  titulo: string;
  descripcion: string;
  fechatext: string;
  docente?: string;
  docenteImage?: string;
  docenteBio?: string;
  profesores?: Profesor[];
  paraQuienEs?: string[];
  conocimientosPrevios?: string[];
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  temarios: Temario[];
  category?: string;
}

async function getAllCourses(): Promise<Course[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "courses.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const courses: Course[] = JSON.parse(fileContent);
    return courses;
  } catch (error) {
    console.error(`Error al cargar todos los cursos desde el archivo:`, error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "courses.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const courses: Course[] = JSON.parse(fileContent);
    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error(
      `Error al cargar los cursos desde el archivo (generateStaticParams):`,
      error
    );
    return [];
  }
}

export default async function CourseDetail({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const slug = params.slug;

  const allCourses = await getAllCourses();
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-red-600 p-4">
        <p className="text-xl mb-4 text-center">Curso no encontrado</p>
        <Link href="/" className="text-red-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  let relatedCourses: Course[] = [];
  if (course.category) {
    relatedCourses = allCourses.filter(
      (c) => c.id !== course.id && c.category === course.category
    ).slice(0, 3);
  }

  const startDate = course.details.date;
  const whatsappNumber = "51987654321"; // Reemplaza con tu número de WhatsApp
  const whatsappMessage = `Hola, estoy interesado en el curso "${course.titulo}" que comienza el ${startDate}. ¿Podrían brindarme más información?`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const premiumMessage = `Hola, estoy interesado en la Suscripción Premium. ¿Podrían brindarme más información?`;
  const encodedPremiumMessage = encodeURIComponent(premiumMessage);
  const premiumWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedPremiumMessage}`;

  // Calcula el precio con descuento si existe
  const precioConDescuento =
    course.precio && course.descuento
      ? (course.precio * (1 - course.descuento)).toFixed(2)
      : null;
  const porcentajeDescuento = course.descuento
    ? (course.descuento * 100).toFixed(0)
    : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200">
          {/* Top Section - Stacked on mobile */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Left Column */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <div className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base">
                  PRÓXIMO LANZAMIENTO
                </div>
                <div className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base">
                  <span>Clases empiezan el </span>
                  <span className="font-bold">{startDate}</span>
                </div>
               
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
                {course.titulo}
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6">
                {course.descripcion}
              </p>

              {/* Learnings */}
              {course.learnings?.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                    ¿Qué aprenderás?
                  </h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {course.learnings.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">•</span>
                        <span className="text-base sm:text-lg text-gray-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prices and Buttons - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
                {/* Premium Button */}
                <Button
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 sm:py-5 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3 border border-gray-300"
                  asChild
                >
                  {/* El '<a>' es el único hijo directo de Button */}
                  <a href={premiumWhatsappUrl} target="_blank" rel="noopener noreferrer">
                    <span className="text-sm sm:text-base md:text-lg text-gray-900">
                      Suscripción Premium →
                    </span>
                  </a>
                </Button>

                {/* Buy Button with Price */}
                <Button
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden`}
                  asChild
                >
                  {/* SOLUCIÓN: Envuelve el <a> y el div del descuento en un solo elemento padre */}
                  {/* Aquí usamos un div como contenedor único para el botón con descuento */}
                  <div className="flex items-center justify-center w-full h-full relative cursor-pointer">
                    {" "}
                    {/* Añadido relative aquí para el absolute de la etiqueta */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full"
                    >
                      <span className="text-sm sm:text-base md:text-lg">
                        Comprar 
                      </span>
                      {course.precio && (
                        <span className="ml-2 flex items-baseline gap-2">
                          {" "}
                          {/* Changed flex-col to items-baseline for better alignment */}
                          {precioConDescuento ? (
                            <>
                              <span className="font-bold text-xl sm:text-2xl">
                                {" "}
                                {/* Increased size for emphasis */}
                                S/{precioConDescuento} {/* <--- ¡CORREGIDO AQUÍ! */}
                              </span>
                              <span className="line-through text-base sm:text-lg opacity-75 mr-1">
                                {" "}
                                {/* Adjusted size and added margin-right */}
                                S/{course.precio.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-xl sm:text-2xl">
                              S/{course.precio.toFixed(2)}
                            </span>
                          )}
                        </span>
                      )}
                    </a>
                    {/* Discount "flag" or "tag" on the button - ahora es hijo directo del <div> contenedor */}
                    {porcentajeDescuento && (
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg">
                        -{porcentajeDescuento}%
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Column - Image and Details */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1 cursor-pointer group border border-gray-200">
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                <Image
                  src={course.src}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">
                      Fecha
                    </p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                      {course.details.date}
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">
                      Duración
                    </p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                      {course.details.duration}
                    </p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">
                      Estudiantes
                    </p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                      {course.remainingSeats}
                    </p>
                  </div>
                  {course.details.offer && (
                    <div className="text-center sm:text-left">
                      <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">
                        Oferta
                      </p>
                      <p className="font-semibold text-sm sm:text-base md:text-lg text-red-600">
                        {course.details.offer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resto del código permanece igual... */}
          {/* Syllabus and Professors Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-8 md:mb-10">
            {/* Syllabus Column */}
            <div className="lg:w-2/3">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                Temario del Curso
              </h2>

              {course.temarios?.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2 sm:space-y-3"
                >
                  {course.temarios.map((temario, index) => (
                    <AccordionItem
                      key={`temario-${index}`}
                      value={`item-${index}`}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-left text-gray-900">
                          {temario.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-4 sm:px-6 py-3 sm:py-6">
                        <ul className=" text-gray-700">
                          {temario.items.map((item, itemIndex) => (
                            <li
                              key={`temario-item-${index}-${itemIndex}`}
                              className="text-sm sm:text-base"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-gray-500 text-center py-4 sm:py-6 bg-gray-50 rounded-lg">
                  No hay temario disponible para este curso.
                </p>
              )}

              {/* About Section */}
              <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  Acerca del curso
                </h2>
                <div className="text-gray-700 space-y-3 sm:space-y-4">
                  {course.about ? (
                    course.about.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-sm sm:text-base">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">
                      Información detallada no disponible para este curso.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professors Column */}
            {Array.isArray(course.profesores) && course.profesores.length > 0 && (
              <div className="lg:w-1/3">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                  Profesores del Curso
                </h2>
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-gray-200">
                  <div className="space-y-4 sm:space-y-6">
                    {course.profesores.map((profesor, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-red-600">
                          <Image
                            src={profesor.imagen}
                            alt={profesor.nombre}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 48px, 64px"
                            priority
                          />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                            {profesor.nombre}
                          </h3>
                          {profesor.usuarioSocial && (
                            <div className="mt-1">
                              <Link
                                href={profesor.enlacePerfil || "#"}
                                className="text-red-600 hover:text-red-500 text-xs sm:text-sm inline-flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                                {profesor.usuarioSocial}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Target Audience */}
                  {Array.isArray(course.paraQuienEs) && course.paraQuienEs.length > 0 && (
                    <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                        ¿Para quién es este curso?
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700">
                          {course.paraQuienEs?.map((item, index) => (
                            <li
                              key={`para-quien-${index}`}
                              className="text-xs sm:text-sm"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {Array.isArray(course.conocimientosPrevios) && course.conocimientosPrevios.length > 0 && (
                    <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                        Conocimientos Previos
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700">
                          {course.conocimientosPrevios.map((item, index) => (
                            <li
                              key={`conocimientos-${index}`}
                              className="text-xs sm:text-sm"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                Cursos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <Link
                    href={`/cursos/${relatedCourse.slug}`}
                    key={relatedCourse.id}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-[1.02] transform transition-transform border border-gray-200">
                      <div className="relative h-32 sm:h-40">
                        <Image
                          src={relatedCourse.src}
                          alt={relatedCourse.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {relatedCourse.titulo}
                        </h3>
                        <p className="text-red-600 font-medium mt-1 sm:mt-2 text-sm sm:text-base">
                          {relatedCourse.details.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}