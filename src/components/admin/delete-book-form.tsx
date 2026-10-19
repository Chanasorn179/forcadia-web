import { ConfirmDelete } from "@/components/admin/confirm-delete";

type Props = {
  bookId: string;
  bookTitle: string;
  chapterCount: number;
};

export function DeleteBookForm({ bookId, bookTitle, chapterCount }: Props) {
  return (
    <ConfirmDelete
      action={`/admin/api/books/${bookId}/delete`}
      title="ลบหนังสือถาวร"
      confirmText={bookTitle}
      confirmLabel="ชื่อหนังสือ"
      blockedReason={
        chapterCount > 0
          ? `หนังสือเล่มนี้ยังมี ${chapterCount} ตอนอยู่ในระบบ จึงยังไม่สามารถลบได้ กรุณาย้ายหรือลบตอนทั้งหมดก่อน`
          : undefined
      }
    />
  );
}
