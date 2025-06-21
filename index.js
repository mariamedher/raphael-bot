require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  presence: {
    status: 'online', // Other options: 'online', 'idle', 'invisible'
    activities: [
      {
        name: 'your desperate pleas',
        description: 'Arrogant bastard',
        type: 2 // 0 = Playing, 2 = Listening, 3 = Watching, 5 = Competing
      }
    ]
  }
});

client.commands = new Collection();

// 🔍 Load command files
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  try {
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: /${command.data.name}`);
    } else {
      console.warn(`⚠️ Skipped "${file}" — missing "data" or "execute"`);
    }
  } catch (err) {
    console.error(`❌ Failed to load command "${file}":`, err);
  }
}
// 🔁 Load Events
const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.name && typeof event.execute === 'function') {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`📡 Loaded event: ${event.name}`);
  } else {
    console.warn(`⚠️ Skipped event file ${file} — missing "name" or "execute".`);
  }
}
const prefix = '!'; // You can move this to .env if you want

client.prefixCommands = new Collection();
const prefixCommandsPath = path.join(__dirname, 'PrefixCommands');
const prefixFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));

for (const file of prefixFiles) {
  const filePath = path.join(prefixCommandsPath, file);
  const command = require(filePath);
  if ('name' in command && 'execute' in command) {
    client.prefixCommands.set(command.name, command);
    console.log(`📎 Loaded prefix command: !${command.name}`);
  } else {
    console.warn(`⚠️ Skipped prefix command file ${file} — missing "name" or "execute".`);
  }
}
// 🧠 Handle interactions (slash commands)
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`❌ Command "/${interaction.commandName}" was triggered but not found in client.commands.`);
    return;
  }

  try {
    await command.execute(interaction);
    console.log(`⚙️ Executed command "/${interaction.commandName}" by ${interaction.user.tag}`);
  } catch (error) {
    console.error(`❌ Error running "/${interaction.commandName}" by ${interaction.user.tag}:`, error);

    const errorMessage = '⚠️ Something went wrong while executing that command.';

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: errorMessage, ephemeral: true }).catch(console.error);
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true }).catch(console.error);
    }
  }
});
// 🧠 Handle prefix commands (classic !command style)
client.on(Events.MessageCreate, async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.prefixCommands.get(commandName);
  const nickname = message.member?.nickname || message.author.username;


  if (!command) return;

  try {
    await command.execute(client, message, args);

    // ✅ LOG HERE — only prefix
    const { logUsage } = require('./Utils/logger');
    logUsage('prefix', message.member, commandName, args.join(' '));

    console.log(`📎 Executed prefix command !${commandName} by ${message.author.tag}`);
  } catch (error) {
    console.error(`❌ Error executing !${commandName}:`, error);
    message.reply("Something went wrong executing that command.").catch(() => {});
  }
});


// 🔔 Bot ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}. Bot is ready.`);
});

// 🚨 Fatal error catchers
process.on('unhandledRejection', reason => {
  console.error('🔴 [UNHANDLED REJECTION]:', reason);
});

process.on('uncaughtException', err => {
  console.error('🔴 [UNCAUGHT EXCEPTION]:', err);
});

// 🔐 Start login
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN not found in .env. Bot cannot start.');
  process.exit(1);
}

console.log('🔐 Attempting login...');
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('❌ Discord login failed:', err);
});