import os
import shutil
import re
import json
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent.resolve()
DOCS_CONTENT_DIR = ROOT_DIR / "apps" / "docs" / "src" / "content" / "docs"

# Mapparna vi ska skanna
SOURCES = [
    {"dir": "packages", "target": DOCS_CONTENT_DIR / "packages"},
    {"dir": "apps", "target": DOCS_CONTENT_DIR / "apps"}
]

def sync_docs():
    print("Skapar README-filer...")

    for source in SOURCES:
        source_dir = ROOT_DIR / source["dir"]
        target_dir = source["target"]

        if target_dir.exists():
            shutil.rmtree(target_dir)
        target_dir.mkdir(parents=True, exist_ok=True)

        if not source_dir.exists():
            continue

        for item in source_dir.iterdir():
            if not item.is_dir():
                continue

            folder_name = item.name

            if source["dir"] == "apps" and folder_name == "docs":
                continue

            readme_path = item / "README.md"
            if not readme_path.exists():
                continue

            try:
                with open(readme_path, "r", encoding="utf-8") as f:
                    content = f.read()

                title_match = re.search(r"^(?:#|##)\s+(.*)", content, re.MULTILINE)
                title = folder_name 

                if title_match:
                    title = title_match.group(1).strip()
                    content = content.replace(title_match.group(0), "", 1).strip()

                safe_title = json.dumps(title) 

                frontmatter = f"---\ntitle: {safe_title}\n---\n\n"
                final_content = frontmatter + content

                target_file_path = target_dir / f"{folder_name}.md"
                with open(target_file_path, "w", encoding="utf-8") as f:
                    f.write(final_content)

                print(f"Synkade: {source['dir']}/{folder_name}")

            except Exception as e:
                print(f"Kunde inte synka {folder_name}: {e}")

    print("Synkning klar!\n")

if __name__ == "__main__":
    sync_docs()