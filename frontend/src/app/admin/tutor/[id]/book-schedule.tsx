import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { addDays, format, formatRelative, isToday, isTomorrow } from "date-fns";
// import { format as formatTz} from "date-fns-tz"

export default function BookSchedule({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}) {
  const [tab, setTab] = useState<"25" | "50">("25");

  const [daySelected, setDaySelected] = useState(new Date());

  const timeSlots = {
    "25": {
      afternoon: ["3:00 PM", "3:30 PM"],
      evening: [
        "8:00 PM",
        "8:30 PM",
        "10:00 PM",
        "10:30 PM",
        "11:00 PM",
        "11:30 PM",
      ],
    },
    "50": {
      afternoon: ["2:00 PM", "2:30 PM", "4:00 PM"],
      evening: ["7:00 PM", "7:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"],
    },
  };

  const today = new Date();

  const dateRange = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);
    return {
      date: format(date, "d"),
      dayName: format(date, "EE"),
      isToday: isToday(date),
      raw: date,
    };
  });

  const relativeDay = useMemo(() => {
    if (daySelected) {
      let res = isToday(daySelected)
        ? "Today"
        : isTomorrow(daySelected)
          ? "Tomorrow"
          : formatRelative(daySelected, new Date());
      if (res.includes(" at ")) res = res.split(" at ")[0];
      return res;
    }
    return "-";
  }, [daySelected]);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Mendapatkan offset GMT
  const offset = new Date().getTimezoneOffset();
  const offsetHours = -(offset / 60);
  const gmtOffset = `GMT ${offsetHours >= 0 ? "+" : ""}${offsetHours}:00`;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-screen" withClose={false}>
        <SheetHeader className="mb-4 flex flex-row items-center gap-10">
          <div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="!size-8" />
            </Button>
          </div>
          <div className="flex-1">
            <SheetTitle className="text-2xl font-bold ">
              25 min lesson
            </SheetTitle>
            <SheetDescription className="font-medium">
              To discuss your level and learning plan
            </SheetDescription>
          </div>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Tabs
            defaultValue={tab}
            onValueChange={(e) => setTab(e as typeof tab)}
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="25">25 min lesson</TabsTrigger>
              <TabsTrigger value="50">50 min lesson</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
            {/* Calendar */}
            <div className="px-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {format(today, "MMMM yyy")}
                </h2>
                <Button variant="link" className="font-semibold">
                  {relativeDay}
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center justify-center mb-4">
                {dateRange.map((i) => (
                  <div key={i.date} className="text-sm text-muted-foreground">
                    {i.dayName}
                  </div>
                ))}
                {dateRange.map((i) => {
                  const isSelected = i.raw.getDate() === daySelected.getDate();
                  return (
                    <Button
                      key={i.date}
                      variant={isSelected ? "app-pink" : "app-ghost-pink"}
                      className={`rounded-full !size-12 !p-1 text-lg font-bold ${isSelected ? "bg-app-pink-shade text-black" : ""}`}
                      onClick={() => setDaySelected(i.raw)}
                    >
                      {i.date}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Timezone */}
            <div className="px-4 mb-6">
              <p className="text-muted-foreground">
                In your time zone, {timeZone} ({gmtOffset})
              </p>
            </div>

            {/* Time Slots */}
            <div className="px-4 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sun className="h-5 w-5" />
                    <h3 className="font-semibold">Afternoon</h3>
                  </div>
                  <div className="grid gap-2">
                    {timeSlots[tab].afternoon.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className="w-full justify-center py-6"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Moon className="h-5 w-5" />
                    <h3 className="font-semibold">Evenings</h3>
                  </div>
                  <div className="grid gap-2">
                    {timeSlots[tab].evening.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className="w-full justify-center py-6"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
