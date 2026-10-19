"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  /** Form action that performs the delete. */
  action: string;
  /** Heading and trigger label, e.g. "ลบหนังสือถาวร". */
  title: string;
  /** The exact text the admin must type to confirm. */
  confirmText: string;
  /** What is being typed, e.g. "ชื่อหนังสือ". */
  confirmLabel: string;
  /** Extra warning shown in the dialog. */
  warning?: string;
  /** When set, deleting is not allowed and this explains why. */
  blockedReason?: string;
};

export function ConfirmDelete({
  action,
  title,
  confirmText,
  confirmLabel,
  warning,
  blockedReason,
}: Props) {
  const [confirmation, setConfirmation] = useState("");
  const matches = confirmation === confirmText;

  return (
    <section className="danger-zone mt-8 rounded-3xl border p-6">
      <h2 className="text-2xl">{title}</h2>

      {blockedReason ? (
        <p className="mt-3 max-w-3xl leading-7 text-slate-300">{blockedReason}</p>
      ) : (
        <>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            การลบไม่สามารถย้อนกลับได้ ระบบจะให้พิมพ์{confirmLabel}เพื่อยืนยันอีกครั้ง
          </p>

          <AlertDialog onOpenChange={(open) => !open && setConfirmation("")}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-5">
                {title}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <form action={action} method="post">
                <AlertDialogHeader>
                  <AlertDialogTitle>{title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {warning ? `${warning} ` : ""}พิมพ์{confirmLabel}ให้ตรงทุกตัวอักษรเพื่อยืนยัน
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <p className="mt-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
                  {confirmText}
                </p>

                <label className="mt-4 grid gap-2">
                  <span className="text-sm text-slate-400">พิมพ์{confirmLabel}</span>
                  <Input
                    name="confirmation"
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    autoComplete="off"
                  />
                </label>

                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel type="button">ยกเลิก</AlertDialogCancel>
                  <Button type="submit" variant="destructive" disabled={!matches}>
                    ยืนยันการลบ
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </section>
  );
}
