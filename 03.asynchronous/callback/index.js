import sqlite3 from "sqlite3";

const main = () => {
  const db = new sqlite3.Database(":memory:");
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", "Ruby入門", function () {
        console.log(this.lastID);

        db.each("SELECT * FROM books", (err, row) => {
          console.log(row);

          db.run("DROP TABLE books");
        });
      });
    },
  );
};

main();
