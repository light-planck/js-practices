import sqlite3 from "sqlite3";
import { getAsPromise, runAsPromise } from "../lib/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const id = await runAsPromise(db, "INSERT INTO books (title) VALUES (?)", [
    "Ruby入門",
  ]);
  console.log(id);

  const rows = await getAsPromise(db, "SELECT * FROM books");
  console.log(rows);

  await runAsPromise(db, "DROP TABLE books");
};

main();
