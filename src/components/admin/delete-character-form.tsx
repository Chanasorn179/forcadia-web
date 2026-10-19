import { ConfirmDelete } from "@/components/admin/confirm-delete";

type Props = {
  characterId: string;
  characterName: string;
  houseName?: string;
};

export function DeleteCharacterForm({ characterId, characterName, houseName }: Props) {
  return (
    <ConfirmDelete
      action={`/admin/api/characters/${characterId}/delete`}
      title="ลบตัวละครถาวร"
      confirmText={characterName}
      confirmLabel="ชื่อตัวละคร"
      blockedReason={
        houseName
          ? `ตัวละครนี้ยังเป็นผู้ปกครองของ ${houseName} จึงไม่สามารถลบได้ กรุณาเปลี่ยนผู้ปกครองของตระกูลก่อน`
          : undefined
      }
    />
  );
}
