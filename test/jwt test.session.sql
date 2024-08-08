CREATE TABLE users (
    email VARCHAR(40) PRIMARY KEY,
    password VARCHAR(40)
);
SELECT *
FROM users
WHERE email = "abdo@gamil.com";
SELECT *
FROM users;
UPDATE users
SET userTypeId = 1
WHERE id = 1;