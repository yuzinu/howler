CREATE TABLE IF NOT EXISTS howls (
    id SERIAL NOT NULL PRIMARY KEY,
    caption VARCHAR(400) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

-- SEED
-- new howl
INSERT INTO howls (caption) VALUES ('hello');

-- get all howls
-- SELECT * FROM howls;

-- drop howls table
-- DROP TABLE howls;