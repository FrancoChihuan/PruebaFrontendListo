// Menu lateral de navegacion
"use client";

import Image from "next/image";
import {
  BadgeHelp,
  BookOpen,
  Gamepad2,
  Home,
  Layers3,
  Rocket,
  Settings,
  UsersRound,
} from "lucide-react";

export const MENU_NAV_ITEMS = [
  { icon: Home, label: "Inicio" },
  { icon: BookOpen, label: "Biblioteca" },
  { icon: Rocket, label: "Misiones" },
  { icon: Layers3, label: "Simulaciones" },
  { icon: Gamepad2, label: "Entretenimiento" },
  { icon: UsersRound, label: "Escuadrón" },
  { icon: BadgeHelp, label: "Soporte" },
];

export default function MenuLateral() {
  return (
    <aside className="relative hidden h-screen w-24 flex-shrink-0 flex-col justify-between overflow-hidden border-r border-slate-800/70 bg-slate-950/90 px-4 py-8 shadow-[0_0_40px_rgba(14,116,144,0.15)] lg:flex">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" />
      <div className="relative flex flex-col items-center gap-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/70 bg-amber-500/10 text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-amber-200">
          DC
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-sky-400/60 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <Image
              src="/imagen_perfil.jpg"
              alt="Avatar del estudiante"
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-100">
              Miguel A. Cotaquispe
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sky-400/80">
              Estudiante
            </p>
          </div>
        </div>

        <nav className="mt-2 flex flex-col items-center gap-3">
          {MENU_NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:border-sky-400/70 hover:text-sky-200 hover:shadow-[0_0_18px_rgba(14,165,233,0.35)]"
              aria-label={label}
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          ))}
        </nav>
      </div>

      <div className="relative flex flex-col items-center gap-3">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/50 bg-amber-500/10 text-amber-200 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/20 hover:text-white hover:shadow-[0_0_18px_rgba(251,191,36,0.45)]"
          aria-label="Ajustes"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}
