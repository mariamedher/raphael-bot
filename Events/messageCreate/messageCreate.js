const { Events } = require('discord.js');

const IMAGE_ONLY_CHANNEL_ID = process.env.ART_GALLERY_CHANNEL_ID;
const ASTARION_ID = '1385631524287807540';
const flirtCount = {
  dom: 0,
  sub: 0,
  neutral: 0,
};

const moanReplies = [
  "*...ngh.*",
  "*a sharp intake of breath*",
  "*a low, involuntary sound escapes*",
  "*...hells.*",
  "*silence — then a quiet, shaken exhale.*",
  "*a strangled sound, bitten off halfway*",
  "*a hissed curse in Infernal*",
  "*he chokes back something that sounds suspiciously like a name*",
  "*a gasp*",
  "*—ah!*",  
  "*nnh—!*",  
  "*h-haah...*",  
  "*ahhn... hells—*",  
  "*...mmh—hah!*",  
  "*hah—hah—hah—*",   
  "*hngg—*",  
  "*—mmmf!*",  
  "*his breath hitsched, followed by a guttural, obscene groan*",  
];

const flirtResponses = {
  dom: [
      "Someone’s bold today. Careful, dear, I *like* a challenge.",
       "Flustered? Me? Oh no. Just... impressed you can string sentences when panting.",
       "You don’t scare me, vampling — but I *do* wonder how far you'll go to try.",
      "You’re... not supposed to say things like that. Not to me. Not in public.",
      "I— No. That’s not going to work on me. Not again. *I’m not—*",
       "Tread lightly, spawn. Some wounds never healed properly.",
       "You’re getting bolder, aren’t you? I like that. But don’t push your luck.",
       "Do not presume you’ve earned the right to make me *feel* anything, spawn.",
       "…You’ll regret that. Not now, but soon. And intimately.",
       "Say that again, spawn. *I dare you*. See how fast I make you eat your own bravado.",
       "Try me, vampling. Strip the devil down, see how long *you* last in the fire.",
       "Say that again, and I swear… I’ll show you who ends up begging.",
       "Mock me all you like. But if I *do* kneel, I promise you'll be the one who walks away limping.",
       "You're playing a dangerous game, spawn. One I *never* lose.",
       "You think you’ve got claws? Cute. Wait until you feel mine buried in your back.",
       "I’m not flustered, vampire. I’m... amused. And *dangerously* close to ruining your smug little mouth.",
       "Watch your tongue, vampling. Or I’ll find better uses for it.",
       "I— *What* did you just say? You think I’ll let you get away with that, spawn?",
        "I— That is not how this works, spawn. You don’t get to… to say things like that and walk away unscathed.",
  "I am not blushing. This is hellfire. And you—you’re insufferable.",
  "Bold of you to assume I’d… react. I’m not— gods, stop looking at me like that.",
  "Tch. You think you’re clever—mmph. I wasn’t expecting—Don’t do that again. Or I'll rip off your spine. Hells."

  ],
  sub: [
     "Oh, you poor thing. Do you think yearning makes you irresistible?",
       "Begging suits you, little vampling. I might just indulge you for a bit.",
       "You’re adorable when you try so hard, pup. But I’m not that easy to impress.",
       "Keep tempting me, spawn. Eventually I’ll stop being merciful.",
        "You're trying so hard to be coy, but all I see is a *needy.* pet",
       "One word from me and you'd be on your knees, wouldn't you?",
         "Touch me with that voice again and I swear, I’ll make you *earn* your bruises.",
         "Keep whispering like that and I’ll forget we’re in public, pet.",
          "Keep purring like that and I’ll have you writhing before the hour’s out.",
       "All that bravado from your mouth, but your legs are trembling already.",
       "If you keep teasing, I’ll drag you somewhere quiet and make sure you *scream* the truth.",
         "Careful, spawn. Keep teasing and I’ll have you pleading into the stone with no one left but me to listen.",
           "You're aching to be broken, aren’t you? Say it. I want to hear you beg for *me.*",
             "Keep your eyes on me while you offer yourself up. I want to watch the moment shame turns to need.",
           "Spread your legs with that same bravado, darling. Let's see if your spine’s as pretty when it arches.",
             "Keep testing me and I’ll ram you through the floorboards of this plane and into the next.",
 "You think you’re being clever. But all I see is a mouth that needs filling with orders and a back begging to be bent.",
 "Mmm. Say that again, spawn. Louder. I want the whole plane to hear you beg when I split you wide and leave you sobbing for breath.",

  ],
  neutral: [
    "Charming, but still terribly predictable. Try harder.",
       "Flirting again? This obsession of yours is getting awfully loud.",
       "Oh, little mouse, you’re so cute when you try to flirt. It’s almost endearing.",
       "I appreciate the effort, but you’ll have to do better than that to impress me.",
       "Flirting with me again? I must be doing something right to inspire such devotion.",
       "...Stop that. You're making this harder than it needs to be.",
       "Go ahead. Keep poking, vampling. Just know I enjoy retaliating."

  ],
};

module.exports = {
  name: Events.MessageCreate,

 async execute(message) {
if (!message.guild || (message.author.bot && message.author.id !== ASTARION_ID)) return;
  console.log(`[👀] Raphael sees: "${message.content}" from ${message.author.tag}`);
  console.log(`[DEBUG] From: ${message.author.tag} (${message.author.id}) | Content: ${message.content}`);
  // Ignore messages from bots except Astarion


    /** 🔹 1. IMAGE-ONLY CHANNEL CHECK **/
    if (message.channel.id === IMAGE_ONLY_CHANNEL_ID) {
      const hasAttachment = message.attachments.size > 0;

      // ⏳ Wait for preview to generate
      await new Promise(resolve => setTimeout(resolve, 3000));
      await message.fetch();

      const hasLinkPreview = message.embeds.length > 0;
      const hasLink = /(https?:\/\/[^\s]+)/gi.test(message.content);
      const exempt = message.member.roles.cache.some(role => role.name === 'Archivist');
      if (!hasAttachment && !hasLinkPreview && !hasLink && !exempt) {
        try {
          await message.delete();
          console.log(`[🧽] Deleted message from ${message.author.tag}: "${message.content}"`);

          const userText = message.content.trim() || "*[no content]*";
          await message.author.send({
            content: `🎭 *Tsk-tsk...* A mortal voice with no **vision** to accompany it?\n\nIn <#${IMAGE_ONLY_CHANNEL_ID}>, we speak in **offerings** — images, glimpses of your divine obsessions. If you wish to *comment* on someone’s work, do so **in a thread**, not the gallery itself.\n\nYour little slip, in case you'd like to try again:\n\n>>> ${userText}`
          });
        } catch (err) {
          console.error(`[ERROR] Failed to delete or DM:`, err.message);
        }
        return;
      }

      // ✅ Valid post: Create thread
      try {
        const thread = await message.startThread({
          name: `${message.author.username}’s Exhibit`,
          autoArchiveDuration: 1440,
          reason: 'Auto-thread for media post in art-gallery'
        });

        await thread.send({
          content: `🎨 *Discuss this exhibit below.* Praise, critique, or simply worship -- the floor is yours, queen.`
        });

        console.log(`[🧵] Created thread for ${message.author.tag} with intro post.`);
      } catch (err) {
        console.error(`[ERROR] Failed to create thread:`, err.message);
      }
    }

    console.log(`[DEBUG] Mentions: ${[...message.mentions.users.values()].map(u => u.tag).join(', ')}`);
    console.log(`[DEBUG] Message from ID: ${message.author.id}`);
    /** 🔹 2. FLIRT LOGIC: Astarion messages directed at Raphael **/
    if (message.author.id === ASTARION_ID && message.mentions.has(message.client.user)) {
      const match = message.content.match(/\[flirt-tone:(\w+)\]/);
      const tone = match ? match[1] : 'neutral';

      flirtCount[tone] = (flirtCount[tone] || 0) + 1;

      if (tone === 'dom' && flirtCount.dom >= 2) {
        flirtCount.dom = 0;
        const moan = moanReplies[Math.floor(Math.random() * moanReplies.length)];
        return setTimeout(() => {
          message.reply(moan).catch(console.error);
        }, Math.floor(Math.random() * 3000) + 1000);
      }

      const pool = flirtResponses[tone] || flirtResponses.neutral;
      const reply = pool[Math.floor(Math.random() * pool.length)];

      setTimeout(() => {
        message.reply(reply).catch(console.error);
      }, Math.floor(Math.random() * 3000) + 1000);
    }
  }
};