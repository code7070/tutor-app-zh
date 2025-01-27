"use client";

import { useUserAppContext } from "@/context-hooks/user.provider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function LangSelector() {
  const { country } = useUserAppContext();

  const countryName = useMemo(() => {
    return country.options.find((i) => i.code === country.country)?.name;
  }, [country]);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex gap-2 items-center w-fit">
          <div className="font-bold text-2xl">{countryName}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={20}
            height={20}
          >
            <path
              id="SVGRepo_iconCarrier"
              className="fill-black size-4"
              d="M6.102 8c-1.074 0-1.648 1.265-.94 2.073l5.52 6.31a1.75 1.75 0 0 0 2.635 0l5.522-6.31c.707-.808.133-2.073-.941-2.073z"
            ></path>
          </svg>
        </div>
      </SheetTrigger>
      <SheetContent withClose={false} className="w-screen">
        <SheetHeader className=" mb-10 items-start">
          <SheetClose asChild>
            <Button size="icon" variant="ghost">
              <ArrowLeft className="!size-8" />
            </Button>
          </SheetClose>
          <SheetTitle className="text-left text-2xl font-bold ">
            Hi there! What would you like to learn?
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {country.options.map((i) => (
            <SheetClose key={i.code} asChild>
              <Button
                variant="outline"
                className="justify-between gap-3 !p-4 !h-auto font-semibold"
                size="lg"
                onClick={() => {
                  country.setCountry(i.code);
                }}
              >
                <div className="flex items-center gap-2">
                  <div>{i.flag}</div>
                  <div>{i.name}</div>
                </div>
                <ChevronRight />
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
