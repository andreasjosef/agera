import { execSync, spawn } from "child_process";
import { promisify } from "util";
import os from "os";

const sleep = promisify(setTimeout);
const isWindows = os.platform() === "win32";

// Formatting & Colors ---
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
const blue = "\x1b[34m";

const info = (msg) => console.log(`${blue}ℹ${reset} ${msg}`);
const success = (msg) => console.log(`${green}✔${reset} ${msg}`);
const step = (msg) => console.log(`\n${bold}${cyan}👉 ${msg}${reset}`);
const error = (msg) => console.log(`${red}✘ ${bold}${msg}${reset}`);

async function run() {
  console.clear();
  console.log(
    `${bold}${blue}╔════════════════════════════════════════════╗${reset}`,
  );
  console.log(
    `${bold}${blue}║       CCPILOT - DEV ENVIRONMENT BOOTSTRAP      ║${reset}`,
  );
  console.log(
    `${bold}${blue}╚════════════════════════════════════════════╝${reset}\n`,
  );

  let dockerCmd = "docker";
  try {
    execSync("docker -v", { stdio: "ignore" });
  } catch {
    try {
      execSync("podman -v", { stdio: "ignore" });
      dockerCmd = "podman";
    } catch {
      error("Neither Docker nor Podman was found in your PATH.");
      process.exit(1);
    }
  }

  info(`Using container engine: ${bold}${dockerCmd}${reset}`);

  step("Starting database container...");
  try {
    execSync(`${dockerCmd} compose up -d db`, { stdio: "inherit" });
  } catch (e) {
    error("Failed to start container. Ensure your engine is running.");
    process.exit(1);
  }

  step("Waiting for Postgres to be ready...");
  let isReady = false;
  let attempts = 0;

  while (!isReady && attempts < 20) {
    try {
      execSync(`${dockerCmd} exec ccpilot_db pg_isready -U ccpilot_admin`, {
        stdio: "ignore",
      });
      isReady = true;
    } catch {
      process.stdout.write(`${dim}.${reset}`);
      await sleep(1000);
      attempts++;
    }
  }

  if (!isReady) {
    console.log("\n");
    error("Database failed to start in time.");
    process.exit(1);
  }
  console.log("\n");
  success("Database is online and ready!");

  step("Syncing Domain Schema with Drizzle...");
  try {
    execSync("pnpm --filter domain db:push", {
      stdio: "inherit",
      shell: isWindows,
    });
    success("Schema synchronized.");
  } catch (e) {
    error("Schema sync failed. Check your Zod models.");
    process.exit(1);
  }

  step("Starting development servers via Turbo...");
  console.log(`${dim}Watching: apps/web & apps/express & apps/docs${reset}\n`);

  const pnpmCmd = isWindows ? "pnpm.cmd" : "pnpm";
  const turboArgs = [
    "turbo",
    "dev",
    "--filter",
    "@ccpilot/web",
    "--filter",
    "@ccpilot/express",
    "--filter",
    "@ccpilot/docs",
  ];

  const turbo = spawn(pnpmCmd, turboArgs, {
    stdio: "inherit",
    shell: true,
  });

  // Handle clean exit
  process.on("SIGINT", () => {
    console.log(
      `\n${yellow}👋 Shutting down CCPilot... See you next time!${reset}`,
    );
    turbo.kill();
    process.exit();
  });
}

run().catch((err) => {
  error(`A critical error occurred: ${err.message}`);
  process.exit(1);
});
