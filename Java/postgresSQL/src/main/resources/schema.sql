-- Set up our database schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

-- Create the sequence for authors table
CREATE SEQUENCE authors_id_seq;

-- Create the authors table
CREATE TABLE authors (
    id BIGINT DEFAULT nextval('authors_id_seq') NOT NULL,
    name TEXT,
    age INTEGER,
    CONSTRAINT authors_pkey PRIMARY KEY (id)
);

-- Create the books table
CREATE TABLE books (
    isbn TEXT NOT NULL,
    title TEXT,
    author_id BIGINT,
    CONSTRAINT books_pkey PRIMARY KEY (isbn),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id)
);
