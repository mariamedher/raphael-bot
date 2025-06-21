const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flirt")
    .setDescription("Let Raphael whisper sin into someone's ear.")
    .addUserOption(option =>
      option
        .setName("target")
        .setDescription("The poor soul you're flirting with")
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("target") || interaction.user;

    const flirts = [
      `You’re trembling already, ${target}? I haven’t even *touched* you.`,
      `Mmm, ${target}… if you keep looking at me like that, I’ll have to make it worth your while.`,
      `So sweet, so soft… I could unwrap you so slowly, or devour you all at once. Which would you prefer, I wonder?`,
      `Be careful, ${target}. I collect pretty little things that can’t say *no*.`,
      `I could mark you in ways no one ever dared. Say the word… or whimper it against my ear.`,
      `You do beg prettily, ${target}. I might let you do it again… slower this time.`,
      `Come closer. I won’t bite unless you *ask*. Though I admit, you make it so tempting.`,
      `Some sins are worth the punishment. *You* might just be the best of them, ${target}.`,
      `Say please. Say thank you. Say *mine.* And I’ll show you what eternity feels like — inside out.`,
      `Every time you resist, I learn a new way to break you. Shall we continue the lesson, ${target}?`,
      `The more you struggle, the sweeter the submission. Keep going, ${target}. I’m *starving*.`,
      `That little gasp you make, ${target}… say it again — but this time into my mouth.`,
      `On your knees, pet. I want to see reverence *drip* from your tongue.`,
      `Keep writhing, ${target}. The more you squirm, the deeper I go.`,
      `You beg like you've practiced. Good. Now do it with my hand around your pretty little neck.`,
      `When I say "stay still," ${target}, I don't *ask*. Shall I tie the lesson into your spine?`,
      `I want your voice hoarse, your thighs trembling, and my name the only prayer you remember.`,
    ];

    const chosen = flirts[Math.floor(Math.random() * flirts.length)];

    await interaction.reply({ content: chosen });
  },
};