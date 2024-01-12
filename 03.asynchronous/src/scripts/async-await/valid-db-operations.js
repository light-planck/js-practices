import sqlite3 from "sqlite3";
import { runAsPromise, eachAsPromise } from "../../lib/index.js";
import {
  CREATE_BOOKS_TABLE,
  DROP_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS,
} from "../../sql-queries/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(db, CREATE_BOOKS_TABLE);

  const result = await runAsPromise(db, INSERT_BOOK, ["Ruby入門"]);
  console.log(result.lastID);

  const rows = await eachAsPromise(db, SELECT_BOOKS);
  rows.forEach((row) => console.log(row));

  await runAsPromise(db, DROP_BOOKS_TABLE);
};

main();
