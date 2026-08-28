export default function Loading() {
  return (
    <main
      className="container-page grid min-h-[55vh] place-items-center py-20"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-amber-200/20 border-t-amber-200"
        />
        <p className="mt-5 text-sm tracking-wide text-slate-400">
          กำลังเปิดบันทึกแห่ง Forcadia…
        </p>
      </div>
    </main>
  );
}
