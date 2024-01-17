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
  BOOKS_TITLE_NOT_NULL_CONSTRAINT_ERROR,
  NO_SUCH_COLUMN_AUTHOR_ERROR,
} from "../../lib/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(db, CREATE_BOOKS_TABLE_SQL);

  try {
    await runAsPromise(db, INSERT_BOOK_SQL, null);
  } catch (err) {
    handleErrors(err, BOOKS_TITLE_NOT_NULL_CONSTRAINT_ERROR);
  }

  try {
    await eachAsPromise(db, SELECT_BOOKS_BY_AUTHOR_SQL, BOOK.AUTHOR);
  } catch (err) {
    handleErrors(err, NO_SUCH_COLUMN_AUTHOR_ERROR);
  }

  await runAsPromise(db, DROP_BOOKS_TABLE_SQL);
};

main();
