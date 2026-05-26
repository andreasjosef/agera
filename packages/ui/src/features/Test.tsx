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

export function TestManualCreate({
  isPending,
  onSubmit,
}: CreateRequirementFormProps) {
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

import {
  Radio,
  Sparkles,
  SlidersHorizontal,
  PlayCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export function TestGallery() {
  const guideSteps = [
    {
      icon: Radio,
      iconClass: "text-blue-500 bg-blue-50",
      title: "1. Automatisk Insamling",
      subtitle: "Canvas & Systemintegration",
      description:
        "Agera lyssnar i bakgrunden och samlar automatiskt in dina deadlines, moduler och scheman från fragmenterade källor. Sluta leta på tre olika ställen.",
    },
    {
      icon: Sparkles,
      iconClass: "text-purple-500 bg-purple-50",
      title: "2. Intelligent Nedbrytning",
      subtitle: "Vår LLM-Motor hanterar kaoset",
      description:
        "Stora kursmål skapar ofta en oöverstiglig starttröskel. Ageras motor bryter omedelbart ner komplexa uppgifter till logiska, lätthanterliga mikrosteg berikade med start-tips.",
    },
    {
      icon: SlidersHorizontal,
      iconClass: "text-amber-500 bg-amber-50",
      title: "3. Kontextuell Avstämning",
      subtitle: "Ställ in dagens intention",
      description:
        "När du kliver in i Cockpit drar du i reglagen för att berätta hur mycket energi du har och hur länge du vill plugga. Systemet döljer automatiskt allt irrelevant brus.",
    },
    {
      icon: PlayCircle,
      iconClass: "text-emerald-500 bg-emerald-50",
      title: "4. Isolerat Fokusläge",
      subtitle: "Ett enda steg i taget",
      description:
        "När du klickar på Börja låser systemet in dig i en distraktionsfri miljö. Ingen valstatus, ingen beslutsångest—bara det steg du valt att göra just nu.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* View Header */}
      <div className="mb-8 space-y-1">
        <div className="flex items-center gap-2 text-zinc-400">
          <HelpCircle className="size-5 stroke-[1.75]" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Guide
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Hur fungerar Agera?
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Exekutiv funktion som en tjänst – en snabböversikt.
        </p>
      </div>

      {/* Grid Flow Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guideSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Card
              key={idx}
              className="bg-white border border-zinc-100 shadow-sm p-6 rounded-2xl flex gap-4 items-start"
            >
              <div className={`p-3 rounded-xl shrink-0 ${step.iconClass}`}>
                <Icon className="size-5 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase text-[11px]">
                  {step.subtitle}
                </h3>
                <h2 className="text-lg font-bold text-zinc-800 leading-snug">
                  {step.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* MVP Focus Section: Curveballs feature highlight */}
      <Card className="mt-8 bg-linear-to-br from-zinc-50 to-white border border-zinc-100 rounded-2xl p-6">
        <div className="flex gap-4 items-start">
          <div className="p-3 rounded-xl bg-zinc-900 text-white shrink-0">
            <AlertCircle className="size-5 stroke-[1.75]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-900">
              Hantera oförutsedda sidospår (Curveballs)
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Lärare skickar sällan allt via Canvas. När ett viktigt mejl
              trillar in eller en ny instruktion ges i Slack, använder du
              funktionen{" "}
              <strong className="text-zinc-800">
                \"Lägg till krav manuellt\"
              </strong>{" "}
              för att direkt trycka in uppgiften i Ageras nedbrytningsmotor.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function TestWOLinks() {
  const guideSteps = [
    {
      icon: Radio,
      iconClass: "text-blue-500 bg-blue-50",
      title: "1. Automatisk Insamling",
      subtitle: "Canvas & Systemintegration",
      description:
        "Agera lyssnar i bakgrunden och samlar automatiskt in dina deadlines, moduler och scheman från fragmenterade källor. Sluta leta efter information på tre olika ställen.",
    },
    {
      icon: Sparkles,
      iconClass: "text-purple-500 bg-purple-50",
      title: "2. Intelligent Nedbrytning",
      subtitle: "Vår LLM-motor hanterar kaoset",
      description:
        "Stora kursmål skapar ofta en oöverstiglig starttröskel. Ageras motor bryter omedelbart ner komplexa uppgifter till logiska, lätthanterliga mikrosteg berikade med praktiska start-tips.",
    },
    {
      icon: SlidersHorizontal,
      iconClass: "text-amber-500 bg-amber-50",
      title: "3. Kontextuell Avstämning",
      subtitle: "Ställ in dagens intention",
      description:
        "När du kliver in i Cockpit drar du i reglagen för att berätta hur mycket energi du har och hur länge du vill plugga. Systemet döljer automatiskt allt irrelevant brus.",
    },
    {
      icon: PlayCircle,
      iconClass: "text-emerald-500 bg-emerald-50",
      title: "4. Isolerat Fokusläge",
      subtitle: "Ett enda steg i taget",
      description:
        "När du klickar på Börja låser systemet in dig i en distraktionsfri miljö. Ingen valstatus eller beslutsångest—bara det enskilda steg du har valt att göra just nu.",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-3xl px-8 py-8">
      {/* View Header */}
      <div className="mb-12 space-y-1">
        <div className="flex items-center gap-2 text-zinc-400">
          <HelpCircle className="size-5 stroke-[1.75]" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Guide
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Hur fungerar Agera?
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Exekutiv funktion som en tjänst – en steg-för-steg-översikt.
        </p>
      </div>

      {/* Vertical Timeline List Layout */}
      {/* This introduces a thin vertical thread on the left that links the step blocks sequentially */}
      <div className="relative border-l-2 border-zinc-100/80 pl-6 ml-4 space-y-10">
        {guideSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Badge Node Accent */}
              <div
                className={`absolute -left-[37px] top-1.5 p-1.5 rounded-xl border-2 border-white bg-white shadow-sm shrink-0 group-hover:scale-105 transition-transform ${step.iconClass}`}
              >
                <Icon className="size-4 stroke-[1.75]" />
              </div>

              {/* Step Text Content Stack */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  {step.subtitle}
                </span>
                <h2 className="text-lg font-bold text-zinc-800 leading-snug">
                  {step.title}
                </h2>
                <p className="text-base text-zinc-500 font-normal leading-relaxed max-w-2xl pt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Curveball Handler Info Block */}
      <div className="mt-12 pt-8 border-t border-zinc-100">
        <Card className="bg-linear-to-br from-zinc-50 via-zinc-50/20 to-white border border-zinc-100 rounded-2xl p-6 shadow-none">
          <div className="flex gap-4 items-start">
            <div className="p-2.5 rounded-xl bg-zinc-900 text-white shrink-0">
              <AlertCircle className="size-5 stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-zinc-900">
                Hantera oförutsedda sidospår (Curveballs)
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                Lärare skickar sällan allt via Canvas. När ett viktigt mejl
                trillar in eller en ny instruktion ges i Slack, använder du
                funktionen{" "}
                <strong className="text-zinc-800 font-semibold">
                  "Lägg till krav manuellt"
                </strong>{" "}
                för att direkt trycka in uppgiften i Ageras nedbrytningsmotor så
                den kan hanteras i ditt vanliga flöde.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}

import { ArrowRight } from "lucide-react";

export interface HelpOverviewGuideProps {
  onNavigateToIntegration?: () => void; // Callback for Step 1
  onNavigateToBreakdown?: () => void; // Callback for Step 2
  onNavigateToCockpit?: () => void; // Callback for Step 3
  onNavigateToFocus?: () => void; // Callback for Step 4
  onNavigateToManualAdd?: () => void; // Callback for the Curveball Action
}

export function Test({
  onNavigateToIntegration,
  onNavigateToBreakdown,
  onNavigateToCockpit,
  onNavigateToFocus,
  onNavigateToManualAdd,
}: HelpOverviewGuideProps) {
  const guideSteps = [
    {
      icon: Radio,
      iconClass: "text-blue-500 bg-blue-50",
      title: "1. Automatisk Insamling",
      subtitle: "Canvas & Systemintegration",
      description:
        "Agera lyssnar i bakgrunden och samlar automatiskt in dina deadlines, moduler och scheman från fragmenterade källor. Sluta leta efter information på tre olika ställen.",
      callback: onNavigateToIntegration,
      linkLabel: "Visa mina anslutna kurser",
    },
    {
      icon: Sparkles,
      iconClass: "text-purple-500 bg-purple-50",
      title: "2. Intelligent Nedbrytning",
      subtitle: "Vår LLM-motor hanterar kaoset",
      description:
        "Stora kursmål skapar ofta en oöverstiglig starttröskel. Ageras motor bryter omedelbart ner komplexa uppgifter till logiska, lätthanterliga mikrosteg berikade med praktiska start-tips.",
      callback: onNavigateToBreakdown,
      linkLabel: "Se studieplanering",
    },
    {
      icon: SlidersHorizontal,
      iconClass: "text-amber-500 bg-amber-50",
      title: "3. Kontextuell Avstämning",
      subtitle: "Ställ in dagens intention",
      description:
        "När du kliver in i Cockpit drar du i reglagen för att berätta hur mycket energi du har och hur länge du vill plugga. Systemet döljer automatiskt allt irrelevant brus.",
      callback: onNavigateToCockpit,
      linkLabel: "Gå till Cockpit",
    },
    {
      icon: PlayCircle,
      iconClass: "text-emerald-500 bg-emerald-50",
      title: "4. Isolerat Fokusläge",
      subtitle: "Ett enda steg i taget",
      description:
        "När du klickar på Börja låser systemet in dig i en distraktionsfri miljö. Ingen valstatus eller beslutsångest—bara det enskilda steg du har valt att göra just nu.",
      callback: onNavigateToFocus,
      linkLabel: "Öppna fokusläge",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-12 space-y-1">
        <div className="flex items-center gap-2 text-zinc-400">
          <HelpCircle className="size-5 stroke-[1.75]" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Guide
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Hur fungerar Agera?
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Exekutiv funktion som en tjänst – en steg-för-steg-översikt.
        </p>
      </div>

      <div className="relative border-l-2 border-zinc-100/80 pl-6 ml-4 space-y-10">
        {guideSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Badge Node Accent */}
              <div
                className={`absolute -left-[37px] top-1.5 p-1.5 rounded-xl border-2 border-white bg-white shadow-sm shrink-0 transition-transform ${step.iconClass}`}
              >
                <Icon className="size-4 stroke-[1.75]" />
              </div>

              {/* Step Text Content Stack */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  {step.subtitle}
                </span>
                <h2 className="text-lg font-bold text-zinc-800 leading-snug">
                  {step.title}
                </h2>
                <p className="text-base text-zinc-500 font-normal leading-relaxed max-w-2xl pt-1">
                  {step.description}
                </p>

                {/* Interactive Action Link (only renders if callback prop is provided) */}
                {step.callback && (
                  <button
                    onClick={step.callback}
                    className="pt-2 flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 hover:underline transition-all cursor-pointer"
                  >
                    {step.linkLabel}
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100">
        <Card className="bg-linear-to-br from-zinc-50 via-zinc-50/20 to-white border border-zinc-100 rounded-2xl p-6 shadow-none">
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-zinc-900 text-white shrink-0">
                <AlertCircle className="size-5 stroke-[1.75]" />
              </div>
              <div className="space-y-1 max-w-xl">
                <h2 className="text-base font-bold text-zinc-900">
                  Hantera oförutsedda sidospår
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                  Lärare skickar sällan allt via Canvas. När ett viktigt mejl
                  trillar in eller en ny instruktion ges i Slack, djuplänkar du
                  direkt för att manuellt skjuta in kravet i motorn.
                </p>
              </div>
            </div>

            {/* Interactive Callback Trigger for the Manual Input form */}
            {onNavigateToManualAdd && (
              <button
                onClick={onNavigateToManualAdd}
                className="mt-2 sm:mt-0 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer self-end sm:self-center"
              >
                Testa lägga till krav
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
