#!/usr/bin/env node

import { createInterface } from "node:readline";
import { stdin, argv } from "node:process";
import { parseLine } from "./parser.ts";
import * as View from "./view.ts";

const rl = createInterface({ input: stdin, terminal: false });

const isFastMode = argv.includes("--fast");
const START_THRESHOLD = isFastMode ? 0 : 1500;
const SUCCESS_DELAY = isFastMode ? 200 : 600;

let lastStartTime = 0;
let successTimer: NodeJS.Timeout | null = null;
let errorCount = 0;
let isCompiling = false;
const seenErrors = new Set<string>();
const currentErrors: any[] = [];

// Initial boot
View.renderUI(0, false);

rl.on("line", (line) => {
  if (!line.trim()) return;

  const action = parseLine(line);
  const now = Date.now();

  if (action.type === "start") {
    if (successTimer) clearTimeout(successTimer);
    isCompiling = true;

    if (now - lastStartTime > START_THRESHOLD) {
      lastStartTime = now;
      seenErrors.clear();
      currentErrors.length = 0;
      errorCount = 0;
      View.renderUI(errorCount, isCompiling);
    }
  }

  if (action.type === "error") {
    if (successTimer) clearTimeout(successTimer);
    const sig = `${action.payload.file}:${action.payload.line}:${action.payload.code}`;

    if (!seenErrors.has(sig)) {
      seenErrors.add(sig);
      currentErrors.push(action.payload);
      errorCount++;
      // Stream error to screen immediately
      View.printError(action.payload);
    }
  }

  if (action.type === "complete") {
    isCompiling = false;
    if (successTimer) clearTimeout(successTimer);

    successTimer = setTimeout(() => {
      // Flip header to idle state (Clean or X Errors)
      View.renderUI(errorCount, isCompiling);

      // If there are errors, keep them visible below the new idle header
      if (errorCount > 0) {
        currentErrors.forEach((err) => View.printError(err));
      }
    }, SUCCESS_DELAY);
  }
});
