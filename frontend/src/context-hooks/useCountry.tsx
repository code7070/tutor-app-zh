"use client";

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export interface ICountryContext {
  country: string;
  setCountry: (country: string) => void;
  options: { name: string; code: string; flag: string }[];
}

export const CountryContext = createContext<ICountryContext>({
  country: "",
  setCountry: () => {},
  options: [
    { name: "Around the world", code: "all", flag: "🌎" },
    { name: "English", code: "US", flag: "🇬🇧" },
    { name: "Indonesia", code: "ID", flag: "🇮🇩" },
    { name: "China", code: "CN", flag: "🇨🇳" },
    { name: "Spain", code: "ES", flag: "🇪🇸" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "France", code: "FR", flag: "🇫🇷" },
    { name: "South Korea", code: "KR", flag: "🇰🇷" },
  ],
});

export default function useCountry() {
  const context = useContext(CountryContext);
  const [country, setCountry] = useState("all");

  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }

  useEffect(() => {
    if (country) {
      localStorage.setItem("app-country", country);
    }
  }, [country]);

  // Muat negara yang disimpan di localStorage saat komponen pertama kali di-render
  useEffect(() => {
    const savedCountry = localStorage.getItem("app-country");
    if (savedCountry) {
      setCountry(savedCountry);
    }
  }, []);

  return { ...context, setCountry, country };
}
