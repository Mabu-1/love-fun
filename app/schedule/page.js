"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLove } from "../LoveContext";
import StepShell from "../components/StepShell";

export default function SchedulePage() {
  const router = useRouter();
  const { date, time, update } = useLove();

  const todayISO = new Date().toISOString().split("T")[0];

  function handleNext(e) {
    e.preventDefault();
    if (!date || !time) return;
    router.push("/details");
  }

  return (
    <StepShell
      step={1}
      eyebrow="step one of three"
      title={
        <>
          when are we doing{" "}
          <span className="scribble-underline text-[var(--hotpink)]">this</span>?
        </>
      }
      subtitle="pick a day and time that's all ours"
    >
      <form onSubmit={handleNext} className="flex w-full flex-col gap-6">
        <motion.label
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display flex flex-col gap-2 text-left text-sm font-bold text-[var(--grape)]"
        >
          the day
          <input
            type="date"
            required
            min={todayISO}
            value={date}
            onChange={(e) => update({ date: e.target.value })}
            className="wiggle-border border-2 border-[var(--grape)] bg-white px-5 py-4 text-lg font-semibold text-[var(--ink)] outline-none focus:border-[var(--hotpink)]"
          />
        </motion.label>

        <motion.label
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display flex flex-col gap-2 text-left text-sm font-bold text-[var(--grape)]"
        >
          the time
          <input
            type="time"
            required
            value={time}
            onChange={(e) => update({ time: e.target.value })}
            className="wiggle-border border-2 border-[var(--grape)] bg-white px-5 py-4 text-lg font-semibold text-[var(--ink)] outline-none focus:border-[var(--hotpink)]"
          />
        </motion.label>

        <motion.button
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="font-display mt-2 rounded-full bg-[var(--hotpink)] px-8 py-4 text-xl font-extrabold text-white shadow-[5px_5px_0_var(--grape)] transition-shadow hover:shadow-[2px_2px_0_var(--grape)] disabled:opacity-40"
        >
          lock it in →
        </motion.button>

        {date && time && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display rounded-2xl bg-[var(--sunshine)]/40 px-4 py-3 text-center text-sm font-semibold text-[var(--grape)]"
          >
            ✨ {date} at {time}, it's a date ✨
          </motion.p>
        )}
      </form>
    </StepShell>
  );
}
