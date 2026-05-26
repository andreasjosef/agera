import { Card } from "../primitives/Card";
import {
  CircleQuestionMark,
  User,
  SlidersHorizontal,
  NotepadText,
  CircleCheck,
} from "lucide-react";

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

        <div className="flex gap-4">
          <Card className="transition-all duration-300 hover:-translate-y-1">
            <div className="bg-violet-100 text-violet-800 w-fit px-3 py-1 rounded-full">
              01
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-4 bg-violet-100 w-fit rounded-full">
                <User className="text-violet-800" />
              </div>

              <div>
                <h2 className="font-medium my-0.75">
                  Connect your Canvas account
                </h2>
                <p className="text-sm text-mist-500">
                  Connect your Canvas API to automatically sync assignments,
                  deadlines into Agera so you can manage all your studies in one
                  place.
                </p>
              </div>
            </div>
          </Card>

          <Card className="transition-all duration-300 hover:-translate-y-1">
            <div className="bg-violet-100 text-violet-800 w-fit px-3 py-1 rounded-full">
              02
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-4 bg-violet-100 w-fit rounded-full">
                <SlidersHorizontal className="text-violet-800" />
              </div>

              <div>
                <h2 className="font-medium my-0.75">
                  Set your energy & focus level
                </h2>
                <p className="text-sm text-mist-500">
                  Use the energy slider to show how focused or tired you feel.
                  Agera adjusts your study recommendations based on your energy.
                </p>
              </div>
            </div>
          </Card>

          <Card className="transition-all duration-300 hover:-translate-y-1">
            <div className="bg-violet-100 text-violet-800 w-fit px-3 py-1 rounded-full">
              03
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-4 bg-violet-100 w-fit rounded-full">
                <NotepadText className="text-violet-800" />
              </div>

              <div>
                <h2 className="font-medium my-0.75">Start a study session</h2>
                <p className="text-sm text-mist-500">
                  Open the Focus page to begin studying. Use the built-in study
                  timer to stay consistent, complete tasks step-by-step, and
                  track your overall progress.
                </p>
              </div>
            </div>
          </Card>

          <Card className="transition-all duration-300 hover:-translate-y-1">
            <div className="bg-violet-100 text-violet-800 w-fit px-3 py-1 rounded-full">
              04
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-4 bg-violet-100 w-fit rounded-full">
                <CircleCheck className="text-violet-800" />
              </div>

              <div>
                <h2 className="font-medium my-0.75">
                  Track progress & join the flow
                </h2>
                <p className="text-sm text-mist-500">
                  Mark tasks as completed to move forward through your study
                  plan. Choose between studying alone in Solo Mode or joining
                  Flow Mode to study together with others.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg text-mist-900 mb-3">
              How the Focus page works
            </h3>

            <p className="text-sm leading-7 text-mist-500">
              The Focus page is your main study workspace. You can start a
              timer, view active assignments, track completed tasks, and stay
              concentrated during study sessions without distractions.
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg text-mist-900 mb-3">
              Solo Mode vs Flow Mode
            </h3>

            <p className="text-sm leading-7 text-mist-500">
              Solo Mode is designed for independent studying with your own pace
              and schedule. Flow Mode allows you to join shared study sessions
              and stay motivated together with other students.
            </p>
          </div>
        </Card>
      </div>
    </Card>
  );
}
