DROP DATABASE IF EXISTS booklist;
CREATE DATABASE booklist;

\c booklist;

CREATE TABLE have_read (
  title VARCHAR PRIMARY KEY NOT NULL,
  author VARCHAR,
  finished_on DATE,
  genre VARCHAR,
  keywords VARCHAR[]
);