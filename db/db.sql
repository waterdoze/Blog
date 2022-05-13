-- for help     \?

-- list database    \l

-- make database    CREATE DATABASE <database name>

-- connect to another database      \c  

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(20),
    cake_day DATE,
    karma INT
);