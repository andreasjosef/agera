import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";
import {
  HelpCircle,
  User,
  SlidersHorizontal,
  NotepadText,
  CircleCheck,
  ArrowRight,
  Sparkles,
  Users,
} from "lucide-react";

export interface HelpProps {
  onConnectCanvas?: () => void;
  onAdjustEnergy?: () => void;
  onGoToFocus?: () => void;
  onExploreFlow?: () => void;
}

interface HelpStepCardProps {
  number: string;
  title: string;
  description: string;
  buttonText: string;
  icon: typeof User;
  onAction?: () => void;
}

function HelpStepCard({
  number,
  title,
  description,
  buttonText,
  icon: Icon,
  onAction,
}: HelpStepCardProps) {
  return (
    <Card className="flex flex-col justify-between h-full p-6 transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-content-subtle font-mono">
            {number}
          </span>
          <div className="text-brand-primary">
            <Icon className="size-5 stroke-2" />
          </div>
        </div>
        <div className="space-y-1.5 text-left">
          <h3 className="font-bold text-content-main text-base leading-snug">
            {title}
          </h3>
          <p className="text-sm text-content-muted font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {onAction && (
        <div className="pt-4 text-left">
          <Button
            onClick={onAction}
            className="w-fit py-2 text-xs font-bold tracking-wide rounded-xl transition-transform"
          >
            <div className="flex gap-1">
              {buttonText}
              <ArrowRight className="size-3.5 shrink-0" />
            </div>
          </Button>
        </div>
      )}
    </Card>
  );
}

export function Help({
  onConnectCanvas,
  onAdjustEnergy,
  onGoToFocus,
  onExploreFlow,
}: HelpProps) {
  const helpSteps = [
    {
      number: "01",
      title: "Anslut ditt Canvas-konto",
      description:
        "Synkronisera dina kurser och deadlines automatiskt. Agera samlar dina utspridda studiekrav på ett och samma ställe.",
      buttonText: "Anslut konto",
      icon: User,
      onAction: onConnectCanvas,
    },
    {
      number: "02",
      title: "Justera energinivån",
      description:
        "Berätta hur mycket energi eller fokus du har för stunden. Agera skräddarsyr och anpassar dina rekommendationer direkt.",
      buttonText: "Justera energi",
      icon: SlidersHorizontal,
      onAction: onAdjustEnergy,
    },
    {
      number: "03",
      title: "Starta ditt fokusläge",
      description:
        "Vår EF-motor beräknar direkt ditt nästa logiska mikrosteg och lyfter fram relevant kontext baserat på dina cockpit-inställningar, inlämningsdatum och återstående delmoment.",
      buttonText: "Gå till Fokus",
      icon: NotepadText,
      onAction: onGoToFocus,
    },
    {
      number: "04",
      title: "Aktivera Body Doubling",
      description:
        "Nyttja en beprövad metod för att drastiskt höja din koncentration. Baserat på dina inställningar ser du i realtid exakt hur många andra som studerar i flödet just nu.",
      buttonText: "Utforska flödet",
      icon: CircleCheck,
      onAction: onExploreFlow,
    },
  ];

  const infoCards = [
    {
      icon: Sparkles,
      iconClass: "text-purple-600 bg-purple-50",
      title: "LLM-Refinement: Från kaos till mikrosteg",
      description:
        "Otydliga eller massiva instruktioner skapar ofta en oöverstiglig starttröskel. Vår inbyggda LLM-motor analyserar kurskraven djupgående, skalar bort administrativt brus och bryter ner komplexa uppgifter till konkreta, hanterbara mikrosteg berikade med tydliga 'Hur börjar jag?'-tips.",
    },
    {
      icon: Users,
      iconClass: "text-emerald-600 bg-emerald-50",
      title: "Vår dynamiska EF-motor (Executive Function)",
      description:
        "Agera fungerar som en extern exekutiv funktion. Istället för att du ska behöva prioritera, sortera och fatta beslut bland dussintals deadlines, räknar systemet ut den absolut bästa vägen framåt. Du presenteras alltid med ett enda, skräddarsytt steg i taget – helt anpassat efter din energi.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 space-y-12">
      <div className="space-y-1 text-left">
        <div className="flex items-center gap-2 text-content-subtle">
          <HelpCircle className="size-5 stroke-[1.75]" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Hjälpcenter
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-content-main tracking-tight">
          Kom igång med Agera
        </h1>
        <p className="text-base text-content-muted font-medium">
          Allt du behöver för att eliminera det administrativa kaoset och återta
          din fokuserade energi.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold tracking-widest text-content-subtle uppercase">
          Fyra grundsteg
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {helpSteps.map((step) => (
            <HelpStepCard key={step.number} {...step} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
        {infoCards.map((card) => {
          const InfoIcon = card.icon;
          return (
            <Card key={card.title} className="flex gap-4 items-start text-left">
              <div className={`p-2.5 rounded-xl shrink-0 ${card.iconClass}`}>
                <InfoIcon className="size-5 stroke-2" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-content-main tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-content-muted font-normal">
                  {card.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
