// components/Cursos.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi"; // Importa FiChevronDown
import { Curso } from "../types/curso";

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos los cursos"); // Estado para la categoría seleccionada, inicializado a 'Todos los cursos'

  // Función de filtrado combinada para búsqueda y categoría
  const filterCourses = (term: string, category: string, cursosList: Curso[]) => {
    let currentFiltered = cursosList;

    // 1. Filtrar por categoría primero (si no es 'Todos los cursos')
    if (category && category !== "Todos los cursos") {
      currentFiltered = currentFiltered.filter(
        (curso) => curso.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // 2. Luego, aplicar el filtro de búsqueda si hay un término
    if (term.trim()) {
      const lowerTerm = term.toLowerCase();
      currentFiltered = currentFiltered.filter((curso) => {
        return (
          curso.name?.toLowerCase().includes(lowerTerm) ||
          curso.descripcion?.toLowerCase().includes(lowerTerm) ||
          curso.category?.toLowerCase().includes(lowerTerm) ||
          curso.learnings?.some(learning =>
            learning?.toLowerCase().includes(lowerTerm)
          ) ||
          curso.profesores?.some(profesor =>
            profesor.nombre?.toLowerCase().includes(lowerTerm)
          )
        );
      });
    }

    return currentFiltered;
  };

  // Manejar cambios en el input del buscador
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = filterCourses(value, selectedCategory, cursos);
    setFilteredCursos(filtered);
  };

  // Manejar cambio de categoría desde el selector
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    // Vuelve a aplicar el filtro con la nueva categoría y el término de búsqueda actual
    const filtered = filterCourses(searchTerm, category, cursos);
    setFilteredCursos(filtered);
  };

  // Limpiar el buscador y restablecer todos los cursos (y categoría a 'Todos los cursos')
  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("Todos los cursos"); // También resetea la categoría a "Todos los cursos"
    // Al limpiar la búsqueda, re-filtra usando el término vacío y la categoría 'Todos los cursos'
    const filtered = filterCourses("", "Todos los cursos", cursos);
    setFilteredCursos(filtered);
  };

  // Cargar los datos iniciales de los cursos
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/coursesall.json");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCursos(data);
        setFilteredCursos(data); // Inicialmente, los cursos filtrados son todos los cursos
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error al cargar los cursos"));
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  // Obtener categorías únicas dinámicamente de los cursos
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    cursos.forEach((curso) => {
      if (curso.category) {
        uniqueCategories.add(curso.category);
      }
    });
    return ["Todos los cursos", ...Array.from(uniqueCategories).sort()]; // 'Todos los cursos' y luego las categorías ordenadas
  }, [cursos]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="container mx-auto max-sm:px-4 py-12 bg-white rounded-lg "> {/* Fondo blanco para el contenedor principal */}
      <h2 className=" text-3xl md:text-5xl font-extrabold text-center text-red-600 mb-6 md:mb-16 drop-shadow-lg">
        Explora Nuestros Cursos Exclusivos
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center px-4"> {/* Añadido padding horizontal */}
        {/* Barra de búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          onChange={handleSearchChange}
          onClear={clearSearch}
        />

        {/* Selector de categorías */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Muestra el número de resultados */}
      <SearchResults count={filteredCursos.length} searchTerm={searchTerm} />

      {/* La grilla de cursos */}
      <CourseGrid cursos={filteredCursos} searchTerm={searchTerm} />
    </div>
  );
};

// --- Componentes Separados ---

const LoadingMessage = () => (
  <div className="text-center text-gray-800 py-10 text-2xl font-semibold"> {/* Cambiado a gris oscuro */}
    Cargando cursos...
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-red-600 py-10 text-2xl font-semibold">
    Error: {message}
  </div>
);

const SearchBar = ({
  searchTerm,
  onChange,
  onClear
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) => (
  <div className="relative w-full max-w-md">
    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Icono gris más oscuro */}
    <input
      type="text"
      placeholder="Buscar cursos..."
      className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm"
      value={searchTerm}
      onChange={onChange}
      aria-label="Buscar cursos"
    />
    {searchTerm && (
      <button
        onClick={onClear}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
        aria-label="Limpiar búsqueda"
      >
        <FiX size={20} />
      </button>
    )}
  </div>
);

// Nuevo componente para el selector de categorías
const CategorySelector = ({
  categories,
  selectedCategory,
  onChange
}: {
  categories: string[];
  selectedCategory: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative w-full max-w-sm">
    <select
      value={selectedCategory}
      onChange={onChange}
      className="block w-full appearance-none bg-white border border-gray-300 text-gray-800 py-3 pl-5 pr-10 rounded-full leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer shadow-sm"
      aria-label="Filtrar por categoría"
    >
      {categories.map((category) => (
        <option key={category} value={category === "Todos los cursos" ? "Todos los cursos" : category}>
          {category}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
      <FiChevronDown className="h-5 w-5" />
    </div>
  </div>
);

const SearchResults = ({ count, searchTerm }: { count: number; searchTerm: string }) => (
  searchTerm || count === 0 ? ( // Mostrar siempre si no hay resultados o si hay término de búsqueda
    <div className="text-center text-gray-600 mb-6 font-medium">
      {count} {count === 1 ? "curso encontrado" : "cursos encontrados"}
    </div>
  ) : null
);

const CourseGrid = ({ cursos, searchTerm }: { cursos: Curso[]; searchTerm: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 2xl:gap-8 px-4"> {/* Aumentado el gap y añadido padding */}
    {cursos.length > 0 ? (
      cursos.map((curso) => <CourseCard key={curso.id} curso={curso} />)
    ) : (
      <div className="col-span-full text-center text-gray-600 text-xl py-10">
        {searchTerm
          ? "No se encontraron cursos con ese criterio de búsqueda."
          : "No hay cursos disponibles para esta categoría."}
      </div>
    )}
  </div>
);

const CourseCard = ({ curso }: { curso: Curso }) => {
  const finalPrice = curso.precio * (1 - (curso.descuento || 0));

  return (
    <Link href={`/cursosall/${curso.slug}`} passHref>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2 cursor-pointer group border border-gray-200"> {/* Fondo blanco y sombra blanca, borde sutil */}
        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden"> {/* Fondo más claro para la imagen */}
          <Image
            src={curso.src}
            alt={curso.name || "Curso"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {curso.descuento && curso.descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -{Math.round(curso.descuento * 100)}%
            </span>
          )}
        </div>

        <div className="p-6 flex-grow flex flex-col"> {/* Padding ajustado */}
          <span className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2"> {/* Rojo en la categoría */}
            {curso.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300"> {/* Rojo al hover */}
            {curso.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3"> {/* Texto gris más oscuro */}
            {curso.descripcion}
          </p>

          {curso.details && (
            <div className="text-gray-500 text-xs space-y-2 mb-5 border-t border-gray-200 pt-4"> {/* Borde y texto más claros */}
              <p>
                <span className="font-semibold text-gray-700">Fecha:</span>{" "}
                {curso.details.date}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Duración:</span>{" "}
                {curso.details.duration}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Nivel:</span>{" "}
                {curso.details.level}
              </p>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="text-2xl font-extrabold text-red-600"> {/* Precio en rojo */}
              S/{finalPrice.toFixed(2)}
            </p>
            {curso.descuento && curso.descuento > 0 && (
              <p className="text-lg text-gray-500 line-through"> {/* Precio anterior en gris */}
                S/{curso.precio.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cursos;