import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const Certificado = () => {
  // Estado para controlar qué imagen mostrar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/certificadodelante.png", "/certificadoatras.png"]; // Asegúrate de tener estas imágenes en tu carpeta public

  // Efecto para cambiar la imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Función para cambiar a la imagen anterior
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para cambiar a la siguiente imagen
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 font-sans text-center overflow-hidden relative">
      {/* Opcional: Añade un patrón de fondo sutil para mayor profundidad */}
      <div className="absolute inset-0  opacity-5 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título Principal de la sección */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-12 md:mb-16 leading-tight tracking-tight drop-shadow-sm"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-red-600 text-3xl md:text-6xl">
            VALIDACIÓN Y
          </span>{" "}
          <span className="text-red-600 text-3xl md:text-6xl">
            CERTIFICACIÓN DEL CURSO DE
          </span>{" "}
          <span className="text-slate-950 text-3xl md:text-6xl">
            ANÁLISIS DE CUENCAS HIDROGRÁFICAS CON QGIS
          </span>
        </motion.h2>

        {/* Sección del Certificado */}
        <div className="mb-12 md:mb-16">
          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Al finalizar el curso de Análisis de Cuencas Hidrográficas con QGIS,
            el programa de capacitación será certificado con 140 horas
            académicas, con el respaldo de Educare Internacional y auspiciado
            por la Cámara de Comercio de Lima, garantizando un reconocimiento
            profesional de alto nivel.
          </motion.p>

          {/* Contenedor del carrusel con botones de navegación */}
          <div className="relative">
            <motion.div
              className="flex justify-center items-center p-2 sm:p-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden max-w-full lg:max-w-4xl mx-auto border-4 border-red-100 transform hover:scale-[1.01] transition-transform duration-300"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src={images[currentImageIndex]}
                alt="Certificado del Curso de Análisis de Cuencas Hidrográficas con QGIS por Club de Ingenieros, Educare Internacional y CCL"
                width={1200}
                height={750}
                layout="responsive"
                objectFit="contain"
                className="rounded-xl border border-gray-100"
              />
            </motion.div>

            {/* Botones de navegación */}
            <div className="flex justify-center mt-4 space-x-4 cursor-pointer">
              <button
                onClick={goToPrevious}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center"
                aria-label="Imagen anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">Anterior</span>
              </button>

              {/* Indicadores de imágenes */}
              <div className="flex items-center space-x-2 cursor-pointer">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index ? "bg-red-600" : "bg-gray-300"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center"
                aria-label="Siguiente imagen"
              >
                <span className="mr-1">Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Logos Mejorada */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mt-12 md:mt-16 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo 1: Educare Internacional */}
          <motion.a
            href="https://clubdeingenieros.educareinternacional.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 rounded-lg bg-card border border-border/50 dark:border-border/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer w-full max-w-xs"
            variants={logoVariants}
          >
            <Image
              src="/logoeducare.png"
              alt="Logo de Educare Internacional, entidad que valida el certificado"
              width={120}
              height={120}
              objectFit="contain"
              className="filter group-hover:brightness-110 transition-all duration-500 ease-in-out"
            />
            <p className="text-foreground group-hover:text-red-600 text-base mt-4 font-bold text-center transition-colors duration-300">
              EDUCARE INTERNACIONAL
            </p>
          </motion.a>

          {/* Logo 2: Club de Ingenieros */}
          <motion.a
            href="https://www.clubdeingeniero.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 rounded-lg bg-card border border-border/50 dark:border-border/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer w-full max-w-xs"
            variants={logoVariants}
          >
            <Image
              src="/logo01.png"
              alt="Logo de Club de Ingenieros, organizador del curso"
              width={120}
              height={120}
              objectFit="contain"
              className="filter group-hover:brightness-110 transition-all duration-500 ease-in-out"
            />
            <p className="text-foreground group-hover:text-red-600 text-base mt-4 text-center font-bold transition-colors duration-300">
              CLUB DE INGENIEROS
            </p>
          </motion.a>

          {/* Logo 3: Cámara de Comercio de Lima */}
          <motion.a
            href="https://www.camaralima.org.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 rounded-lg bg-card border border-border/50 hover:texre6 dark:border-border/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer w-full max-w-xs"
            variants={logoVariants}
          >
            <Image
              src="/CAMARADECOMERCIO.gif"
              alt="Logo de la Cámara de Comercio de Lima (CCL), auspiciador del certificado"
              width={120}
              height={120}
              objectFit="contain"
              className="filter transition-all duration-500 ease-in-out"
            />
            <p className="text-foreground group-hover:text-red-600 text-base mt-4 text-center font-bold transition-colors duration-300">
              CÁMARA DE COMERCIO DE LIMA
            </p>
          </motion.a>
        </motion.div>

        {/* Llamada a la acción al final */}
        <a
          href="https://wa.me/51927545815?text=Hola%2C%20me%20interesa%20el%20curso%20de%20An%C3%A1lisis%20de%20Cuencas%20Hidrogr%C3%A1ficas%20con%20QGIS.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <motion.p
            className="text-sm sm:text-xl md:text-2xl font-extrabold text-white mt-16 md:mt-20 px-6 py-4 bg-red-600 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            ¡OBTÉN TU CERTIFICACIÓN EN ANÁLISIS DE CUENCAS HIDROGRÁFICAS CON
            QGIS Y POTENCIA TU CARRERA!
          </motion.p>
        </a>
      </div>
    </section>
  );
};

export default Certificado;
