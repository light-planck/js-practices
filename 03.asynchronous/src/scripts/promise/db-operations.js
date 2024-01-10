import sqlite3 from "sqlite3";
import { getAsPromise, runAsPromise } from "../../lib/index.js";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  runAsPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  ).then(() => {
    return runAsPromise(db, "INSERT INTO books (title) VALUES (?)", [
      "Ruby入門",
    ])
      .then((id) => {
        console.log(id);
      })
      .then(() => {
        return getAsPromise(db, "SELECT * FROM books").then((rows) => {
          console.log(rows);
        });
      })
      .then(() => {
        return runAsPromise(db, "DROP TABLE books");
      });
  });
};

main();
