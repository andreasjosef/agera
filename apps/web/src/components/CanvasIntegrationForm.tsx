import { type IntegrationToken } from "@ccpilot/domain";
import { useState } from "react";

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
    <form className="grid bg-app-surface p-4 gap-y-4" onSubmit={handleSubmit}>
      <label className="grid" htmlFor="canvas-token">
        Canvas Access Token:
        <input
          name="token"
          type="password"
          className="border-app-border border-2 p-1"
          id="canvas-token"
        />
      </label>

      <button
        className="primary-button bg-canvas-primary outline-canvas-primary hover:bg-canvas-hover focus:bg-canvas-hover"
        type="submit"
        disabled={isLoading}
      >
        Connect
      </button>

      {errorMessage && <p> {errorMessage} </p>}
    </form>
  );
}
