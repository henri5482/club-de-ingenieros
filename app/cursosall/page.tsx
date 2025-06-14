"use client";

import Footer from "../footer";
import Navbar from "../navbar";
import { Projects } from "../projects";
import CommunityBanner from "./CommunityBanner";
import Cursos from "./Cursos";

const CursosAllPage = () => {
  return (
    <div className="md:min-h-screen bg-white">
      <Navbar />
      <div className="py-10">
        <Projects />

         <CommunityBanner />
        {/* Componente Cursos */}
        <main>
          <Cursos />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CursosAllPage;