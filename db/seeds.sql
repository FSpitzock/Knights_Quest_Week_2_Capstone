INSERT INTO realms (name, ruler, description) VALUES
('Knights Realm', 'King Aldric', 'Home of noble knights'),
('Sapphire Coast', 'Queen Maris', 'Trade and naval power'),
('Iron Peaks', 'Warlord Durn', 'Harsh mountain stronghold');

INSERT INTO characters (name, role, realm_id) VALUES
('Sir Rowan', 'Knight', 1),
('Elric', 'Mage', 1),
('Nyssa', 'Rogue', 2),
('Borin', 'Warrior', 3);

INSERT INTO items (name, type, power) VALUES
('Steel Sword', 'Weapon', 10),
('Healing Potion', 'Potion', 5),
('Fire Scroll', 'Scroll', 8);
