require('dotenv').config();
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

    console.log(`✅ Logged in as ${client.user.tag}`);
  },
};