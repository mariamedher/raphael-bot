require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`⚠️ Skipping command ${file} — missing "data" or "execute".`);
  }
}

// Replace with your real client ID and guild ID
const CLIENT_ID = '1385230173758029895';
const GUILD_ID = '1385212324947955773';

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
  console.log('🌀 Refreshing application (slash) commands...');

  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );

  console.log(`✅ Registered ${commands.length} slash command(s):`);
  for (const cmd of commands) {
    console.log(`- /${cmd.name}: ${cmd.description}`);
  }
} catch (error) {
  console.error('❌ Failed to register slash commands:', error);
}
})();