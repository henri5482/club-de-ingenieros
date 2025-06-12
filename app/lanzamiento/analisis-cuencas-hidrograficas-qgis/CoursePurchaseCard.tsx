"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, CheckCircle, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CourseDetailsCard: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
  };

  const PROMOTION_END_DATE = {
    year: 2025,
    month: 6, // June
    day: 16,
    hour: 19,
    minute: 0,
  };

  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(
      PROMOTION_END_DATE.year,
      PROMOTION_END_DATE.month - 1,
      PROMOTION_END_DATE.day,
      PROMOTION_END_DATE.hour,
      PROMOTION_END_DATE.minute,
      0
    );
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (unit: number) => unit.toString().padStart(2, "0");

  const buttonVariants = {
    hidden: { opacity: 0, y: 10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  if (!hasMounted) {
    return (
      <motion.div
        className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 flex flex-col"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Reference Image Section */}
        <div className="relative w-full rounded-lg overflow-hidden mb-6">
          <Image
            src="/banner.webp"
            alt="Referencia del Curso"
            layout="responsive"
            width={600}
            height={300}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Price Section - Server-side placeholder */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-gray-600 text-lg font-semibold">
                Promocion
              </span>
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              OFERTA
            </span>
          </div>
          <div className="flex items-end mb-4">
            <span className="text-4xl font-extrabold text-red-600 mr-2">
              S/ 99.00
            </span>
            <span className="text-xl text-gray-500 line-through">
              S/ 199.00
            </span>
            <span className="text-green-600 font-semibold ml-auto">
              50% Dto.
            </span>
          </div>
          <a
            href="https://wa.me/51927545815?text=Quiero%20comprar%20el%20curso%20de%20AN%C3%81LISIS%20DE%20CUENCAS%20HIDROGR%C3%81FICAS%20CON%20QGIS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 hover:bg-red-400 text-white text-lg font-bold py-3 rounded-lg transition-colors shadow-md text-center inline-block"
          >
            🛒 Comprar Ahora
          </a>
          <p className="text-sm text-center text-red-500 mt-3">
            La oferta termina en{" "}
            <span className="font-bold">00h : 00m : 00s</span>
          </p>
        </div>

        {/* Benefits and Certificate Sections are the same */}
        <div className="space-y-4 text-gray-700 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>
              99% valoraciones positivas (
              <span className="font-semibold">10K</span>)
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <span>224 estudiantes</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
            <span>32 lecciones (3h 22m)</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <span>7 recursos adicionales (3 archivos)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>Online y a tu ritmo</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>Disponible en la app</span>
          </div>
          <div className="flex items-center">
            <Award className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
            <span>Audio: Español</span>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            ¡Obtén tu Certificado al Finalizar!
          </h3>
          <div className="relative w-full rounded-lg overflow-hidden">
            <Image
              src="/banner.webp"
              alt="Certificado del Curso"
              layout="responsive"
              width={800}
              height={500}
              objectFit="contain"
              className="rounded-lg border border-gray-200"
            />
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Acredita tus conocimientos y potencia tu perfil profesional.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Reference Image Section */}
      <div className="relative w-full rounded-lg overflow-hidden mb-6">
        <Image
          src="/banner.webp"
          alt="Referencia del Curso"
          layout="responsive"
          width={600}
          height={300}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Price Section (Promotional Only) */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-gray-600 text-lg font-semibold">
              Promocion
            </span>
          </div>
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            OFERTA
          </span>
        </div>
        <div className="flex items-end mb-4">
          <span className=" md:text-4xl  text-2xl font-extrabold text-red-600 mr-2">
            S/ 99.00
          </span>
          <span className="text-xl text-gray-500 line-through">S/ 199.00</span>
          <span className="text-green-600 font-semibold ml-auto">50% Dto.</span>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <a
            href="https://wa.me/51927545815?text=Quiero%20comprar%20el%20curso%20de%20AN%C3%81LISIS%20DE%20CUENCAS%20HIDROGR%C3%81FICAS%20CON%20QGIS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 hover:bg-red-400 text-white text-lg font-bold py-3 rounded-lg transition-colors shadow-md text-center inline-block"
          >
            🛒 Comprar Ahora
          </a>
        </motion.div>
        <p className="text-sm text-center text-red-500 mt-3">
          La oferta termina en{" "}
          {timeLeft.days > 0 ? (
            <span className="font-bold">
              {formatTime(timeLeft.days)}d : {formatTime(timeLeft.hours)}h :{" "}
              {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
            </span>
          ) : timeLeft.hours > 0 ||
            timeLeft.minutes > 0 ||
            timeLeft.seconds > 0 ? (
            <span className="font-bold">
              {formatTime(timeLeft.hours)}h : {formatTime(timeLeft.minutes)}m :{" "}
              {formatTime(timeLeft.seconds)}s
            </span>
          ) : (
            <span className="font-bold text-gray-700">Oferta Finalizada</span>
          )}
        </p>
      </div>

      {/* Benefits Section */}
      <div className="space-y-4 text-gray-700 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>
            99% valoraciones positivas (
            <span className="font-semibold">10K</span>)
          </span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
          <span>224 estudiantes</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
          <span>32 Secciones (15h 22m)</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
          <span>15 recursos adicionales (10 archivos)</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>Online y a tu ritmo</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>Disponible en la web</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
          <span>Audio: Español</span>
        </div>
      </div>

      {/* Certificate Section
      <div className="pt-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          ¡Obtén tu Certificado al Finalizar!
        </h3>
        <div className="relative w-full rounded-lg overflow-hidden">
          <Link
            href="https://www.clubdeingeniero.com/projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/certificadodelante.png"
              alt="Certificado del Curso"
              layout="responsive"
              width={800}
              height={500}
              objectFit="contain"
              className="rounded-lg border border-gray-200"
            />
            <p className="text-center text-gray-600 mt-4 text-sm">
              Acredita tus conocimientos y potencia tu perfil profesional.
            </p>
          </Link>
        </div>
      </div> */}
    </motion.div>
  );
};

export default CourseDetailsCard;
