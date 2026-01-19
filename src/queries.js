// Select all realms
const listRealms = `
  SELECT id, name
  FROM realms
  ORDER BY name
`;

// Select characters by realm
const charactersByRealm = `
  SELECT id, name, role
  FROM characters
  WHERE realm_id = $1
  ORDER BY name
`;

// Select all items
const listItems = `
  SELECT id, name, type, power
  FROM items
  ORDER BY name
`;


// Insert a new quest
// Returns the id of the new quest
const insertQuest = `
  INSERT INTO quests (title, realm_id)
  VALUES ($1, $2)
  RETURNING id
`;

// Insert a quest assignment
// Assigns an item to a character in a quest
const insertQuestAssignment = `
  INSERT INTO quest_assignments (quest_id, character_id, item_id)
  VALUES ($1, $2, $3)
`;

module.exports = {
  listRealms,
  charactersByRealm,
  listItems,
  insertQuest,
  insertQuestAssignment,
};
