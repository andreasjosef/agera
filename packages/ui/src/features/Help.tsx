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
    title: "Connect your Canvas account",
    description:
      "Connect your Canvas API to automatically sync assignments, deadlines into Agera so you can manage all your studies in one place.",
    buttonText: "Connect account →",
    icon: User,
  },
  {
    number: "02",
    title: "Set your energy & focus level",
    description:
      "Use the energy slider to show how focused or tired you feel. Agera adjusts your study recommendations based on your energy.",
    buttonText: "Adjust energy →",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Start a study session",
    description:
      "Open the Focus page to begin studying. Use the built-in study timer to stay consistent, complete tasks step-by-step, and track your overall progress.",
    buttonText: "Go to Focus →",
    icon: NotepadText,
  },
  {
    number: "04",
    title: "Track progress & join the flow",
    description:
      "Mark tasks as completed to move forward through your study plan. Choose between studying alone in Solo Mode or joining Flow Mode to study together with others.",
    buttonText: "Explore Flow Mode →",
    icon: CircleCheck,
  },
];

const infoCards = [
  {
    title: "How the Focus page works",
    description:
      "The Focus page is your main study workspace. You can start a timer, view active assignments, track completed tasks, and stay concentrated during study sessions without distractions.",
  },
  {
    title: "Solo Mode vs Flow Mode",
    description:
      "Solo Mode is designed for independent studying with your own pace and schedule. Flow Mode allows you to join shared study sessions and stay motivated together with other students.",
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

        <button className="mt-4 px-6 py-1.5 rounded-2xl border transition text-sm">
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
        <div>
          <h1 className="flex gap-2 items-center text-3xl">
            <CircleQuestionMark className="w-7.5 h-7.5 bg-orange-400 rounded-full text-white" />
            Help Center
          </h1>

          <p className="text-mist-500 mt-1">
            Everything you need to get started with Agera and stay focused while
            studying.
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
