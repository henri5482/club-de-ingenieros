"use client"; // This directive is necessary for client-side components in Next.js 13+ App Router

import Image from 'next/image';
import { useEffect, useState } from 'react';

const certificateImages = [
  '/certificadodelante.webp',
  '/certificadoatras.webp',
];

const Certificado = () => {
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  useEffect(() => {
    const certTimer = setInterval(() => {
      setCurrentCertIndex((prevIndex) => (prevIndex + 1) % certificateImages.length);
    }, 4000); // Changed to 4 seconds (4000 milliseconds) for a slightly quicker transition

    return () => {
      clearInterval(certTimer);
    };
  }, []);

  return (
    <section className='bg-white py-20 lg:py-28'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Title: Larger and more impactful */}
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#26374c] mb-6 md:mb-8 leading-tight'>
          ¡Comparte tus Logros <span className="text-red-600">con el Mundo</span>!
        </h2>
        {/* Description: Simplified to highlight both options */}
        <p className='text-xl md:text-2xl text-[#26374c] mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed'>
          Obtén tu <strong className="text-red-600">certificado online</strong> con un enlace único y una
          <strong className="text-red-600"> versión física de alta calidad</strong>,
          perfectos para destacar tu trayectoria profesional donde y con quien quieras.
        </p>

        {/* Certificate Display Area (Refined Frame) */}
        <div className='relative w-full max-w-3xl mx-auto p-4'>
          <div className='relative w-full pt-[70%] bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-950 flex items-center justify-center'>
            <div className='absolute top-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-700 rounded-full'></div>

            <div className='absolute inset-0 p-4 flex items-center justify-center'>
              {certificateImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Certificado ${index === 0 ? 'frente' : 'reverso'}`}
                  width={900}
                  height={600}
                  className={`absolute w-[90%] h-[90%] object-contain rounded-lg border border-gray-300 transition-opacity duration-1000 ease-in-out ${
                    index === currentCertIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificado;