import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <Link href="/">
        <Button size="lg" className="font-bold">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
