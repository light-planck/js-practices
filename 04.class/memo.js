#!/usr/bin/env node

import { CLIHandler } from "./lib/CLIHandler.js";
import { MemoApp } from "./lib/MemoApp.js";
import { Messages } from "./lib/Messages.js";

const main = () => {
  const app = new MemoApp("memos.json");
  const messages = new Messages({
    refer: "Choose a note you want to see:",
    delete: "Choose a note you want to delete:",
  });
  const handler = new CLIHandler(app, messages);

  handler.execute();
};

main();
