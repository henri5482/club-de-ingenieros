// docentesData.js (o docentesData.ts)
const docentesData = [
  {
    id: "dany-henry-yomona-cueva",
    name: "ING. Dany Henry Yomona Cueva",
    image: "/docentecueva.webp", // Placeholder, please replace with actual image path for Dany
    title: "Ingeniero Geólogo - Especialista en Geoestadística",
    profession: "Ingeniero Geólogo",
    bio: "Dany Henry Yomona Cueva es Ingeniero Geólogo (UNC), especializado en Geoestadística y software geológico avanzado. Con más de 10 años de experiencia en el sector minero, ha destacado en modelamiento geológico y estimación de recursos, manejando herramientas como Datamine, Leapfrog Geo y Vulcan. Actualmente, cursa un MBA en Dirección de Empresas. Reconocido por su liderazgo e innovación, contribuye a la eficiencia y sostenibilidad en minería.",
    courses: [
      {
        name: "Geoestadística Aplicada a la Evaluación de Yacimientos Mineros",
        url: "/cursosall/geoestadistica-aplicada-yacimientos-mineros",
        imageUrl: "/bannerdocente1.webp",
      },
    ],
    social: {},
  },
  {
    id: "joseph-marlon-romero-colqui",
    name: "ING. Joseph Marlon Romero Colqui",
    image: "/docentemarlon.webp",
    title:
      "Especialista en Seguridad y Salud en el Trabajo (SST) y Prevención de Riesgos Laborales",
    profession: "Ingeniero Civil",
    bio: "Mg. Ing. Joseph Marlon Romero Colqui es Ingeniero Civil con maestrías en Prevención de Riesgos Laborales (España) y Gestión Integrada (UNMSM). Con amplia experiencia como auditor ISO 45001, es un experto en seguridad para obras de alto riesgo. Gerente General de JRC Gestión & Proyectos y docente universitario, destaca por su liderazgo y sólido conocimiento de normativas de SST.",
    courses: [
      {
        name: "GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO ",
        url: "/cursosall/gestion-seguridad-salud-trabajo-alto-riesgo",
        imageUrl: "/bannerdocente2.webp",
      },
      {
        name: "CURSO DE ESPECIALIZACIÓN CÁLCULO ",
        url: "/cursosall/calculo-supervision-izajes-riggers",
        imageUrl: "/bannerdocente3.webp",
      },
      {
        name: "CÁLCULO EN IZAJE DE CARGAS ",
        url: "/cursosall/calculo-izaje-cargas",
        imageUrl: "/bannerdocente4.webp",
      },
      {
        name: "Método ICAM para Investigación de Incidentes/Accidentes",
        url: "/cursosall/metodo-icam-investigacion-incidentes-accidentes",
        imageUrl: "/bannerdocente5.webp",
      },
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/joseph-romero-colqui-9a6aa01b5/",
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "luis-manotupa-duenas",
    name: "ING. Luis Manotupa Dueñas",
    image: "/docentedueñas.webp",
    title:
      "Hidrogeólogo Senior - Especialista en Recursos Hídricos y Simulación",
    profession: "Ingeniero Civil",
    bio: "Ingeniero Civil (M.Sc. PUCP), Luis Manotupa es Hidrogeólogo con especialidad en minería (U. Arizona). Con 20 años de experiencia, lidera proyectos globales en simulación de aguas subterráneas y geotécnica para la industria minera y de construcción, incluyendo países de América, Europa y Medio Oriente.",

    courses: [
      {
        name: "CURSO MODELACIÓN HIDROGEOLÓGICA EN MINERÍA ",
        url: "/cursosall/modelacion-hidrogeologica-mineria",
        imageUrl: "/bannerdocente6.webp",
      },
    ], // No specific courses listed in the provided profile
    social: {
      linkedin: null, // Please provide Luis's LinkedIn URL here if available
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "oliver-hurtado",
    name: "Ing. Oliver Hurtado",
    image: "/docenteoliver.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title:
      "Ingeniero Hidráulico - Experto en Modelamiento y Proyectos Hídricos",
    profession: "Ingeniero Civil Hidráulico",
    bio: "Ing. Civil Hidráulico (UNMSM) con maestría en Recursos Hídricos (UNALM). Experto en modelamiento (HEC-RAS 2D, FLO-2D, HEC-HMS) y software especializado (Civil 3D, ArcGIS). Ha liderado importantes proyectos de infraestructura hídrica y minera en Perú y el extranjero (MMG Las Bambas, Southern Perú, Anglo American). Destaca por su alto dominio técnico, liderazgo y compromiso con la sostenibilidad hídrica.",
    courses: [
      {
        name: "MODELAMIENTO HIDROLÓGICO E HIDRÁULICO EN DEFENSAS RIBEREÑAS Y QUEBRADAS ",
        url: "/cursosall/modelamiento-hidrologico-hidraulico-defensas-riberenas-quebradas",
        imageUrl: "/bannerdocente7.webp",
      },
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/oliver-hurtado-704a2b186/",
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "kevin-navarro-chancan",
    name: "Ing. Kevin M. Navarro Chancan",
    image: "/docentekevin.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title: "Ingeniero Agrícola - Especialista en Hidrología, Hidráulica y EVAR",
    profession: "Ingeniero Agrícola",
    bio: "Ingeniero Agrícola (UNALM) con sólida formación en modelamiento hidráulico e hidrológico (HEC-HMS, HEC-RAS) y Evaluación de Riesgos de Desastres (EVAR, CENEPRED). Cuenta con experiencia destacada en proyectos para CENEPRED, SEDAPAL y otros, así como en manejo de software especializado (ArcGIS, Civil 3D). Reconocido por su dominio técnico y liderazgo en gestión de recursos hídricos y prevención de desastres.",
    courses: [
      {
        name: "FORMULACIÓN DE INFORMES DE EVALUACIÓN DE RIESGOS DE DESASTRES (EVAR) ",
        url: "/cursosall/formulacion-informes-evar-cenepred",
        imageUrl: "/bannerdocente8.webp",
      },
      {
        name: "GESTIÓN DE RIESGOS EN LA PLANIFICACIÓN DE LA EJECUCIÓN DE OBRAS ",
        url: "/cursosall/gestion-riesgos-planificacion-obras-osce",
        imageUrl: "/bannerdocente9.webp",
      },
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/kevin-navarro-chancan-29b834173/",
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "kevin-joseph-perez-meneses",
    name: "Ing. Kevin Joseph Perez Meneses",
    image: "/docenteperez.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title:
      "Ingeniero Agrícola-Civil - Experto en Hidráulica, Geotecnia y Gestión Hídrica",
    profession: "Ingeniero Agrícola - Civil",
    bio: "Ingeniero Agrícola-Civil (UNSCH), Kevin Perez Meneses es especialista en hidrología, hidráulica y obras hidráulicas. Cuenta con estudios de maestría en Gerencia de Proyectos y Medio Ambiente (UNSCH), Geotécnica (UNI) e Ingeniería Hidrológica (Bolivia), además de ser Experto Universitario en Gestión de Sistemas de Agua (U. Zaragoza, España). Actualmente, es Docente Universitario en la UNSCH.",
    courses: [
      {
        name: "FORMULACIÓN DE INFORMES DE EVALUACIÓN DE RIESGOS DE DESASTRES (EVAR) ",
        url: "/cursosall/certificacion-punto-geodesico-orden-c",
        imageUrl: "/bannerdocente10.webp",
      },
    ], // No cursos específicos listados en este perfil
    social: {
      linkedin: null, // Proporciona el URL de LinkedIn si está disponible
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "yordy-jesus-caycho-vilca",
    name: "Ing. Yordy Jesús Caycho Vilca",
    image: "/docentejordy.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title: "Ingeniero Geólogo - Especialista en Hidrogeología y Geotecnia",
    profession: "Ingeniero Geólogo",
    bio: "Ingeniero Geólogo con Maestría en Geotecnia (UNMSM). Yordy Caycho es un especialista en Hidrogeología y Geología, con experiencia en remediación de suelos, planes de cierre de minas y liderazgo de proyectos hidrogeológicos en empresas como Hudbay Perú. Domina software clave como Leapfrog, ArcGIS y Modflow. También ha liderado cursos en su especialidad.",
    courses: [
      {
        name: "HIDROGEOLOGIA MINERA APLICADA A CAPTACIONES DE AGUAS SUBTERRANEAS ",
        url: "/cursosall/hidrogeologia-minera-aplicada-captaciones-aguas-subterraneas",
        imageUrl: "/bannerdocente11.webp",
      },
      {
        name: "OPTIMIZACIÓN DE RECURSOS HÍDRICOS EN MINERÍA ",
        url: "/cursosall/hidrogeologia-minera-aplicada-captaciones-aguas-subterraneas",
        imageUrl: "/bannerdocente12.webp",
      },
    ],
    social: {
      linkedin: null,
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "gilberth-eduardo-cruzado-mendoza",
    name: "ING. Gilberth Eduardo Cruzado Mendoza",
    image: "/docenteeduardo.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title:
      "Ingeniero Hidráulico - Especialista en Modelamiento Hidráulico e Hidrológico",
    profession: "Ingeniero Hidráulico",
    bio: "Ingeniero Hidráulico (UNC), Gilberth Cruzado es un profesional con amplia experiencia en modelamiento hidráulico e hidrológico (HEC HMS, HEC RAS, ArcGIS, AutoCAD, Revit). Ha liderado proyectos críticos como el estudio hidrológico del Río Seco en Punta Hermosa y consultorías para GEO TEKH EIRL. Destaca por su liderazgo, proactividad y habilidad en gestión de proyectos de infraestructura hidráulica.",
    courses: [
      {
        name: "MODELAMIENTO HIDRÁULICO CON HEC-RAS",
        url: "/cursosall/modelamiento-hidraulico-hec-ras",
        imageUrl: "/bannerdocente13.webp",
      },
      {
        name: "CURSO DE ESPECIALIZACIÓN HIDROLOGÍA APLICADA A PROYECTOS HIDRÁULICOS",
        url: "/cursosall/hidrologia-aplicada-proyectos-hidraulicos",
        imageUrl: "/bannerdocente14.webp",
      },
    ],
    social: {
      linkedin:
        "https://www.linkedin.com/in/gilberth-eduardo-cruzado-mendoza-a29009124/",
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },

  {
    id: "ruben-omar-ortiz-vasquez",
    name: "ING. Rubén Omar Ortiz Vásquez",
    image: "/docenteruben.webp", // Placeholder: Asegúrate de que la imagen esté en public/docentes
    title:
      "Ingeniero Hidráulico - Especialista en Hidrología y Recursos Hídricos",
    profession: "Ingeniero Hidráulico",
    bio: "Ingeniero Hidráulico con más de 8 años de experiencia en hidrología y gestión integral de recursos hídricos. Posee maestría en Recursos Hídricos (UNALM) y especializaciones en modelamiento hidrológico, hidráulico e hidrogeología aplicada a la minería. Ha liderado proyectos clave en ANA, SENAMHI y MINAM. Domina softwares como ArcGIS, WEAP y HEC-HMS, y es ponente en su área.",
    courses: [
      {
        name: "ESTUDIO HIDROLÓGICO PARA LA ACREDITACIÓN HÍDRICA SUPERFICIAL SEGÚN LA ANA",
        url: "/cursosall/estudio-hidrologico-acreditacion-hidrica-ana",
        imageUrl: "/bannerdocente15.webp",
      },
      {
        name: "DELIMITACIÓN HIDROLÓGICA E HIDRÁULICA DE FAJAS MARGINALES SEGÚN LA NORMATIVA DE LA ANA",
        url: "/cursosall/delimitacion-fajas-marginales-ana",
        imageUrl: "/bannerdocente16.webp",
      },
    ], 
    social: {
      linkedin: "https://www.linkedin.com/in/vrortiz/",
      facebook: null,
      twitter: null,
      instagram: null,
    },
  },
];

export default docentesData;
