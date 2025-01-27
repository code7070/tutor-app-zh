"use client";

import { useListViewContext } from "@/context-hooks/list-view.provider";
import { Button } from "../ui/button";
import { ArrowDownNarrowWide, Check, Loader } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { TSortTutor } from "@/lib/types";
import { useMemo } from "react";

export default function TutorListSort() {
  const { sort, sortList, setSort, data, isLoading } = useListViewContext();

  const sortName = useMemo(() => {
    return sortList.find((i) => i.value === sort)?.name;
  }, [sort, sortList]);

  return (
    <div className="flex justify-between gap-3 items-center w-full">
      <div className="text-xs font-semibold text-app-gray2">
        {isLoading ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          `${data?.length || 0} tutors`
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            Sort by {sortName} <ArrowDownNarrowWide />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-lg">
          <SheetHeader className="mb-10">
            <SheetTitle className="text-2xl font-bold text-left px-2">
              Sort tutors by
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col pb-20">
            {sortList.map((i) => (
              <div key={i.value} className="border-b">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-between items-center p-4 w-full text-base !h-auto"
                    size="lg"
                    onClick={() => {
                      setSort(i.value as TSortTutor);
                    }}
                  >
                    {i.name} {i.value === sort && <Check />}
                  </Button>
                </SheetClose>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
