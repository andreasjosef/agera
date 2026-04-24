import { TokenPayload } from "@ccpilot/domain";

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
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // TODO: Safe parse form data here ?
    const data = {
      token: formData.get("token"),
      provider: "CANVAS",
    } as TokenPayload;

    if (!data.token) {
      // TODO: Display error in UI
      return console.error("Connection token must not be empty");
    }

    onSubmit(data);
  };

  return (
    <form className="grid bg-blue-300 p-4" onSubmit={handleSubmit}>
      <label className="grid" htmlFor="canvas-token">
        Canvas Access Token:
        <input
          name="token"
          type="text"
          className="outline outline-blue-950 rounded-sm"
          id="canvas-token"
        />
      </label>

      <button type="submit" disabled={isLoading}>
        Connect
      </button>

      {connectionError && <p> {connectionError} </p>}
    </form>
  );
}
