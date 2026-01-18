CREATE TABLE realms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  ruler VARCHAR(100),
  description TEXT
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  realm_id INTEGER REFERENCES realms(id)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  power INTEGER
);

CREATE TABLE quests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  realm_id INTEGER REFERENCES realms(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE quest_assignments (
  id SERIAL PRIMARY KEY,
  quest_id INTEGER REFERENCES quests(id) ON DELETE CASCADE,
  character_id INTEGER REFERENCES characters(id),
  item_id INTEGER REFERENCES items(id)
);
