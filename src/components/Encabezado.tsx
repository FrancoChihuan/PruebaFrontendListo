"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { DashboardUser } from "@/utils/api";

type EncabezadoProps = {
  user: DashboardUser;
  stats: {
    level: number;
    totalCourses: number;
    averageProgress: number;
  };
};

const FRAME_SOURCES = [
  "/marco_header/marco_header_1.svg",
  "/marco_header/marco_header_2.svg",
  "/marco_header/marco_header_3.svg",
  "/marco_header/marco_header_4.svg",
];

export default function Encabezado({ user, stats }: EncabezadoProps) {
  const { apellidos, nombres, correo } = user;
  const { level, totalCourses, averageProgress } = stats;
  const fullName = `${nombres} ${apellidos}`.trim();

  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 px-6 py-7 shadow-[0_0_40px_rgba(14,165,233,0.18)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        {FRAME_SOURCES.map((src, index) => (
          <div key={src} className="relative h-full w-full">
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              className="object-cover mix-blend-screen"
            />
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-500/30 blur-xl" />
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-sky-400/70 shadow-[0_0_25px_rgba(14,165,233,0.35)]">
              <Image
                src="/imagen_perfil.jpg"
                alt="Perfil del estudiante"
                fill
                sizes="80px"
                priority
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-sky-400/80">
              Biblioteca Orbital
            </p>
            <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
              {fullName || "Tripulante Orbital"}
            </h1>
            <p className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span className="rounded-full border border-sky-500/50 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
                Nivel {level}
              </span>
              <span className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
              <span>Academia DC-Orbital • ID-00000000</span>
            </p>
            <p className="text-xs text-slate-500">{correo}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <StatBadge
            title="Cursos activos"
            value={`${totalCourses}`}
            subtitle="Listos para despegar"
          />
          <StatBadge
            title="Progreso promedio"
            value={`${averageProgress}%`}
            subtitle="Alineado con la misión"
            emphasis
          />
        </div>
      </div>
    </motion.section>
  );
}

type StatBadgeProps = {
  title: string;
  value: string;
  subtitle: string;
  emphasis?: boolean;
};

function StatBadge({ title, value, subtitle, emphasis = false }: StatBadgeProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border px-5 py-4 transition-colors duration-300 ${
        emphasis
          ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          : "border-slate-700/60 bg-slate-900/60 text-slate-200"
      }`}
    >
      <div className="pointer-events-none absolute -right-10 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/30 blur-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-slate-400/80">
            {title}
          </p>
          <p className="text-2xl font-semibold text-inherit">{value}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
        <Sparkles className="h-5 w-5 text-sky-300" />
      </div>
    </div>
  );
}
