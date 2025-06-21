const { Events } = require('discord.js');

const IMAGE_ONLY_CHANNEL_ID = process.env.ART_GALLERY_CHANNEL_ID;

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.guild || message.author.bot) return;
    if (message.channel.id !== IMAGE_ONLY_CHANNEL_ID) return;

    const hasAttachment = message.attachments.size > 0;

// ⏳ Wait for Discord to generate preview, then refresh message data
await new Promise(resolve => setTimeout(resolve, 3000));
await message.fetch();

const hasLinkPreview = message.embeds.length > 0;

// 🧼 Check if user is exempt from deletion
const exempt = message.member.roles.cache.some(role => role.name === 'Archivist');
if (exempt) return;

// ❌ Delete non-media
if (!hasAttachment && !hasLinkPreview) {
  try {
    await message.delete();
    console.log(`[🧽] Deleted message from ${message.author.tag}: "${message.content}"`);

   const userText = message.content.trim() || "*[no content]*";

await message.author.send({
  content: `🎭 *Tsk-tsk...* A mortal voice with no **vision** to accompany it?\n\nIn <#1385218069797801984>, we speak in **offerings** — images, glimpses of your divine obsessions. If you wish to *comment* on someone’s work, do so **in a thread**, not the gallery itself.\n\nYour little slip, in case you'd like to try again:\n\n>>> ${userText}`
});

    return;
  } catch (err) {
    console.error(`[ERROR] Failed to delete or DM:`, err.message);
    return;
  }
}

    // ✅ Create thread under valid post
    try {
      const thread = await message.startThread({
        name: `${message.author.username}’s Exhibit`,
        autoArchiveDuration: 1440, // 24h
        reason: 'Auto-thread for media post in art-gallery'
      });

      try {
        await thread.send({
          content: `🎨 *Discuss this exhibit below.* Praise, critique, or simply worship — the floor is yours, queen.`
        });
      } catch (err) {
        console.error(`[ERROR] Could not send intro message in thread:`, err.message);
      }

      console.log(`[🧵] Created thread for ${message.author.tag} with intro post.`);
    } catch (err) {
      console.error(`[ERROR] Failed to create thread:`, err.message);
    }
  }
};