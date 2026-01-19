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

  // --- Select characters ---
  const characters = (await db.query(q.charactersByRealm, [realmId])).rows;

  const { selectedChars } = await inquirer.prompt([
    {
      name: 'selectedChars',
      type: 'checkbox',
      message: 'Select characters for the quest:',
      choices: characters.map(c => ({ name: `${c.name} (${c.role})`, value: c.id })),
      validate: a => a.length > 0 || 'Pick at least one character',
    },
  ]);

  // --- Select items ---
  const items = (await db.query(q.listItems)).rows;

  const { selectedItems } = await inquirer.prompt([
    {
      name: 'selectedItems',
      type: 'checkbox',
      message: 'Select items to assign to characters (optional):',
      choices: items.map(i => ({ name: `${i.name} (${i.type}, power: ${i.power})`, value: i.id })),
    },
  ]);

  // --- Enter quest title ---
  const { questTitle } = await inquirer.prompt([
    {
      name: 'questTitle',
      type: 'input',
      message: 'Enter a title for your quest:',
      validate: input => input.length > 0 || 'Title cannot be empty',
    },
  ]);

  // --- Insert quest and assignments in a transaction ---
  try {
    await db.pool.query('BEGIN');

    // Insert the quest using queries.js
    const questResult = await db.query(q.insertQuest, [questTitle, realmId]);
    const questId = questResult.rows[0].id;

    // Insert assignments for selected characters and items
    for (let charId of selectedChars) {
      for (let itemId of selectedItems) {
        await db.query(q.insertQuestAssignment, [questId, charId, itemId]);
      }
    }

    await db.pool.query('COMMIT');

    // --- Summary output ---
    console.log(`\n✅ Quest "${questTitle}" created successfully!`);
    console.log(`Quest ID: ${questId}`);
    console.log('Characters:', characters.filter(c => selectedChars.includes(c.id)).map(c => c.name));
    console.log('Items:', items.filter(i => selectedItems.includes(i.id)).map(i => i.name));
  } catch (err) {
    await db.pool.query('ROLLBACK');
    console.error('Error creating quest:', err);
    process.exit(1);
  }
}

start().catch(console.error);
