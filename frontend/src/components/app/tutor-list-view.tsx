"use client";

import { useListViewContext } from "@/context-hooks/list-view.provider";
import { getCountry, getFlagEmoji } from "@/lib/utils";
import { Heart, Quote, ShieldCheck, Star, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function TutorListView() {
  const { data } = useListViewContext();
  return (
    <div className="flex flex-col gap-1">
      {data?.map((i) => (
        <Link
          key={i.documentId}
          href={`/user/tutor/${i.documentId}`}
          className="bg-white flex flex-col items-start gap-3 p-4  hover:bg-app-pink-shade/10"
        >
          <div className="flex items-start gap-4 w-full">
            {/* eslint-disable @next/next/no-img-element */}
            <img className="size-16 rounded-md" alt={i.name} src={i.photo} />
            <div className="relative w-full flex flex-col items-start gap-2 pr-2">
              <div className="text-xl font-bold flex gap-1 flex-wrap items-center">
                {i.name}
                <div>{i.countryOfBirth && getFlagEmoji(i.countryOfBirth)}</div>
                <ShieldCheck className="fill-black text-white" />
              </div>
              <Heart className="absolute -top-1 -right-1" size={18} />
              {
                <Badge className="bg-app-pink-shade/20 text-black hover:bg-app-pink-shade/20 hover:text-black">
                  Super Tutor
                </Badge>
              }
              <div className="grid grid-cols-2 gap-3 w-full">
                <div>
                  <div className="text-lg font-bold">${i.feePerLesson}</div>
                  <div className="text-xs text-app-gray2 font-medium">
                    50-min lesson
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold flex gap-1 items-center">
                    {i.rating}
                    <Star className="fill-black" size={18} />
                  </div>
                  <div className="text-xs text-app-gray2 font-medium">
                    7 reviews
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-bold text-sm line-clamp-2">
            {i.bioHighlight}. {i.bioHighlight}
          </div>

          <div className="text-sm text-app-gray2 space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <User size={16} className="fill-app-gray2" /> 16 Students
              </div>
              <div className="size-1 bg-app-gray2 rounded-full" />
              <div>57 lessons</div>
            </div>
            <div className="flex gap-2 items-center">
              <Quote size={14} className="fill-app-gray2" />
              Speaks{" "}
              {[
                i.nativeLanguage &&
                  `${getCountry().name(i.nativeLanguage)} (Native)`,
                ...i.languagesSpoken
                  .slice(0, 1)
                  .map((l) => `${l.language} (${l.proficiency})`),
                i.languagesSpoken.length > 0 &&
                  `+${i.languagesSpoken.length - 1}`,
              ]
                .filter(Boolean)
                .join(", ")}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
