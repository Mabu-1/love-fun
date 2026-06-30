"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLove } from "../LoveContext";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "pm" : "am";
  const hour12 = ((hour + 11) % 12) + 1;
  return `${hour12}:${m} ${suffix}`;
}

export default function RevealPage() {
  const { date, time, food, location } = useLove();
  const [confettiReady, setConfettiReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled) return;
      setConfettiReady(true);
      const colors = ["#ff3d7f", "#ffd23f", "#4ecdc4", "#6a0572"];
      const duration = 2500;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();

      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasPlan = date && time && food && location;
  const HEARTS = ["💕", "💖", "💗", "💝", "💞"];

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {HEARTS.map((h, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none text-2xl opacity-60 sm:text-3xl"
          style={{ left: `${10 + i * 18}%`, top: "-10%" }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 360] }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
        >
          {h}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 10, delay: 0.1 }}
        className="mb-4 text-6xl"
      >
        💖
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display max-w-xl text-3xl font-extrabold leading-tight text-[var(--ink)] sm:text-5xl"
      >
        it's official, we have a{" "}
        <span className="scribble-underline text-[var(--hotpink)]">date</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-display mt-3 max-w-md text-base text-[var(--grape)]/80 sm:text-lg"
      >
        I've been smiling about this all day. can't wait to see you.
      </motion.p>

      {hasPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="wiggle-border mt-10 w-full max-w-sm border-2 border-[var(--grape)] bg-white/90 p-8 text-left shadow-[6px_6px_0_var(--hotpink)]"
        >
          <p className="font-display mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--hotpink)]">
            the plan
          </p>
          <ul className="font-display flex flex-col gap-3 text-lg font-semibold text-[var(--ink)]">
            <li>📅 {formatDate(date)}</li>
            <li>🕒 {formatTime(time)}</li>
            <li>🍽️ {food}</li>
            <li>📍 {location}</li>
          </ul>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="font-display mt-10 text-sm text-[var(--grape)]/60"
      >
        see you then 🥰
      </motion.p>
    </main>
  );
}
