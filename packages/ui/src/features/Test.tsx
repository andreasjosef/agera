import { useState } from "react";

export function Test() {
  const [activeTab, setActiveTab] = useState<"flow" | "all">("flow");

  return (
    <div className="w-full space-y-4">
      {/* Tab Header Layout */}
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
                Sätt formen på repo, mappstruktur och grundläggande dev-miljö –
                så att alla kan börja bygga direkt.
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
  );
}
