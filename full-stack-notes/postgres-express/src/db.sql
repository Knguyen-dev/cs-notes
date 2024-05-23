-- Create the database for the todo app
CREATE DATABASE perntodo;

-- Create table for containing todos
CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);