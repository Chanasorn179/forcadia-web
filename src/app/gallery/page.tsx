import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "หอศิลป์",
  description: "รวบรวมตราจักรวรรดิและตราประจำตระกูลแห่ง Forcadia",
};

export default function GalleryPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Imperial Gallery</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        หอศิลป์แห่ง Forcadia
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        รวบรวมตราจักรวรรดิและตราประจำแปดตระกูล
        ซึ่งบันทึกอำนาจ อุดมการณ์ และประวัติศาสตร์ของผู้พิทักษ์วงแหวน
      </p>

      <GalleryGrid items={galleryItems} />
    </main>
  );
}
