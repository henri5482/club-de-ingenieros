"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Import the LinkedIn icon
import {
  PiHandshake, // Generic professional/placeholder icon
} from "react-icons/pi";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description?: string; // Description is optional
  course: string; // Course name (here used as "Mas informacion")
  courseLink: string; // Link to the course/profile
  iconType: string; // New prop to specify which icon to display based on role/link
}

// Function to get the appropriate icon component based on iconType
const getIconComponent = (type: string) => {
  switch (type) {
    case "linkedin":
      return <FaLinkedin size={20} className="text-white" />;
    default:
      return <PiHandshake size={20} className="text-white" />; // Default generic icon
  }
};

const TeamMember: React.FC<TeamMemberProps> = ({
  image,
  name,
  role,
  description,
  course,
  courseLink,
  iconType, // Use iconType instead of courseIcon directly
}) => {
  return (
    <motion.div
      className="flex flex-col h-full bg-opacity-95 rounded-lg shadow-xl overflow-hidden group border border-gray-400"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden w-full h-[240px]"> {/* Fixed height for consistent image size */}
        <Image
          height={400} // Increased height for better quality if scaled
          width={600} // Increased width for better quality if scaled
          src={image}
          alt={name}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-black">
        <div>
          <h3 className="font-semibold text-2xl">{name}</h3>
          <p className="font-medium text-lg mt-1 text-slate-800">{role}</p>
          {description && (
            <p className="text-slate-800 text-sm leading-relaxed mt-3">
              {description}
            </p>
          )}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-900 flex items-center justify-between">
          <Link
            href={courseLink}
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2 text-red-600 hover:text-red-400 transition-colors duration-300 transform hover:translate-x-1"
          >
            <div className="bg-red-600 p-2 rounded-full flex items-center justify-center">
              {getIconComponent(iconType)} {/* Render icon based on iconType */}
            </div>
            <span className="font-medium text-sm">{course}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const teamMembers: TeamMemberProps[] = [
  {
    name: "Oliver Hurtado",
    role: "Ingeniero Civil - Hidráulico",
    image: "/docente01.jpg",
    course: "Mas informacion",
    courseLink: "https://www.linkedin.com/in/oliver-hurtado-704a2b186/",
    iconType: "linkedin", // All links now use LinkedIn icon
  },
  {
    name: "Kevin Navarro Chancan",
    role: "Ingeniero Agrícola ",
    image: "/docente02.jpg",
    course: "Mas informacion",
    courseLink: "https://www.linkedin.com/in/kevin-navarro-chancan-29b834173/",
    iconType: "linkedin", // All links now use LinkedIn icon
  },
  {
    name: "Rubén Ortiz Vásquez",
    role: "Especialista en Recursos Hídricos",
    image: "/docente03.webp",
    course: "Mas informacion",
    courseLink: "https://www.linkedin.com/in/vrortiz/",
    iconType: "linkedin", // All links now use LinkedIn icon
  },
  {
    name: "Gilberth Cruzado Mendoza",
    role: "Ingeniero Hidráulico",
    image: "/docente04.webp",
    course: "Mas informacion",
    courseLink: "https://www.linkedin.com/in/gilberth-eduardo-cruzado-mendoza-a29009124/",
    iconType: "linkedin", // All links now use LinkedIn icon
  },
];

const Founders = () => {
  return (
    <div className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
            NUESTROS EXPERTOS
          </p>
          <h2 className="text-4xl font-extrabold text-red-500 sm:text-5xl lg:text-6xl">
            Nuestros profesores son expertos de la industria
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Founders;