import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROMPTS_DIR = path.join(
  __dirname,
  "../packages/domain/src/requirements/prompts",
);
const OUTPUT_FILE = path.join(PROMPTS_DIR, "manifest.generated.ts");

/**
 * Recursively gets all .txt files in a directory
 */
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach((file) => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.name.endsWith(".txt")) {
      results.push(fullPath);
    }
  });
  return results;
}

function generate() {
  console.log("Generating Prompt Manifest...");

  if (!fs.existsSync(PROMPTS_DIR)) {
    console.error(`Error: Prompts directory not found at ${PROMPTS_DIR}`);
    process.exit(1);
  }

  const allFiles = getFiles(PROMPTS_DIR);
  const manifest = {};

  allFiles.forEach((fullPath) => {
    const relativePath = path
      .relative(PROMPTS_DIR, fullPath)
      .replace(/\\/g, "/") // Cross-platform slashes
      .replace(".txt", "");

    const content = fs.readFileSync(fullPath, "utf-8");
    manifest[relativePath] = content.trim();
  });

  const fileContent = `/** 
 * AUTO-GENERATED FILE - DO NOT EDIT 
 * Generated on: ${new Date().toISOString()}
 **/
export const promptManifest: Record<string, string> = ${JSON.stringify(manifest, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(
    `✅ Success! Manifest generated with ${Object.keys(manifest).length} prompt parts.`,
  );
}

generate();
