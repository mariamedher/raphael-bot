require('dotenv').config();
console.log('💡 ready.js LOADED');

module.exports = {
  name: 'ready',
  once: true, // Runs only once on startup

  async execute(client) {
    const startupLines = [
      "📜 The ink’s still wet, the screams still echo. Let’s get to work, shall we?",
      "🔔 The devil is in. Please line up in order of desperation.",
      "🩸 Contracts polished, chains oiled. I do so love a productive morning.",
      "💼 What a charming day to ruin someone’s afterlife.",
      "👁️ Awake, alert, and already disappointed. Who dares approach first?",
      "🔥 You’ve prayed, begged, wept… and here I am. As promised.",
      "😈 Don’t let the charm fool you. I’m here for blood, not banter. Though both are lovely.",
      "🎭 Another sunrise, another soul to sign. Or burn. I’m flexible.",
      "🖋️ Ready to record regrets and collect consent. The infernal kind, of course.",
      "👣 I heard your little footsteps. Come closer. Let’s make a deal you’ll never escape.",
    ];

    const randomLine = startupLines[Math.floor(Math.random() * startupLines.length)];
    const channel = client.channels.cache.get(process.env.LABORATORY_CHANNEL_ID);

    if (channel && channel.isTextBased()) {
      try {
        await channel.send(randomLine);
        console.log(`📣 Startup message sent: "${randomLine}"`);
      } catch (error) {
        console.error('❌ Failed to send startup message:', error);
      }
    } else {
      console.warn('⚠️ Startup channel not found or is not text-based.');
    }

    // ========== 🔥 EDIT WELCOME EMBED ==========

       try {
      const welcomeChannel = await client.channels.fetch(process.env.WELCOME_CHANNEL_ID);
      const welcomeMsg = await welcomeChannel.messages.fetch(process.env.WELCOME_MESSAGE_ID);

      const embed = {
        color: 0x9b111e,
        title: '🖋️ Welcome, Worthy… or Otherwise.',
        description: `
**Welcome, wanderers, writers, and weary victims of the Raphstarion affliction.**

This little corner of torment — curated by Daphne — exists for those ensnared by the charming disaster that is Raphael and Astarion. Reader, writer, artist, voyeur… doesn't matter. You’ve stepped inside. The door’s locked behind you.

If idle chatter is all you seek, pick up the **“Honored Guest”** role and stay safely at the edges. But if you’re the sort who dreams in brimstone and bleeds metaphor, there are halls here for your kind. Writer dens. Fanwork vaults. Even private chambers, just whisper to Daphne. She does adore secrets.

*“This isn’t a megaserver,”* she insists. *“It’s a tucked-away study.”* Quaint. But true. If something feels lacking — drop a word in <#1385216161347801199>. Better that than whimpering later, hmm?

Should discomfort slither close, overstepped roles, messages you never asked for, or behavior unbecoming, speak to an Archivist. We deal in discomfort. Swiftly and terribly silently.

**Before you go any deeper, confirm your soul's surrender by reacting with ✅ to agree to the terms below:**

– No bigotry of any shade.
– This is 18+. Tag NSFW. Keep it tasteful, or at least hidden.
– No spam. No scams. No salacious DMs without consent.
– Discord TOS applies.
– Respect boundaries — written, spoken, and unspoken.
– Matters of depravity demand discretion. Should you dare tread upon topics such as non-con, necrophilia, pedophilia, zoophilia, incest, or other unspeakable acts — veil them well. Issue a clear content warning and bind your words within Spoiler Tags (||). Such shadows are no jest. Insensitivity will be culled without mercy.

Once bound, collect your roles and, if you dare, introduce yourself. Or don’t. The walls are always listening regardless.

**“Hope. Such a tease.”**
        `,
        footer: {
          text: "The master of the house is watching. Always."
        }
      };

      await welcomeMsg.edit({ embeds: [embed] });
      console.log('✅ Welcome embed updated successfully.');
    } catch (error) {
      console.error('❌ Failed to update welcome embed:', error);
    }

    console.log(`✅ Logged in as ${client.user.tag}`);
  },
};