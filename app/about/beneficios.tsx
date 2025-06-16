'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const Beneficios = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.1 });

 const benefits = [
  {
    id: 1,
    icon: '/clubdeingenieros.png',
    title: 'Descuento especial para estudiantes de ingeniería',
    description:
      'Accede a nuestros cursos certificados con hasta 50% de descuento y prepárate para conseguir el trabajo que siempre soñaste antes de egresar.',
  },
  {
    id: 2,
    icon: '/clubdeingenieros.png',
    title: 'Comparte y estudia gratis',
    description:
      'Invita a otros ingenieros a unirse al Club y obtén suscripciones gratuitas o descuentos exclusivos como recompensa por tu recomendación.',
  },
  {
    id: 3,
    icon: '/clubdeingenieros.png',
    title: 'Regala futuro profesional',
    description:
      'Obsequia cursos a tus familiares o colegas y ayúdalos a crecer profesionalmente con formación de calidad y certificación oficial.',
  },
];


  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const benefitCardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.7,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 70,
        damping: 10,
      },
    }),
  };

  const mediaVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
    },
  };

  const communityTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
    },
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600 text-center mb-12 md:mb-16 leading-tight"
          initial="hidden"
          animate={isInViewContainer ? 'visible' : 'hidden'}
          variants={titleVariants}
        >
          Aprovecha los beneficios 
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Tarjetas de beneficios */}
          <div className="flex flex-col space-y-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="flex items-start text-left bg-white p-6 rounded-lg shadow-xl border border-transparent hover:border-red-600 transition-all duration-300"
                custom={index}
                initial="hidden"
                animate={isInViewContainer ? 'visible' : 'hidden'}
                variants={benefitCardVariants}
              >
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00c2a8]/15">
                    <Image
                      src={benefit.icon}
                      alt={`${benefit.title} icon`}
                      width={24}
                      height={24}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Imagen destacada y mensaje */}
          <div className="flex flex-col items-center justify-center mt-12 lg:mt-0">
            <motion.div
              className="w-full relative rounded-lg overflow-hidden shadow-2xl bg-gray-800 max-w-md lg:max-w-none"
              initial="hidden"
              animate={isInViewContainer ? 'visible' : 'hidden'}
              variants={mediaVariants}
              style={{ paddingBottom: '65%' }}
            >
              <Image
                src="/about01.webp"
                alt="beneficios"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </motion.div>

            <motion.p
              className="mt-8 text-base sm:text-lg text-slate-700 font-medium text-center max-w-md mx-auto"
              initial="hidden"
              animate={isInViewContainer ? 'visible' : 'hidden'}
              variants={communityTextVariants}
            >
              En Club de Ingenieros nos dedicamos a formar profesionales altamente competitivos. Más que una empresa, somos una comunidad comprometida con tu desarrollo laboral.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beneficios;
