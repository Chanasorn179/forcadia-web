import type { Metadata } from "next";
import { LibraryDashboard } from "@/components/library-dashboard";

export const metadata: Metadata = {
  title: "ชั้นหนังสือของฉัน",
  description: "ประวัติการอ่านและตอนที่บันทึกไว้ใน Forcadia",
};

export default function LibraryPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Personal Archive</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        ชั้นหนังสือของฉัน
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        อ่านต่อจากตำแหน่งล่าสุดและเก็บตอนสำคัญไว้ในคลังส่วนตัว
        ข้อมูลจะถูกบันทึกภายในเบราว์เซอร์เครื่องนี้
      </p>

      <LibraryDashboard />
    </main>
  );
}
