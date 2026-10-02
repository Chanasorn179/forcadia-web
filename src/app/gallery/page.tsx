import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "หอศิลป์",
  description: "รวบรวมตราจักรวรรดิและตราประจำตระกูลแห่ง Forcadia",
};

export default function GalleryPage() {
  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="Imperial Gallery"
        title={<>หอศิลป์แห่ง Forcadia</>}
        lede={<>รวบรวมตราจักรวรรดิและตราประจำแปดตระกูล ซึ่งบันทึกอำนาจ อุดมการณ์ และประวัติศาสตร์ของผู้พิทักษ์วงแหวน</>}
      />

      <GalleryGrid items={galleryItems} />
    </main>
  );
}
