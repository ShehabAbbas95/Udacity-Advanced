CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    user_id integer REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    date date
);
