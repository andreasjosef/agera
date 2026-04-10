import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const DOCS_CONTENT_DIR = path.join(
  ROOT_DIR,
  "apps",
  "docs",
  "src",
  "content",
  "docs",
);

const SOURCES = [
  { dir: "packages", target: path.join(DOCS_CONTENT_DIR, "packages") },
  { dir: "apps", target: path.join(DOCS_CONTENT_DIR, "apps") },
];

/**
 * Extracts title, cleans '@' symbols, and wraps in frontmatter.
 */
function processReadme(filePath, fallbackTitle) {
  const rawContent = fs.readFileSync(filePath, "utf-8");

  // Find first # or ## header
  const titleMatch = rawContent.match(/^(?:#|##)\s+(.*)/m);
  let title = fallbackTitle;
  let body = rawContent;

  if (titleMatch) {
    title = titleMatch[1].trim();
    // Remove the original header from the body
    body = rawContent.replace(titleMatch[0], "").trim();
  }

  // Remove '@' from title (@ccpilot/domain -> ccpilot/core)
  const cleanTitle = title.replace(/@/g, "");
  const safeTitle = JSON.stringify(cleanTitle);

  return `---\ntitle: ${safeTitle}\n---\n\n${body.trim()}`;
}

/**
 * Performs a "smart sync" — only writes if the generated output differs.
 */
function writeIfChanged(targetPath, newContent) {
  if (fs.existsSync(targetPath)) {
    const currentOnDisk = fs.readFileSync(targetPath, "utf-8");
    if (currentOnDisk === newContent) return false;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, newContent, "utf-8");
  return true;
}

function syncDocs() {
  console.log("Starting documentation sync...");
  let updates = 0;

  // Process Packages & Apps
  for (const { dir, target } of SOURCES) {
    const sourcePath = path.join(ROOT_DIR, dir);
    if (!fs.existsSync(sourcePath)) continue;

    const folders = fs
      .readdirSync(sourcePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const folderName of folders) {
      // Avoid syncing the docs app into itself
      if (dir === "apps" && folderName === "docs") continue;

      const readmePath = path.join(sourcePath, folderName, "README.md");
      if (!fs.existsSync(readmePath)) continue;

      try {
        const finalMd = processReadme(readmePath, folderName);
        const targetFile = path.join(target, `${folderName}.md`);

        if (writeIfChanged(targetFile, finalMd)) {
          console.log(`✅ Updated: ${dir}/${folderName}`);
          updates++;
        }
      } catch (err) {
        console.error(`❌ Error in ${folderName}:`, err.message);
      }
    }
  }

  // Process Root README -> reference.md
  const rootReadme = path.join(ROOT_DIR, "README.md");
  const refTarget = path.join(DOCS_CONTENT_DIR, "reference.md");

  if (fs.existsSync(rootReadme)) {
    try {
      const refMd = processReadme(rootReadme, "Reference");
      if (writeIfChanged(refTarget, refMd)) {
        console.log("✅ Updated: Root README -> reference.md");
        updates++;
      }
    } catch (err) {
      console.error("❌ Error in Root README:", err.message);
    }
  }

  updates === 0
    ? console.log("Everything is already up to date.")
    : console.log(`\nSync complete. ${updates} files modified.`);
}

syncDocs();
