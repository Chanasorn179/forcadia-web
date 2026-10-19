import { ConfirmDelete } from "@/components/admin/confirm-delete";

type Props = {
  houseId: string;
  houseName: string;
  cityName?: string;
};

export function DeleteHouseForm({ houseId, houseName, cityName }: Props) {
  return (
    <ConfirmDelete
      action={`/admin/api/houses/${houseId}/delete`}
      title="ลบตระกูลถาวร"
      confirmText={houseName}
      confirmLabel="ชื่อตระกูล"
      blockedReason={
        cityName
          ? `ตระกูลนี้ยังเชื่อมกับเมือง ${cityName} จึงไม่สามารถลบได้ กรุณาย้ายหรือยกเลิกการเชื่อมเมืองก่อน`
          : undefined
      }
    />
  );
}
