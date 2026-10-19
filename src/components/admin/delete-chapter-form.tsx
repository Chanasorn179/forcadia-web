import { ConfirmDelete } from "@/components/admin/confirm-delete";

type Props = {
  chapterId: string;
  chapterTitle: string;
};

export function DeleteChapterForm({ chapterId, chapterTitle }: Props) {
  return (
    <ConfirmDelete
      action={`/admin/api/chapters/${chapterId}/delete`}
      title="ลบตอนนี้ถาวร"
      confirmText={chapterTitle}
      confirmLabel="ชื่อตอน"
      warning="การลบจะนำข้อมูลตอนออกจากฐานข้อมูลทันที"
    />
  );
}
