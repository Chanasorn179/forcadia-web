import { characterLoreFields, type CharacterLoreField } from "@/data/character-lore";

type Props = {
  values?: Partial<Record<CharacterLoreField, string | null>>;
};

const inputClass =
  "min-h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-amber-200/40";
const textareaClass =
  "rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-slate-100 outline-none focus:border-amber-200/40";

export function CharacterLoreFields({ values = {} }: Props) {
  return (
    <fieldset className="grid gap-5 border-t border-white/10 pt-6">
      <legend className="pr-3 text-lg font-semibold text-amber-100">
        ตำนานตัวละคร
      </legend>
      <p className="-mt-2 text-sm text-slate-400">
        ไม่บังคับ ช่องที่เว้นว่างจะไม่แสดงบนหน้าตัวละคร
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {characterLoreFields.map(({ name, label, rows }) => (
          <label
            key={name}
            className={rows >= 5 ? "grid gap-2 md:col-span-2" : "grid gap-2"}
          >
            <span className="text-sm text-slate-400">{label}</span>
            {rows > 0 ? (
              <textarea
                name={name}
                rows={rows}
                defaultValue={values[name] ?? ""}
                className={textareaClass}
              />
            ) : (
              <input
                name={name}
                defaultValue={values[name] ?? ""}
                className={inputClass}
              />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
