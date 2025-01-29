import { IResponseAppointmentDetail } from "@/app/api/appointment/[id]/route";
import { Skeleton } from "@/components/ui/skeleton";
import { getCountry } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo } from "react";
import useSWR from "swr";

async function fetcher(id: string) {
  return (await fetch(`/api/appointment/${id}`).then((res) =>
    res.json(),
  )) as IResponseAppointmentDetail;
}

export default function ItemSchedule({ id }: { id: string }) {
  const { data, isLoading } = useSWR(
    `/api/appointment/${id}`,
    async () => await fetcher(id),
  );
  if (!data?.data)
    return (
      <div className="border p-4 flex gap-4 items-start h-32">Not Found</div>
    );
  const schedule = data?.data.data.schedule;
  const tutor = data?.data.data.tutor;
  const date = schedule.date;
  const time = schedule.time;
  const label = !!(
    format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  )
    ? "Today"
    : format(date, "yyyy-MM-dd") ===
        format(new Date().setDate(new Date().getDate() + 1), "yyyy-MM-dd")
      ? "Tomorrow"
      : undefined;
  if (isLoading)
    return (
      <div className="border p-4 flex gap-4 items-start h-32">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-5 w-[2/3]" />
        <Skeleton className="h-5 w-[1/3]" />
      </div>
    );
  else if (label === "Today" || label === "Tomorrow")
    return (
      <div className="border-2 p-6 flex gap-4 justify-between items-start rounded-lg">
        <div className="flex-1 flex flex-col items-start gap-3">
          <div className="font-semibold text-app-gray2 text-sm">{label}</div>
          <div className="text-4xl font-bold">
            {getCountry().name(tutor.nativeLanguage || "EN")} with {tutor.name}
          </div>
          <div className="text-app-gray text-xl">
            {format(`${date} ${time.slice(0, 5)}`, "EEEE, MMM d, h:mm a")}
          </div>
        </div>
        <div>
          <img
            className="size-20 rounded-md"
            alt={tutor.name}
            src={tutor.photo.url}
          />
        </div>
      </div>
    );
  return (
    <div className="border-2 p-4 flex gap-4 items-start rounded-lg">
      {label}
      <div className="font-semibold text-lg">
        <div>{format(date, "MMM")}</div>
        <div>{format(date, "d")}</div>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="font-bold text-lg">
          {format(`${date} ${time.slice(0, 5)}`, "EEEE")} at{" "}
          {format(`${date} ${time.slice(0, 5)}`, "h:mm a")}
        </div>
        <div>
          {tutor.name}, {getCountry().name(tutor.nativeLanguage || "EN")}
        </div>
      </div>
      <div>
        <img
          className="size-10 rounded-md"
          alt={tutor.name}
          src={tutor.photo.url}
        />
      </div>
    </div>
  );
}
