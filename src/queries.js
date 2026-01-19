const listRealms = `
  SELECT id, name
  FROM realms
  ORDER BY name
`;

const charactersByRealm = `
  SELECT id, name, role
  FROM characters
  WHERE realm_id = $1
  ORDER BY name
`;

const listItems = `
  SELECT id, name, type, power
  FROM items
  ORDER BY name
`;

module.exports = {
  listRealms,
  charactersByRealm,
  listItems,
};
