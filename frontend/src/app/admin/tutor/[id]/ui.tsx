"use client";

import { Button } from "@/components/ui/button";
import { IResponseTutorDetail } from "@/lib/response-types";
import { getCountry, getFlagEmoji } from "@/lib/utils";
import { BadgeCheck, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import PlaceholderTutorDetail from "./placeholder";
import { Badge } from "@/components/ui/badge";
import BookTutorCTA from "./book-cta";
import VideoIntro from "@/components/app/video";

async function fetcher(
  id?: string,
): Promise<{ data: IResponseTutorDetail; status: number }> {
  return await (await fetch(`/api/tutor/${id}`)).json();
}

export default function TutorDetailUI() {
  const params = useParams();

  const { data, isLoading } = useSWR(
    `/tutor/${params.id}`,
    async () => await fetcher(params.id as string),
  );

  const tutor = data?.data.data;

  if (isLoading) return <PlaceholderTutorDetail />;

  return (
    <div>
      <section className="relative">
        {tutor?.introVideo && <VideoIntro src={tutor.introVideo} />}
        {tutor?.introVideo}
      </section>
      <section className="px-4">
        <div className="py-4 flex gap-3 items-start border-b">
          <div className="size-20 rounded-lg overflow-hidden">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              alt={tutor?.name}
              src={tutor?.photo}
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{tutor?.name}</h2>
            <div className="text-sm text-app-gray2">
              Country of birth {tutor?.countryOfBirth}{" "}
              {tutor?.countryOfBirth && getFlagEmoji(tutor.countryOfBirth)}
            </div>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="py-4 border-b  flex gap-1 items-center">
          {tutor?.isVerified && (
            <div className="flex flex-1 flex-col items-center">
              <ShieldCheck
                size={32}
                className="fill-app-black stroke-app-white"
              />
              <div className="text-xs text-app-gray2 font-medium">Verified</div>
            </div>
          )}
          {tutor?.rating && (
            <div className="flex flex-1 flex-col items-center">
              <div className="flex items-center gap-1">
                <Star size={28} className="fill-app-black stroke-app-white" />
                <span className="font-black text-2xl">{tutor.rating}</span>
              </div>
              <div className="text-xs text-app-gray2 font-medium">Rating</div>
            </div>
          )}
          {tutor?.feePerLesson && (
            <div className="flex flex-1 flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="font-black text-2xl">$</span>
                <span className="font-black text-2xl">
                  {tutor.feePerLesson}
                </span>
              </div>
              <div className="text-xs text-app-gray2 font-medium">
                per lesson
              </div>
            </div>
          )}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="font-black text-2xl">33</span>
            </div>
            <div className="text-xs text-app-gray2 font-medium">reviews</div>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="font-black text-2xl">689</span>
            </div>
            <div className="text-xs text-app-gray2 font-medium">lessons</div>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="py-4">
          <div className="flex w-full items-start gap-4">
            <BadgeCheck className="fill-app-black text-app-white" size={28} />
            <div>
              <div className="font-bold">100% refundable</div>
              <div>
                Try another tutor for free or get a refund of your unused
                balance.
              </div>
            </div>
          </div>
          <div className="flex w-full items-start gap-4">
            <TrendingUp size={28} />
            <div>
              <div className="font-bold">High demand</div>
              <div>n lessons booked in the last 48 hours</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 bg-white">
        <div className="py-4 border-b space-y-4">
          <h2 className="text-2xl font-bold">About me</h2>
          {tutor?.bioHighlight && (
            <div className="font-medium text-sm">{tutor.bioHighlight}</div>
          )}
          {tutor?.bioLong && <div>{tutor.bioLong}</div>}
          <Button variant="app-outline" size="lg">
            Read more
          </Button>
        </div>
      </section>
      <section className="px-4 bg-white">
        <div className="py-4 border-b">
          <div className="font-bold mb-3 text-xl">I speak</div>
          <div className="space-y-1">
            {tutor?.nativeLanguage && (
              <div className="flex gap-2">
                {getCountry().name(tutor.nativeLanguage)}{" "}
                <Badge variant="greenish">Native</Badge>
              </div>
            )}
            {tutor?.languagesSpoken?.map((i) => (
              <LanguageSpoken key={i.id} {...i} />
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 bg-white">
        <div className="py-4">
          <Button variant="app-outline-black" size="lg">
            See my schedule
          </Button>
          <div className="mt-10 space-y-3">
            <div className="flex gap-2 items-center text-2xl font-bold">
              <div className="flex items-center">
                <Star className="fill-black" /> {tutor?.rating}
              </div>
              <div>&#8212;</div>
              <div>33 reviews</div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-3 w-fit ">
                {[1, 2, 3, 4].map((i) => (
                  <Review key={i} />
                ))}
              </div>
            </div>
            <Button variant="app-outline" size="lg">
              Show all 33 reviews
            </Button>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="py-4 min-h-20 flex flex-col items-center justify-center">
          <Button variant="link" className="underline font-semibold mx-auto">
            Report an issue
          </Button>
        </div>
      </section>
      <div
        className="fixed left-0 bottom-0 right-0 h-20 z-50 bg-white p-4"
        style={{ boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.1)" }}
      >
        <BookTutorCTA />
      </div>
    </div>
  );
}

function LanguageSpoken(
  item: IResponseTutorDetail["data"]["languagesSpoken"][0],
) {
  const i = item;
  let variant: "blueish" | "yellowish" | "greenish" = "yellowish";
  let wording = "Native";
  if (i.proficiency.toLowerCase().includes("native")) {
    variant = "greenish";
    wording = "Native";
  } else if (i.proficiency === "B2" || i.proficiency === "B1") {
    variant = "blueish";
    wording = "Intermediate";
  } else if (i.proficiency === "A2" || i.proficiency === "A1") {
    variant = "yellowish";
    wording = "Advanced";
  }

  return (
    <div key={i.id} className="flex gap-2">
      <span>{i.language}</span>
      <Badge variant={variant}>{wording}</Badge>
    </div>
  );
}

function Review() {
  return (
    <div className="p-4 border rounded-md w-[calc(100vw-20vw)]  flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-md bg-gray-300" />
        <div className="space-y-1">
          <div className="flex gap-1 items-center">
            <div className="font-bold">Kasia</div>
            <div>🇮🇩</div>
          </div>
          <div>1 week ago</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} className="fill-black" />
        ))}
      </div>
      <div>
        The best teacher I ever had! Lessons are very professional and alos
        joyful.
      </div>
    </div>
  );
}
