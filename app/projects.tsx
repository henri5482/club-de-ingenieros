"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Interfaces
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

interface Course {
  id: string;
  slug: string;
  src: string;
  name: string;
  titulo: string;
  descripcion: string;
  fechatext: string;
  docente: string;
  temarios: Temario[];
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
}

export function Projects() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/data/courses.json");
        if (!response.ok) throw new Error(`Estado: ${response.status}`);
        const data: Course[] = await response.json();
        setCourses(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(`Error al cargar los cursos: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading)
    return <div className="text-black text-center py-20">Cargando cursos...</div>;
  if (error)
    return <div className="text-red-500 text-center py-20">{error}</div>;
  if (courses.length === 0)
    return (
      <div className="text-gray-600 text-center py-20">
        No hay cursos disponibles.
      </div>
    );

  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-7xl shadow-xl">
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem key={course.id} className="md:basis-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-2xl p-6 md:p-10 shadow-xl/30 hover:shadow-2xl transition-all duration-300 border border-gray-200"
                style={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <Link
                  href={`/cursos/${course.slug}`}
                  className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-lg order-1 md:order-2 group"
                  aria-label={`Ver detalles de ${course.titulo}`}
                >
                  <Image
                    src={course.src}
                    alt={course.name}
                    className="object-contain w-full h-full transition duration-500 ease-in-out group-hover:scale-105"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>

                <div className="w-full md:w-1/2 space-y-4 md:space-y-5 text-gray-800 order-2 md:order-1">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold inline-block shadow-md"
                  >
                    PRÓXIMO LANZAMIENTO
                  </motion.span>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug">
                    {course.titulo}
                  </h2>

                  <p className="text-red-600 text-sm">{course.fechatext}</p>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {course.descripcion}
                  </p>

                  <Link href={`/cursos/${course.slug}`} passHref>
                    <Button
                      className="w-full md:w-auto mt-4 md:mt-6 bg-red-500 text-white hover:bg-red-400 font-semibold transition hover:scale-105 text-sm md:text-base shadow-lg"
                      asChild
                    >
                      <span>mas informacion</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:flex absolute left-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 shadow-lg" />
        <CarouselNext className="hidden lg:flex absolute right-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 shadow-lg" />
      </Carousel>
    </section>
  );
}