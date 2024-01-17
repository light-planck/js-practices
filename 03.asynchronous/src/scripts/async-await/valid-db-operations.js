import sqlite3 from "sqlite3";
import {
  runAsPromise,
  eachAsPromise,
  BOOK,
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_SQL,
} from "../../lib/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(db, CREATE_BOOKS_TABLE_SQL);

  const result = await runAsPromise(db, INSERT_BOOK_SQL, BOOK.TITLE);
  console.log(result.lastID);

  await eachAsPromise(db, SELECT_BOOKS_SQL, (_, row) => {
    console.log(row);
  });

  await runAsPromise(db, DROP_BOOKS_TABLE_SQL);
};

main();
