"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { DatePicker } from "@/components/ui/date-picker";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { IResponseTutorDetail } from "@/lib/response-types";
import PlaceholderTutorDetail from "./placeholder";
import { getFlagEmoji } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSchedule from "./schedule";

async function fetcher(
  id?: string,
): Promise<{ data: IResponseTutorDetail; status: number }> {
  return await (await fetch(`/api/tutor/${id}`)).json();
}

export default function TutorDetailAdminEdit() {
  const params = useParams();

  const { data, isLoading } = useSWR(
    `/tutor/${params.id}`,
    async () => await fetcher(params.id as string),
  );

  const tutor = data?.data.data;

  //
  //
  //

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const timeSlots25 = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const timeSlots50 = [
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const handleTimeSlotToggle = (slot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  if (isLoading) return <PlaceholderTutorDetail />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
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

        <section className="p-4  space-y-6">
          <div>
            <Label htmlFor="introVideo">Intro Video URL</Label>
            <Input id="introVideo" placeholder="https://example.com/video" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isVerified" />
            <Label htmlFor="isVerified">Verified Tutor</Label>
          </div>

          <div>
            <Label htmlFor="fee">Hourly Fee ($)</Label>
            <Input id="fee" type="number" placeholder="50" min="0" />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself..." />
          </div>

          <div>
            <Label htmlFor="nativeLang">Native Language</Label>
            <Input id="nativeLang" placeholder="English" />
          </div>

          <div>
            <Label>Schedule Setting</Label>
            <Tabs defaultValue="25">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="25" className="font-bold">
                  Session 25 minutes
                </TabsTrigger>
                <TabsTrigger value="50" className="font-bold">
                  Session 50 minutes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="25">
                <EditSchedule timeSlots={timeSlots25} />
              </TabsContent>
              <TabsContent value="50">
                <div className="mt-2">
                  {/* <DatePicker date={selectedDate} setDate={setSelectedDate} /> */}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {timeSlots50.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={
                        selectedTimeSlots.includes(slot) ? "default" : "outline"
                      }
                      onClick={() => handleTimeSlotToggle(slot)}
                      className="w-full"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <div className="fixed left-0 bottom-0 right-0 z-50 bg-white px-10 h-20  flex items-center justify-center">
        <Button type="submit" className="w-full">
          Save Settings
        </Button>
      </div>
    </form>
  );
}
