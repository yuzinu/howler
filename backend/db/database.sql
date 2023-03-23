CREATE TABLE howls (
    id SERIAL NOT NULL PRIMARY KEY,
    caption VARCHAR(400),
    createdAt timestamp with time zone
);

-- new howl
-- INSERT INTO howls (caption, createdAt) VALUES('hello', NOW());

-- get all howls
-- SELECT * FROM howls;