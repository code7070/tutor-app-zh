import NavbarAdmin from "@/components/app/nav-admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pb-24">
      <div className="main-content">{children}</div>
      <NavbarAdmin />
    </main>
  );
}
