import sqlite3 from "sqlite3";
import { eachAsPromise, runAsPromise } from "../../lib/index.js";
import {
  BOOK,
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_SQL,
} from "../../lib/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE_SQL)
    .then(() => runAsPromise(db, INSERT_BOOK_SQL, BOOK.TITLE))
    .then((result) => {
      console.log(result.lastID);
      return eachAsPromise(db, SELECT_BOOKS_SQL, (_, row) => {
        console.log(row);
      });
    })
    .finally(() => runAsPromise(db, DROP_BOOKS_TABLE_SQL));
};

main();
