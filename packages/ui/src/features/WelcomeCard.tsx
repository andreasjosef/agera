import { Card } from "../primitives/Card";

export interface WelcomeCardProps {
  username: string;
}

// morning 6 - 12
// day 12 - 17
// evening 17 - 22
// night  22 - 6

const greetings = [
  { greeting: "Moin", message: "Der fruehe Vogel fängt den Wurm" },
  { greeting: "Guten Tag", message: "In der Ruhe liegt die Kraft" },
  { greeting: "Guten Abend", message: "Manchmal leichter Abends" },
  { greeting: "Psst", message: "In the evenings the real comes alive" },
];

const colors = ["amber", "blue", "purple", "zinc"];

export function WelcomeCard({ username }: WelcomeCardProps) {
  const timezone = 2;

  return (
    <Card className={`bg-linear-to-r from-${colors[timezone]}-100 to-white`}>
      <h2>{`${greetings[timezone].greeting} ${username}`}</h2>
      <p>{greetings[timezone].message}</p>
    </Card>
  );
}
