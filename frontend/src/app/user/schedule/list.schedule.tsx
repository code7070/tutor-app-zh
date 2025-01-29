"use client";

import { Loader } from "lucide-react";
import useSWR from "swr";
import ItemSchedule from "./item.schedule";

async function fetcher() {
  return (await fetch("/api/appointment").then((res) => res.json())) as {
    data: {
      data: {
        id: number;
        documentId: string;
        schedule: { date: string; time: string };
      }[];
    };
    status: 200;
  };
}

export default function ListSchedule() {
  const { data, isLoading } = useSWR("/api/appointment", fetcher);

  return (
    <div className="flex flex-col gap-10">
      {isLoading && <Loader className="size-5 animate-spin" />}
      {data?.data.data
        .sort((a, b) => {
          const dateTimeA = new Date(`${a.schedule.date} ${a.schedule.time}`);
          const dateTimeB = new Date(`${b.schedule.date} ${b.schedule.time}`);
          return dateTimeA.getTime() - dateTimeB.getTime();
        })
        .map((i) => <ItemSchedule key={i.documentId} id={i.documentId} />)}
    </div>
  );
}
