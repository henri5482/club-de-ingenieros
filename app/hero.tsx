/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button"; // Asegúrate que la ruta sea correcta
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


// --- Datos de los Cursos (con 'purchaseUrl' añadido) ---
const courses = [
  {
    id: 1,
    title: "Ceramic Arts: Traditional Techniques",
    description:
      "Create unique ceramic vessels at home, learn clay modeling, design, firing, and glaze techniques for decorative pieces.",
    categoryIcon: <Tag className="h-4 w-4" />,
    category: "100% online",
    originalPrice: "219.99",
    discountedPrice: "10.00",
    imageSrc:
      "https://images.unsplash.com/photo-1550319422-e4f7114a84b2?q=80&w=2835&auto=format&fit=crop",
    bgColor: "#C3B7A8",
    gradientColor: "#A69C8F",
    textColor: "#3E3831",
    buttonBgColor: "#3E3831",
    buttonTextColor: "#FFFFFF",
    purchaseUrl: "https://leanding-club-de-ingenieros.vercel.app/cursos/gestion-riesgos-ejecucion-obras", // <-- ENLACE DEL CURSO 1
  },
  {
    id: 2,
    title: "Modern Painting: Abstract Expressionism",
    description:
      "Dive into the world of abstract art. Learn the techniques of masters like Pollock and de Kooning to express your emotions.",
    categoryIcon: <Tag className="h-4 w-4" />,
    category: "In-person workshops",
    originalPrice: "349.99",
    discountedPrice: "25.00",
    imageSrc:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2872&auto=format&fit=crop",
    bgColor: "#A8BCC3",
    gradientColor: "#8FA5AF",
    textColor: "#2A363B",
    buttonBgColor: "#2A363B",
    buttonTextColor: "#FFFFFF",
    purchaseUrl: "https://www.camaralima.org.pe/", // <-- ENLACE DEL CURSO 2
  },
  {
    id: 3,
    title: "Digital Photography: Mastering Light",
    description:
      "Understand the science and art of light in photography. Master studio lighting, natural light, and post-processing.",
    categoryIcon: <Tag className="h-4 w-4" />,
    category: "Advanced Level",
    originalPrice: "299.99",
    discountedPrice: "20.00",
    imageSrc:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=2850&auto=format&fit=crop",
    bgColor: "#D1C4A7",
    gradientColor: "#B5A98F",
    textColor: "#4C4433",
    buttonBgColor: "#4C4433",
    buttonTextColor: "#FFFFFF",
    purchaseUrl: "/cursos/fotografia-digital", // <-- ENLACE DEL CURSO 3
  },
];

// --- Variantes de Animación con Transición Suavizada ---
const slideTransition = {
    type: "tween",
    duration: 0.7, // Duración aumentada para un movimiento más lento
    ease: [0.56, 0.03, 0.12, 1.04], // Curva de ease personalizada para suavidad
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: slideTransition,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: slideTransition,
  }),
};

const textContainerVariants = {
  center: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const textItemVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const imageVariants = {
    enter: { scale: 0.8, opacity: 0 },
    center: {
        scale: 1,
        opacity: 1,
        transition: {
            scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            opacity: { duration: 0.5 }
        }
    },
}

export default function CoursesCarouselFinal() {
  const [[page, direction], setPage] = useState([0, 0]);

  const courseIndex = Math.abs(page % courses.length);
  const activeCourse = courses[courseIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (slideIndex: number) => {
    const newDirection = slideIndex > courseIndex ? 1 : -1;
    setPage([slideIndex, newDirection]);
  };

  return (
    <motion.main
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      animate={{ backgroundColor: activeCourse.bgColor }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <motion.div
        key={courseIndex}
        className="absolute inset-0"
        style={{
            background: `radial-gradient(circle at 50% 50%, ${activeCourse.gradientColor}00, ${activeCourse.bgColor} 80%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <div className="relative flex h-full w-full max-w-7xl items-center justify-center p-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            // MODIFICACIÓN CLAVE AQUÍ:
            // En móviles (por defecto), la imagen (`order-first`) va primero.
            // En pantallas medianas (`md:grid-cols-2`), se usa el orden por defecto del grid.
            className="absolute grid w-full grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-20"
          >
            {/* --- Sección de Imagen (Ahora primera en móvil) --- */}
            <motion.div
              className="relative [perspective:1000px] order-first md:order-last" // Añadido `order-first md:order-last`
              variants={imageVariants}
              initial="enter"
              animate="center"
            >
              <motion.div
                  className="h-full w-full rounded-2xl shadow-2xl [transform-style:preserve-3d]"
                  whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                  <img
                      src={activeCourse.imageSrc}
                      alt={activeCourse.title}
                      className="h-full w-full rounded-2xl object-cover"
                      style={{
                          animation: 'kenburns 20s ease-in-out infinite alternate-reverse',
                          transformOrigin: 'center center',
                      }}
                  />
                  <style jsx global>{`
                      @keyframes kenburns {
                          0% { transform: scale(1) translate(0, 0); }
                          100% { transform: scale(1.1) translate(-2%, 2%); }
                      }
                  `}</style>
              </motion.div>
            </motion.div>

            {/* --- Sección de Texto (Ahora segunda en móvil) --- */}
            <motion.div
              variants={textContainerVariants}
              className="flex flex-col space-y-4" // No se necesita `order-last` aquí, `order-first` de la imagen ya lo posiciona.
              style={{ color: activeCourse.textColor }}
            >
              <motion.h1
                variants={textItemVariants}
                className="text-4xl font-extrabold tracking-tighter lg:text-5xl"
              >
                {activeCourse.title}
              </motion.h1>

              <motion.p
                variants={textItemVariants}
                className="text-base leading-relaxed opacity-90 lg:text-lg"
              >
                {activeCourse.description}
              </motion.p>

              <motion.div
                variants={textItemVariants}
                className="flex items-center space-x-4 text-sm font-medium"
              >
                <div className="flex items-center">{activeCourse.categoryIcon} <span className="ml-2">{activeCourse.category}</span></div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={textItemVariants} className="pt-4">
                <span className="text-lg opacity-70 line-through">
                  PEN {activeCourse.originalPrice}
                </span>
                <p className="flex items-baseline">
                  <span className="mr-2 text-sm font-semibold">95% Disc.</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    PEN {activeCourse.discountedPrice}
                  </span>
                </p>

                {/* --- BOTÓN FUNCIONAL --- */}
                <Button
                  asChild // Permite que el botón se comporte como su hijo (el Link)
                  className="mt-6 w-full rounded-full sm:w-auto px-12 py-7 text-lg font-bold shadow-lg"
                  style={{
                    backgroundColor: activeCourse.buttonBgColor,
                    color: activeCourse.buttonTextColor,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: `0px 10px 30px ${activeCourse.buttonBgColor}50` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={activeCourse.purchaseUrl}
                      target="_blank" // Abre el enlace en una nueva pestaña
                      rel="noopener noreferrer" // Buena práctica de seguridad
                    >
                      Comprar por PEN {activeCourse.discountedPrice}
                    </Link>
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* --- Controles de Navegación --- */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/60 p-3 text-gray-900 transition hover:bg-white hover:scale-110 active:scale-95 md:left-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/60 p-3 text-gray-900 transition hover:bg-white hover:scale-110 active:scale-95 md:right-2"
          aria-label="Next slide"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

      {/* --- Puntos Indicadores --- */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2.5 w-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              courseIndex === i ? "w-8 bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.main>
  );
}