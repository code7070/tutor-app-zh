import { getHours, parse } from "date-fns";
import { useMemo } from "react";

type TimeGroup = "Morning" | "Afternoon" | "Evening" | "Night";

interface TimeGroupResult {
  label: TimeGroup;
  timelist: string[];
}

const useTimeGrouping = (timeset: string[]): TimeGroupResult[] => {
  return useMemo(() => {
    const getTimeGroup = (time: string): TimeGroup => {
      const timeOnly = time.substring(0, 5);
      const date = parse(timeOnly, "HH:mm", new Date());
      const hour = getHours(date);

      if (hour >= 5 && hour < 12) {
        return "Morning";
      } else if (hour >= 12 && hour < 17) {
        return "Afternoon";
      } else if (hour >= 17 && hour < 20) {
        return "Evening";
      } else {
        return "Night";
      }
    };

    if (timeset.length === 0) {
      return [];
    }

    const groups: Record<TimeGroup, string[]> = {
      Morning: [],
      Afternoon: [],
      Evening: [],
      Night: [],
    };

    timeset.forEach((time) => {
      const group = getTimeGroup(time);
      groups[group].push(time);
    });

    return Object.entries(groups)
      .map(([label, timelist]) => ({
        label: label as TimeGroup,
        timelist,
      }))
      .filter((group) => group.timelist.length > 0);
  }, [timeset]);
};

export default useTimeGrouping;
