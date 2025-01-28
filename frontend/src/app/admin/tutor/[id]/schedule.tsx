import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { useState } from "react";

interface IScheduleItem {
  date: string;
  time: string[];
}

export default function EditSchedule({ timeSlots }: { timeSlots: string[] }) {
  const [active, setActive] = useState<Date>(addDays(new Date(), 1));
  const [schedules, setSchedules] = useState<IScheduleItem[]>([]);

  const tomorrow = addDays(new Date(), 1);
  const dateRange = Array.from({ length: 14 }, (_, index) => {
    const date = addDays(tomorrow, index);
    return {
      date: format(date, "d MMM"),
      dayName: format(date, "EE"),
      raw: date,
      timelist: timeSlots,
    };
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-fit">
          {dateRange.map((i, n) => {
            const isActive = active.toDateString() === i.raw.toDateString();
            return (
              <div key={n}>
                <Button
                  variant={isActive ? "app-pink" : "app-ghost-pink"}
                  className={"text-black font-semibold"}
                  onClick={() => setActive(i.raw)}
                >
                  {i.date}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      {dateRange.map((i, n) => {
        const isActive = active.toDateString() === i.raw.toDateString();
        if (isActive)
          return (
            isActive && (
              <div className="mt-4 grid grid-cols-3 gap-2" key={n}>
                {i.timelist.map((slot) => {
                  const isSelected = schedules
                    .find((s) => s.date === i.date)
                    ?.time.includes(slot);
                  return (
                    <Button
                      key={slot}
                      type="button"
                      className="w-full"
                      variant={isSelected ? "app-pink" : "outline"}
                      onClick={() => {
                        setSchedules((curr) => {
                          const news = [...curr];
                          const found = news.find((s) => s.date === i.date);
                          if (found) found.time.push(slot);
                          else news.push({ date: i.date, time: [slot] });
                          console.log({ news });
                          return news;
                        });
                      }}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </div>
            )
          );
        return null;
      })}
    </div>
  );
}
