"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLove } from "../LoveContext";
import StepShell from "../components/StepShell";

const FOODS = [
  "🍕 pizza",
  "🍣 sushi",
  "🍔 burgers",
  "🍝 pasta",
  "🌮 tacos",
  "🍜 ramen",
  "🥗 something healthy lol",
  "🍰 just dessert",
];

export default function DetailsPage() {
  const router = useRouter();
  const { food, location, update } = useLove();

  function handleNext(e) {
    e.preventDefault();
    if (!food || !location) return;
    router.push("/reveal");
  }

  return (
    <StepShell
      step={2}
      eyebrow="step two of three"
      title={
        <>
          food &{" "}
          <span className="scribble-underline text-[var(--hotpink)]">place</span>
        </>
      }
      subtitle="the important logistics"
    >
      <form onSubmit={handleNext} className="flex w-full flex-col gap-6">
        <div className="text-left">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-bold text-[var(--grape)]">
              what are we eating?
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                update({ food: FOODS[Math.floor(Math.random() * FOODS.length)] })
              }
              className="font-display rounded-full bg-[var(--sky)]/30 px-3 py-1 text-xs font-bold text-[var(--grape)]"
            >
              🎲 surprise me
            </motion.button>
          </div>
          <div className="flex flex-wrap gap-2">
            {FOODS.map((f, i) => {
              const active = food === f;
              return (
                <motion.button
                  type="button"
                  key={f}
                  onClick={() => update({ food: f })}
                  whileHover={{ scale: 1.06, rotate: i % 2 ? 2 : -2 }}
                  whileTap={{ scale: 0.94 }}
                  className={`font-display rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                    active
                      ? "border-[var(--hotpink)] bg-[var(--hotpink)] text-white"
                      : "border-[var(--grape)]/30 bg-white text-[var(--ink)] hover:border-[var(--hotpink)]"
                  }`}
                >
                  {f}
                </motion.button>
              );
            })}
          </div>
        </div>

        <label className="font-display flex flex-col gap-2 text-left text-sm font-bold text-[var(--grape)]">
          where at?
          <input
            type="text"
            required
            placeholder="that one cute spot downtown..."
            value={location}
            onChange={(e) => update({ location: e.target.value })}
            className="wiggle-border border-2 border-[var(--grape)] bg-white px-5 py-4 text-base font-semibold text-[var(--ink)] outline-none placeholder:font-normal placeholder:text-[var(--ink)]/40 focus:border-[var(--hotpink)]"
          />
        </label>

        <motion.button
          whileHover={{ scale: 1.04, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="font-display mt-2 rounded-full bg-[var(--hotpink)] px-8 py-4 text-xl font-extrabold text-white shadow-[5px_5px_0_var(--grape)] transition-shadow hover:shadow-[2px_2px_0_var(--grape)]"
        >
          almost there →
        </motion.button>
      </form>
    </StepShell>
  );
}
