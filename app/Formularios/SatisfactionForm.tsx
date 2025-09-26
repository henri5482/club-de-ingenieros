"use client";

import { FormEvent, useState } from "react";

export default function SatisfactionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, telefono, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      // Redirigir a URL externa
      window.location.href =
        "https://www.clubdeingeniero.com/lanzamiento/analisis-cuencas-hidrograficas-qgis";
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      setMessage(`Error al enviar: ${errorMessage}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6 w-full h-full bg-cyan-600 rounded-2xl" >
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Formulario de Inscripción
      </h2>

      {/* Nombre */}
      <div>
        <label className="block mb-1">Nombre Completo </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Tu nombre completo"
          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Correo Electrónico *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          placeholder="ejemplo@correo.com"
          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block mb-1">Ingresa tu WhatsApp para poder enviarte el enlace del Zoom
        </label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          pattern="^[0-9]{9}$"
          maxLength={9}
          minLength={9}
          placeholder="987654321"
          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3"
        />
      </div>

      {/* Comentario */}
      <div>
        <label className="block mb-1">¿Te gustaría adquirir el certificado digital y beneficios VIP?
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}

          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-800 hover:bg-cyan-950 text-white font-bold py-3 px-4 rounded-md"
      >
        {isLoading ? "Enviando..." : "Enviar Inscripción"}
      </button>

      {message && (
        <p
          className={`text-center mt-2 ${isError ? "text-red-400" : "text-green-400"
            }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
