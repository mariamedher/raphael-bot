const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with "Pong." A simple test of infernal connection.'),
    
  async execute(interaction) {
    await interaction.reply('Pong. The connection is... stable. For now.');
  }
};