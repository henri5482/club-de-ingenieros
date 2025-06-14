"use client";

import Image from "next/image";

const CommunityBanner = () => {
  return (
    <section className="relative bg-red-600 overflow-hidden">
      {/* Degradado de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12 lg:gap-8">
          
          {/* Texto principal */}
          <div className="text-white lg:w-1/2 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3">
              Comunidad
            </p>
            {/* Título (h2) - Impactante y directo */}
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Únete a una comunidad que impulsa tu futuro.
            </h2>
            {/* Descripción (p) - Clara y enfocada en beneficios */}
            <p className="text-lg md:text-xl text-red-100 max-w-xl mx-auto lg:mx-0 mb-8">
              Aprende de docentes líderes, colabora en equipos dinámicos y desarrolla las habilidades para alcanzar el trabajo de tus sueños.
            </p>

            {/* Contador de estudiantes */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="flex -space-x-3 overflow-hidden">
                <Image
                  src="/alumno01.webp"
                  alt="Avatar de estudiante"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                />
                <Image
                  src="/alumno02.webp"
                  alt="Avatar de estudiante"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                />
                <Image
                  src="/alumno03.webp"
                  alt="Avatar de estudiante"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                />
                <Image
                  src="/alumno04.webp"
                  alt="Avatar de estudiante"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                />
              </div>
              <span className="text-base sm:text-lg font-semibold">
                +10,000 Estudiantes
              </span>
            </div>
          </div>

          {/* Mapa con avatares */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-64 sm:h-80 lg:h-96">
              <Image
                src="/mapa.webp"
                alt="Mapa de la región"
                layout="fill"
                objectFit="contain"
                className="opacity-50"
              />
              <Image
                src="/avatar01.webp"
                alt="Estudiante en el mapa"
                width={48}
                height={48}
                className="absolute top-[20%] left-[25%] h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src="/avatar02.webp"
                alt="Estudiante en el mapa"
                width={56}
                height={56}
                className="absolute top-[35%] right-[35%] h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg border-2 border-white transform translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src="/avatar03.webp"
                alt="Estudiante en el mapa"
                width={44}
                height={44}
                className="absolute bottom-[25%] left-[50%] h-9 w-9 md:h-11 md:w-11 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 translate-y-1/2"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunityBanner;