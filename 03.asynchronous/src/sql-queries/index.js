export const CREATE_BOOKS_TABLE =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

export const DROP_BOOKS_TABLE = "DROP TABLE books";

export const INSERT_BOOK = "INSERT INTO books (title) VALUES (?)";

export const SELECT_BOOKS_BY_AUTHOR = "SELECT * FROM books WHERE author = (?)";

export const SELECT_BOOKS = "SELECT * FROM books";
