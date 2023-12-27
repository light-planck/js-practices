import sqlite3 from "sqlite3";
import { getAsPromise, runAsPromise } from "../lib/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  ).then(() => {
    return runAsPromise(db, "INSERT INTO books (title) VALUES (?)", [null])
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        return getAsPromise(
          db,
          "SELECT * FROM books WHERE author = (?)",
          "steve",
        ).catch((err) => {
          console.log(err);
        });
      })
      .then(() => {
        return runAsPromise(db, "DROP TABLE books");
      });
  });
};

main();
