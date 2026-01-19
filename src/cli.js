const inquirer = require('inquirer');
const db = require('./db');
const q = require('./queries');

async function start() {
  console.log('\n⚔️ Welcome to Knights Quest ⚔️\n');

  const realms = (await db.query(q.listRealms)).rows;

  const { realmId } = await inquirer.prompt([
    {
      name: 'realmId',
      type: 'list',
      message: 'Choose a realm:',
      choices: realms.map(r => ({
        name: r.name,
        value: r.id,
      })),
    },
  ]);

  const characters = (await db.query(q.charactersByRealm, [realmId])).rows;

  const { selectedChars } = await inquirer.prompt([
    {
      name: 'selectedChars',
      type: 'checkbox',
      message: 'Select characters for the quest:',
      choices: characters.map(c => ({
        name: `${c.name} (${c.role})`,
        value: c.id,
      })),
      validate: a => a.length > 0 || 'Pick at least one character',
    },
  ]);

  console.log('\nQuest setup complete!');
  console.log('Characters:', selectedChars);
}

start().catch(console.error);
