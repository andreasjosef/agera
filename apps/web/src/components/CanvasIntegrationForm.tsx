import { TokenPayload } from "@ccpilot/domain";
import { useState } from "react";

interface CanvasIntegrationFormProps {
  onSubmit: (data: TokenPayload) => void;
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
    } as TokenPayload;

    if (!data.token) {
      setErrorMessage("Connection token must not be empty");
      return;
    }

    onSubmit(data);
  };

  // TODO: We should probably load the existing canvas token as default value
  return (
    <form className="grid bg-neutral-200 p-4" onSubmit={handleSubmit}>
      <label className="grid" htmlFor="canvas-token">
        Canvas Access Token:
        <input
          name="token"
          type="password"
          className="outline outline-blue-950 rounded-sm"
          id="canvas-token"
        />
      </label>

      <button type="submit" disabled={isLoading}>
        Connect
      </button>

      {errorMessage && <p> {errorMessage} </p>}
    </form>
  );
}
