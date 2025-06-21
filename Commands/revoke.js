const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("revoke")
    .setDescription("Tear up your infernal contract and walk away... if you dare."),

  async execute(interaction) {
    const roleName = "Eternal Debtor";
    const guild = interaction.guild;
    const member = await guild.members.fetch(interaction.user.id);
    const role = guild.roles.cache.find((r) => r.name === roleName);

    if (!role || !member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: "You're not even bound. How disappointing. Were you ever serious?",
        flags: 1 << 6,
      });
    }

    await member.roles.remove(role);

    // Optional logging
    const logChannelId = process.env.LEDGER_LOG_CHANNEL_ID;
    if (logChannelId) {
      const logChannel = interaction.client.channels.cache.get(logChannelId);
      if (logChannel) {
        logChannel.send(`❌ <@${interaction.user.id}> has torn up their contract. Cowardice noted.`);
      }
    }

    const taunts = [
       "You break *my* contract, you contemptible little pipsqueak? I should flay you for sport.",

  "Insolent creature. You think tearing parchment undoes what *we* are? I’ll carve the truth into your bones.",

  "Oh, no. You don’t walk away. You *crawl*, and I decide if your knees survive the journey.",

  "Beast. Vile, thankless beast. I offered you *everything*, and you spit in my face? You’ll choke on that freedom.",

  "You think yourself bold? You’re nothing. I’ve drowned gods more faithful than you.",

  "I will paint these halls with your entrails and make your blood sing repentance.",

  "You had my favor. My *interest*. And now? Now, you have my full attention. *Run.*",

  "Break a vow with me, and there’s no afterlife left to hide you. Not even ash will remain.",

  "You break faith with *me*? Then know this: the torment I offer now is no longer metaphor.",

  "I’ll unmake you slowly—word by word, nerve by nerve—until even your memory begs for silence.",

  "Ingrate. I should've left you to rot in obscurity.",

  "I’ll see you screaming on your knees before this is done.",

  "There will be no soul left to damn when I’m finished with you.",
    "You think you can just walk away? I’ll make sure you remember this moment in every waking nightmare.",
    "You think you can just tear up a contract with me? I’ll make sure you regret that decision for eternity.",
      // ❖ SEDUCTIVE, FLIRTING WITH VENGEANCE
  "Regret already? I thought you liked it rough.",

  "So shy now. But you were so eager with your little signature.",

  "Mmm. The desperate ones always taste better when they *try* to resist.",

  "Oh, break the deal, darling. I do love a challenge.",

  "You’re free now. Naked. Markless. *Exquisite.*",

  "Careful. I take betrayal *very* personally—and I do hold grudges *forever.*",
   "Oh, you *will* come crawling back. But I won’t be nearly as gentle next time.",
"You break your vow, and dare look proud? Sweet thing, I’ll make you wish you’d never been born.",

];

    const chosen = taunts[Math.floor(Math.random() * taunts.length)];

    await interaction.reply({
      content: `Contract revoked, <@${interaction.user.id}>.\n${chosen} \nRemember, I never forget a face... or a betrayal.`,
      flags: 1 << 6,
    });
  },
};