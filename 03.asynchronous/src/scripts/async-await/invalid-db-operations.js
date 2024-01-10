import sqlite3 from "sqlite3";
import { getAsPromise, runAsPromise } from "../lib/index.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await runAsPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await runAsPromise(db, "INSERT INTO books (title) VALUES (?)", [null]);
  } catch (error) {
    console.log(error);
  }

  try {
    await getAsPromise(db, "SELECT * FROM books WHERE author = (?)", "steve");
  } catch (error) {
    console.log(error);
  }

  await runAsPromise(db, "DROP TABLE books");
};

main();
