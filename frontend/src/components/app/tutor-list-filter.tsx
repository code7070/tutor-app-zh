import { Button } from "../ui/button";

export default function TutorListFilter() {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex w-fit gap-3">
        <Button size="sm" variant="app-outline">
          Price
        </Button>
        <Button size="sm" variant="app-outline">
          Country of birth
        </Button>
        <Button size="sm" variant="app-outline">
          Native
        </Button>
        <Button size="sm" variant="app-outline">
          Super Tutor
        </Button>
      </div>
    </div>
  );
}
