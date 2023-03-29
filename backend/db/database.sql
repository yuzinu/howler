-- CREATE TABLES

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username VARCHAR(16) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS howls (
  id SERIAL,
  caption VARCHAR(400) NOT NULL,
  howler_id INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (howler_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SEED DATA

INSERT INTO users (username) VALUES ('RUminion');

INSERT INTO howls (caption, howler_id)
SELECT 'Hello, are you a minion?', id
FROM users
WHERE username='RUminion';

INSERT INTO users (username) VALUES ('yuzinu');

INSERT INTO howls (caption, howler_id)
SELECT 'This is yuzinu', id
FROM users
WHERE username='yuzinu';
