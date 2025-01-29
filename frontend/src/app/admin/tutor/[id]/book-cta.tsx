"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarDays, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookSchedule from "./book-schedule";

export default function BookTutorCTA() {
  const [modalType, setModalType] = useState(false);
  const [modalTime, setModalTime] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  function updateParams(shouldAdd = false, paramName: string, value: string) {
    const url = new URL(window.location.href);
    if (shouldAdd) url.searchParams.set(paramName, value);
    else url.searchParams.delete(paramName);
    router.push(url.toString(), { scroll: false });
  }

  function addParams() {
    updateParams(true, "book", "choose");
  }

  // function removeParams() {
  //   updateParams(false, "book", "choose");
  // }

  function addParamsTime() {
    updateParams(true, "book", "schedule");
  }

  // function removeParamsTime() {
  //   updateParams(false, "book", "schedule");
  //   addParams();
  // }

  useEffect(() => {
    if (searchParams.get("book")) {
      if (searchParams.get("book") === "choose") {
        setModalType(true);
        setModalTime(false);
      } else if (searchParams.get("book") === "schedule") {
        setModalTime(true);
        setModalType(false);
      }
    }
  }, [searchParams]);

  return (
    <>
      <Sheet
        open={modalType}
        onOpenChange={(e) => {
          if (e) addParams();
          else router.back();
          setModalType(e);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="app-pink" size="lg">
            Book tutor
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-3xl font-bold text-left">
              When do you want to make your trial?
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 items-start pb-10">
            <Button
              className="!h-auto flex-col items-start gap-1"
              variant="app-outline"
            >
              <Zap className="!size-5" />
              <div className="font-bold">Right now</div>
              <div className="font-medium">
                Book a trial and meet your tutor right now.
              </div>
            </Button>
            <Button
              className="!h-auto flex-col items-start gap-1"
              variant="app-outline"
              onClick={addParamsTime}
            >
              <CalendarDays className="!size-5" />
              <div className="font-bold">Later</div>
              <div className="font-medium">
                Choose a date and time that works for you.
              </div>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <BookSchedule
        isOpen={modalTime}
        onOpenChange={(e) => {
          if (e) addParamsTime();
          else router.back();
          setModalTime(e);
        }}
      />
    </>
  );
}
