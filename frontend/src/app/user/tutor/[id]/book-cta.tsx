"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarDays, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BookSchedule from "./book-schedule";
import {
  ICreateAppointment,
  IResponseTutorSchedule,
} from "@/app/api/tutor/[id]/schedule/route";
import Link from "next/link";
import { toast } from "sonner";
import { IResponseAppointmentDetail } from "@/app/api/appointment/[id]/route";
import { format } from "date-fns";

export default function BookTutorCTA({
  schedule,
}: {
  schedule?: IResponseTutorSchedule;
}) {
  const [modalType, setModalType] = useState(false);
  const [modalTime, setModalTime] = useState(false);
  const [success, setSuccess] = useState<boolean | IResponseAppointmentDetail>(
    false,
  );

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

  async function handleSuccess(data: {
    data: ICreateAppointment;
    status: number;
  }) {
    const detail = (await fetch(
      `/api/appointment/${data.data.appointment.data.documentId}`,
    ).then((res) => res.json())) as IResponseAppointmentDetail;
    setSuccess(detail);
    toast.success("Booking success");
  }

  const appointmentData: null | IResponseAppointmentDetail["data"]["data"] =
    useMemo(() => {
      if (success && typeof success !== "boolean") return success.data.data;
      return null;
    }, [success]);

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
        schedule={schedule}
        onSuccess={handleSuccess}
        onOpenChange={(e) => {
          if (e) addParamsTime();
          else router.back();
          setModalTime(e);
        }}
      />
      <Sheet
        open={appointmentData?.documentId ? true : false}
        onOpenChange={(e) => setSuccess(e)}
      >
        <SheetContent
          side="bottom"
          className="h-screen bg-app-pink-shade z-[99]"
          withClose={false}
        >
          <div className="flex flex-col justify-between h-full">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-4xl font-bold text-left w-full">
                We&apos;ll tell {appointmentData?.tutor.name} you&apos;re ready
                to start!
              </SheetTitle>
              {appointmentData && (
                <SheetDescription className="text-left text-black font-medium text-lg">
                  Your lesson is{" "}
                  {format(
                    `${appointmentData?.schedule.date} ${appointmentData?.schedule.time.substring(0, 8)}`,
                    "EEEE, MMMM d, HH:mm",
                  )}
                  -
                  {format(
                    new Date(
                      new Date(
                        `${appointmentData?.schedule.date} ${appointmentData?.schedule.time.substring(0, 8)}`,
                      ).getTime() +
                        (appointmentData?.duration === "dur25" ? 25 : 50) *
                          60000,
                    ),
                    "HH:mm",
                  )}{" "}
                  ({appointmentData?.duration.slice(3) + "min session"})
                </SheetDescription>
              )}
            </SheetHeader>
            <div className="pb-10 flex flex-col ">
              <Link href="/user/schedule" className="block w-full">
                <Button size="lg" className="font-bold w-full">
                  Get ready for your lesson
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
