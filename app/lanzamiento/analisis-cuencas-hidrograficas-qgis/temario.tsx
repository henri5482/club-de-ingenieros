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
  time?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  time?: string;
}

const courseModules: Module[] = [
  {
    id: "module-1",
    title:
      "MÓDULO I: INTRODUCCIÓN A SISTEMAS DE INFORMACIÓN GEOGRÁFICA (SIG) Y QGIS PARA CUENCAS HIDROGRÁFICAS", // Más específico en el título
    time: "Duración por definir", // Actualizar con duración real si se conoce
    lessons: [
      {
        id: "lesson-1-1",
        title:
          "1.1 - ¿Qué es un SIG y por qué es útil en el estudio de cuencas hidrográficas?",
        description:
          "Conceptos fundamentales de los Sistemas de Información Geográfica y su relevancia en el análisis hidrológico y la gestión de cuencas.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-2",
        title: "1.2 - Principales componentes de un SIG",
        description:
          "Exploración de hardware, software, datos, personal y métodos que conforman un SIG para su aplicación en geología e hidrología.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-3",
        title: "1.3 - Visión general de QGIS y su ecosistema",
        description:
          "Introducción al software libre y de código abierto QGIS, sus funcionalidades principales para el mapeo y análisis geoespacial, y la comunidad de usuarios global.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-4",
        title:
          "1.4 - Concepto de cuenca hidrográfica y su importancia en la gestión territorial",
        description:
          "Definición, características geomorfológicas y el rol crítico de las cuencas en la planificación y manejo de recursos hídricos, prevención de desastres y ordenamiento territorial.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-5",
        title: "1.5 - Descarga, instalación y configuración básica de QGIS",
        description:
          "Guía paso a paso para la descarga, instalación y configuración inicial del software QGIS en diferentes sistemas operativos para iniciar el análisis geoespacial.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-6",
        title: "1.6 - Interfaz de QGIS y exploración de herramientas clave",
        description:
          "Familiarización con el entorno de trabajo de QGIS, incluyendo paneles, barras de herramientas y funciones esenciales para la visualización y edición de datos geoespaciales.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-7",
        title: "1.7 - Descripción de elementos vectoriales y Ráster",
        description:
          "Entendimiento de los diferentes tipos de datos geográficos (puntos, líneas, polígonos para vectorial y datos de cuadrícula/píxeles para ráster) y sus aplicaciones en el SIG.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-8",
        title: "1.8 - Creación de elementos vectoriales",
        description:
          "Práctica en la digitalización manual y creación de nuevas capas vectoriales (polígonos de cuencas, líneas de ríos, puntos de muestreo) dentro de QGIS.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-9",
        title: "1.9 - Edición de capas vectoriales",
        description:
          "Técnicas avanzadas para modificar y refinar geometrías existentes, incluyendo herramientas de selección, movimiento, corte, fusión y simplificación.",
      }, // Descripción enriquecida
      {
        id: "lesson-1-10",
        title: "1.10 - Calculadora de campos en QGIS",
        description:
          "Uso de la calculadora de campos para realizar operaciones aritméticas y lógicas, generar nuevos atributos y enriquecer la información descriptiva de las capas vectoriales.",
      }, // Descripción enriquecida
    ],
  },
  {
    id: "module-2",
    title: "MÓDULO II: MANEJO AVANZADO DE DATOS VECTORIALES Y RÁSTER EN QGIS", // Más específico
    time: "Duración por definir",
    lessons: [
      {
        id: "lesson-2-1",
        title: "2.1 - Tipos de geometría vectorial: puntos, líneas y polígonos",
        description:
          "Profundización en la representación y manejo de características geográficas (puntos de interés, redes de drenaje, límites de cuencas) con distintas geometrías vectoriales.",
      },
      {
        id: "lesson-2-2",
        title: "2.2 - Estructura de atributos en capas vectoriales",
        description:
          "Manejo y organización de la información descriptiva (tablas de atributos) asociada a cada elemento vectorial, incluyendo tipos de datos y relaciones.",
      },
      {
        id: "lesson-2-3",
        title: "2.3 - Digitalización manual y edición de precisión",
        description:
          "Técnicas avanzadas de digitalización de datos geoespaciales y herramientas de edición para garantizar la precisión topológica de las capas vectoriales.",
      },
      {
        id: "lesson-2-4",
        title:
          "2.4 - Conceptos clave en capas ráster: resolución espacial, píxeles, valor nulo",
        description:
          "Entendimiento de las propiedades fundamentales de los datos ráster (imágenes satelitales, Modelos Digitales de Elevación) y su impacto en el análisis geoespacial.",
      },
      {
        id: "lesson-2-5",
        title: "2.5 - Corrección y reproyección de capas ráster",
        description:
          "Métodos para ajustar, corregir errores (ej. bandas) y transformar sistemas de referencia de imágenes ráster para asegurar la coherencia espacial en proyectos de cuencas.",
      },
      {
        id: "lesson-2-6",
        title:
          "2.6 - Práctica: Crear una capa vectorial desde cero para un área de estudio",
        description:
          "Ejercicios prácticos de digitalización y creación de nuevas capas vectoriales, como límites de microcuencas o puntos de monitoreo hidrológico, usando herramientas de QGIS.",
      },
      {
        id: "lesson-2-7",
        title:
          "2.7 - Práctica: Uso del panel de atributos para gestionar datos",
        description:
          "Añadir, editar, eliminar y calcular campos para enriquecer la información descriptiva de las capas vectoriales, incluyendo el cálculo de área, perímetro, etc.",
      },
      {
        id: "lesson-2-8",
        title: "2.8 - Práctica: Herramientas de edición avanzada en QGIS",
        description:
          "Aplicación de herramientas como dividir polígonos, fusionar geometrías, recortar capas y simplificar elementos vectoriales para optimizar la representación de datos geográficos.",
      },
      {
        id: "lesson-2-9",
        title: "2.9 - Práctica: Añadir y unir imágenes ráster (mosaicos)",
        description:
          "Combinación de múltiples imágenes ráster (ej. ortofotos, imágenes satelitales) para crear una cobertura continua y unificada para el área de estudio.",
      },
    ],
  },
  {
    id: "module-3",
    title:
      "MÓDULO III: FUENTES DE DATOS GEOESPACIALES Y SISTEMAS DE PROYECCIONES CARTOGRÁFICAS", // Más específico
    time: "Duración por definir",
    lessons: [
      {
        id: "lesson-3-1",
        title:
          "3.1 - Fuentes de datos geoespaciales para el estudio hidrológico",
        description:
          "Conocimiento y acceso a diferentes fuentes públicas y privadas para obtener Modelos Digitales de Elevación (DEM), shapefiles de ríos y límites administrativos, y coberturas de uso del suelo.",
      },
      {
        id: "lesson-3-2",
        title:
          "3.2 - Proyecciones y sistemas de referencia espacial (EPSG, UTM, WGS84)",
        description:
          "Comprensión profunda de los sistemas de coordenadas geográficas y proyectadas, y su importancia en la precisión y compatibilidad de los datos geoespaciales para el análisis hidrológico.",
      },
      {
        id: "lesson-3-3",
        title:
          "3.3 - Consideraciones para trabajar con datos en estudios hidrológicos",
        description:
          "Pautas específicas para la selección, preparación y validación de datos en proyectos de hidrología, incluyendo la calidad de los DEMs y la coherencia de las proyecciones.",
      },
      {
        id: "lesson-3-4",
        title:
          "3.4 - Práctica: Descarga de datos del SRTM (Shuttle Radar Topography Mission), Teselas de terreno, o servicios geoespaciales nacionales",
        description:
          "Obtención de datos topográficos globales (DEMs) y locales de alta resolución para el análisis de cuencas hidrográficas.",
      },
      {
        id: "lesson-3-5",
        title:
          "3.5 - Práctica: Descarga de capas Shapefiles de entidades gubernamentales o repositorios libres",
        description:
          "Acceso a datos vectoriales preexistentes, como redes de drenaje, límites de cuencas, o información de estaciones meteorológicas, para el análisis hidrológico en QGIS.",
      },
      {
        id: "lesson-3-6",
        title:
          "3.6 - Práctica: Georreferenciación de una imagen ráster en QGIS",
        description:
          "Calibración de imágenes escaneadas (ej. mapas topográficos antiguos, planos) para que coincidan con coordenadas geográficas reales, permitiendo su uso en un entorno SIG.",
      },
      {
        id: "lesson-3-7",
        title:
          "3.7 - Práctica: Clipping y reproyección de una capa DEM para ajustarla al área de estudio",
        description:
          "Recorte de un Modelo Digital de Elevación (DEM) a la extensión de la cuenca de interés y su transformación a un sistema de coordenadas adecuado para el análisis hidrológico.",
      },
      {
        id: "lesson-3-8",
        title:
          "3.8 - Práctica: Corrección de huecos en DEMs (Fill Sinks) para análisis hidrológico",
        description:
          'Técnicas para eliminar imperfecciones o "sumideros" (sinks) en los Modelos Digitales de Elevación que pueden afectar negativamente la simulación del flujo del agua y la delimitación de cuencas.',
      },
    ],
  },
  {
    id: "module-4",
    title:
      "MÓDULO IV: DELIMITACIÓN AUTOMÁTICA DE CUENCAS HIDROGRÁFICAS CON MODELOS DIGITALES DE ELEVACIÓN (DEM) EN QGIS", // Más específico y con QGIS
    time: "Duración por definir",
    lessons: [
      {
        id: "lesson-4-1",
        title:
          "4.1 - ¿Qué es un DEM y cómo se usa para análisis hidrológicos de cuencas?",
        description:
          "Funciones y aplicaciones de los Modelos Digitales de Elevación en la hidrología, incluyendo la representación del terreno y la base para el análisis de flujo.",
      },
      {
        id: "lesson-4-2",
        title: "4.2 - Principios del análisis de redes de drenaje y vertientes",
        description:
          "Entendimiento de cómo la topografía del terreno define el flujo del agua, la formación de cauces y la delimitación natural de las cuencas hidrográficas.",
      },
      {
        id: "lesson-4-3",
        title:
          "4.3 - Algoritmos de llenado de depresiones (Fill Sinks) y dirección del flujo",
        description:
          "Métodos para corregir errores en DEMs y determinar la trayectoria del agua sobre el terreno, esenciales para un análisis hidrológico preciso.",
      },
      {
        id: "lesson-4-4",
        title:
          "4.4 - Práctica: Uso del complemento GRASS o SAGA GIS en QGIS para delimitar una cuenca",
        description:
          "Aplicación de herramientas geoespaciales avanzadas disponibles en QGIS (a través de complementos como GRASS o SAGA GIS) para la delimitación automática y precisa de cuencas hidrográficas.",
      },
      {
        id: "lesson-4-5",
        title:
          "4.5 - Práctica: Procesamiento del DEM para análisis hidrológico: Fill sinks, Flow direction, Flow accumulation",
        description:
          "Pasos esenciales para preparar un DEM para el análisis hidrológico, incluyendo la eliminación de depresiones, la determinación de la dirección del flujo y la acumulación de flujo.",
      },
      {
        id: "lesson-4-6",
        title:
          "4.6 - Práctica: Generación del cauce principal y delimitación de la cuenca hidrográfica en QGIS",
        description:
          "Identificación y digitalización de la red de drenaje principal y la extracción del polígono que define la cuenca hidrográfica a partir del DEM procesado, utilizando las herramientas de QGIS.",
      },
    ],
  },
  {
    id: "module-5",
    title:
      "MÓDULO V: ANÁLISIS MORFOMÉTRICO Y DETERMINACIÓN DE PARÁMETROS DE CUENCAS HIDROGRÁFICAS", // Más específico
    time: "Duración por definir",
    lessons: [
      {
        id: "lesson-5-1",
        title:
          "5.1 - Determinación de redes de drenaje y su clasificación (orden de Strahler)",
        description:
          "Métodos para extraer la red hídrica y su jerarquización según el orden de Strahler, un indicador clave de la complejidad del sistema de drenaje.",
      },
      {
        id: "lesson-5-2",
        title:
          "5.2 - Parámetros morfométricos básicos de cuencas: densidad de drenaje, pendiente media, etc.",
        description:
          "Cálculo e interpretación de métricas clave que describen la forma, tamaño, relieve y características físicas de una cuenca hidrográfica, esenciales para la comprensión hidrológica.",
      },
      {
        id: "lesson-5-3",
        title:
          "5.3 - Importancia de los parámetros morfométricos en la modelación hidrológica",
        description:
          "Cómo los parámetros morfométricos influyen en la respuesta hidrológica de una cuenca, su capacidad de generar escorrentía y el riesgo de inundaciones.",
      },
      {
        id: "lesson-5-4",
        title:
          "5.4 - Práctica: Generación de la red de drenaje a partir del DEM procesado en QGIS",
        description:
          "Extracción detallada y visualización de la red fluvial a partir del Modelo Digital de Elevación ya preparado, utilizando las herramientas de análisis hidrológico de QGIS.",
      },
      {
        id: "lesson-5-5",
        title:
          "5.5 - Práctica: Determinación de parámetros morfológicos de la cuenca",
        description:
          "Cálculo de la forma de la cuenca (ej. factor de forma, coeficiente de compacidad), su extensión y el perímetro, para entender su influencia en la respuesta hidrológica.",
      },
      {
        id: "lesson-5-6",
        title:
          "5.6 - Práctica: Medición de parámetros morfométricos con herramientas de QGIS (longitud de cauce, densidad de drenaje, pendiente)",
        description:
          "Uso de las funcionalidades de QGIS para cuantificar la longitud del cauce principal, la densidad de drenaje, la pendiente media de la cuenca y otros indicadores clave.",
      },
    ],
  },
  {
    id: "module-6",
    title:
      "MÓDULO VI: ELABORACIÓN DE MAPAS TEMÁTICOS PARA CUENCAS HIDROGRÁFICAS Y GENERACIÓN DE INFORMES TÉCNICOS", // Más específico
    time: "Duración por definir",
    lessons: [
      {
        id: "lesson-6-1",
        title: "6.1 - Elementos Cartográficos esenciales de un mapa temático",
        description:
          "Componentes esenciales de un mapa (título, leyenda, escala, orientación, proyección, fuentes de datos) para una comunicación efectiva y estandarizada en informes técnicos.",
      },
      {
        id: "lesson-6-2",
        title:
          "6.2 - Buenas prácticas para presentación de mapas en informes técnicos",
        description:
          "Consejos de diseño, simbología, etiquetado y diagramación para crear mapas claros, profesionales y estéticamente atractivos para informes de análisis geoespacial.",
      },
      {
        id: "lesson-6-3",
        title:
          "6.3 - Estructura mínima de un informe de análisis espacial en SIG",
        description:
          "Lineamientos para la redacción de informes técnicos completos basados en análisis geoespaciales realizados en QGIS, incluyendo introducción, metodología, resultados, discusión y conclusiones.",
      },
      {
        id: "lesson-6-4",
        title:
          "6.4 - Práctica: Composición de mapas con el diseñador de impresión de QGIS",
        description:
          "Uso avanzado de la herramienta de diseño de impresión de QGIS para crear layouts de mapa profesionales, incluyendo múltiples vistas, gráficos y texto.",
      },
      {
        id: "lesson-6-5",
        title:
          "6.5 - Práctica: Inserción de leyendas, escalas, flecha de norte, y metadatos cartográficos",
        description:
          "Adición y configuración de todos los elementos necesarios para la correcta interpretación de los mapas, asegurando que cumplan con los estándares cartográficos.",
      },
      {
        id: "lesson-6-6",
        title:
          "6.6 - Práctica: Exportación de mapas en alta resolución y armado de un informe básico con resultados del curso",
        description:
          "Generación de mapas en diferentes formatos de alta calidad (PDF, imagen) y compilación de un informe final que resuma los análisis hidrológicos y morfométricos realizados durante el curso.",
      },
    ],
  },
];

const Temario: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredModules = useMemo(() => {
    if (!searchTerm) {
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
    // Replace with your actual WhatsApp group invite link
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
          <span className="font-semibold pr-1 text-sm">Inicio</span> 16 de
          Junio de 2025
        </div>
        <div className="flex flex-col items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <Hourglass className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1 ">Duración</span>{" "}
          <span className="text-sm text-center">
            03 semanas (140 horas académicas)
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
          Objetivo del Curso
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Este curso tiene como objetivo principal formar profesionales y
          estudiantes en la aplicación de herramientas SIG avanzadas (QGIS) para
          el análisis hidrológico integral. Aprenderás a realizar la
          delimitación de cuencas hidrográficas, el cálculo preciso de
          parámetros morfométricos, la elaboración de balances hídricos
          preliminares y la generación de mapas temáticos especializados para la
          gestión de recursos hídricos. Fortalecerás tu competencia para
          desarrollar estudios técnicos en hidrología, empleando tecnologías
          geoespaciales con precisión y eficiencia para enfrentar problemáticas
          ambientales y de recursos hídricos.
        </p>
      </motion.div>

      {/* Methodology Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Metodología de Enseñanza del Curso
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-base sm:text-lg">
          <li>
            Clases teórico-prácticas dictadas en vivo, con interacción directa
            con el docente.
          </li>
          <li>
            Desarrollo de casos prácticos y ejercicios aplicados utilizando QGIS
            para análisis de cuencas.
          </li>
          <li>
            Acceso a clases grabadas de forma ilimitada para repaso y
            consolidación de conocimientos.
          </li>
          <li>
            Materiales de estudio descargables, incluyendo guías, datasets y
            recursos adicionales.
          </li>
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
                      Ver Módulo
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
            No se encontraron módulos o lecciones con la búsqueda "{searchTerm}"
            en el temario del curso de QGIS.
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
          Para aprovechar al máximo el curso de Análisis de Cuencas
          Hidrográficas, utilizaremos las siguientes herramientas de software:
        </p>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            {/* It seems you imported 'Link' from 'lucide-react' which conflicts with 'next/link'. 
                If you intend to use 'lucide-react' Link, you might want to alias it: 
                import { Link as LucideLink } from "lucide-react";
                And use LucideLink here. Or if it's just an icon, keep it as is.
            */}
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>QGIS</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Microsoft Excel</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Google Earth:</span>
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
          Te proporcionaremos acceso a los siguientes materiales esenciales para
          tu aprendizaje:
        </p>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>
                Guía de configuración de entorno y descarga de software (PDF)
              </span>{" "}
              {/* Más descriptivo */}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start"
            >
            </Button>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>
                Conjunto de datos de práctica para los ejercicios del curso
                (enlace externo)
              </span>{" "}
              {/* Más descriptivo */}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start"
            >
            </Button>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>
                Ejercicios de práctica avanzados y datasets complementarios (ZIP)
              </span>{" "}
              {/* Más descriptivo */}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start"
            >
            </Button>
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