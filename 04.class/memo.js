#!/usr/bin/env node

import { CLIHandler } from "./lib/CLIHandler.js";
import { MemoApp } from "./lib/MemoApp.js";

const main = () => {
  const app = new MemoApp("memos.json");
  const handler = new CLIHandler(app);

  handler.execute();
};

main();
