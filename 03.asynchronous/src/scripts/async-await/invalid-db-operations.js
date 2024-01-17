import sqlite3 from "sqlite3";
import {
  eachAsPromise,
  handleErrors,
  runAsPromise,
  BOOK,
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_BY_AUTHOR_SQL,
} from "../../lib/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(db, CREATE_BOOKS_TABLE_SQL);

  try {
    await runAsPromise(db, INSERT_BOOK_SQL, null);
  } catch (err) {
    handleErrors(err, "SQLITE_CONSTRAINT");
  }

  try {
    await eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR_SQL, BOOK.AUTHOR);
  } catch (err) {
    handleErrors(err, "SQLITE_ERROR");
  }

  await runAsPromise(db, DROP_BOOKS_TABLE_SQL);
};

main();
