import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 bg-app-pink-shade p-8">
      <Link href="/user" className="w-full">
        <Button className="w-full" size="lg">
          User
        </Button>
      </Link>
      <Link href="/admin" className="w-full">
        <Button className="w-full" size="lg">
          Admin
        </Button>
      </Link>
    </div>
  );
}
