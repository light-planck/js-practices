import sqlite3 from "sqlite3";
import {
  CREATE_BOOKS_TABLE,
  DROP_BOOKS_TABLE,
  INSERT_BOOK,
  SELECT_BOOKS_BY_AUTHOR,
} from "../../sql-queries/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  db.run(CREATE_BOOKS_TABLE, () => {
    db.run(INSERT_BOOK, null, (err) => {
      console.error(err.message);

      db.each(
        SELECT_BOOKS_BY_AUTHOR,
        "steve",
        () => {},
        (err) => {
          if (err) console.error(err.message);
          db.run(DROP_BOOKS_TABLE);
        },
      );
    });
  });
};

main();
