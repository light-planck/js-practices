import sqlite3 from "sqlite3";
import {
  runAsPromise,
  eachAsPromise,
  SELECT_BOOKS_BY_AUTHOR_SQL,
  CREATE_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  BOOK,
  DROP_BOOKS_TABLE_SQL,
} from "../../lib/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE_SQL)
    .then(() => runAsPromise(db, INSERT_BOOK_SQL, null))
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR_SQL, BOOK.AUTHOR))
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      runAsPromise(db, DROP_BOOKS_TABLE_SQL);
    });
};

main();
