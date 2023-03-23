CREATE TABLE howls (
    id SERIAL NOT NULL PRIMARY KEY,
    caption VARCHAR(400),
    createdAt TIMESTAMPTZ DEFAULT current_timestamp
    updatedAt TIMESTAMPTZ DEFAULT current_timestamp
);

-- new howl
-- INSERT INTO howls (caption) VALUES('hello');

-- get all howls
-- SELECT * FROM howls;