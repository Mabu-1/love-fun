"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LoveContext = createContext(null);

const DEFAULT_STATE = {
  saidYes: false,
  date: "",
  time: "",
  food: "",
  location: "",
};

export function LoveProvider({ children }) {
  const [data, setData] = useState(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("love-plan");
      if (stored) setData({ ...DEFAULT_STATE, ...JSON.parse(stored) });
    } catch (e) {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("love-plan", JSON.stringify(data));
  }, [data, hydrated]);

  function update(partial) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  return (
    <LoveContext.Provider value={{ ...data, update }}>
      {children}
    </LoveContext.Provider>
  );
}

export function useLove() {
  const ctx = useContext(LoveContext);
  if (!ctx) throw new Error("useLove must be used inside LoveProvider");
  return ctx;
}
