import { type IntegrationToken } from "@ccpilot/domain";
import { Button, LabeledInput } from "@ccpilot/ui";
import { useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";

interface CanvasIntegrationFormProps {
  onSubmit: (data: IntegrationToken) => void;
  isLoading: boolean;
  connectionError?: string;
}

export default function CanvasIntegrationForm({
  onSubmit,
  isLoading,
  connectionError,
}: CanvasIntegrationFormProps) {
  const [errorMessage, setErrorMessage] = useState(connectionError);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // TODO: Safe parse form data here ?
    const data = {
      token: formData.get("token"),
      provider: "CANVAS",
    } as IntegrationToken;

    if (!data.token) {
      setErrorMessage("Connection token must not be empty");
      return;
    }

    onSubmit(data);
  };

  // TODO: We should probably load the existing canvas token as default value
  return (
    <>
      <form
        className="grid bg-app-surface p-4 gap-y-6 surface-container"
        onSubmit={handleSubmit}
      >
        <LabeledInput
          label="Canvas Åtkomsttoken"
          type="password"
          id="canvas-token"
          placeholder="Klistra in din Canvas access token"
        />

        <Button
          className="primary-button bg-canvas-primary outline-canvas-primary hover:bg-canvas-hover focus:bg-canvas-hover"
          type="submit"
          disabled={isLoading}
        >
          Anslut
        </Button>

        {errorMessage && <p> {errorMessage} </p>}

        <div className="flex flex-col items-center gap-2">
          <a
            href="https://chasacademy.instructure.com/profile/settings"
            target="_blank"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-4 text-sm font-medium text-violet-600"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
            Ta mig till Canvas
          </a>

          <p className="mt-2 text-sm text-mist-400">
            Öppna Canvas i en ny flik för att hämta din åtkomsttoken
          </p>
        </div>
      </form>
    </>
  );
}
