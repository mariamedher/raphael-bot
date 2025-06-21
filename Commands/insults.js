const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insult')
    .setDescription('Unleashes infernal wit on a poor target.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The unfortunate soul to insult')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      console.log(`📥 /insult triggered by ${interaction.user.tag}`);

      const target = interaction.options.getUser('target');
      if (!target) {
        console.warn('⚠️ No target received in options.');
        return await interaction.reply({
          content: 'No target provided.',
          ephemeral: true
        });
      }

      const insults = [
        `Sit down, ${target}. Leave the thinking to those equipped for it.`,
        `The room dims when you speak, ${target}. A miracle of entropy.`,
        `Keep trying, ${target}. One day you might even rise to irrelevance.`,
        `There are torments in Cania more dignified than watching you try to matter.`,
        `I've seen vermin with more vision—and they chew their young.`,
        `Even your shadow wants nothing to do with you.`,
        `You don't need enemies, ${target}. Just a mirror and a long enough silence.`,
        `Your thoughts are so slow I’m convinced they drown before reaching your mouth.`,
        `Bohoo, you whore.`,
        `If wit were coin, ${target}, you’d owe me interest.`,
        `Every word you utter, ${target}, makes an evening in a torture rack more attractive.`,
        `The Nine Hells called, ${target}. Even they declined the return.`,
        `If I wanted to hear nonsense, ${target}, I’d uncork a cursed bottle and let the screams amuse me.`,
        `${target}, simply existing isn’t the same as being *worth* existing.`
      ];

      const chosen = insults[Math.floor(Math.random() * insults.length)];
      console.log(`🗯️ Chosen insult: ${chosen}`);

      await interaction.reply({ content: chosen });

    } catch (error) {
      console.error('❌ Error in /insult command:', error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'Something went wrong.', ephemeral: true });
      } else {
        await interaction.reply({ content: 'Something went wrong.', ephemeral: true });
      }
    }
  }
};