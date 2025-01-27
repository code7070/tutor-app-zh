import { Star } from "lucide-react";

export default function TutorDetailReview() {
  return (
    <div className="border rounded-md p-4 flex flex-col justify-between gap-3 bg-white w-[calc(100vw-20vw)]">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="size-12 bg-app-gray2 rounded-md" />
          <div>
            <div className="font-bold">Kasia 🇮🇩</div>
            <div className="text-sm text-app-gray2">1 week ago</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="fill-black" />
          ))}
        </div>
        <div className="text-sm">
          The best teacher I ever had! Lessons are very professional and also
          joyful.
        </div>
      </div>
    </div>
  );
}
