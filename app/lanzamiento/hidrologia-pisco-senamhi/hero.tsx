"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const PROMOTION_END_DATE = {
    year: 2025,
    month: 6,
    day: 26,
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
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const unitLabels: { [key in keyof TimeLeft]: string } = {
    days: "días",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
  };

  const timerComponents: JSX.Element[] = [];
  if (hasMounted) {
    Object.entries(timeLeft).forEach(([interval, value], index) => {
      timerComponents.push(
        <motion.div
          key={interval}
          className="bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-4 flex flex-col items-center shadow-lg min-w-[60px] sm:min-w-[80px] border border-yellow-500/20 backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.8 + index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 leading-none drop-shadow-md">
            {value}
          </div>
          <div className="text-xs sm:text-sm md:text-base text-gray-300 uppercase mt-1">
            {unitLabels[interval as keyof TimeLeft]}
          </div>
        </motion.div>
      );
    });
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:p-4 font-sans overflow-hidden"
      style={{
        backgroundImage: "url(/lanzamiento/hidrologia-pisco-senamhi/fondo.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="relative z-10 bg-gray-900 bg-opacity-70 rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center shadow-2xl w-full max-w-md sm:max-w-2xl mx-2 border border-yellow-500/40 backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
          <motion.img
            src="/logo01.png"
            alt="Club de Ingenieros Logo"
            className="w-full h-auto mx-auto max-w-[120px] sm:max-w-[180px] md:max-w-[200px] rounded-full shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 150,
            }}
          />
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 uppercase tracking-wide mb-2 sm:mb-4 leading-tight drop-shadow-xl"
          variants={itemVariants}
        >
          CURSO VIRTUAL
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 sm:mb-6 md:mb-8 leading-relaxed drop-shadow-lg"
          variants={itemVariants}
        >
          Hidrología Aplicada con PISCO, Estaciones SENAMHI, Quantile
          Mapping en R y Simulación Hidrológica Distribuida en HEC-HMS
        </motion.p>

        <motion.p
          className="text-sm sm:text-lg text-red-400 font-semibold mb-3 sm:mb-4 drop-shadow-md"
          variants={itemVariants}
        >
          LA TRANSMISIÓN EN VIVO INICIA EN:
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
          {timerComponents}
        </div>

        <motion.p
          className="text-sm sm:text-xl md:text-2xl text-yellow-400 mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-1 sm:gap-2 drop-shadow-md"
          variants={itemVariants}
        >
          ¡CUPOS LIMITADOS! RESERVA AHORA TU LUGAR PARA PARTICIPAR EN LA
          TRANSMISIÓN EN VIVO DE ESTE CURSO VIRTUAL.
        </motion.p>

        <motion.a
          href="https://chat.whatsapp.com/EmOMwgYKr5y6SUItkRNXfo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-full text-sm sm:text-base md:text-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <span className="hidden sm:inline">
            ÚNETE AHORA A NUESTRA COMUNIDAD PRIVADA DE WHATSAPP (CLIC AQUÍ)
          </span>
          <span className="sm:hidden">ÚNETE POR WHATSAPP</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Hero;
