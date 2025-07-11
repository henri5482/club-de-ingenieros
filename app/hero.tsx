/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Datos de los Cursos (sin cambios) ---
const courses = [
  {
    id: 1,
    title: "ANÁLISIS DE CUENCAS HIDROGRÁFICAS CON QGIS",
    description:
      "Este curso tiene como objetivo principal formar profesionales y estudiantes en la aplicación de herramientas SIG avanzadas (QGIS) para el análisis hidrológico integral.",
    categoryIcon: <Tag className="h-4 w-4" />,
    category: "100% online",
    originalPrice: "198.00",
    discountedPrice: "99.00",
    imageSrc: "bannercuencas.webp",
    bgColor: "#E25822",
    gradientColor: "#A69C8F",
    textColor: "white",
    buttonBgColor: "#3E3831",
    buttonTextColor: "#FFFFFF",
    purchaseUrl: "/cursos/analisis-cuencas-hidrograficas-qgis",
  },
  {
    id: 2,
    title: "HIDROLOGÍA APLICADA CON PISCO, SENAMHI Y R",
    description:
      "Aprende a corregir datos PISCO y SENAMHI, aplicar Quantile Mapping en R y realizar simulaciones hidrológicas con HEC-HMS usando datos reales.",
    categoryIcon: <Tag className="h-4 w-4" />,
    category: "100% online",
    originalPrice: "199.00",
    discountedPrice: "99.00",
    imageSrc: "/hidrologia-aplicada-con-pisco/banner.webp",
    bgColor: "#04597D",
    gradientColor: "#8ED1FC",
    textColor: "white",
    buttonBgColor: "#023047",
    buttonTextColor: "#FFFFFF",
    purchaseUrl: "/cursos/hidrologia-aplicada-pisco-senamhi-qm",
  },
 {
  id: 3,
  title: "CERTIFICACIÓN DE PUNTOS GEODÉSICOS EN ORDEN C",
  description: "Domina la normativa y los procesos para la certificación de puntos geodésicos de Orden C ante el IGN, desde el levantamiento hasta el expediente técnico.",
  categoryIcon: <Tag className="h-4 w-4" />,
  category: "100% online",
  originalPrice: "199.00",
  discountedPrice: "99.00",
  imageSrc: "/certificacion-puntos-geodesicos-orden-c/banner.webp",
  bgColor: "#7D3C98",
  gradientColor: "#D2B4DE",
  textColor: "white",
  buttonBgColor: "#512E5F",
  buttonTextColor: "#FFFFFF",
  purchaseUrl: "/cursos/certificacion-puntos-geodesicos-orden-c"
}
];

// --- Variantes de Animación (sin cambios) ---
const slideTransition = {
  type: "tween",
  duration: 0.7,
  ease: [0.56, 0.03, 0.12, 1.04],
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

  // MEJORA: Implementación del gesto de swipe (deslizar)
  const swipeConfidenceThreshold = 10000;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1); // Swipe a la izquierda (siguiente)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1); // Swipe a la derecha (anterior)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);

    return () => clearInterval(interval);
  }, [page]);

  return (

    <motion.main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden  max-sm:pt-20 max-md:pt-56 "
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


      <div className="relative flex h-full w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence initial={false} custom={direction}>
          {/* MEJORA: Se añaden las propiedades `drag` para habilitar el deslizamiento horizontal */}
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x" // Habilita el arrastre en el eje X
            dragConstraints={{ left: 0, right: 0 }} // Limita el arrastre para que no se salga de la pantalla
            dragElastic={0.2} // Añade un poco de "resistencia" elástica al arrastrar
            onDragEnd={onDragEnd} // Llama a la función cuando el usuario suelta el slide
            className="absolute grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 "
          >
            {/* --- Sección de Imagen --- */}
            {/* MEJORA: se ajusta el `order` para móviles y escritorio */}
            <motion.div
              className="relative order-first md:order-last [perspective:1000px] px-2"
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

              </motion.div>
            </motion.div>

            {/* --- Sección de Texto --- */}
            {/* MEJORA: Se añade `text-center md:text-left` y `items-center md:items-start`
                 para centrar el texto en móviles y alinearlo a la izquierda en desktop. */}
            <motion.div
              variants={textContainerVariants}
              className="flex flex-col space-y-4 text-center items-center md:text-left md:items-start"
              style={{ color: activeCourse.textColor }}
            >
              <motion.h1
                variants={textItemVariants}
                className="text-3xl font-extrabold tracking-tighter sm:text-4xl lg:text-5xl"
              >
                {activeCourse.title}
              </motion.h1>

              <motion.p
                variants={textItemVariants}
                className="text-base leading-relaxed opacity-90 lg:text-lg max-w-md"
              >
                {activeCourse.description}
              </motion.p>

              <motion.div
                variants={textItemVariants}
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-sm font-medium"
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
                  S/ {activeCourse.originalPrice}
                </span>
                <p className="flex items-baseline justify-center md:justify-start">
                  <span className="mr-2 text-sm font-semibold">95% Disc.</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    S/ {activeCourse.discountedPrice}
                  </span>
                </p>

                <Button
                  asChild
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
                      rel="noopener noreferrer"
                    >
                      Comprar por S/ {activeCourse.discountedPrice}
                    </Link>
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Controles de Navegación (Izquierda/Derecha) --- */}
      {/* MEJORA: Se ocultan en móvil (`hidden`) y se muestran en tablet en adelante (`md:flex`) */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/60 p-3 text-gray-900 transition hover:bg-white hover:scale-110 active:scale-95
        left-4 md:left-10 lg:left-2  2xl:left-28
        hidden md:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/60 p-3 text-gray-900 transition hover:bg-white hover:scale-110 active:scale-95
        right-4 md:right-10 lg:right-2   2xl:right-28
        hidden md:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </button>


      {/* --- Puntos Indicadores --- */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2.5 w-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${courseIndex === i ? "w-8 bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.main>
  );
}