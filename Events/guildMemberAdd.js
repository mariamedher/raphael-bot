require('dotenv').config();
module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
   const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    // If the channel is not found, log a warning and return
    // This assumes you have set the WELCOME_CHANNEL_ID in your .env file
    if (!process.env.WELCOME_CHANNEL_ID) {
      console.warn('⚠️ WELCOME_CHANNEL_ID is not set in the environment variables.');
      return;
    }
    if (!channel) {
      console.warn(`⚠️ No welcome channel found for guild ${member.guild.name}`);
      return;
    }

    const welcomeLines = [
      `✨ Another mortal appears... <@${member.id}>. I do hope you're more useful than the last.`,
      `🕯️ <@${member.id}>, hm? I've smelled stronger souls rotting in oubliettes.`,
      `💀 A fresh signature for the ledger... Welcome, <@${member.id}>. You *will* sign, won't you?`,
      `👁️ Eyes forward, <@${member.id}>. You're already being judged.`,
      `🖋️ <@${member.id}>, consider this your first mistake. Let’s see how many more you can rack up.`,
    ];

    const randomLine = welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

    try {
      await channel.send(
        `${randomLine}\nIf you’re confused — and you likely are — begin your fumbling at <#1385223763309760633>.`
      );
      console.log(`👋 Welcomed new member ${member.user.tag} in ${member.guild.name}`);
    } catch (error) {
      console.error(`❌ Failed to send welcome message for ${member.user.tag}:`, error);
    }
  },
};