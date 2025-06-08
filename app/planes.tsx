// components/Planes.tsx
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Definición de tipos para los planes
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  type: 'basic' | 'expert' | 'expert-duo';
  audience: 'personas' | 'empresas';
  billingCycle: 'Trimestral' | "Semestral" | 'anual';
  price: number;
  currency: string;
  oldPrice?: number;
  discountMonths?: number;
  features: PlanFeature[];
  callToAction: string;
  paymentOptions?: {
    installments: number;
    amountPerInstallment: number;
  };
}

// Datos de los planes
const planesData: Plan[] = [
  // Planes para PERSONAS
  {
    id: 'personas-basic',
    name: 'Plan Basic',
    type: 'basic',
    audience: 'personas',
    billingCycle: 'Trimestral',
    price: 199,
    currency: 'S/',
    features: [
      { text: 'Para 1 estudiante', included: true },
      { text: 'Acceso ilimitado a todos los cursos durante 3 meses', included: true },
      { text: 'Descarga de contenido', included: true },
      { text: 'Certificados digitales por cada curso completado', included: true },
      { text: 'Acceso a eventos exclusivos y comunidad', included: false },
      { text: 'Soporte prioritario 24/7', included: false },
    ],
    callToAction: 'Suscríbete a Plan Basic',
  },
  {
    id: 'personas-expert',
    name: 'Plan Master',
    type: 'expert',
    audience: 'personas',
    billingCycle: 'Semestral',
    price: 299,
    currency: 'S/',
    discountMonths: 7,
    features: [
      { text: 'Para 1 estudiante', included: true },
      { text: 'Acceso a mas de 10 cursos pasados', included: true },
      { text: 'Acceso ilimitado a todos los cursos en vivo durante 6 meses', included: true },
      { text: 'Certificados digitales por cada curso completado', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Descarga de contenido', included: true },
      { text: 'Proyectos prácticos y mentorías personalizadas', included: false },
      { text: 'Acceso a eventos exclusivos y comunidad', included: false },

    ],
    callToAction: 'Suscríbete a Plan Master',
    paymentOptions: {
      installments: 3,
      amountPerInstallment: 100,
    },
  },
  {
    id: 'personas-expert-duo',
    name: 'Plan Expert ',
    type: 'expert-duo',
    audience: 'personas',
    billingCycle: 'anual',
    price: 499, // Precio base para 2 estudiantes
    currency: 'S/',
    discountMonths: 9,
    features: [
      // La característica de estudiantes se gestionará dinámicamente en el render
      { text: 'Para 1 estudiante', included: true },
      { text: 'Acceso a mas de 20 cursos pasados', included: true },
      { text: 'Acceso ilimitado a todos los cursos en vivo', included: true },
      { text: 'Certificados digitales por cada curso completado', included: true },
      { text: 'Proyectos prácticos y mentorías personalizadas', included: true },
      { text: 'Acceso a eventos exclusivos y comunidad', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Descarga de contenido', included: true },

    ],
    callToAction: 'Suscríbete a Plan Expert ',
    paymentOptions: {
      installments: 3,
      amountPerInstallment: 166, // Cuota base para 2 estudiantes
    },
  },

  // Planes para EMPRESAS
  {
    id: 'empresas-startup',
    name: 'Plan Startup',
    type: 'basic',
    audience: 'empresas',
    billingCycle: 'anual',
    price: 2500,
    currency: 'S/',
    features: [
      { text: 'Hasta 5 usuarios', included: true },
      { text: 'Acceso a todo el catálogo', included: true },
      { text: 'Reportes de progreso', included: true },
      { text: 'Soporte prioritario', included: false },
    ],
    callToAction: 'Contáctanos para Plan Startup',
  },
  {
    id: 'empresas-enterprise',
    name: 'Plan Enterprise',
    type: 'expert',
    audience: 'empresas',
    billingCycle: 'anual',
    price: 9999,
    currency: 'S/',
    features: [
      { text: 'Usuarios ilimitados', included: true },
      { text: 'Acceso a todo el catálogo', included: true },
      { text: 'Reportes de progreso avanzados', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Manager de cuenta dedicado', included: true },
    ],
    callToAction: 'Solicitar Demo para Plan Enterprise',
  },
];

const Planes = () => {
  const [currentAudience, setCurrentAudience] = useState<'personas' | 'empresas'>('personas');

  const filteredPlanes = planesData.filter(plan => plan.audience === currentAudience);

  // --- NUEVA CONSTANTE PARA EL NÚMERO DE WHATSAPP ---
  const WHATSAPP_NUMBER = '51936972560';

  // Variantes para Framer Motion: Animaciones más rápidas y dinámicas
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const audienceSelectorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
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
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20, mass: 1 } },
  };

  // Determinar las clases de color de fondo para cada tipo de plan
  const getCardBgColor = (type: Plan['type']) => {
    switch (type) {
      case 'expert':
      case 'expert-duo':
        return 'bg-white';
      case 'basic':
      default:
        return 'bg-white';
    }
  };

  // Determinar el color del borde si es necesario (el Plan Expert tiene un borde verde)
  const getCardBorderColor = (type: Plan['type']) => {
    return type === 'expert' || type === 'expert-duo' ? 'border border-red-600' : 'border border-gray-700';
  };

  // Determinar el color del botón
  const getButtonBgColor = (type: Plan['type']) => {
    return type === 'expert' || type === 'expert-duo' ? 'bg-[#00d77d] hover:bg-[#00c06f]' : 'bg-[#373e4a] hover:bg-[#4f5869]';
  };

  return (
    <section className="bg-white min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-600 mb-12 md:mb-16 drop-shadow-lg leading-tight"
        >
          Elige el plan ideal para ti
        </motion.h2>

        {/* Selector de audiencia (Personas / Empresas) */}
        <motion.div
          variants={audienceSelectorVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex rounded-full bg-[#e1e2e3] p-1 mb-10 md:mb-12 shadow-lg flex-wrap justify-center" // Added flex-wrap and justify-center for small screens
          role="tablist"
        >
          <button
            onClick={() => setCurrentAudience('personas')}
            className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === 'personas' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            role="tab"
            aria-selected={currentAudience === 'personas'}
          >
            Personas
            {currentAudience === 'personas' && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-red-400 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
          <button
            onClick={() => setCurrentAudience('empresas')}
            className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === 'empresas' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            role="tab"
            aria-selected={currentAudience === 'empresas'}
          >
            Empresas
            {currentAudience === 'empresas' && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-red-500 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
        </motion.div>

        {/* Contenedor de los planes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-center" // Adjusted gap for different screens
          >
            {filteredPlanes.map((plan) => {
              // eslint-disable-next-line prefer-const
              let currentPlan = { ...plan };
              // eslint-disable-next-line prefer-const
              let displayFeatures = [...plan.features];

              // Lógica para Expert Duo: ajustar precio, cuotas y características

              // Lógica para Plan Basic: asegurar la característica de 1 estudiante

              // --- CONSTRUCCIÓN DEL ENLACE DE WHATSAPP ---
              const whatsappMessage = encodeURIComponent(`¡Hola! Estoy interesado en el plan ${currentPlan.name} de ${currentPlan.audience}.`);
              const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

              return (
                <motion.div
                  key={currentPlan.id} // Clave única para forzar la reanimación al cambiar estudiantes
                  variants={itemVariants}
                  className={`
                    relative flex flex-col rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl
                    ${getCardBgColor(currentPlan.type)} 
                    ${getCardBorderColor(currentPlan.type)}
                    ${currentPlan.type === 'expert' ? 'lg:scale-105 lg:z-10' : ''}
                    ${currentPlan.type === 'expert-duo' && currentAudience === 'personas' ? 'md:col-span-2 lg:col-start-3' : ''}
                  `}
                >
                  {/* Etiqueta de AHORRAS X MESES */}
                  {currentPlan.discountMonths && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-3 py-0.5 sm:px-4 sm:py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                      AHORRAS {currentPlan.discountMonths} MESES
                    </div>
                  )}

                  {/* Encabezado del plan */}
                  <div className="text-left mb-4 sm:mb-6 shax">
                    <h3 className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{currentPlan.name}</h3>
                    <span className="text-slate-900 text-sm">
                      {currentPlan.billingCycle === 'Trimestral'
                        ? 'Trimestral'
                        : currentPlan.billingCycle === 'Semestral'
                          ? 'Semestral'
                          : 'Anual'}
                    </span>

                  </div>

                  {/* Precio */}
                  <div className="mb-4 sm:mb-6 flex items-baseline justify-start">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                      {currentPlan.currency}
                      {currentPlan.price.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                    {currentPlan.oldPrice && (
                      <span className="text-slate-700 line-through text-base sm:text-lg ml-2 sm:ml-3">
                        {currentPlan.currency}
                        {currentPlan.oldPrice.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm mb-4 sm:mb-6">{currentPlan.billingCycle === 'Trimestral' ? 'Cobro mensual recurrente' : ''}</p>

                  {/* Lista de características (ahora usa displayFeatures) */}
                  <ul className="text-left space-y-3 sm:space-y-4 flex-grow mb-6 sm:mb-8">
                    {displayFeatures.map((feature, index) => (
                      <li key={index} className={`flex items-start ${feature.included ? 'text-slate-900' : 'text-gray-500 line-through'}`}> {/* Changed items-center to items-start for better multi-line text alignment */}
                        {feature.included ? (
                          <FaCheckCircle className="text-green-400 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" />
                        ) : (
                          <FaTimesCircle className="text-red-500 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" />
                        )}
                        <span className="text-xs sm:text-sm">{feature.text}</span> {/* Adjusted font size */}
                      </li>
                    ))}
                  </ul>

                  {/* Opciones de pago (si aplica) */}
                  {currentPlan.paymentOptions && (
                    <div className="bg-[#26374c] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center text-xs sm:text-sm text-gray-300 shadow-inner"> {/* Adjusted padding and text size */}
                      <p>
                        Paga a <span className="font-bold">{currentPlan.paymentOptions.installments} cuotas</span> sin intereses de <span className="font-bold">
                          {currentPlan.currency}
                          {currentPlan.paymentOptions.amountPerInstallment.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Botón de llamada a la acción */}
                  {/* --- MODIFICACIÓN DEL BOTÓN A UN ENLACE DE WHATSAPP --- */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white transition-colors duration-300 shadow-lg text-center
                      ${getButtonBgColor(currentPlan.type)}`}
                  >
                    {currentPlan.callToAction}
                  </a>
                  {/* --- FIN DE LA MODIFICACIÓN --- */}

                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Planes;