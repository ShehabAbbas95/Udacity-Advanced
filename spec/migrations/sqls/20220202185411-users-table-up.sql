Create TABLE users (
    id SERIAL PRIMARY KEY,
    username char(100),
    hash char(150),
    token varchar(520),
    firstname CHAR(100),
    lastname CHAR(100),
    role char(10)
);
