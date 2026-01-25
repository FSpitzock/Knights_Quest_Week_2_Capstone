// List all realms
const listRealms = `
  SELECT id, name
  FROM realms
  ORDER BY name
`;

// Fetch characters for a specific realm
const charactersByRealm = `
   
`;

// List all items
const listItems = `
  SELECT id, name, type, power
  FROM items
  ORDER BY name
`;

// Insert a new quest and return its ID
const insertQuest = `
  INSERT INTO quests (title, realm_id)
  VALUES ($1, $2)
  RETURNING id
`;

// Insert a quest assignment (quest_id, character_id, item_id)
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