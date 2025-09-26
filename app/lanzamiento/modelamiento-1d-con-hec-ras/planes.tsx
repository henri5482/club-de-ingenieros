// components/Planes.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Definición de tipos para los planes
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  type: "general" | "vip" | "subscription"; // Simplified types
  audience: "eventos" | "suscripcion"; // Simplified audiences
  billingCycle: "unica" | "anual" | "mensual"; // Added 'mensual' for basic plan
  price: number;
  currency: string;
  oldPrice?: number;
  discountInfo?: string; // More generic discount info
  saveInfo?: string; // e.g., "AHORRAS 7 MESES"
  features: PlanFeature[];
  callToAction: string;
  paymentOptions?: {
    installments: number;
    amountPerInstallment: number;
  };
  transmissionDates?: string; // Specific for events
  studentsInfo?: string; // e.g., "1 estudiante", "2 estudiantes"
}

// Número de WhatsApp al que se enviarán los mensajes
const WHATSAPP_NUMBER = "51927545815"; // Reemplaza con tu número de WhatsApp real, incluyendo el código de país.

// Datos de los planes
const planesData: Plan[] = [
  {
    id: "evento-general",
    name: "ENTRADA GENERAL",
    type: "general",
    audience: "eventos",
    billingCycle: "unica",
    price: 0,
    currency: "S/",
    oldPrice: 99.0,
    discountInfo: "GRATIS",
    transmissionDates:
      "16, 18 de Mayo del 2025 en el horario de 7:00 PM a 9:00 PM.",
    features: [
      { text: "Acceso a las 2 clases en vivo via zoom", included: true },
      { text: "Acceso a la Grabación Digital de cada sesión", included: false },
      { text: "Descarga de Material de exposición", included: false },
      { text: "Descarga del audio en Formato Audio MP3", included: false },
      { text: "Certificado Digital por 90 horas académicas", included: false },
    ],
    callToAction: "Regístrate Gratis",
    studentsInfo: "Para 1 asistente",
  },
  {
    id: "evento-vip",
    name: "ENTRADA VIP",
    type: "vip",
    audience: "eventos",
    billingCycle: "unica",
    price: 99.0,
    currency: "S/",
    oldPrice: 199.0,
    discountInfo: "PROMOCIÓN",
    transmissionDates:
      "25, 27, 30 de Junio y 02, 04 y 07 de Julio del 2025 en el horario de 7:00 PM a 9:00 PM.",
    features: [
      { text: "Instalador de Softwares", included: true },
      { text: "01 Curso Bono de regalo", included: true },
      { text: "Accede a TODAS las clases", included: true },
      { text: "Acceso a la Grabación de cada sesión", included: true },
      { text: "Descarga de Material de exposición en pdf", included: true },
      { text: "Descarga del audio en Formato Audio MP3", included: true },
      {
        text: "Certificado Digital por 120 horas académicas con código QR",
        included: true,
      },
    ],
    callToAction: "Comprar Entrada VIP",
    studentsInfo: "Para 1 asistente",
  },
  // Planes para SUSCRIPCIÓN (simulating expert/expert duo plans from image)
  {
    id: "suscripcion-pro",
    name: "Suscripción Trimestral PRO",
    type: "subscription",
    audience: "suscripcion",
    billingCycle: "anual",
    price: 199.0, // Example price
    currency: "S/",
    saveInfo: "AHORRAS 7 MESES", // Example based on image
    features: [
      {
        text: "Acceso ilimitado a todos los cursos durante 3 meses",
        included: true,
      },
      { text: "Descarga de contenido ", included: true },
      {
        text: "Certificados digitales por cada curso completado",
        included: true,
      },
      {
        text: "Proyectos prácticos y mentorías personalizadas",
        included: false,
      },
      { text: "Acceso a eventos exclusivos y comunidad", included: false },
      { text: "Soporte prioritario 24/7", included: false },
    ],
    callToAction: "Obtener Suscripción ",

  },
  {
    id: "suscripcion-duo",
    name: "Suscripción Semestral PRO",
    type: "subscription", // Using 'subscription' type for both to simplify styling
    audience: "suscripcion",
    billingCycle: "anual",
    price: 299.0, // Example price
    currency: "S/",
    saveInfo: "AHORRAS 9 MESES", // Example based on image
    features: [
      { text: "Acceso a mas de 10 cursos pasados", included: true },
      {
        text: "Acceso ilimitado a todos los cursos en vivo durante 6 meses",
        included: true,
      },
      {
        text: "Certificados digitales por cada curso completado",
        included: true,
      },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Descarga de contenido ", included: true },
      {
        text: "Proyectos prácticos y mentorías personalizadas",
        included: false,
      },
      { text: "Acceso a eventos exclusivos y comunidad", included: false },
    ],
    callToAction: "Obtener Suscripción ",
    paymentOptions: {
      installments: 3,
      amountPerInstallment: Math.round(299 / 3), // Example installments
    },
  },

  {
    id: "suscripcion-tri",
    name: "Suscripción Anual PRO",
    type: "subscription", // Using 'subscription' type for both to simplify styling
    audience: "suscripcion",
    billingCycle: "anual",
    price: 499.0, // Example price
    currency: "S/",
    saveInfo: "AHORRAS 9 MESES", // Example based on image
    features: [
      { text: "Acceso a mas de 20 cursos pasados", included: true },
      { text: "Acceso ilimitado a todos los cursos en vivo  ", included: true },
      {
        text: "Certificados digitales por cada curso completado",
        included: true,
      },
      {
        text: "Proyectos prácticos y mentorías personalizadas",
        included: true,
      },
      { text: "Acceso a eventos exclusivos y comunidad", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Descarga de contenido ", included: true },
    ],
    callToAction: "Obtener Suscripción ",
    paymentOptions: {
      installments: 3,
      amountPerInstallment: Math.round(499 / 3), // Example installments
    },
  },
];

const Planes = () => {
  const [currentAudience, setCurrentAudience] = useState<
    "eventos" | "suscripcion"
  >("eventos");

  const filteredPlanes = planesData.filter(
    (plan) => plan.audience === currentAudience
  );

  // Variantes para Framer Motion: Animaciones más rápidas y dinámicas
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const audienceSelectorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 20, mass: 1 },
    },
  };

  // Determine button color
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getButtonBgColor = (type: Plan["type"]) => {
    // Buttons are red for the white and red theme
    return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPriceTextColor = (type: Plan["type"]) => {
    return "text-red-600"; // All prices in red
  };

  // Función para generar el enlace de WhatsApp
  const getWhatsAppLink = (plan: Plan) => {
    let message = "";
    switch (plan.id) {
      case "evento-general":
        message =
          "¡Hola! Estoy interesado/a en registrarme gratis en el curso de " +
          plan.name +
          ".";
        break;
      case "evento-vip":
        message =
          "¡Hola! Estoy interesado/a en adquirir la Entrada VIP para el curso de " +
          plan.name +
          ".";
        break;
      case "suscripcion-pro":
        message = "¡Hola! Estoy interesado/a en la Suscripción Trimestral .";
        break;
      case "suscripcion-duo":
        message = "¡Hola! Estoy interesado/a en la Suscripción Semestral .";
        break;
      case "suscripcion-tri":
        message = "¡Hola! Estoy interesado/a en la Suscripción Anual .";
        break;
      default:
        message =
          "¡Hola! Me gustaría obtener más información sobre el plan " +
          plan.name +
          ".";
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <section className="bg-white min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-12 md:mb-16 leading-tight"
        >
          Elige el plan ideal para ti
        </motion.h2>

        {/* Audience Selector (Eventos / Suscripción) */}
        <motion.div
          variants={audienceSelectorVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex rounded-lg bg-gray-100 p-1 mb-10 md:mb-12 shadow-lg flex-wrap justify-center"
          role="tablist"
        >
          <button
            onClick={() => setCurrentAudience("eventos")}
            className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === "eventos"
                ? "text-white"
                : "text-gray-600 hover:text-red-600"
              }`}
            role="tab"
            aria-selected={currentAudience === "eventos"}
          >
            Personas
            {currentAudience === "eventos" && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-red-600 rounded-md -z-10 shadow"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
          <button
            onClick={() => setCurrentAudience("suscripcion")}
            className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === "suscripcion"
                ? "text-white"
                : "text-gray-600 hover:text-red-600"
              }`}
            role="tab"
            aria-selected={currentAudience === "suscripcion"}
          >
            Menbresia
            {currentAudience === "suscripcion" && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-red-600 rounded-md -z-10 shadow"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
        </motion.div>

        {/* Plans Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 items-stretch justify-center ${currentAudience === "eventos"
                ? "md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto"
              }`}
          >
            {filteredPlanes.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`
                  relative flex flex-col rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2
                  bg-white text-gray-800 border border-gray-300
                  ${plan.id === "evento-vip" ||
            
                    plan.id === "suscripcion-duo"||
                    plan.id === "suscripcion-tri"
                    ? "border-red-600 ring-2 ring-red-600"
                    : ""
                  }
                  ${plan.id === "suscripcion-pro" ||
                    plan.id === "suscripcion-duo"
                    ? "lg:scale-105 lg:z-10"
                    : ""
                  }
                `}
              >
                {/* Save Info Tag (similar to "AHORRAS X MESES") */}
                {(plan.saveInfo || plan.discountInfo) && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10 whitespace-nowrap hidden sm:block">
                    {plan.saveInfo || plan.discountInfo}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-left mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                    {plan.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    {plan.studentsInfo && (
                      <span className="mr-2">{plan.studentsInfo}</span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {plan.billingCycle === "unica"
                        ? "Pago Único"
                        : plan.billingCycle === "anual"
                          ? "Anual"
                          : "Mensual"}
                    </span>
                  </div>
                  {plan.transmissionDates && (
                    <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                      <span className="font-semibold">Fechas:</span>{" "}
                      {plan.transmissionDates}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6 flex items-baseline justify-start">
                  <span
                    className={`text-4xl sm:text-5xl font-extrabold ${getPriceTextColor(
                      plan.type
                    )}`}
                  >
                    {plan.currency}
                    {plan.price.toLocaleString("es-PE", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  {plan.billingCycle === "anual" && (
                    <span className="text-gray-600 text-lg sm:text-xl ml-2">
                      /año
                    </span>
                  )}
                  {plan.billingCycle === "mensual" && (
                    <span className="text-gray-600 text-lg sm:text-xl ml-2">
                      /mes
                    </span>
                  )}
                  {plan.oldPrice !== undefined &&
                    plan.oldPrice > plan.price && (
                      <span className="text-gray-500 line-through text-base sm:text-lg ml-2 sm:ml-3">
                        {plan.currency}
                        {plan.oldPrice.toLocaleString("es-PE", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    )}
                </div>
                {plan.billingCycle === "unica" ? (
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                    Acceso de por vida al contenido adquirido.
                  </p>
                ) : (
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                    Acceso por un año a todo el contenido.
                  </p>
                )}

                {/* Features List */}
                <ul className="text-left space-y-3 sm:space-y-4 flex-grow mb-6 sm:mb-8">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start ${feature.included
                          ? "text-gray-700"
                          : "text-gray-400 line-through"
                        }`}
                    >
                      {feature.included ? (
                        <FaCheckCircle className="text-red-600 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" />
                      ) : (
                        <FaTimesCircle className="text-gray-400 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" />
                      )}
                      <span className="text-sm sm:text-base leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Payment Options (if applicable) */}
                {plan.paymentOptions && (
                  <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center text-xs sm:text-sm text-gray-700">
                    <p className="leading-relaxed">
                      Paga hasta en{" "}
                      <span className="font-bold">
                        {plan.paymentOptions.installments} cuotas
                      </span>{" "}
                      sin intereses de{" "}
                      <span className="font-bold text-red-600">
                        {plan.currency}
                        {plan.paymentOptions.amountPerInstallment.toLocaleString(
                          "es-PE",
                          { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                        )}
                      </span>
                    </p>
                  </div>
                )}

                {/* Call to Action Button - Now an <a> tag for WhatsApp */}
                <a
                  href={getWhatsAppLink(plan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold text-white transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 ${getButtonBgColor(
                    plan.type
                  )} flex items-center justify-center`}
                >
                  {plan.callToAction}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Planes;
