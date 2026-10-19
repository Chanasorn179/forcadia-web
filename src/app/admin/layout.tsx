import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Toaster } from "@/components/ui/sonner";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <div className="admin-surface">{children}<Toaster /></div>;
  }

  return (
    <main className="admin-surface container-page py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <div>{children}</div>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
}
