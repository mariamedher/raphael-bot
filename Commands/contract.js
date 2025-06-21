const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,  } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contract")
    .setDescription("Offer your soul to the devil in exchange for eternal torment (and a fun role)."),

  async execute(interaction) {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "Contracts curated in private are *so* pedestrian. A proper deal deserves an audience.",
         flags: 1 << 6,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("🩸 Infernal Pact of Eternal Debt")
      .setColor("DarkRed")
      .setDescription(
        `So eager, are we? The terms are thus:\n
        - **Your soul**, in perpetuity.
        - **One cursed role**, non-refundable.
        - **Mockery**, as a service.

        Click at your peril, <@${interaction.user.id}>. Hell watches.`
      )
      .setFooter({ text: "You *may* consent, but the house always collects." })
      .setTimestamp();

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("sign_contract")
        .setLabel("Sign Contract")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🖋️"),

      new ButtonBuilder()
        .setCustomId("refuse")
        .setLabel("Refuse")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🚪"),

      new ButtonBuilder()
        .setCustomId("beg")
        .setLabel("Beg Pathetically")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🙏")
    );

    const sent = await interaction.reply({
      embeds: [embed],
      components: [buttons]
    });

    const collector = sent.createMessageComponentCollector({
      filter: () => true,
      time: 90_000,
    });

    collector.on("collect", async (i) => {
      switch (i.customId) {
        case "sign_contract": {
          const roleName = "Eternal Debtor";
          const guild = i.guild;
          const member = await guild.members.fetch(i.user.id);
          const role = guild.roles.cache.find((r) => r.name === roleName);

          if (!role) {
            console.error("❌ Role not found. Check the role name and spelling.");
            return i.reply({
              content: "The contract cannot proceed. The role is missing. Someone misplaced the brand.",
              flags: 1 << 6,
            });
          }

          if (member.roles.cache.has(role.id)) {
            const alreadySignedResponses = [
              `Your name already dances in ink, <@${i.user.id}>, a signature so fine I nearly moaned.`,
              `I’ve already tucked you in the ledger, snug and all nice.`,
              `Your soul’s accounted for, <@${i.user.id}>. Don’t worry -- I’ll know when to collect.`,
              `Signed, sealed, and exquisitely damned.`,
              `You’ve already joined the choir, pet.`,
              `No need to whimper again, <@${i.user.id}>.`,
            ];
            const response = alreadySignedResponses[Math.floor(Math.random() * alreadySignedResponses.length)];
            return i.reply({ content: response, flags: 1 << 6 });
          }

          await member.roles.add(role);
          console.log(`✅ Assigned "${roleName}" to ${i.user.tag}`);

          return i.reply({
            content: `Mmm. I adore it when they come willingly.
            Such eager little mortals, scribbling away their souls like love letters.
            Don’t worry <@${i.user.id}> -- I’ll cherish every line of you.`,
            flags: 1 << 6,
          });
        }
        case "refuse":
          await i.reply({
            content: `Ah, a show of will. How… quaint.
            But do take your time. Wriggle. Writhe. Pretend you have a choice.`,
            flags: 1 << 6,
          });
          break;

        case "beg":
          const begResponses = [
            "Mm. That’s more like it. Grovel a little more. I *adore* the sound of desperation. 💅",
            "Oh darling, don’t whimper —- beg. With intent!",
            "You grovel like a true artist. I’m *touched*… truly.",
            "Mm. Such spine-shriveling desperation. Music to my ears.",
            "Now that’s the spirit. Pathetic, pliant… utterly perfect.",
            "Beg louder. I want the walls to *blush*.",
            "Careful -- I might start to actually *enjoy* you.",
            "All this… for my attention? I should make you *earn* it properly.",
            "Ah, the traditional plea for mercy. How boring. Denied.",
            "A formal request for degradation? Accepted and approved.",
            "The House of Hope is built on cries like yours. Keep going -- the bricks aren’t quite dry.",
          ];
          await i.reply({
            content: begResponses[Math.floor(Math.random() * begResponses.length)],
            flags: 1 << 6,
          });
          break;
      }
    });

    collector.on("end", async () => {
      try {
        await sent.edit({ components: [] });
      } catch (e) {
        console.warn("⚠️ Could not remove buttons after collector end:", e.message);
      }
    });
  },
};