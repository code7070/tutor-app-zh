import { Skeleton } from "@/components/ui/skeleton";

export default function TutorDetailPlaceholder() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-[2/1]" />
      <Skeleton className="size-10" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
