CREATE DATABASE perntodo

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    date date NOT NULL,
    price text NOT NULL,
    predicted_price text,
    notes text
);