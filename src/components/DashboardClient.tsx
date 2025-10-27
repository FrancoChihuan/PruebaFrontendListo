"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, Sparkles } from "lucide-react";
import Encabezado from "./Encabezado";
import MenuLateral, { MENU_NAV_ITEMS } from "./MenuLateral";
import CursoCard from "./CursoCard";
import type { DashboardCourse, DashboardUser } from "@/utils/api";

type DashboardClientProps = {
  courses: DashboardCourse[];
  user: DashboardUser;
};

const MODULES = [
  {
    title: "Biblioteca",
    subtitle: "Contenido Orbital",
    border: "border-lime-400/70",
    glow: "shadow-[0_0_22px_rgba(163,230,53,0.45)]",
    accent: "text-lime-300",
  },
  {
    title: "Misiones",
    subtitle: "Exámenes Académicos",
    border: "border-orange-400/80",
    glow: "shadow-[0_0_22px_rgba(249,115,22,0.45)]",
    accent: "text-orange-300",
  },
  {
    title: "Simulaciones",
    subtitle: "Labs Interactivos",
    border: "border-sky-400/80",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.45)]",
    accent: "text-sky-300",
  },
  {
    title: "Entretenimiento",
    subtitle: "Juegos Educativos",
    border: "border-violet-400/80",
    glow: "shadow-[0_0_22px_rgba(167,139,250,0.45)]",
    accent: "text-violet-300",
  },
  {
    title: "Escuadrón",
    subtitle: "Torneos VR",
    border: "border-rose-500/80",
    glow: "shadow-[0_0_22px_rgba(244,63,94,0.45)]",
    accent: "text-rose-300",
  },
];

export default function DashboardClient({ courses, user }: DashboardClientProps) {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("ALL");

  const areaOptions = useMemo(() => {
    const recognizedAreas = [
      "CIENCIA Y TECNOLOGÍA",
      "MATEMÁTICA",
    ];

    const availableAreas = new Set(
      courses
        .map((course) => course.area?.toUpperCase().trim())
        .filter(Boolean) as string[]
    );

    return recognizedAreas.filter((area) => availableAreas.has(area));
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesArea =
        selectedArea === "ALL" ||
        course.area?.toUpperCase().trim() === selectedArea;

      if (!normalizedSearch) {
        return matchesArea;
      }

      const target = `${course.title} ${course.area} ${course.grade}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const searchValue = normalizedSearch
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return matchesArea && target.includes(searchValue);
    });
  }, [courses, search, selectedArea]);

  const averageProgress = useMemo(() => {
    if (!courses.length) {
      return 0;
    }
    const total = courses.reduce((acc, course) => acc + course.progress, 0);
    return Math.round(total / courses.length);
  }, [courses]);

  const computedLevel = Math.max(1, Math.round(averageProgress / 20) + 1);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      <MenuLateral />

      <div className="relative flex w-full flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.1),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(167,139,250,0.16),_transparent_50%)]" />

        <div className="relative flex-1 overflow-x-hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-28 pt-10 sm:px-6 lg:px-10">
            <Encabezado
              user={user}
              stats={{
                level: computedLevel,
                totalCourses: courses.length,
                averageProgress,
              }}
            />

            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      aria-label="Buscar cursos por nombre, área o grado"
                      placeholder="Buscar módulos orbitales..."
                      className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/60 px-11 py-3 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-sky-400/80 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.20)]"
                    />
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Filter className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <select
                      value={selectedArea}
                      onChange={(event) => setSelectedArea(event.target.value)}
                      aria-label="Filtrar por área académica"
                      className="w-full appearance-none rounded-2xl border border-slate-700/60 bg-slate-900/60 px-11 py-3 text-sm text-slate-100 outline-none transition-all duration-300 focus:border-sky-400/80 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.20)]"
                    >
                      <option value="ALL">Ver todo</option>
                      {areaOptions.map((areaOption) => (
                        <option key={areaOption} value={areaOption}>
                          {areaOption}
                        </option>
                      ))}
                    </select>
                    <Sparkles className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {MODULES.map((module) => (
                  <motion.div
                    key={module.title}
                    whileHover={{ translateY: -6 }}
                    className={`flex flex-col gap-1 rounded-2xl border bg-slate-950/70 px-4 py-5 text-center text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-slate-900/70 ${module.border} ${module.glow}`}
                  >
                    <span className={`text-xs tracking-[0.35em] ${module.accent}`}>
                      {module.title}
                    </span>
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-400">
                      {module.subtitle}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <header className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-slate-100">
                  Cursos disponibles
                </h2>
                <p className="text-sm text-slate-400">
                  {filteredCourses.length} módulo(s) listos para tu siguiente misión.
                </p>
              </header>

              {filteredCourses.length ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCourses.map((course, index) => (
                    <CursoCard key={course.id} course={course} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/70 px-8 py-16 text-center text-slate-400">
                  <Search className="h-10 w-10 text-slate-600" />
                  <p className="text-lg font-medium text-slate-200">
                    Ningún curso coincide con tu búsqueda.
                  </p>
                  <p className="text-sm text-slate-500">
                    Ajusta los filtros o prueba con otro término para continuar la misión.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        <nav className="fixed bottom-4 left-1/2 z-40 flex w-[92%] max-w-lg -translate-x-1/2 items-center justify-around rounded-3xl border border-slate-800/70 bg-slate-950/80 px-6 py-3 text-slate-400 shadow-[0_18px_40px_rgba(8,47,73,0.4)] backdrop-blur lg:hidden">
          {MENU_NAV_ITEMS.slice(0, 5).map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex flex-col items-center gap-1 text-xs transition-all duration-300 hover:text-sky-300"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[0.6rem] uppercase tracking-[0.3em]">
                {label.slice(0, 4).toUpperCase()}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
