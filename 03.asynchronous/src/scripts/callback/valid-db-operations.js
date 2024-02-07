import sqlite3 from "sqlite3";
import {
  CREATE_BOOKS_TABLE_SQL,
  DROP_BOOKS_TABLE_SQL,
  INSERT_BOOK_SQL,
  SELECT_BOOKS_SQL,
} from "../../lib/sql-books-queries.js";
import { BOOK } from "../../lib/books.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  db.run(CREATE_BOOKS_TABLE_SQL, () => {
    db.run(INSERT_BOOK_SQL, BOOK.TITLE, function () {
      console.log(this.lastID);

      db.each(
        SELECT_BOOKS_SQL,
        (_, row) => {
          console.log(row);
        },
        () => {
          db.run(DROP_BOOKS_TABLE_SQL);
        },
      );
    });
  });
};

main();
