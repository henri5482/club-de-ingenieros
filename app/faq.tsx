"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Luis Quispe",
    role: "🇵🇪",
    avatar: "/coment1.webp",
    comment:
      "Gracias al curso de ingeniería de sistemas, logré obtener mi primer empleo como soporte técnico en una empresa de tecnología. La formación fue muy completa y práctica.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fiorella Huamán",
    role: "🇵🇪",
    avatar: "/avatar2.jpg",
    comment:
      "Estudié ingeniería civil y el curso de estructuras me ayudó bastante. Gracias a esto ahora trabajo en una consultora que diseña obras públicas en Cusco.",
    rating: 5,
  },
  {
    id: 3,
    name: "Renzo Paredes",
    role: "🇵🇪",
    avatar: "/avatar3.jpg",
    comment:
      "El curso de hidráulica aplicada fue excelente. Aprendí a usar herramientas que ahora aplico en mi trabajo como ingeniero agrícola en Cajamarca.",
    rating: 4,
  },
  {
    id: 4,
    name: "Camila Vargas",
    role: "🇵🇪",
    avatar: "/coment2.jpg",
    comment:
      "El programa de hidrología fue clave para mi puesto actual en una ONG ambiental. Muy bien estructurado y con casos reales del Perú.",
    rating: 5,
  },
  {
    id: 5,
    name: "Jorge Alvarado",
    role: "🇵🇪",
    avatar: "/coment3.jpg",
    comment:
      "Me capacité en ingeniería geológica y minera. Actualmente trabajo en una empresa de exploración en Apurímac gracias al respaldo del curso y la certificación.",
    rating: 5,
  },
  {
    id: 6,
    name: "Natalie Yupanqui",
    role: "🇵🇪",
    avatar: "/",
    comment:
      "Tomé el curso de ingeniería eléctrica y fue muy completo. Me ayudó a validar conocimientos que ahora aplico en proyectos de electrificación rural.",
    rating: 5,
  },
  {
    id: 7,
    name: "Carlos Mejía",
    role: "🇵🇪",
    avatar: "/",
    comment:
      "Gracias al curso en gestión ambiental para ingenieros, hoy trabajo en una minera donde aplico directamente lo aprendido. ¡Recomendado!",
    rating: 5,
  },
];


// Animation variants for section header elements
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Animation variants for carousel items (testimonial cards)
const carouselItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

export default function SuccessStoriesCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getCarouselItemBasis = useCallback(() => {
    if (isMobile) return "basis-full"; // Full width on mobile
    if (isTablet) return "basis-1/2"; // Half width on tablet
    return "basis-1/3"; // One-third width on desktop
  }, [isMobile, isTablet]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[#FAFAFA] text-gray-50 overflow-hidden relative">
      {/* Background radial gradient for visual flair */}
      <div className="absolute inset-0 z-0 radial-gradient-custom opacity-30"></div>

      <div className="text-center mb-12 md:mb-16 lg:mb-20 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-5 text-red-600 leading-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionHeaderVariants}
        >
          Tú puedes ser la próxima{" "}
          <span className="inline-block text-red-600 font-extrabold drop-shadow-md">
            historia de éxito
          </span>
        </motion.h2>
        <motion.p
          className="text-slate-800 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionHeaderVariants}
        >
          Así como ellos, tú también puedes alcanzar tus metas y transformar tu
          futuro. Únete a nuestra comunidad.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 z-10">
        <Carousel
          plugins={[autoplay.current]}
          className="w-full"
          opts={{ align: "start", loop: true }}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className={`pl-4 ${getCarouselItemBasis()}`}
              >
                <motion.div
                  custom={index}
                  variants={carouselItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                    transition: { type: "spring", stiffness: 200, damping: 15 },
                  }}
                  className="h-full transform transition-all duration-300"
                >
                  <Card
                    // Responsive padding: smaller on mobile (p-4) larger on sm/lg (sm:p-6 lg:p-8)
                    className="p-4 sm:p-6 lg:p-8 bg-[#FAFAFA] text-gray-200 border border-[#373e4a] rounded-xl h-full flex flex-col justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                  >
                    {/* Subtle inner glow effect */}
                    <div
                      className="absolute inset-0 border-[0.5px] border-transparent rounded-xl pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,194,168,0.1) 0%, rgba(0,194,168,0) 50%)",
                        mask: "linear-gradient(white, white) padding-box, linear-gradient(white, white)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "exclude",
                      }}
                    ></div>

                    <CardHeader className="flex flex-row items-start gap-3 p-0 pb-4 sm:gap-4 sm:pb-5">
                      {/* Responsive avatar size: w-12 h-12 on mobile, larger on sm/lg */}
                      <Avatar className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-red-600 flex-shrink-0 shadow-md">
                        {" "}
                        {/* Reduced border-width for smaller avatars */}
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-[#00c2a8]/20 text-[#00c2a8] font-bold text-lg sm:text-xl">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>{" "}
                        {/* Responsive fallback text size */}
                      </Avatar>
                      <div className="flex-1">
                        {/* Responsive title size: text-lg on mobile, larger on sm/lg */}
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-0 sm:mb-1">
                          {testimonial.name}
                        </CardTitle>{" "}
                        {/* Reduced margin-bottom */}
                        {/* Responsive description size: text-sm on mobile, larger on sm/lg */}
                        <CardDescription className="text-sm sm:text-base text-gray-400">
                          {testimonial.role}
                        </CardDescription>
                        {/* Responsive star icon size: w-4 h-4 on mobile, larger on sm/lg */}
                        <div className="flex items-center gap-0.5 mt-1 sm:mt-2">
                          {" "}
                          {/* Reduced gap and margin-top */}
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                                i < testimonial.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-600 text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    {/* Responsive comment text size: text-sm on mobile, larger on sm/lg */}
                    <CardContent className="p-0 text-sm sm:text-base leading-relaxed flex-grow overflow-hidden pt-3">
                      {" "}
                      {/* Added small padding top to separate from header slightly */}
                      <blockquote className="italic text-slate-800 pl-3 border-l-3 border-[#00c2a8] text-sm sm:text-base">
                        {" "}
                        {/* Reduced border-left width and padding-left */}
                        &quot;{testimonial.comment}&quot;
                      </blockquote>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation controls */}
     <div
  className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 sm:px-4 pointer-events-none z-20 hidden md:flex"
>
  <CarouselPrevious
    className="pointer-events-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-[#373e4a] text-gray-200 hover:bg-[#4f5869] rounded-full shadow-lg transition-colors duration-200 border border-[#4f5869]"
  />
  <CarouselNext
    className="pointer-events-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-[#373e4a] text-gray-200 hover:bg-[#4f5869] rounded-full shadow-lg transition-colors duration-200 border border-[#4f5869]"
  />
</div>


        </Carousel>
      </div>
    </section>
  );
}
