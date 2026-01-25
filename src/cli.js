const inquirer = require('inquirer');
const db = require('./db');
const q = require('./queries');

async function start() {
  console.log('\n⚔️ Welcome to Knights Quest ⚔️\n');

  // --- Select a realm ---
  const realms = (await db.query(q.listRealms)).rows;
  const { realmId } = await inquirer.prompt([
    {
      name: 'realmId',
      type: 'list',
      message: 'Choose a realm:',
      choices: realms.map(r => ({ name: r.name, value: r.id })),
    },
  ]);

  // --- Select 1–3 characters ---
  const characters = (await db.query(q.charactersByRealm, [realmId])).rows;
  const { selectedChars } = await inquirer.prompt([
    {
      name: 'selectedChars',
      type: 'checkbox',
      message: 'Select 1–3 characters for the quest:',
      choices: characters.map(c => ({ name: `${c.name} (${c.role})`, value: c.id })),
      validate: a => {
        if (a.length === 0) return 'Pick at least one character';
        if (a.length > 3) return 'You can select up to 3 characters only';
        return true;
      },
    },
  ]);

  // --- Assign items individually ---
  const items = (await db.query(q.listItems)).rows;
  const characterItemMap = {};

  for (let charId of selectedChars) {
    const char = characters.find(c => c.id === charId);
    const { assignedItems } = await inquirer.prompt([
      {
        name: 'assignedItems',
        type: 'checkbox',
        message: `Assign items for ${char.name} (optional):`,
        choices: items.map(i => ({ name: `${i.name} (${i.type}, power: ${i.power})`, value: i.id })),
      },
    ]);
    characterItemMap[charId] = assignedItems; // array of item IDs
  }

  // --- Enter quest title ---
  const { questTitle } = await inquirer.prompt([
    {
      name: 'questTitle',
      type: 'input',
      message: 'Enter a title for your quest:',
      validate: input => input.trim().length > 0 || 'Title cannot be empty',
    },
  ]);

  // --- Confirm before creating ---
  const { confirm } = await inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      message: `Create quest "${questTitle}" with ${selectedChars.length} character(s)?`,
    },
  ]);

  if (!confirm) {
    console.log('Quest creation cancelled.');
    return;
  }

  // --- Insert quest & assignments in a transaction ---
  try {
    await db.pool.query('BEGIN');

    const questResult = await db.query(q.insertQuest, [questTitle, realmId]);
    const questId = questResult.rows[0].id;

    for (let charId of selectedChars) {
      const itemsForChar = characterItemMap[charId] || [];
      for (let itemId of itemsForChar) {
        await db.query(q.insertQuestAssignment, [questId, charId, itemId]);
      }
    }

    await db.pool.query('COMMIT');

    // --- Show summary ---
    console.log(`\n✅ Quest "${questTitle}" created successfully!`);
    console.log(`Quest ID: ${questId}`);
    console.log(
      'Characters:',
      characters
        .filter(c => selectedChars.includes(c.id))
        .map(c => c.name)
    );
    console.log(
      'Items:',
      selectedChars
        .flatMap(id => characterItemMap[id] || [])
        .map(iId => items.find(i => i.id === iId).name)
    );
  } catch (err) {
    await db.pool.query('ROLLBACK');
    console.error('Error creating quest:', err);
    process.exit(1);
  }
}

start().catch(console.error);
