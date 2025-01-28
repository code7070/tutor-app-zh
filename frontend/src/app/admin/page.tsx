import TutorListViewAdmin from "@/components/app/tutor-list-view-admin";
import { ListViewProvider } from "@/context-hooks/list-view.provider";

export default function AdminPage() {
  return (
    <div className="">
      <div className="p-6">
        <h2 className="font-bold text-2xl">Admin Page</h2>
        <div>
          Welcome to the part we can manage our data directly from the finger
          tips.
        </div>
      </div>
      <ListViewProvider country={"all"}>
        <TutorListViewAdmin />
      </ListViewProvider>
    </div>
  );
}
