"use client";

import LangSelector from "@/components/app/lang-selector";
import TutorListFilter from "@/components/app/tutor-list-filter";
import TutorListSort from "@/components/app/tutor-list-sort";
import TutorListView from "@/components/app/tutor-list-view";
import { ListViewProvider } from "@/context-hooks/list-view.provider";
import { useUserAppContext } from "@/context-hooks/user.provider";
import { Heart } from "lucide-react";

export default function UserPage() {
  const { country } = useUserAppContext();
  return (
    <div>
      <section className="flex w-full gap-3 justify-between items-center pt-6 px-4 bg-white ">
        <LangSelector />
        <Heart />
      </section>
      <ListViewProvider country={country.country}>
        <section className="sticky top-0 bg-white p-4 flex flex-col gap-2 z-50">
          <TutorListFilter />
          <TutorListSort />
        </section>
        <section className="mt-4">
          <TutorListView />
        </section>
      </ListViewProvider>
    </div>
  );
}
