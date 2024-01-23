import sqlite3 from "sqlite3";
import {
  eachAsPromise,
  runAsPromise,
} from "../../lib/sqlite-promise-wrappers.js";
import {
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_BY_AUTHOR_SQL,
} from "../../lib/sql-books-queries.js";
import { BOOK } from "../../lib/books.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(db, CREATE_BOOKS_TABLE_SQL)
    .then(() => runAsPromise(db, INSERT_BOOK_SQL, null))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR_SQL, BOOK.AUTHOR))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      runAsPromise(db, DROP_BOOKS_TABLE_SQL);
    });
};

main();
