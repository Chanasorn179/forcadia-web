import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: Props) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <main className="container-page grid min-h-[75vh] place-items-center py-16">
      <section className="glass-panel w-full max-w-md rounded-3xl p-7 md:p-9">
        <h1 className="mt-4 text-3xl font-semibold text-amber-100">
          เข้าสู่ระบบผู้ดูแล
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          สำหรับจัดการเนื้อหาภายใน Forcadia Imperial Archive
        </p>

        {error && (
          <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-200">
            {error === "rate-limit"
              ? "ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาทีแล้วลองใหม่"
              : "รหัสผ่านไม่ถูกต้อง"}
          </div>
        )}

        <form
          action="/admin/api/login"
          method="post"
          className="mt-7"
        >
          <label
            htmlFor="password"
            className="text-xs uppercase tracking-[0.2em] text-slate-500"
          >
            Admin Password
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-3"
          />

          <Button size="lg"
            type="submit"
            className="mt-5 w-full"
          >
            เปิด Admin Console
          </Button>
        </form>
      </section>
    </main>
  );
}
