import { useState } from "react";

export function TestInactive() {
  const [activeTab, setActiveTab] = useState<"flow" | "all">("flow");
  const isPending = false;

  return (
    <>
      <div className="w-full space-y-4">
        {/* Header Layout */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("flow")}
              className={`text-sm font-bold tracking-wide pb-2 transition-all border-b-2 ${
                activeTab === "flow"
                  ? "border-violet-600 text-zinc-950"
                  : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Mitt flöde
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`text-sm font-bold tracking-wide pb-2 transition-all border-b-2 ${
                activeTab === "all"
                  ? "border-violet-600 text-zinc-950"
                  : "border-transparent text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Alla uppgifter
            </button>
          </div>

          <span className="text-xs font-semibold text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100">
            3 prioriterade
          </span>
        </div>

        {activeTab === "flow" ? (
          /* The Action Map Flow */
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
            {/* Step item loop */}
            <div className="relative group">
              {/* The structural node indicator */}
              <div className="absolute -left-[22px] top-1 size-3.5 rounded-full border-2 border-violet-500 bg-white group-first:bg-violet-500" />

              <div className="space-y-1">
                {/* Soft, small, supportive metadata stack */}
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <span>Chas Challenge</span>
                  <span>•</span>
                  <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                    Admin
                  </span>
                  <span>•</span>
                  <span>120 min</span>
                </div>

                {/* The high-readability task description */}
                <p className="text-base text-zinc-800 font-medium leading-relaxed hover:text-violet-600 transition-colors cursor-pointer">
                  Sätt formen på repo, mappstruktur och grundläggande dev-miljö
                  – så att alla kan börja bygga direkt.
                </p>
              </div>
            </div>

            {/* Additional steps follow here... */}
          </div>
        ) : (
          /* Secondary Tab placeholder for LMS courses directory tree */
          <div className="py-8 text-center text-sm text-zinc-400 font-medium">
            Kursöversikt och Canvas-moduler visas här.
          </div>
        )}
      </div>

      <form>
        <div>
          <label htmlFor="requirement-title">Title:</label>
          <input name="title" id="requirement-title" />
        </div>

        <div>
          <label htmlFor="requirement-description">Description:</label>

          <textarea name="description" id="requirement-description" />
        </div>

        <div>
          <label htmlFor="requirement-due">Due:</label>

          <input type="date" name="due" id="requirement-due" />
        </div>

        <div>
          <label htmlFor="requirement-type">Type:</label>
          <select name="type" id="requirement-type" defaultValue="assignment">
            <option value="assignment">Assignment</option>
            <option value="lecture">Lecture</option>
          </select>
        </div>

        <button type="submit" disabled={isPending}>
          Create Requirement
        </button>
      </form>
    </>
  );
}

import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";
import { CalendarDays, FileText, Bookmark, ClipboardList } from "lucide-react";

interface CreateRequirementFormProps {
  isPending: boolean;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export function Test({ isPending, onSubmit }: CreateRequirementFormProps) {
  return (
    <Card className="bg-white border border-zinc-100 p-8 rounded-2xl">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        {/* Form Header Context */}
        <div className="mb-8 space-y-1">
          <div className="flex items-center gap-2 text-zinc-400">
            <ClipboardList className="size-5 stroke-[1.75]" />
            <span className="text-xs font-bold tracking-widest uppercase">
              Kurshantering
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Lägg till krav manuellt
          </h1>
          <p className="text-sm text-zinc-500 font-medium">
            {" "}
            Bryta ner studiekrav i hanterbara steg.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* 1. Title Input Row 
          <div className="space-y-2">
            <label
              htmlFor="requirement-title"
              className="text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2"
            >
              <Bookmark className="size-3.5 text-zinc-400" />
              Rubrik
            </label>
            <input
              name="title"
              id="requirement-title"
              placeholder="t.ex. Projektarbete Chas Challenge"
              required
              className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-base text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
            />
          </div>
*/}

          {/* 2. Description Textarea Row */}
          <div className="space-y-2">
            <label
              htmlFor="requirement-description"
              className="text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2"
            >
              <FileText className="size-3.5 text-zinc-400" />
              Beskrivning
            </label>
            <textarea
              name="description"
              id="requirement-description"
              placeholder="Vad innebär det här kravet? Lägg till detaljer..."
              rows={4}
              className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-base text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium resize-none leading-relaxed"
            />
          </div>

          {/* 3. Two-Column Grid for Date & Type Selector Switch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date Element */}
            <div className="space-y-2">
              <label
                htmlFor="requirement-due"
                className="text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2"
              >
                <CalendarDays className="size-3.5 text-zinc-400" />
                Inlämningsdatum
              </label>
              <input
                type="date"
                name="due"
                id="requirement-due"
                className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-2.5 text-base text-zinc-800 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
              />
            </div>

            {/* Type Select Switch Group */}
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                Typ av krav
              </span>

              <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 rounded-xl border border-zinc-200/20 h-[46px] items-center">
                <label className="relative flex justify-center items-center h-full cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="assignment"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <span className="w-full text-center text-sm font-semibold text-zinc-500 py-1.5 rounded-lg peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm transition-all">
                    Inlämning
                  </span>
                </label>

                <label className="relative flex justify-center items-center h-full cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="lecture"
                    className="peer sr-only"
                  />
                  <span className="w-full text-center text-sm font-semibold text-zinc-500 py-1.5 rounded-lg peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm transition-all">
                    Föreläsning
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-zinc-100 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-8 py-3 rounded-xl font-bold tracking-wide shadow-md active:scale-[0.99] transition-transform"
            >
              {isPending ? "Skapar..." : "Skapa"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
