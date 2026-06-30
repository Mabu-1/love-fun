"use client";

import { motion } from "framer-motion";

const TOTAL_STEPS = 3;

export default function StepShell({ step, eyebrow, title, subtitle, children }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-10 w-full max-w-sm rounded-[2rem] border-2 border-[var(--grape)]/20 bg-white/70 p-8 shadow-xl backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </main>
  );
}
