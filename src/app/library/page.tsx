import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import { LibraryDashboard } from "@/components/library-dashboard";

export const metadata: Metadata = {
  title: "ชั้นหนังสือของฉัน",
  description: "ประวัติการอ่านและตอนที่บันทึกไว้ใน Forcadia",
};

export default function LibraryPage() {
  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="Personal Archive"
        title={<>ชั้นหนังสือของฉัน</>}
        lede={<>อ่านต่อจากตำแหน่งล่าสุดและเก็บตอนสำคัญไว้ในคลังส่วนตัว ข้อมูลจะถูกบันทึกภายในเบราว์เซอร์เครื่องนี้</>}
      />

      <LibraryDashboard />
    </main>
  );
}
