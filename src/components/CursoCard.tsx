"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import type { DashboardCourse } from "@/utils/api";

type CursoCardProps = {
  course: DashboardCourse;
  index?: number;
};

export default function CursoCard({ course, index = 0 }: CursoCardProps) {
  const {
    title,
    area,
    grade,
    description,
    progress,
    accentColor,
    primaryColor,
    secondaryColor,
    coverUrl,
  } = course;

  const gradient = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
  const roundedProgress = Math.min(100, Math.round(progress));

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02, translateY: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/80 p-[1.5px] shadow-[0_18px_35px_rgba(8,47,73,0.35)] transition-shadow duration-300 hover:shadow-[0_22px_45px_rgba(14,165,233,0.35)]"
    >
      <div className="absolute inset-0 rounded-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-80">
        <div
          className="h-full w-full rounded-3xl"
          style={{ backgroundImage: gradient }}
        />
      </div>

      <div className="relative flex h-full flex-col justify-between rounded-[calc(theme(borderRadius.3xl)-1.5px)] bg-slate-950/90 p-6">
        <div className="absolute inset-0 mix-blend-screen opacity-30">
          <div className="relative h-full w-full">
            <Image
              src="/card/card_curso.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-3">
          <span
            className="self-start rounded-full border border-slate-800/80 bg-black/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-slate-400"
            style={{ color: accentColor }}
          >
            {area}
          </span>

          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
            {coverUrl ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={coverUrl}
                  alt={`Portada de ${title}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60">
                <BookOpenCheck className="h-7 w-7" />
              </div>
            )}
          </div>

          <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
        </div>

        <div className="relative mt-6 flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              <span>{grade}</span>
              <span>{roundedProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800/70">
              <div
                className="h-full rounded-full shadow-[0_0_18px_rgba(59,130,246,0.45)] transition-all duration-700"
                style={{
                  width: `${roundedProgress}%`,
                  backgroundImage: gradient,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200 transition-colors duration-300 hover:border-white/30 hover:bg-white/15"
          >
            <span>Adquirir libro</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
