module.exports = {
  name: 'say',
  description: 'Repeats a message and deletes the user’s input.',
  execute: async (client, message, args) => {
    const toSay = args.join(' ');

    if (!toSay) {
      return message.reply('Please provide a message to say.').then(m => {
        setTimeout(() => m.delete().catch(() => {}), 5000);
      });
    }

    try {
      await message.delete();
    } catch (err) {
      console.warn('⚠️ Could not delete message:', err);
    }

    await message.channel.send({ content: toSay });
  }
};