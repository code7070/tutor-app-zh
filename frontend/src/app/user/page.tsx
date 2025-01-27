import LangSelector from "@/components/app/lang-selector";
import { ListViewProvider } from "@/context-hooks/list-view.provider";
import { Heart } from "lucide-react";

export default function UserPage() {
  return (
    <div>
      <section className="flex w-full gap-3 justify-between items-center pt-6 px-4">
        <LangSelector />
        <Heart />
      </section>
      <ListViewProvider>
        <section className="sticky top-0 bg-app-pink h-32"></section>
      </ListViewProvider>
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
      <section className="h-40 bg-gray-400 mb-2" />
    </div>
  );
}
