"use client";

import Image from "next/image";
import { useState } from "react";
import SatisfactionForm from "./SatisfactionForm";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="relative min-h-screen  text-white">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/fondoformulario.webp" // pon tu imagen en public/
          alt="Fondo curso"
          fill
          className="object-cover brightness-50"
        />
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo01.png" // tu logo en public/
            alt="Logo Empresa"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">
          CURSO GRATUITO <br />
          MODELAMIENTO 1D CON HEC RAS
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-2xl mb-8 text-slate-200">
          REGÍSTRATE PARA PARTICIPAR DE FORMA GRATUITA EN LAS TRANSMISIONES EN VIVO
        </p>

        {/* Botón */}
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg font-semibold transition"
        >
          INSCRÍBETE GRATIS
        </button>
      </div>

      {/* Modal con formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-teal-700 rounded-xl shadow-lg max-w-xl w-full relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-slate-300 hover:text-white text-xl"
            >
              ✕
            </button>
            <SatisfactionForm />
          </div>
        </div>
      )}
    </main>
  );
}
