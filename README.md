# Knights_Quest_Week_2_Capstone
A node.js command-line app that helps a player build quests by querying a Postgres database.

⚔️ Knights Quest — Student Guide

Knights Quest is a Node.js command-line game that lets you:

- Pick a realm
- Select characters for a quest
- Assign items
- Save quests to a Postgres database

Table of Contents
1. Setup
2. Database Setup
3. Runnig the CLI
4. Example Workflow
5. Project Structure
6. Tips & Troubleshooting


1. Setup

Clone the project:

git clone <your-repo-url>
cd knights-quest


Install Node dependencies:

npm install

npm install inquirer@8


Create a .env file in the project root:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=knights_quest
DB_PASSWORD=(Your password here)
DB_PORT=5432

(Make sure these match your Postgres setup.)

2. Database Setup
Step 1 — Create the database

Open your terminal or DBeaver and run:

CREATE DATABASE knights_quest;

Step 2 — Add tables

psql -U postgres -d knights_quest -f db/schema.sql

Step 3 — Seed sample data

psql -U postgres -d knights_quest -f db/seeds.sql

Step 4 — Verify

psql -U postgres -d knights_quest

Inside psql:

\dt          -- List tables
SELECT * FROM realms;

3. Running the CLI

Start the game:

Run - node src/cli.js in your terminal

You’ll see something like:

⚔️ Welcome to Knights Quest ⚔️
? Choose a realm:

Follow the prompts:

    Select a realm

    Select characters (1–3)

    Assign items (optional)

    Enter a quest title

    Confirm creation

4. Example Workflow

⚔️ Welcome to Knights Quest ⚔️

? Choose a realm: Knights Realm
? Select characters for the quest: Sir Rowan, Elric
? Assign items to characters: Steel Sword to Sir Rowan, Fire Scroll to Elric
? Enter quest title: Rescue the Sapphire Princess
? Confirm creation: Yes

Quest created successfully! ID: 1

Check the database to confirm:

SELECT * FROM quests;
SELECT * FROM quest_assignments;

5. Project Structure

knights-quest/
│
├── db/
│   ├── schema.sql        # Tables
│   └── seeds.sql         # Sample data
│
├── src/
│   ├── db.js             # DB connection
│   ├── queries.js        # SQL queries
│   └── cli.js            # Inquirer prompts
│
├── .env                  # DB credentials
├── .gitignore
├── package.json
└── README.md

6. Tips & Troubleshooting

TypeError: prompt is not a function → Make sure Inquirer is v8:

    npm uninstall inquirer
    npm install inquirer@8

Database connection issues → Check .env credentials:

    DB_USER=postgres
    DB_PASSWORD=root
    DB_NAME=knights_quest
    DB_HOST=localhost
    DB_PORT=5432

psql cannot connect → Make sure the database exists:

    CREATE DATABASE knights_quest;

        Always restart Node after editing .env:

            Ctrl + C
            node src/cli.js

    Use \dt in psql to check that tables exist

✅ You’re now ready to run quests and explore your database!