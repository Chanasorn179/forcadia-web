import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <div className="admin-surface">{children}</div>;
  }

  return (
    <main className="admin-surface container-page py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
