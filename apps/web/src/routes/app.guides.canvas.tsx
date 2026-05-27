import { ConnectionGuide } from "@ccpilot/ui";
import { createFileRoute } from "@tanstack/react-router";
import { SquareArrowOutUpRight } from "lucide-react";

export const Route = createFileRoute("/app/guides/canvas")({
  component: RouteComponent,
});

const canvasConnectionGuideSteps = [
  {
    title: "Logga in",
    content: "Logga in på ditt Canvas-konto för att komma till din översikt.",
    link: (
      <a
        href="https://chasacademy.instructure.com/profile/settings"
        target="_blank"
        className="flex h-10 w-1/5 items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-4 text-sm font-medium text-violet-600"
      >
        <SquareArrowOutUpRight className="h-4 w-4" />
        Ta mig till Canvas
      </a>
    ),
  },
  {
    title: "Öppna inställningar",
    content:
      "Klicka på 'Konto' i sidomenyn och välj sedan 'Inställningar' i listan.",
  },
  {
    title: "Skapa token",
    content:
      "Skrolla ner till 'Godkända integreringar' och klicka på '+ Ny åtkomsttoken'. Generera din token och kopiera den.",
  },
  {
    title: "Anslut konto",
    content:
      "Gå tillbaka hit och klistra in din token i integrationsinställningarna för att slutföra installationen.",
  },
];

function RouteComponent() {
  return (
    <ConnectionGuide
      title="Hur får man sin Canvas token ?"
      steps={canvasConnectionGuideSteps}
    />
  );
}
