import sqlite3 from "sqlite3";
import {
  CREATE_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS,
  DROP_BOOKS_TABLE,
} from "../../sql-queries/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  db.run(CREATE_BOOKS_TABLE, () => {
    db.run(INSERT_BOOK, "Ruby入門", function () {
      console.log(this.lastID);

      db.each(
        SELECT_BOOKS,
        (_, row) => {
          console.log(row);
        },
        () => {
          db.run(DROP_BOOKS_TABLE);
        },
      );
    });
  });
};

main();
