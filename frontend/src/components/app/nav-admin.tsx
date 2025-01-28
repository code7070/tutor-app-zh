"use client";

import { Cog, MoveLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarAdmin() {
  const pathname = usePathname();
  const pages = [
    { name: "Tutors", href: "/admin", icon: <Cog strokeWidth="2.5" /> },
    { name: "Back to User", href: "/user", icon: <MoveLeft /> },
  ];
  return (
    <nav className="bg-white fixed left-0 bottom-0 right-0">
      <div className="main-content mx-auto flex w-full h-20">
        {pages.map((i) => {
          const isActive = pathname === i.href;
          return (
            <Link
              key={i.href}
              href={i.href}
              className={[
                "w-full flex flex-1 flex-col items-center justify-center gap-0.5 hover:bg-app-pink-shade",
                isActive ? "text-app-pink" : "",
              ].join(" ")}
            >
              {i.icon}
              <span className="font-semibold">{i.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
