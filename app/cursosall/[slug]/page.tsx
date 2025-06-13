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

// Interfaces (Keep these as they are)
interface Temario {
  title: string;
  items: string[];
}

interface CourseDetails {
  date: string;
  duration: string;
  level: string;
  offer?: string;
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
  curso: string;
  docente?: string;
  docenteImage?: string;
  docenteBio?: string;
  profesores?: Profesor[];
  paraQuienEs?: string[];
  conocimientosPrevios?: string[];
  certificado?: {
    imageSrc: string; // Changed from title and content to imageSrc
  };
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  temarios: Temario[];
  category?: string;
}

// Function to get all courses (Keep as is)
async function getAllCourses(): Promise<Course[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "coursesall.json"
    );
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
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "coursesall.json"
    );
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

// Función para mezclar array de manera aleatoria (Keep as is)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default async function CourseDetail({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;

  const allCourses = await getAllCourses();
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-red-600">
        <p className="text-xl mb-4">Curso no encontrado.</p>
        <Link href="/" className="text-red-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Lógica para cursos relacionados con selección aleatoria (Keep as is)
  let relatedCourses: Course[] = [];
  if (course.category) {
    const sameCategoryCourses = allCourses.filter(
      (c) => c.id !== course.id && c.category === course.category
    );

    // Mezclar y seleccionar hasta 3 cursos diferentes cada vez
    relatedCourses = shuffleArray(sameCategoryCourses).slice(0, 3);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 py-12 px-2 md:px-8 pt-40">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          {/* Top Section: Title, description, and main content */}
          {/*
            APLICACIÓN DE CLASES 'ORDER' PARA CONTROLAR LA POSICIÓN:
            - flex-col: En móviles, los elementos se apilan verticalmente.
            - md:flex-row: En pantallas medianas y grandes, los elementos se ponen horizontalmente.

            Orden en MÓVILES (default, sin prefijo md:):
            - La imagen tendrá 'order-1' (aparece primero)
            - El texto tendrá 'order-2' (aparece segundo)

            Orden en ESCRITORIO (con prefijo md:):
            - El texto tendrá 'md:order-1' (aparece primero, a la izquierda)
            - La imagen tendrá 'md:order-2' (aparece segundo, a la derecha)
          */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">

            {/* Columna de Imagen y Detalles del Curso */}
            <div className="md:w-1/2 order-1 md:order-2 bg-white rounded-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2 cursor-pointer group shadow-md md:shadow-none">
              {/* Imagen: RESPONSIVA y no cortada */}
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-t-2xl md:rounded-2xl">
                <Image
                  src={course.src}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="bg-white rounded-b-2xl md:rounded-2xl p-2 md:p-6 shadow-lg md:shadow-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                      Fecha
                    </p>
                    <p className="font-semibold text-sm md:text-lg text-gray-800">
                      {course.details.date}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                      Duración
                    </p>
                    <p className="font-semibold text-sm md:text-lg text-gray-800">
                      {course.details.duration}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                      Estudiantes
                    </p>
                    <p className="font-semibold text-sm md:text-lg text-gray-800">
                      {course.remainingSeats}
                    </p>
                  </div>
                  {course.details.offer && (
                    <div className="text-center md:text-left">
                      <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                        Oferta
                      </p>
                      <p className="font-semibold text-sm md:text-lg text-red-600">
                        {course.details.offer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna de Contenido Textual (Título, Descripción, Aprenderás, Botones) */}
            <div className="flex-1 md:w-1/2 order-2 md:order-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold inline-block">
                  <span className="font-bold">{course.curso}</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
                {course.titulo}
              </h1>
              <p className="text-gray-700 text-lg mb-6">{course.descripcion}</p>

              {/* "¿Qué aprenderás?" Section */}
              {course.learnings && course.learnings.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-red-100 pb-2">
                    ¿Qué aprenderás?
                  </h2>
                  <ul className="space-y-3">
                    {course.learnings.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2 mt-1">•</span>
                        <span className="text-lg text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full">
                {/* Botón "Ver más cursos" */}
                <Button
                  className="w-full bg-amber-500 hover:bg-red-600 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-between group"
                  asChild
                >
                  <a
                    href={`https://wa.me/51987654321?text=Hola%2C%20quisiera%20saber%20mas%20sobre%20la%20suscripcion%20premium%20`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <div className="text-base font-semibold">Suscripción Premium</div>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-80 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </Button>

                <div className="relative w-full max-w-md mx-auto">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-between group"
                    asChild
                  >
                    <a
                      href={`https://wa.me/51987654321?text=Hola%2C%20estoy%20interesado%20en%20comprar%20el%20curso%20*${encodeURIComponent(course.titulo)}*%20a%20S/%20${(
                        (course.precio ?? 0) * (1 - (course.descuento ?? 0))
                      ).toFixed(2)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-0">
                        <div className="p-3 rounded-lg transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium opacity-90">
                            Comprar curso
                          </div>
                          <div className="text-xl font-bold">
                            {course.descuento && course.precio ? (
                              <>
                                <span className="text-white mr-2">
                                  S/
                                  {(course.precio * (1 - course.descuento)).toFixed(2)}
                                </span>
                                <span className="line-through text-white/70 text-sm">
                                  S/{course.precio.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span>S/{course.precio?.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-80 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Button>

                  {course.descuento && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full transform rotate-6 shadow-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L13.586 10l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {Math.round(course.descuento * 100)}% OFF
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus and Professors Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Syllabus Column (2/3 width) */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6 text-red-600 border-b-2 border-red-100 pb-2">Temario del Curso</h2>

              {course.temarios && course.temarios.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4 "
                >
                  {course.temarios.map((temario, index) => (
                    <AccordionItem
                      key={`temario-${index}`}
                      value={`item-${index}`}
                      className="border border-red-200 rounded-lg overflow-hidden hover:border-red-300 transition-colors  "
                    >
                      <AccordionTrigger className=" text-base md:text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-red-50 transition-colors duration-200 text-gray-800">
                        <span className="text-left flex items-center">

                          {temario.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-6 py-4">
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {temario.items.map((item, itemIndex) => (
                            <li
                              key={`temario-item-${index}-${itemIndex}`}
                              className="text-sm md:text-base"
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
                <p className="text-gray-500 text-center py-8 bg-red-50 rounded-lg">
                  No hay temario disponible para este curso.
                </p>
              )}

              {/* "Acerca del curso" Section */}
              {course.about && (
                <div className="mt-8 bg-red-50 rounded-lg p-6 border border-red-100">
                  <h2 className="text-xl font-bold mb-4 flex items-center text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-red-600"
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
                  <div className="text-gray-700 space-y-4">
                    {course.about.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {!course.about && (
                <div className="mt-8 bg-red-50 rounded-lg p-6 border border-red-100">
                  <h2 className="text-xl font-bold mb-4 flex items-center text-red-600">
                    Acerca del curso
                  </h2>
                  <p className="text-gray-500">
                    Información detallada no disponible para este curso.
                  </p>
                </div>
              )}
            </div>

            {/* Professors Column (1/3 width) */}
            {course.profesores && course.profesores.length > 0 && (
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6 text-red-600 border-b-2 border-red-100 pb-2">
                  Profesores del Curso
                </h2>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    {course.profesores.map((profesor, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-red-500">
                          <Image
                            src={profesor.imagen}
                            alt={profesor.nombre}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {profesor.nombre}
                          </h3>
                          {profesor.usuarioSocial && (
                            <div className="mt-1">
                              <Link
                                href={profesor.enlacePerfil || "#"}
                                className="text-red-600 hover:text-red-500 text-sm inline-flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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

                  {/* "Para quien es este curso" Section */}
                  {course.paraQuienEs && course.paraQuienEs.length > 0 && (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h2 className="text-xl font-bold mb-3 text-red-600">
                        ¿Para quién es este curso?
                      </h2>
                      <div className="bg-red-50 rounded-lg p-4">
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {course.paraQuienEs.map((item, index) => (
                            <li key={`para-quien-${index}`} className="text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Certificado Avalado Section */}
                  <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-5 text-red-600 drop-shadow-sm">
                      Certificado Avalado
                    </h2>
                    {course.certificado && course.certificado.imageSrc ? (
                      <Link href="/projects" passHref> {/* Changed link to /certificados as per previous request */}
                        <div className="group relative bg-red-50 rounded-xl p-4 sm:p-6 flex justify-center items-center overflow-hidden shadow-2xl transition-all duration-500 ease-out transform hover:scale-[1.03] hover:shadow-red-300/70 cursor-pointer">
                          {/* Container for the image with a defined aspect ratio */}
                          <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto rounded-lg border-2 border-red-300 bg-white overflow-hidden shadow-xl"
                            style={{ paddingTop: 'calc(100% * 2 / 3)' }}> {/* Common certificate aspect ratio (3:2) */}
                            <Image
                              src={course.certificado.imageSrc}
                              alt="Certificado del Curso"
                              fill
                              style={{ objectFit: 'contain' }} // Ensures the entire image is visible
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" // Smooth animation
                            />
                          </div>
                          {/* Optional: Add a subtle overlay or text on hover for better UX */}
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-md bg-red-700/60 backdrop-blur-sm">Ver Detalles</span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="bg-red-50 rounded-lg p-6 text-gray-600 italic border border-red-100 shadow-md">
                        Certificado no disponible para este curso.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Courses Section */}
          {relatedCourses.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-red-100 pb-2">
                Cursos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <Link
                    href={`/cursosall/${relatedCourse.slug}`}
                    key={relatedCourse.id}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-gray-100">
                      <div className="relative h-40">
                        <Image
                          src={relatedCourse.src}
                          alt={relatedCourse.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className=" text-base md:text-lg font-semibold text-gray-900">
                          {relatedCourse.titulo}
                        </h3>
                        {/* <p className="text-red-600 font-medium mt-2">
                          {relatedCourse.details.date}
                        </p> */}
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