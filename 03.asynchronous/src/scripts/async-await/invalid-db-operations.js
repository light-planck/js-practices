import sqlite3 from "sqlite3";
import { eachAsPromise, handleErrors, runAsPromise } from "../../lib/index.js";
import {
  CREATE_BOOKS_TABLE,
  DROP_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS_BY_AUTHOR,
} from "../../sql-queries/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(db, CREATE_BOOKS_TABLE);

  try {
    await runAsPromise(db, INSERT_BOOK, [null]);
  } catch (err) {
    handleErrors(err, "SQLITE_CONSTRAINT");
  }

  try {
    await eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR, "steve");
  } catch (err) {
    handleErrors(err, "SQLITE_ERROR");
  }

  await runAsPromise(db, DROP_BOOKS_TABLE);
};

main();
