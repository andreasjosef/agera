import { Card } from "../primitives/Card";
import {
  CircleQuestionMark,
  User,
  SlidersHorizontal,
  NotepadText,
  CircleCheck,
} from "lucide-react";

const helpSteps = [
  {
    number: "01",
    title: "Anslut ditt Canvas-konto",
    description:
      "Anslut ditt Canvas API för att automatiskt synkronisera uppgifter och deadlines till Agera så att du kan hantera alla dina studier på ett och samma ställe.",
    buttonText: "Anslut konto →",
    icon: User,
  },
  {
    number: "02",
    title: "Ställ in din energi- och fokusnivå",
    description:
      "Använd energireglaget för att visa hur fokuserad eller trött du känner dig. Agera anpassar dina studie­rekommendationer baserat på din energi.",
    buttonText: "Justera energi →",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Starta en studiesession",
    description:
      "Öppna Fokus-sidan för att börja studera. Använd den inbyggda studietimern för att hålla dig konsekvent, slutföra uppgifter steg för steg och följa dina framsteg.",
    buttonText: "Gå till Fokus →",
    icon: NotepadText,
  },
  {
    number: "04",
    title: "Följ framsteg & gå med i flödet",
    description:
      "Markera uppgifter som slutförda för att gå vidare i din studieplan och hålla koll på dina framsteg. Välj mellan att studera ensam eller tillsammans med andra för extra motivation och fokus.",
    buttonText: "Utforska Flow-läget →",
    icon: CircleCheck,
  },
];

const infoCards = [
  {
    title: "Så fungerar Fokus-sidan",
    description:
      "Fokus-sidan är din huvudsakliga studieyta. Du kan starta en timer, visa aktiva uppgifter, följa slutförda uppgifter och hålla koncentrationen under studiesessioner utan distraktioner.",
  },
  {
    title: "Solo-läge vs Flow-läge",
    description:
      "Solo-läget är utformat för självständiga studier i din egen takt och enligt ditt eget schema. Flow-läget låter dig delta i gemensamma studiesessioner och hålla motivationen uppe tillsammans med andra studenter.",
  },
];

function HelpStepCard({
  number,
  title,
  description,
  buttonText,
  icon: Icon,
}: (typeof helpSteps)[0]) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1">
      <div className="bg-violet-100 text-violet-800 w-fit px-3 py-1 rounded-full">
        {number}
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <div className="p-4 bg-violet-100 w-fit rounded-full">
          <Icon className="text-violet-800" />
        </div>

        <div>
          <h2 className="font-medium my-0.75">{title}</h2>

          <p className="text-sm text-mist-500">{description}</p>
        </div>

        <button className="mt-4 px-6 py-1.75 border text-sm w-full rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all cursor-pointer">
          {buttonText}
        </button>
      </div>
    </Card>
  );
}

export function Help() {
  return (
    <Card>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="flex gap-2 items-center text-3xl">
            <CircleQuestionMark className="w-7.5 h-7.5 bg-orange-400 rounded-full text-white" />
            Hjälpcenter
          </h1>

          <p className="text-mist-500 mt-1">
            Allt du behöver för att komma igång med Agera och hålla fokus medan
            du studerar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {helpSteps.map((step) => (
            <HelpStepCard key={step.number} {...step} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        {infoCards.map((card) => (
          <Card key={card.title}>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-mist-900 mb-3">
                {card.title}
              </h3>

              <p className="text-sm leading-7 text-mist-500">
                {card.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
