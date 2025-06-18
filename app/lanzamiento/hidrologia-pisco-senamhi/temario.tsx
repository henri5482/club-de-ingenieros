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
    "id": "module-0",
    "title": "MÓDULO 0: DEMOSTRACIÓN PRÁCTICA INICIAL",
    "time": "1 hora",
    "lessons": [
      {
        "id": "lesson-0-1",
        "title": "0.1 - Carga de datos PISCO y SENAMHI",
        "description": "Introducción a la carga y visualización inicial de datos de precipitaciones de las fuentes PISCO y estaciones SENAMHI, preparando el terreno para el análisis hidrológico."
      },
      {
        "id": "lesson-0-2",
        "title": "0.2 - Aplicación rápida de Quantile Mapping en R",
        "description": "Demostración ágil de la técnica de Quantile Mapping en el entorno R, mostrando cómo se corrige la distribución de datos para mejorar su calidad en aplicaciones hidrológicas."
      },
      {
        "id": "lesson-0-3",
        "title": "0.3 - Visualización de la mejora de datos corregidos",
        "description": "Análisis comparativo visual de los datos antes y después de la corrección con Quantile Mapping, destacando la mejora en la coherencia y precisión de las series hidrometeorológicas."
      },
      {
        "id": "lesson-0-4",
        "title": "0.4 - Simulación rápida en HEC-HMS (ya armado) con datos corregidos",
        "description": "Ejecución de una simulación hidrológica distribuida preconfigurada en HEC-HMS, utilizando los datos corregidos para mostrar el producto final del curso y sus aplicaciones prácticas."
      }
    ]
  },
  {
    "id": "module-1",
    "title": "MÓDULO I: FUNDAMENTOS Y EXPLORACIÓN DE DATOS",
    "time": "1 hora",
    "lessons": [
      {
        "id": "lesson-1-1",
        "title": "1.1 - ¿Qué es la hidrología aplicada?",
        "description": "Conceptos fundamentales de la hidrología aplicada y su relevancia en el estudio y gestión de recursos hídricos, enfocado en problemas reales y soluciones prácticas."
      },
      {
        "id": "lesson-1-2",
        "title": "1.2 - ¿Qué es PISCO y cómo descargarlo?",
        "description": "Introducción a PISCO (Producto Integrado de Sensores de Observación Climática), su importancia como fuente de datos hidrometeorológicos y guía para su descarga."
      },
      {
        "id": "lesson-1-3",
        "title": "1.3 - Estaciones SENAMHI: calidad y validación",
        "description": "Análisis de la calidad y fiabilidad de los datos provenientes de las estaciones del SENAMHI, incluyendo métodos de validación y limpieza de series históricas."
      },
      {
        "id": "lesson-1-4",
        "title": "1.4 - Comparación preliminar de datos (Excel/R)",
        "description": "Primeras aproximaciones para comparar los datos de PISCO y SENAMHI utilizando herramientas como Excel o scripts básicos en R, identificando diferencias y patrones iniciales."
      },
      {
        "id": "lesson-1-5",
        "title": "1.5 - Práctica: Revisión y graficado de datos SENAMHI y PISCO",
        "description": "Ejercicios prácticos para cargar, visualizar y graficar series temporales de datos de precipitación de ambas fuentes, permitiendo una primera inspección visual."
      },
      {
        "id": "lesson-1-6",
        "title": "1.6 - Práctica: Cálculo de medias y correlación",
        "description": "Realización de cálculos estadísticos básicos como medias, desviaciones estándar y coeficientes de correlación entre las series de datos de PISCO y SENAMHI."
      }
    ]
  },
  {
    "id": "module-2",
    "title": "MÓDULO II: QUANTILE MAPPING CON R",
    "time": "2 horas",
    "lessons": [
      {
        "id": "lesson-2-1",
        "title": "2.1 - Fundamento del Quantile Mapping",
        "description": "Exploración detallada de los principios teóricos del Quantile Mapping, una técnica de corrección de sesgos para ajustar las distribuciones de datos modelados a las observadas."
      },
      {
        "id": "lesson-2-2",
        "title": "2.2 - Librerías necesarias (qmap, climQMBC, ggplot2)",
        "description": "Identificación y uso de las principales librerías de R (qmap, climQMBC, ggplot2) que facilitan la aplicación del Quantile Mapping y la visualización de resultados."
      },
      {
        "id": "lesson-2-3",
        "title": "2.3 - Aplicación paso a paso a una estación",
        "description": "Guía práctica y detallada para aplicar la metodología de Quantile Mapping a una serie de datos de una estación hidrometeorológica específica en R."
      },
      {
        "id": "lesson-2-4",
        "title": "2.4 - Práctica: Corrección diaria o mensual",
        "description": "Ejercicios para aplicar el Quantile Mapping a datos diarios y mensuales, entendiendo las particularidades de cada resolución temporal en la corrección de sesgos."
      },
      {
        "id": "lesson-2-5",
        "title": "2.5 - Práctica: Comparación antes/después con gráficos y NSE, RMSE",
        "description": "Evaluación cuantitativa y visual de la mejora de los datos corregidos, utilizando gráficos comparativos y métricas estadísticas como el Coeficiente de Nash-Sutcliffe (NSE) y la Raíz del Error Cuadrático Medio (RMSE)."
      }
    ]
  },
  {
    "id": "module-3",
    "title": "MÓDULO III: AUTOMATIZACIÓN Y EXPORTACIÓN",
    "time": "1 hora",
    "lessons": [
      {
        "id": "lesson-3-1",
        "title": "3.1 - Corrección de varias estaciones",
        "description": "Estrategias y técnicas para aplicar el Quantile Mapping de manera eficiente a múltiples estaciones hidrometeorológicas, optimizando el proceso de corrección."
      },
      {
        "id": "lesson-3-2",
        "title": "3.2 - Funciones personalizadas en R",
        "description": "Desarrollo de scripts y funciones personalizadas en R para automatizar tareas repetitivas en el proceso de Quantile Mapping, mejorando la eficiencia y reproducibilidad."
      },
      {
        "id": "lesson-3-3",
        "title": "3.3 - Exportación de resultados corregidos",
        "description": "Métodos para exportar los datos hidrometeorológicos corregidos en formatos adecuados para su uso posterior en software de modelación hidrológica como HEC-HMS."
      },
      {
        "id": "lesson-3-4",
        "title": "3.4 - Práctica: Aplicar QM a múltiples series",
        "description": "Ejercicios prácticos para implementar la corrección de Quantile Mapping en un conjunto de series de datos de varias estaciones simultáneamente."
      },
      {
        "id": "lesson-3-5",
        "title": "3.5 - Práctica: Exportar a CSV o TXT",
        "description": "Creación de scripts para exportar los resultados corregidos en formatos de texto plano (CSV o TXT), facilitando su integración con otras herramientas y plataformas."
      }
    ]
  },
  {
    "id": "module-4",
    "title": "MÓDULO IV: PREPARACIÓN DE INSUMOS PARA HEC-HMS",
    "time": "1.5 horas",
    "lessons": [
      {
        "id": "lesson-4-1",
        "title": "4.1 - Delimitación de cuenca (QGIS básico)",
        "description": "Introducción a la delimitación de cuencas hidrográficas utilizando funcionalidades básicas de QGIS, a partir de Modelos Digitales de Elevación (DEMs)."
      },
      {
        "id": "lesson-4-2",
        "title": "4.2 - Generación de hietogramas corregidos",
        "description": "Métodos para transformar los datos de precipitación corregidos por Quantile Mapping en hietogramas, el formato de entrada temporal para la simulación hidrológica."
      },
      {
        "id": "lesson-4-3",
        "title": "4.3 - Conversión a formato .met para HEC-HMS",
        "description": "Procedimiento para convertir los datos hidrometeorológicos corregidos y los hietogramas generados en el formato de archivo .met, compatible con HEC-HMS."
      },
      {
        "id": "lesson-4-4",
        "title": "4.4 - Práctica: Recorte de PISCO corregido",
        "description": "Ejercicios para recortar los datos espaciales de PISCO corregidos a la extensión geográfica de la cuenca de estudio utilizando herramientas geoespaciales."
      },
      {
        "id": "lesson-4-5",
        "title": "4.5 - Práctica: Generación de subcuencas e inputs",
        "description": "Delimitación de subcuencas dentro de la cuenca principal y preparación de todos los archivos de entrada (inputs) necesarios para la configuración del modelo en HEC-HMS."
      }
    ]
  },
  {
    "id": "module-5",
    "title": "MÓDULO V: SIMULACIÓN DISTRIBUIDA EN HEC-HMS",
    "time": "2.5 horas",
    "lessons": [
      {
        "id": "lesson-5-1",
        "title": "5.1 - Configuración del modelo distribuido",
        "description": "Pasos detallados para configurar un modelo hidrológico distribuido en HEC-HMS, incluyendo la definición de elementos de la red de drenaje y parámetros físicos."
      },
      {
        "id": "lesson-5-2",
        "title": "5.2 - Carga de datos meteorológicos",
        "description": "Proceso de importación y asignación de los datos meteorológicos corregidos (hietogramas, temperaturas, etc.) al modelo de HEC-HMS para la simulación."
      },
      {
        "id": "lesson-5-3",
        "title": "5.3 - Simulación hidrológica",
        "description": "Ejecución de simulaciones hidrológicas en HEC-HMS, entendiendo las opciones de cálculo y los algoritmos internos para predecir la respuesta hidrológica de la cuenca."
      },
      {
        "id": "lesson-5-4",
        "title": "5.4 - Análisis y validación de resultados",
        "description": "Métodos para analizar y validar los resultados de la simulación hidrológica, comparando los hidrogramas simulados con datos observados y evaluando la precisión del modelo."
      },
      {
        "id": "lesson-5-5",
        "title": "5.5 - Práctica: Construcción del modelo desde cero",
        "description": "Creación de un proyecto de modelo HEC-HMS desde su inicio, aplicando todos los conocimientos adquiridos para integrar los datos y configurar la simulación."
      },
      {
        "id": "lesson-5-6",
        "title": "5.6 - Práctica: Comparación de resultados con y sin corrección",
        "description": "Análisis comparativo de los hidrogramas resultantes de simulaciones realizadas con datos originales y con datos corregidos, evidenciando el impacto de la corrección en la precisión del modelo."
      }
    ]
  }
]

const Temario: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            No se encontraron módulos o lecciones con la búsqueda {searchTerm}
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