import sqlite3 from "sqlite3";

const main = () => {
  const db = new sqlite3.Database(":memory:");

  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books (title) VALUES (?)", null, (err) => {
        console.log(err);

        db.run("SELECT * FROM books WHERE author = (?)", "steve", (err) => {
          console.log(err);

          db.run("DROP TABLE books");
        });
      });
    },
  );
};

main();
