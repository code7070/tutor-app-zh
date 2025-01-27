"use client";

import { BookA, CalendarDays, MessageSquareText, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const pages = [
    { name: "Search", href: "/user", icon: <Search strokeWidth="2.5" /> },
    { name: "Messages", href: "/user/messages", icon: <MessageSquareText /> },
    { name: "Schedule", href: "/user/schedule", icon: <CalendarDays /> },
    { name: "Vocab", href: "/user/vocab", icon: <BookA /> },
  ];
  return (
    <nav className="bg-white fixed left-0 bottom-0 right-0">
      <div className="main-content mx-auto grid grid-cols-4 h-20">
        {pages.map((i) => {
          const isActive =
            i.href === "/user"
              ? pathname === i.href
              : pathname.startsWith(i.href);
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
