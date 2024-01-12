import sqlite3 from "sqlite3";
import { eachAsPromise, runAsPromise } from "../../lib/index.js";
import {
  CREATE_BOOKS_TABLE,
  DROP_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS,
} from "../../sql-queries/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE)
    .then(() => runAsPromise(db, INSERT_BOOK, ["Ruby入門"]))
    .then((result) => console.log(result.lastID))
    .then(() => eachAsPromise(db, SELECT_BOOKS))
    .then((rows) => rows.forEach((row) => console.log(row)))
    .finally(() => runAsPromise(db, DROP_BOOKS_TABLE));
};

main();
