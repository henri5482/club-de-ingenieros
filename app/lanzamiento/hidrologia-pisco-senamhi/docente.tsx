'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Settings,
  ShieldCheck,
  Star,
  Twitter,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Interfaces (No changes needed, keeping them as is)
interface ProyectoDestacado {
  id: number;
  entidad: string;
  descripcion: string;
}
interface AreaEstrategica {
  id: number;
  area: string;
  detalle?: string;
}
interface Formacion {
  id: number;
  nombre: string;
}
interface RedSocialDocente {
  id: number;
  nombre: string;
  url: string;
  iconName: keyof typeof iconComponentsDocente;
}
interface DatosDocenteKevin {
  nombreCompleto: string;
  tituloPrincipal: string;
  subtitulo: string;
  descripcionGeneral: string;
  areasEstrategicas: AreaEstrategica[];
  proyectosDestacados: ProyectoDestacado[];
  formacionAdicional: Formacion[];
  rasgosProfesionales: string[];
  imagenUrl: string;
  email?: string;
  redesSociales: RedSocialDocente[];
}

const iconComponentsDocente = {
  Linkedin,
  Twitter,
  Github,
  Globe,
  Mail, // Added Mail icon here
};

// Docente Data (No changes needed, keeping it as is)
const datosDocenteKevin: DatosDocenteKevin = {
  nombreCompleto: "Eliser Mejía Herrera",
  tituloPrincipal: "Ingeniero Civil Colegiado",
  subtitulo: "Especialista en Modelamiento Hidráulico e Hidrológico, Gestión de Proyectos y Seguridad de Presas",
  descripcionGeneral:
    "Ingeniero especializado en el desarrollo de proyectos de infraestructura hidráulica, con amplio conocimiento en modelamiento hidráulico, hidrológico y SIG. Sólida formación en el diseño de obras hidráulicas, así como en la implementación de sistemas de monitoreo y control hidrológico en operación de presas.",
  imagenUrl: "/profesor01.jpg", // Make sure this path is correct for Eliser Mejía Herrera's photo!
  email: "emejiah.1507@gmail.com", // Please update with the correct email for Eliser Mejía Herrera
  areasEstrategicas: [
    { id: 1, area: "Dominio de HEC-RAS" },
    { id: 2, area: "Dominio de HEC-HMS" },
    { id: 3, area: "Dominio de RS MINERVE" },
    { id: 4, area: "Dominio de QGIS" },
    { id: 5, area: "Dominio de ACAD CIVIL 3D" },
    { id: 6, area: "Dominio de Excel Avanzado" },
    { id: 7, area: "Dominio de POWER BI" },
    { id: 8, area: "Manejo de drones DJI" },
  ],
  proyectosDestacados: [
    { id: 1, entidad: "CONCESIONARIA TRASVASE OLMOS S.A. (01/2016 – 03/2025)", descripcion: "Coordinador de Hidrología: Responsable de la gestión hidrológica e hidrométrica en la presa Limón, incluyendo balances hídricos, diseño y modelamiento hidráulico de defensas ribereñas con HEC-RAS, análisis de riesgos de inundación con QGIS y control de sedimentos. Participó como Especialista en Hidráulica durante las inspecciones de seguridad de presa, además en implementación de planes de emergencia." },
    { id: 2, entidad: "UTS – PROYECTOS Y SERVICIOS (10/2023 - 07/2024)", descripcion: "Especialista en Diseño Hidráulico: Revisó diseños hidráulicos de defensas ribereñas durante la construcción, realizando análisis hidrológicos e hidráulicos, interpretando datos topográficos y elaborando planos y especificaciones técnicas, asegurando cumplimiento normativo." },
    { id: 3, entidad: "CONCESIONARIA H2OLMOS S.A. (09/2014 - 12/2015)", descripcion: "Asistente de Ingeniería: Implementó plan de operación y mantenimiento del sistema hídrico de Irrigación Olmos, controlando caudales, supervisando entregas y realizando balances hídricos." },
  ],
  formacionAdicional: [
    { id: 1, nombre: "Maestría en Ingeniería con Mención en Dirección y Gestión de Proyectos (03/2025) - Universidad Católica de Trujillo" },
    { id: 2, nombre: "Ingeniero Civil (04/2024) - Universidad Cesar Vallejo" },
    { id: 3, nombre: "Ingeniero Agrícola (04/2015) - Universidad Nacional Pedro Ruiz Gallo" },
    { id: 4, nombre: "Experto en Hidrología Computacional y SIG para el Estudio y Gestión de Cuencas con QGIS (03/2025) - Centro de Altos Estudios en Geomática - CAEG" },
    { id: 5, nombre: "CONTRATOS NEC: Planificación, Gestión y Trabajo Colaborativo en Proyecto Complejos (09/2024 - 11/2024) - CAPACITATION AND ENGINEERING ONLINE ACADEMY - CEO" },
    { id: 6, nombre: "DIPLOMADO EN HIDRÁULICA FLUVIAL: DISEÑO Y CONTRUCCIÓN DE DEFENSAS RIBEREÑAS (09/2024 - 12/2024) - CERSA" },
    { id: 7, nombre: "CURSO DE CAPACITACIÓN EN HIDROLOGÍA, HIDRÁULICA Y DRENAJE DE CARRETERAS (01/2024 - 02/2024) - Pontificia Universidad Católica del Perú - PUCP" },
    { id: 8, nombre: "ESPECIALIZACIÓN: SUPERVISOR DE SEGURIDAD Y SALUD EN EL TRABAJO (11/2023 - 12/2023) - Colegio de Ingenieros del Perú" },
    { id: 9, nombre: "ELABORACIÓN DEL ESTUDIO DE HIDROLOGÍA PARA PROYECTOS DE INFRAESTRUCTURA HIDRÁULICA Y RIEGO (08/2023) - Ministerio de Desarrollo Agrario y Riego" },
    { id: 10, nombre: "AUSCULTACIÓN Y SEGURIDAD DE LAS PRESAS (02/2022) - RED INGENIERÍA - Argentina" },
    { id: 11, nombre: "CURSO DE MODELAMIENTO HIDRÁULICO 2D CON HEC RAS V.6 (11/2021 - 01/2022) - CERSA" },
    { id: 12, nombre: "IMPLEMENTADOR LIDER 5S CON ENFOQUE 9S (07/2021 - 08/2021) - ASESORES ESTRATÉGICOS" },
    { id: 13, nombre: "CURSO DE ESPECIALIDAD HIDROLÓGICA APLICADA (03/2021 - 04/2021) - IEPI – Colegio de Ingenieros del Perú" },
    { id: 14, nombre: "CURSO DE MODELACIÓN HIDROLÓGICA CON RS MINERVE (03/2021) - RHYDRO INGENIEROS" },
    { id: 15, nombre: "INTERPRETACIÓN DE LAS NORMAS ISO 9001:2015 E ISO 14001:2015 EN LA NUEVA NORMALIDAD (10/2020) - ASESORES ESTRATÉGICOS" },
    { id: 16, nombre: "DISEÑO, EXPLOTACIÓN Y SEGURIDAD DE PRESAS (CAF – BANCO DE DESARROLLO DE AMÉRICA LATINA)" },
  ],
  rasgosProfesionales: [
    "Trabajo en equipo",
    "Liderazgo",
    "Organización y planificación",
    "Comunicación asertiva",
    "Manejo de personal",
    "Gestión de proyectos",
  ],
  redesSociales: [
    { id: 1, nombre: "LinkedIn", url: "https://www.linkedin.com/in/eliser-mej%C3%ADa-herrera-3892189b/", iconName: "Linkedin" },
  ],
};

const DocenteSection = () => {
  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const sectionIconMap = {
    "Áreas de Especialización": <Zap className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Proyectos Destacados": <Briefcase className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Formación Complementaria": <GraduationCap className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Rasgos Profesionales": <Star className="w-5 h-5 mr-2 text-accent-foreground" />,
  };

  // Helper to render sections with styled Cards
  const renderSection = (title: keyof typeof sectionIconMap, content: React.ReactNode) => (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl bg-card border-border/50 dark:border-border/30">
        <CardHeader className="bg-muted/30 dark:bg-muted/20 border-b border-border/50 dark:border-border/30">
          <CardTitle className="text-lg md:text-xl font-semibold text-card-foreground flex items-center">
            {sectionIconMap[title]}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          {content}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.section
      id="docente"
      className="py-16 md:py-16 bg-gradient-to-b from-background to-muted/30 dark:from-slate-900 dark:to-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Conoce a tu Instructor
          </h2>
          <p className="mt-3 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Un profesional con la experiencia y dedicación para guiarte hacia el éxito.
          </p>
        </motion.div>

        {/* Responsive flex container: order-last on lg for left column, order-first on lg for right column */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Columna Derecha (Avatar y Redes) - Appears first on mobile, then floats right on desktop */}
          <motion.div
            className="w-full lg:w-1/3 lg:sticky lg:top-28 order-first lg:order-last" // `order-first` for mobile, `lg:order-last` for desktop
            variants={itemVariants}
          >
            <Card className="shadow-xl text-center p-6 bg-card border-border/50 dark:border-border/30 overflow-hidden">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="absolute inset-0 top-0 rounded-t-xl z-0 overflow-hidden">
                  <Image
                    src="/fondo.webp" // **<-- CHANGE THIS TO YOUR IMAGE PATH**
                    alt="Fondo decorativo"
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                  />
                </div>
                <Avatar className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 border-4 border-background shadow-2xl ring-2 ring-primary">
                  <AvatarImage asChild src={datosDocenteKevin.imagenUrl}>
                    <Image
                      src={datosDocenteKevin.imagenUrl}
                      alt={`Fotografía de ${datosDocenteKevin.nombreCompleto}`}
                      width={160}
                      height={160}
                      className="object-cover"
                      priority
                    />
                  </AvatarImage>
                  <AvatarFallback className="text-3xl md:text-4xl bg-muted text-muted-foreground">
                    {datosDocenteKevin.nombreCompleto.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{datosDocenteKevin.nombreCompleto}</h2>
              <p className="text-sm md:text-base text-primary font-medium">{datosDocenteKevin.tituloPrincipal}</p>
              {datosDocenteKevin.email &&
                <a href={`mailto:${datosDocenteKevin.email}`} className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block mt-1">
                  <span className="inline-flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1" /> {datosDocenteKevin.email}
                  </span>
                </a>
              }

              <Separator className=" bg-border" />

              {datosDocenteKevin.redesSociales.length > 0 && (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-foreground ">Conecta con el Ingeniero</h3>
                  <div className="flex justify-center ">
                    {datosDocenteKevin.redesSociales.map((red) => {
                      const IconComponent = iconComponentsDocente[red.iconName];
                      return (
                        <motion.div
                          key={red.id}
                          whileHover={{ scale: 1.15, y: -3, rotate: 3 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:bg-primary/5 dark:hover:border-primary transition-all duration-200">
                            <a href={red.url} target="_blank" rel="noopener noreferrer" aria-label={red.nombre} className="text-muted-foreground hover:text-primary">
                              <IconComponent className="w-5 h-5" />
                            </a>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </Card>
          </motion.div>

          {/* Columna Izquierda (Información Detallada) - Appears after image on mobile, then takes left on desktop */}
          <motion.div className="w-full lg:w-2/3 space-y-6 md:space-y-8 order-last lg:order-first" variants={containerVariants}> {/* `order-last` for mobile, `lg:order-first` for desktop */}
            <motion.div
              variants={itemVariants}
              className="p-6 md:p-8 bg-card border border-border/50 dark:border-border/30 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{datosDocenteKevin.nombreCompleto}</h3>
              <p className="text-lg md:text-xl text-primary font-medium mt-1">{datosDocenteKevin.tituloPrincipal}</p>
              <p className="text-base text-muted-foreground mt-1 mb-4 ">{datosDocenteKevin.subtitulo}</p>
              <Separator className="my-4 md:my-6 bg-border" />
              <p className="text-muted-foreground leading-relaxed text-base">
                {datosDocenteKevin.descripcionGeneral}
              </p>
            </motion.div>

            {renderSection(
              "Áreas de Especialización",
              <ul className="space-y-3 list-none p-0">
                {datosDocenteKevin.areasEstrategicas.map(area => (
                  <li key={area.id} className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <span className="font-medium text-card-foreground">{area.area}</span>
                      {area.detalle && <span className="text-xs text-muted-foreground block lg:inline lg:ml-1">({area.detalle})</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Proyectos Destacados",
              <ul className="space-y-4 list-none p-0">
                {datosDocenteKevin.proyectosDestacados.map(proyecto => (
                  <li key={proyecto.id} className="p-4 bg-background/50 dark:bg-muted/10 rounded-lg border border-border/30">
                    <h4 className="font-semibold text-slate-800">{proyecto.entidad}</h4>
                    <p className="text-sm mt-1 text-slate-800">{proyecto.descripcion}</p>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Formación Complementaria",
              <ul className="space-y-3 list-none p-0">
                {datosDocenteKevin.formacionAdicional.map(formacion => (
                  <li key={formacion.id} className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-card-foreground">{formacion.nombre}</span>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Rasgos Profesionales",
              <div className="flex flex-wrap gap-2 md:gap-3">
                {datosDocenteKevin.rasgosProfesionales.map((rasgo, index) => (
                  <Badge key={index} variant="secondary" className="text-sm font-normal px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30">
                    {rasgo}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DocenteSection;