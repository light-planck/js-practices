import sqlite3 from "sqlite3";
import { eachAsPromise, runAsPromise } from "../../lib/index.js";
import {
  BOOK,
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_SQL,
} from "../../constants/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE_SQL)
    .then(() => runAsPromise(db, INSERT_BOOK_SQL, [BOOK.TITLE]))
    .then((result) => {
      console.log(result.lastID);
      return eachAsPromise(db, SELECT_BOOKS_SQL);
    })
    .then((rows) => {
      rows.forEach((row) => console.log(row));
      return runAsPromise(db, DROP_BOOKS_TABLE_SQL);
    });
};

main();
