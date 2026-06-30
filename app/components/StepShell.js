"use client";

import { motion } from "framer-motion";

const TOTAL_STEPS = 3;

const FLOATERS = ["💌", "✨", "💫", "🌸"];

export default function StepShell({ step, eyebrow, title, subtitle, children }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      {FLOATERS.map((emoji, i) => (
        <motion.span
          key={emoji}
          className="pointer-events-none absolute select-none text-3xl opacity-70 sm:text-4xl"
          style={{
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? "8%" : "auto",
            right: i % 2 === 1 ? "8%" : "auto",
          }}
          animate={{
            y: [0, -16, 0],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="mb-8 flex items-center gap-3">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i === step - 1 ? 1.3 : 1,
              rotate: i === step - 1 ? [0, -8, 8, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
            className="h-3 w-3 rounded-full"
            style={{
              background:
                i <= step - 1 ? "var(--hotpink)" : "rgba(106,5,114,0.2)",
            }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--grape)]"
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 12 }}
        className="font-display max-w-lg text-center text-3xl font-extrabold leading-tight text-[var(--ink)] sm:text-5xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <p className="font-display mt-3 max-w-sm text-center text-base text-[var(--grape)]/80 sm:text-lg">
          {subtitle}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.15 }}
        whileHover={{ rotate: -0.5 }}
        className="mt-10 w-full max-w-sm rounded-[2rem] border-2 border-[var(--grape)]/20 bg-white/70 p-8 shadow-[6px_6px_0_rgba(106,5,114,0.15)] backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </main>
  );
}
