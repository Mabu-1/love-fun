"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLove } from "./LoveContext";

const NO_PHRASES = [
  "no",
  "nope",
  "nuh-uh",
  "are you sure?",
  "really??",
  "think again",
  "last chance",
  "you missed me",
  "ok fine, almost",
];

const TILTS = [-6, -3, 0, 3, 6, -4, 4];
const EDGE_PADDING = 16;

export default function AskPage() {
  const router = useRouter();
  const { update } = useLove();
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPos, setNoPos] = useState(null);
  const [caught, setCaught] = useState(false);
  const noButtonRef = useRef(null);

  const surrendered = dodgeCount >= NO_PHRASES.length - 1;

  function dodge() {
    if (caught) return;
    const btn = noButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const maxLeft = Math.max(window.innerWidth - w - EDGE_PADDING, EDGE_PADDING);
    const maxTop = Math.max(window.innerHeight - h - EDGE_PADDING, EDGE_PADDING);
    const left = EDGE_PADDING + Math.random() * (maxLeft - EDGE_PADDING);
    const top = EDGE_PADDING + Math.random() * (maxTop - EDGE_PADDING);
    setNoPos({ left, top });
    setDodgeCount((c) => Math.min(c + 1, NO_PHRASES.length - 1));
  }

  function handleYes() {
    setCaught(true);
    update({ saidYes: true });
    setTimeout(() => router.push("/schedule"), 600);
  }

  // keep the dodged button on-screen if the window gets resized/rotated
  useEffect(() => {
    function handleResize() {
      setNoPos((pos) => {
        if (!pos) return pos;
        const btn = noButtonRef.current;
        if (!btn) return pos;
        const rect = btn.getBoundingClientRect();
        const maxLeft = Math.max(window.innerWidth - rect.width - EDGE_PADDING, EDGE_PADDING);
        const maxTop = Math.max(window.innerHeight - rect.height - EDGE_PADDING, EDGE_PADDING);
        return {
          left: Math.min(pos.left, maxLeft),
          top: Math.min(pos.top, maxTop),
        };
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--grape)]"
      >
        an extremely important question
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="font-display max-w-xl text-4xl font-extrabold leading-tight text-[var(--ink)] sm:text-6xl"
      >
        will you go on a{" "}
        <span className="scribble-underline text-[var(--hotpink)]">date</span>{" "}
        with me?
      </motion.h1>

      <p className="font-display mt-4 max-w-sm text-base text-[var(--grape)]/80 sm:text-lg">
        {surrendered && !caught
          ? "ok the no button gave up, just tap yes 😭"
          : "pick one. (one of these is a trap)"}
      </p>

      <div className="relative mt-16 flex w-full max-w-md items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleYes}
          className="wiggle-border font-display relative z-10 rounded-[2rem] bg-[var(--hotpink)] px-10 py-5 text-2xl font-extrabold text-white shadow-[6px_6px_0_var(--grape)] transition-shadow hover:shadow-[3px_3px_0_var(--grape)] sm:text-3xl"
        >
          {caught ? "yay!! 🎉" : "YES"}
        </motion.button>

        <motion.button
          ref={noButtonRef}
          animate={
            noPos
              ? { left: noPos.left, top: noPos.top, rotate: TILTS[dodgeCount % TILTS.length] }
              : { rotate: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={noPos ? { position: "fixed", zIndex: 20 } : undefined}
          onMouseEnter={surrendered ? undefined : dodge}
          onTouchStart={(e) => {
            if (surrendered) return;
            e.preventDefault();
            dodge();
          }}
          onClick={surrendered ? handleYes : (e) => e.preventDefault()}
          className="font-display rounded-2xl border-2 border-dashed border-[var(--grape)] bg-white/90 px-8 py-4 text-xl font-bold text-[var(--grape)] shadow-md sm:text-2xl"
        >
          {surrendered ? "fine, YES" : NO_PHRASES[dodgeCount]}
        </motion.button>
      </div>

      <p className="font-display absolute bottom-8 text-xs text-[var(--grape)]/50">
        psst, the no button is camera-shy 🙈
      </p>
    </main>
  );
}
