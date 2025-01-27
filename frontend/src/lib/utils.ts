import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function endpointAPI(path: string) {
  const trimmedPath = path.charAt(0) === "/" ? path.slice(1) : path;
  return `${process.env.API_ENDPOINT}/api/${trimmedPath}`;
}

export function getCountry() {
  const countryToCode: { [key: string]: string } = {
    "united states": "US",
    "united kingdom": "GB",
    english: "EN",
    france: "FR",
    germany: "DE",
    italy: "IT",
    spain: "ES",
    portugal: "PT",
    netherlands: "NL",
    belgium: "BE",
    switzerland: "CH",
    denmark: "DK",
    norway: "NO",
    sweden: "SE",
    finland: "FI",
    poland: "PL",
    hungary: "HU",
    romania: "RO",
    czechia: "CZ",
    slovakia: "SK",
    bulgaria: "BG",
    russia: "RU",
    turkey: "TR",
    greece: "GR",
    austria: "AT",
    "czech republic": "CZ",
    latvia: "LV",
    lithuania: "LT",
    estonia: "EE",
    slovenia: "SI",
    croatia: "HR",
    serbia: "RS",
    albania: "AL",
    "bosnia and herzegovina": "BA",
    macedonia: "MK",
    cyprus: "CY",
    ireland: "IE",
    wales: "GB",
    china: "CN",
    indonesia: "ID",
    korea: "KR",
    japan: "JP",
    mexico: "MX",
    malaysia: "MY",
    canada: "CA",
    australia: "AU",
    "south korea": "KR",
  };

  const codeToCountry: { [key: string]: string } = {};
  Object.entries(countryToCode).forEach(([country, code]) => {
    codeToCountry[code.toLowerCase()] = country;
  });

  return {
    name: (code: string): string | undefined => {
      return (
        codeToCountry[code.toLowerCase()]?.charAt(0).toUpperCase() +
        codeToCountry[code.toLowerCase()]?.slice(1)
      );
    },
    code: (name: string): string | undefined => {
      return countryToCode[name.toLowerCase()];
    },
  };
}

export function getFlagEmoji(country: string): string {
  if (country.length === 2) {
    const codePoints = country
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  const code = getCountry().code(country);
  if (!code) return "";

  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
