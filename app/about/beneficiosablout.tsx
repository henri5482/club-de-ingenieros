"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const benefitsData = [
  {
    id: 1,
    icon: "/clubdeingenieros.png",
    title: "Accede a educación especializada",
    description:
      "Estudia con cursos diseñados por expertos en ingeniería, pensados para el mercado laboral actual y enfocados en resultados reales.",
  },
  {
    id: 2,
    icon: "/clubdeingenieros.png",
    title: "Recibe certificación profesional",
    description:
      "Cada curso que culmines te otorga un certificado con respaldo válido a nivel nacional, ideal para tu CV y LinkedIn.",
  },
  {
    id: 3,
    icon: "/clubdeingenieros.png",
    title: "Forma parte de una comunidad exclusiva",
    description:
      "Únete a miles de estudiantes de ingeniería que comparten conocimientos, oportunidades laborales y experiencias.",
  },
  {
    id: 4,
    icon: "/clubdeingenieros.png",
    title: "Acompañamiento y soporte personalizado",
    description:
      "Te guiamos en tu ruta de aprendizaje con orientación académica y asesoría para mejorar tu empleabilidad.",
  },
];

const Beneficiosabout = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white text-slate-900 py-16 px-4 sm:px-8 lg:px-16">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl text-red-600 lg:text-5xl font-extrabold mb-12 leading-tight"
          variants={itemVariants}
        >
          Sobre Club de Ingenieros
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          Somos una empresa peruana con más de 10 años de experiencia capacitando a ingenieros en todo el país. Ofrecemos cursos especializados y certificados que te preparan para postular a los empleos más deseados del mercado.
        </motion.p>

        {/* Misión y visión */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left"
          variants={itemVariants}
        >
          <div className="bg-slate-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Misión</h3>
            <p className="text-slate-700">
              Formar profesionales competitivos en el ámbito de la ingeniería mediante cursos prácticos, accesibles y certificados, que les permitan lograr su inserción laboral y desarrollo profesional.
            </p>
          </div>
          <div className="bg-slate-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Visión</h3>
            <p className="text-slate-700">
              Ser la comunidad educativa líder en la formación de ingenieros en Perú, reconocida por su calidad, innovación y compromiso con el crecimiento profesional de sus miembros.
            </p>
          </div>
        </motion.div>

        {/* Beneficios para instructores */}
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-center mb-10"
          variants={itemVariants}
        >
          Beneficios de ser parte del Club como instructor
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          variants={itemVariants}
        >
          {benefitsData.map((benefit) => (
            <motion.div key={benefit.id} variants={itemVariants}>
              <Card className="bg-slate-800 border-slate-700 h-full flex flex-col justify-between p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2 leading-tight">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-white text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Beneficiosabout;
