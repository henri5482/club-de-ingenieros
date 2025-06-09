"use client";

import Image from "next/image";
import Footer from "../footer";
import Navbar from "../navbar";
import { Projects } from "../projects";
import Cursos from "./Cursos";

const CursosAllPage = () => {
  return (
    <div className="md:min-h-screen bg-white">
      <Navbar />
      <div className="py-10">
        <Projects />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Formación de Calidad 
          </h1>
          <div className="flex flex-col items-center justify-center mt-8">
            <Image 
              src="/banner.png" 
              alt="Cursos especializados en ingeniería civil, mecánica, eléctrica e industrial" 
              width={1500} 
              height={500}
              priority
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Componente Cursos */}
        <main>
          <Cursos/>
        </main>

      
      </div>
      <Footer />
    </div>
  );
};

export default CursosAllPage;