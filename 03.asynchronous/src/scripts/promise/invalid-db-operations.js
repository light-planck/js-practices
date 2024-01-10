import sqlite3 from "sqlite3";
import { runAsPromise, eachAsPromise } from "../../lib/index.js";
import {
  CREATE_BOOKS_TABLE,
  DROP_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS_BY_AUTHOR,
} from "../../sql-queries/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE)
    .then(() => runAsPromise(db, INSERT_BOOK, [null]))
    .catch((err) => console.log(err.message))
    .then(() => eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR), ["steve"])
    .catch((err) => console.log(err.message))
    .finally(() => runAsPromise(db, DROP_BOOKS_TABLE));
};

main();
