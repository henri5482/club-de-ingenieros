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
  nombreCompleto: "Rubén Omar Ortiz Vásquez",
  tituloPrincipal: "Ingeniero Hidráulico Colegiado",
  subtitulo: "Especialista en Hidrología, Modelamiento Hidráulico y Gestión Integral del Agua",
  descripcionGeneral:
    "Rubén Omar Ortiz Vásquez es un apasionado Ingeniero Hidráulico con más de 8 años de experiencia en hidrología y gestión integral de recursos hídricos. Su trayectoria se distingue por un enfoque resiliente y creativo, permitiéndole superar desafíos y asegurar el éxito de proyectos estratégicos. Tiene una maestría en Recursos Hídricos por la UNALM (segundo puesto) y especializaciones en modelamiento hidrológico, hidráulico e hidrogeología minera.",
  imagenUrl: "/hidrologia-aplicada-con-pisco/profesor.webp", // Asegúrate de subir esta imagen a tu proyecto
  email: "ruben.ortiz.hidro@gmail.com",
  areasEstrategicas: [
    { id: 1, area: "Dominio de ArcGIS" },
    { id: 2, area: "Dominio de WEAP" },
    { id: 3, area: "Dominio de HEC-HMS" },
    { id: 4, area: "Dominio de MODFLOW" },
    { id: 5, area: "Dominio de Google Earth Engine" },
    { id: 6, area: "Modelamiento Hidrológico e Hidráulico" },
    { id: 7, area: "Gestión de Recursos Hídricos" },
  ],
  proyectosDestacados: [
    {
      id: 1,
      entidad: "Autoridad Nacional del Agua (ANA)",
      descripcion: "Lideró la elaboración de modelos hidrológicos, evaluación de acreditaciones hídricas y gestión de recursos en la cuenca Jequetepeque-Zaña."
    },
    {
      id: 2,
      entidad: "SENAMHI",
      descripcion: "Responsable de monitoreos y pronósticos hidrológicos en cuencas clave, liderando proyectos de hidrología operativa y campañas de aforo."
    },
    {
      id: 3,
      entidad: "Ministerio del Ambiente (MINAM)",
      descripcion: "Ejecutó modelamiento hidráulico aplicado a la gestión territorial y evaluación de infraestructura verde."
    }
  ],
  formacionAdicional: [
    { id: 1, nombre: "Maestría en Recursos Hídricos – Universidad Nacional Agraria La Molina (2° puesto)" },
    { id: 2, nombre: "Especialización en Hidrogeología Aplicada a la Minería" },
    { id: 3, nombre: "Diplomado en Modelamiento Hidráulico e Hidrológico" },
    { id: 4, nombre: "Cursos internacionales de seguridad hídrica y modelamiento ambiental" },
  ],
  rasgosProfesionales: [
    "Liderazgo",
    "Creatividad",
    "Compromiso ambiental",
    "Aprendizaje constante",
    "Trabajo en equipo",
    "Solución integral de problemas",
  ],
  redesSociales: [
    { id: 1, nombre: "LinkedIn", url: "https://www.linkedin.com/in/vrortiz/", iconName: "Linkedin" },
  ]
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