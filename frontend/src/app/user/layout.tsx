import Navbar from "@/components/app/nav";
import { UserAppProvider } from "@/context-hooks/user.provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserAppProvider>
      <div className="pb-24">
        <div className="main-content">{children}</div>
        <Navbar />
      </div>
    </UserAppProvider>
  );
}
