"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CertificationItem {
  id: number;
  name: string;
  description: string;
  logo: string;
  link: string;
  color: "blue" | "red" | "purple";
}

const Certifications = () => {
  const certifications: CertificationItem[] = [
    {
      id: 1,
      name: "Camara de Comercio de Lima",
      description:
        "Contamos con alianzas estratégicas con la Cámara de Comercio de Lima para ofrecerte capacitación y desarrollo profesional de calidad",
      logo: "/camaradecomercio.gif",
      link: "https://www.camaralima.org.pe/",
      color: "blue",
    },
    {
      id: 2,
      name: "Club de Ingenieros",
      description: "Capacitamos a ingenieros para potenciar sus habilidades y desarrollo profesional en diversas áreas tecnológicas y técnicas",
      logo: "/clubdeingenieros.png",
      link: "#",
      color: "red",
    },
    {
      id: 3,
      name: "Educare Internacional",
      description: "Capacitación y desarrollo profesional en diversas áreas tecnológicas y técnicas",
      logo: "/logoeducare.webp",
      link: "https://educareempresarial.educareinternacional.com",
      color: "purple",
    },
  ];

  const colorVariants = {
    blue: {
      // Cambio aquí: Fondo sólido para la tarjeta y un hover más distintivo
      bg: "bg-white hover:bg-blue-100", // Fondo blanco, hover con un toque de azul claro
      border: "border-blue-200", // Borde azul claro
      button: "bg-[#006AB6] hover:bg-[#006AB6]",
    },
    red: {
      // Cambio aquí: Fondo sólido para la tarjeta y un hover más distintivo
      bg: "bg-white hover:bg-red-100", // Fondo blanco, hover con un toque de verde claro
      border: "border-red-200", // Borde verde claro
      button: "bg-red-600 hover:bg-red-400",
    },
    purple: {
      // Cambio aquí: Fondo sólido para la tarjeta y un hover más distintivo
      bg: "bg-white hover:bg-blue-100", // Fondo blanco, hover con un toque de púrpura claro
      border: "border-blue-200", // Borde púrpura claro
      button: "bg-blue-600 hover:bg-blue-400",
    },
  };

  // Variantes para la animación de entrada de la sección (título y descripción)
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Variantes para la animación de entrada de las tarjetas
  const cardEntryVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    // Aplica el fondo oscuro a la sección principal
    <div className="bg-white">
      <div className="px-4 sm:px-6 mx-auto max-w-7xl py-12 md:py-24">
        {/* Animación para el encabezado */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          {/* Asegura que el texto del encabezado sea visible sobre el fondo oscuro */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">
            Obtén certificaciones oficiales
          </h2>
          {/* Asegura que el texto del párrafo sea visible sobre el fondo oscuro */}
          <p className="text-white max-w-2xl mx-auto">
            {" "}
            {/* Cambiado a un gris claro */}
            Certificaciones reconocidas internacionalmente que impulsarán tu
            carrera profesional
          </p>
        </motion.div>

        {/* Contenedor de las tarjetas con animación escalonada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <AnimatePresence>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                // Animación de entrada de cada tarjeta
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardEntryVariants}
                transition={{
                  ...cardEntryVariants.visible.transition,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }} // Unifica las transiciones para evitar duplicados
                // Animación de la tarjeta al pasar el ratón (hover)
                whileHover={{
                  scale: 1.02, // Ligeramente más grande
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Sombra más pronunciada y oscura para fondo oscuro
                  y: -3, // Pequeño desplazamiento hacia arriba
                }}
              >
                <Card
                  className={`h-full flex flex-col justify-between transition-all duration-300 ease-out shadow-lg
                              ${
                                colorVariants[
                                  cert.color as keyof typeof colorVariants
                                ].bg
                              }
                              ${
                                colorVariants[
                                  cert.color as keyof typeof colorVariants
                                ].border
                              }`}
                >
                  {/* Contenido principal de la tarjeta para permitir que el footer se mantenga abajo */}
                  <div className="flex-grow">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                      <div className="relative h-12 w-12 mr-4 flex-shrink-0">
                        <Image
                          src={cert.logo}
                          alt={`Logo ${cert.name}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          priority={index < 2}
                        />
                      </div>
                      <div>
                        {/* Asegura que el texto del título de la tarjeta sea oscuro sobre fondo claro */}
                        <CardTitle className="text-lg font-bold text-gray-800">
                          {cert.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Asegura que el texto de la descripción de la tarjeta sea oscuro sobre fondo claro */}
                      <p className="text-sm text-gray-700">
                        {cert.description}
                      </p>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-4">
                    <Link href={cert.link} className="w-full" target="_blank" rel="noopener noreferrer">
                      <Button
                        className={`w-full flex items-center justify-center space-x-2
                                    ${
                                      colorVariants[
                                        cert.color as keyof typeof colorVariants
                                      ].button
                                    }`}
                        asChild
                      >
                        <motion.div
                          // Animación del texto y flecha del botón al pasar el ratón
                          whileHover={{ x: 3 }} // Desplazamiento sutil a la derecha
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <span>Ver mas detalles</span>
                        </motion.div>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
