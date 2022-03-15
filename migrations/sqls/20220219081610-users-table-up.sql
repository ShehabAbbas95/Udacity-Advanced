Create TABLE users (
    id SERIAL PRIMARY KEY,
    username char(50),
    hash char(100),
    token char(255),
    firstname CHAR(50),
    lastname CHAR(50),
    role char(10)
);
