import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-app-pink-shade flex flex-col items-center ">
      <div className="main-content mx-auto flex flex-col items-center justify-center gap-3 p-8 h-screen">
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
    </div>
  );
}
