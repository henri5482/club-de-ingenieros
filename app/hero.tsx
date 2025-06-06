/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const contentParentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const imageContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageShineVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: {
      repeat: Infinity,
      // eslint-disable-next-line @typescript-eslint/prefer-as-const
      repeatType: "loop" as "loop",
      duration: 3,
      ease: "linear",
      delay: 1, // Start after other animations
    },
  },
};

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <main
      ref={ref}
      className="relative overflow-hidden bg-white text-red-500
      pt-32 md:pt-32 lg:pt-40 xl:pt-48 2xl:pt-56
      pb-20 md:pb-16 lg:pb-20 xl:pb-24 2xl:pb-28
      px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-36
      flex flex-col-reverse md:flex-row items-center justify-between
      gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24
      min-h-screen"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0" // Position absolutely to cover the whole main
        style={{
          backgroundImage: `url('/hero.webp')`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Transparent Overlay */}
        <div className="absolute inset-0 bg-white opacity-60"></div>{" "}
        {/* Adjust opacity here */}
      </div>

      {/* Contenedor de Texto Principal */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={contentParentVariants}
      >
        <motion.h1
          className="font-extrabold leading-tight mb-4 tracking-tight text-black"
          variants={contentItemVariants}
        >
          <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl text-black">
            Forma parte de la nueva{" "}
          </span>
          <span className="block text-3xl md:text-5xl lg:text-6xl xl:text-[77px] 2xl:text-[80px] drop-shadow-lg">
            Generación de Ingenieros
          </span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg md:text-xl text-black mb-4 max-w-xl mx-auto md:mx-0 leading-relaxed text-justify"
          variants={contentItemVariants}
        >
          Capacítate con los mejores profesores y contenidos en Sistemas,
          Hidráulica, Hidrología, Ingeniería Agrícola, Civil, Estructural,
          Geológica, Minera, Ambiental, Eléctrica y mas.
        </motion.p>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-black mb-6 max-w-xl mx-auto md:mx-0 font-light italic"
          variants={contentItemVariants}
        >
          10 años formando profesionales capaces de transformar el mundo.{" "}
        </motion.p>

        {/* Contenedor de Botones y Texto Pequeño */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-10 justify-center md:justify-start"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <Button
            asChild
            className="relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-600 hover:from-[#008a33] hover:to-[#00a83e] text-white px-8 py-5 sm:px-10 sm:py-6 2xl:py-7 rounded-full font-semibold text-base sm:text-lg md:text-xl shadow-lg transition-all duration-300 ease-in-out transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00c54a] w-full sm:w-auto"
          >
            <motion.a
              href="/start-free"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0, 197, 74, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              Comienza a estudiar gratis
            </motion.a>
          </Button>
          <motion.p
            className="text-xs sm:text-sm text-black   opacity-80"
            variants={contentItemVariants}
          >
            sin compromiso
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Contenedor de la Imagen Derecha */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
        initial="hidden"
        animate="visible"
        variants={imageContainerVariants}
      >
        <motion.div
          style={{
            scale: imageScale,
            borderRadius: imageBorderRadius,
            overflow: "hidden",
          }}
          className="relative w-full max-w-md md:max-w-none aspect-video shadow-2xl border-2 border-transparent bg-black"
        >
          <img
            src="https://edteam-media.s3.amazonaws.com/courses/big/183dbb3b-014f-44f3-b1ca-e9b348e1adbb.png"
            alt="Estudiante aprendiendo tecnología en EDteam"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            variants={imageShineVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
