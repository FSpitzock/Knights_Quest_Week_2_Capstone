-- Realms
INSERT INTO realms (name, ruler, description) VALUES
('Knights Realm', 'King Aldric', 'Home of noble knights'),
('Sapphire Coast', 'Queen Maris', 'Trade and naval power'),
('Iron Peaks', 'Warlord Durn', 'Harsh mountain stronghold');

-- Characters
INSERT INTO characters (name, role, realm_id) VALUES
('Sir Rowan', 'Knight', 1),
('Elric', 'Mage', 1),
('Lyria', 'Archer', 2),
('Nyssa', 'Rogue', 2),
('Borin', 'Warrior', 3),
('Thane', 'Paladin', 1);

-- Items
INSERT INTO items (name, type, power) VALUES
('Steel Sword', 'Weapon', 10),
('Healing Potion', 'Potion', 5),
('Fire Scroll', 'Scroll', 8),
('Ice Dagger', 'Weapon', 7),
('Mana Potion', 'Potion', 6);

-- Optional initial quest
INSERT INTO quests (title, realm_id) VALUES ('First Quest', 1);

-- Assignments for the first quest
INSERT INTO quest_assignments (quest_id, character_id, item_id) VALUES
(1, 1, 1),
(1, 2, 3);