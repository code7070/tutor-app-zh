import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListSchedule from "./list.schedule";

export default function SchedulePage() {
  return (
    <div className="main-content px-4 py-12 flex flex-col gap-10 w-full">
      <section className="flex justify-between items-start w-full">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <div className="size-10 bg-app-gray rounded-md" />
      </section>
      <section className="flex flex-col gap-3">
        <div className="text-xl font-bold">
          You&quot;ll see your tutors and lesson schedule here
        </div>
        <div className="text-sm text-app-gray">
          Your lesson schedule is the path to success. Find a tutor and book
          your first lesson to start.
        </div>
        <Link href="/user">
          <Button variant={"app-pink"}>Find a tutor</Button>
        </Link>
      </section>
      <section>
        <ListSchedule />
      </section>
    </div>
  );
}
