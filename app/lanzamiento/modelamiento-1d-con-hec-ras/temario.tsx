"use client";

import { motion } from "framer-motion";
import {
  BookText,
  CalendarDays,
  Clock,
  Code,
  Download,
  FileText,
  Hourglass,
  Layers,
  Link, // This Link conflicts with next/link, usually aliased or used directly
  MapPinned,
  Pointer,
} from "lucide-react";
import React, { useMemo, useState } from "react";

// Asegúrate de que los componentes de la interfaz de usuario (Accordion, Button, etc.) estén correctamente configurados en tu proyecto
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  description?: string; // Added for more detailed lesson info
  time?: string; // Aunque no se usa en el render, se mantiene para consistencia.
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  time?: string;
}

// *** ARRAY DE MÓDULOS CON LA INFORMACIÓN UNIFICADA Y ACTUALIZADA ***
const courseModules: Module[] = [
  {
    id: "module-1",
    title: "Modulo 1: INTRODUCCIÓN AL PROGRAMA",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Descarga e instalación del programa HEC-RAS",
      },
      {
        id: "lesson-1-2",
        title: "Configuración y propiedades de la PC para el funcionamiento correcto del programa",
      },
      {
        id: "lesson-1-3",
        title: "Capacidades del programa HEC RAS",
      },
    ],
  },
  {
    id: "module-2",
    title: "Modulo 2: CONCEPTOS TEÓRICOS",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Descripción del entorno gráfico del programa y creación de un nuevo proyecto",
      },
      {
        id: "lesson-2-2",
        title: "Introducción a modelos hidráulicos y ecuaciones que gobiernan al modelo",
      },
    ],
  },
  {
    id: "module-3",
    title: "Modulo 3: DEFINICIÓN DE GEOMETRÍA BÁSICA",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Creación de río principal y secciones",
      },
      {
        id: "lesson-3-2",
        title: "Definición de Bank Points",
      },
      {
        id: "lesson-3-3",
        title: "Asignación del coeficiente de rugosidad al modelo",
      },
    ],
  },
  {
    id: "module-4",
    title: "Modulo 4: CONDICIONES DE ENTRADA Y SALIDA",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Definición de flujo estable e inestable",
      },
      {
        id: "lesson-4-2",
        title: "Asignación de caudales",
      },
      {
        id: "lesson-4-3",
        title: "Definición de Normal Depth, Critical Depth, Rating Curve",
      },
    ],
  },
  {
    id: "module-5",
    title: "Modulo 5: ESTABLECER CONTROL Y PLAN PARA LA CORRIDA DEL MODELO",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Condiciones Subcríticas, Criticas y Supercríticas",
      },
      {
        id: "lesson-5-2",
        title: "Criterios para la selección de un flujo mixto",
      },
      {
        id: "lesson-5-3",
        title: "Criterios para la selección de flujo según las condiciones de entrada y salida",
      },
    ],
  },
  {
    id: "module-6",
    title: "Modulo 6: MÉTRICAS Y CORRECCIONES APLICADAS A UN MODELO 1D",
    time: "1 HRS",
    lessons: [
      {
        id: "lesson-6-1",
        title: "Modificación de cauce",
      },
      {
        id: "lesson-6-2",
        title: "Uso de la herramienta LEVEE",
      },
      {
        id: "lesson-6-3",
        title: "Uso de la herramienta INEFFECTIVE FLOW",
      },
      {
        id: "lesson-6-4",
        title: "Uso de la herramienta OBSTRUCCTIONS FLOW",
      },
    ],
  },
];

const Temario: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState<string>(""); // Manteniendo el hook para futuras implementaciones de búsqueda

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Lógica de filtrado (manteniendo para funcionalidad futura o actual si se implementa el input)
  const filteredModules = useMemo(() => {
    if (!searchTerm) {
      // Reordena los módulos para mostrar el Módulo 1-5 y luego HEC-RAS,
      // o mantén el orden si es el deseado (actualmente HEC-RAS primero).
      // Aquí se mantiene el orden de la declaración (HEC-RAS primero).
      return courseModules;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return courseModules
      .filter(
        (module) =>
          module.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          module.lessons.some(
            (lesson) =>
              lesson.title.toLowerCase().includes(lowerCaseSearchTerm) ||
              (lesson.description &&
                lesson.description.toLowerCase().includes(lowerCaseSearchTerm))
          )
      )
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter(
          (lesson) =>
            lesson.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            (lesson.description &&
              lesson.description.toLowerCase().includes(lowerCaseSearchTerm))
        ),
      }));
  }, [searchTerm]);

  const handleWhatsAppClick = () => {
    // Reemplaza con tu enlace de invitación real al grupo de WhatsApp
    const whatsappLink = "https://chat.whatsapp.com/EmOMwgYKr5y6SUItkRNXfo";
    window.open(whatsappLink, "_blank");
  };

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0">
          <Layers className="h-7 w-7 sm:h-8 sm:w-8 text-red-600" />
          {/* SEO: Título H1 para la sección del temario, contextualizado con el curso */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Lo que Aprenderás
          </h1>
        </div>
      </motion.div>

      {/* Course Details */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-gray-700"
        variants={itemVariants}
      >
        <div className="flex items-center flex-col space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <MapPinned className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1">Modalidad</span> Virtual
        </div>
        <div className="flex flex-col items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <CalendarDays className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1 text-sm">Inicio</span> 25 de
          Junio de 2025
        </div>
        <div className="flex flex-col items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <Hourglass className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1 ">Duración</span>{" "}
          <span className="text-sm text-center">
            03 semanas (120 horas académicas)
          </span>
        </div>
        <div className="flex flex-col items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <Clock className="h-5 w-5 text-red-500" />
          <span className="font-semibold pr-1">Horario</span> 19:00 a 21:00
        </div>
      </motion.div>

      {/* Objective Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <BookText className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Temario del Curso - Modelamiento 1D con HEC-RAS
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
         INTRODUCCIÓN AL PROGRAMA 
          Descarga e instalación del programa HEC-RAS.<br />
          Configuración y propiedades de la PC para el funcionamiento correcto del programa.<br />
          Capacidades del programa HEC RAS.
        </p>
      </motion.div>

      {/* Methodology Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Metodología de Enseñanza del Curso
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-base sm:text-lg">
          <li>Clases teórico-prácticas en vivo con acceso ilimitado a las grabaciones.</li>
          <li>Uso de datos reales de precipitación de **PISCO y SENAMHI**.</li>
          <li>Aplicación práctica de técnicas estadísticas y de corrección con **R** (Quantile Mapping).</li>
          <li>Desarrollo de *scripts* personalizados para automatizar procesos en **R**.</li>
          <li>Preparación de insumos y simulaciones distribuidas en **HEC-HMS**.</li>
          <li>Módulo especializado en **Modelamiento 1D con HEC-RAS** y sus métricas.</li>
          <li>Material descargable: guías, scripts, datasets, archivos de simulación.</li>
        </ul>
      </motion.div>

      {/* Course Modules (Accordion) */}
      <Accordion type="single" collapsible className="w-full mb-8 sm:mb-10">
        <motion.div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
            TEMARIO{" "}
          </h2>
        </motion.div>
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <motion.div key={module.id} variants={itemVariants}>
              <AccordionItem
                value={module.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <AccordionTrigger className="flex flex-col items-start sm:flex-row sm:items-center justify-between py-3 sm:py-4 text-lg sm:text-xl font-semibold hover:no-underline text-gray-800 hover:text-red-600 transition-colors cursor-pointer text-left">
                  <span className="flex-1 mb-1 sm:mb-0">{module.title}</span>
                  {module.time && (
                    <span className="text-sm sm:ml-4 flex items-center mt-1 sm:mt-0 text-red-600">
                      <Clock className="h-4 w-4 mr-1" /> {module.time}
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent className="pb-1 sm:pb-2 text-gray-700">
                  <ul className="space-y-2 sm:space-y-3 pl-3 sm:pl-4 border-l border-gray-300">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex flex-col items-start py-1.5 px-2 sm:px-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer text-sm sm:text-base"
                      >
                        <div className="flex items-center mb-1 sm:mb-0">
                          <BookText className="h-4 w-4 text-red-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        {lesson.description && (
                          <p className="text-xs sm:text-sm text-gray-600 pl-6 sm:pl-7 mt-0.5 leading-snug">
                            {lesson.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))
        ) : (
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 text-base sm:text-lg py-6 sm:py-8"
          >
            No se encontraron módulos o lecciones con la búsqueda **{searchTerm}**
            en el temario del curso.
          </motion.p>
        )}
      </Accordion>

      {/* RECURSOS IMPORTANTES A UTILIZAR Section */}
      <motion.div
        className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Herramientas Informáticas del Curso
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          Durante el curso utilizaremos las siguientes herramientas de software libre y
          ampliamente utilizadas en análisis hidrológico y modelamiento:
        </p>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>
              <strong>QGIS</strong>: para la delimitación de cuencas e insumos espaciales.
            </span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>
              <strong>R y RStudio</strong>: para análisis estadístico y Quantile Mapping.
            </span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>
              <strong>HEC-HMS</strong>: para modelación hidrológica distribuida.
            </span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>
              <strong>HEC-RAS</strong>: para modelamiento hidráulico unidimensional (1D).
            </span>
          </li>
        </ul>
      </motion.div>

      {/* MATERIALES DE APOYO Section */}
      <motion.div
        className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Download className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Materiales de Apoyo y Recursos del Curso
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          Tendrás acceso a una biblioteca completa de recursos cuidadosamente diseñados
          para guiarte paso a paso:
        </p>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Guía PDF para instalación de QGIS, R, HEC-HMS y HEC-RAS.</span>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Datos de estaciones PISCO y SENAMHI en formatos Excel y RDS.</span>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Scripts de Quantile Mapping y visualización gráfica en R.</span>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Archivos de proyecto **HEC-HMS** y **HEC-RAS** configurados y datos .met.</span>
            </div>
          </li>
        </ul>
      </motion.div>

      {/* WhatsApp Community Section - Revised to match image_afd921.png */}
      <motion.div
        className="mt-10 pt-6 border-t border-gray-200 text-center flex flex-col items-center"
        variants={itemVariants}
      >
        <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 px-4 leading-snug">
          ¡NO TE PIERDAS EL INICIO! ÚNETE A NUESTRA COMUNIDAD PRIVADA DE
          WHATSAPP PARA RECIBIR EL LINK DE ZOOM DEL CURSO DE QGIS
        </p>
        <Button
          onClick={handleWhatsAppClick}
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-14 sm:h-16 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-yellow-300 text-xl sm:text-2xl font-extrabold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center space-x-3 group uppercase tracking-wide"
        >
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 rotate-12" />
          <span>(HAGA CLIC AQUÍ)</span>
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 -rotate-12" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Temario;