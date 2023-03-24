CREATE TABLE howls (
    id SERIAL NOT NULL PRIMARY KEY,
    caption VARCHAR(400),
    created_at TIMESTAMPTZ DEFAULT current_timestamp - interval '4 hours',
    updated_at TIMESTAMPTZ DEFAULT current_timestamp - interval '4 hours'
);

-- new howl
INSERT INTO howls (caption) VALUES('hello');

-- get all howls
SELECT * FROM howls;