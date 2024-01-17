export const CREATE_BOOKS_TABLE_SQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

export const DROP_BOOKS_TABLE_SQL = "DROP TABLE books";

export const INSERT_BOOK_SQL = "INSERT INTO books (title) VALUES (?)";

export const SELECT_BOOKS_BY_AUTHOR_SQL =
  "SELECT * FROM books WHERE author = (?)";

export const SELECT_BOOKS_SQL = "SELECT * FROM books";
