// ============================================================
//  HEART — Editable configuration
//  Change everything about your confession from this one file.
// ====================================================

export const config = {
  // --- Who this is for / from -----------------------------------------------
  herName: 'You',
  myName: 'Me',

  // --- Background music (drop an mp3 in /public or use a URL) ---------------
  music: {
    src: '/music.mp3',
    title: 'For You',
  },

  // --- Intro sequence (shown one line at a time) ---------------------------
  intro: {
    lines: [
      'Hey...',
      "There's something I've wanted to tell you for a while.",
      "But I never knew exactly how to say it.",
      'So... I made this for you.',
    ],
    cta: 'Open My Heart',
  },

  // --- Section 1: The Beginning --------------------------------------------
  beginning: {
    lines: [
      "I don't know exactly when it happened.",
      'Maybe it was one small moment.',
      'Maybe it was a hundred little moments.',
      'But somewhere along the way...',
      'You became someone very special to me.',
    ],
  },

  // --- Section 2: Photo Memories -------------------------------------------
  // Replace `src` with your own images from /public/images.
  // Captions appear in a handwritten style under each photo.
  photos: [
    {
      src: '/images/1.jpeg',
      caption: 'One of my favorite smiles.',
      rotate: -4,
    },
    {
      src: '/images/2.jpeg',
      caption: 'Some moments just stay with you.',
      rotate: 3,
    },
    {
      src: '/images/3.jpeg',
      caption: 'I wish you knew how special you looked here.',
      rotate: -2,
    },
    {
      src: '/images/4.jpeg',
      caption: "You probably don't remember this moment... but I do.",
      rotate: 5,
    },
    {
      src: '/images/5.jpeg',
      caption: 'Everything felt lighter when you were around.',
      rotate: -3,
    },
    {
      src: '/images/6.jpeg',
      caption: 'A quiet second I keep going back to.',
      rotate: 2,
    },
    {
      src: '/images/7.jpeg',
      caption: 'You, completely unaware. Completely enough.',
      rotate: -5,
    },
    {
      src: '/images/8.jpeg',
      caption: 'Some light follows you everywhere.',
      rotate: 4,
    },
  ],

  // --- Section 3: Things I Love About You -----------------------------------
  reasons: [
    { title: 'Your smile', text: 'The kind that quietly changes the temperature of a room.' },
    { title: 'The way you make ordinary moments feel different', text: 'Like the world decided to soften, just for a second.' },
    { title: 'Your kindness', text: 'Gentle, almost without noticing it yourself.' },
    { title: 'The little things you probably don\u2019t even notice', text: 'I notice them. I keep them like small, quiet gifts.' },
    { title: 'The way my day feels better with you in it', text: 'Even just the thought of you is enough.' },
  ],

  // --- Section 4: Romantic Quotes -------------------------------------------
  quotes: [
    'Some people enter your life quietly\u2026 and somehow become the loudest thought in your heart.',
    "I wasn't looking for someone to think about every day. Then I met you.",
    'Out of all the ordinary days, somehow you became my favorite part of them.',
  ],

  // --- Section 5: My Favorite Person ---------------------------------------
  favoritePerson: {
    images: ['/images/2.jpeg', '/images/8.jpeg'],
    lines: [
      "Maybe you don't see yourself the way I see you.",
      'But if you could...',
      "You'd understand why you're so special to me.",
    ],
  },

  // --- Section 6: The Build-Up ---------------------------------------------
  buildUp: {
    lines: [
      "There's one more thing.",
      'The real reason I made all of this.',
      "I've tried to find the perfect words.",
      'But maybe the simplest words are the most honest.',
    ],
    cta: 'Tell me\u2026',
  },

  // --- Final Confession ----------------------------------------------------
  confession: {
    beats: [
      'I like you.',
      'Actually\u2026',
      'I think I like you more than I ever knew how to say.',
      "I don't know what happens after you read this.",
      "And I don't want you to feel any pressure.",
      'I just wanted you to know the truth.',
      "You've become someone incredibly special to me.",
      "And keeping that to myself was becoming harder than simply telling you.",
      'So, this is me being brave for once\u2026',
      'I really, really like you. \u2661',
    ],
  },

  // --- Final Interactive Moment --------------------------------------------
  finale: {
    intro: 'One last thing\u2026',
    cta: 'Open this',
    note: `No matter what your answer is, I'm glad I finally told you.

You deserve to know how special you are to someone.

And for me\u2026 that someone is you. \u2661`,
    signoff: 'Made with a slightly nervous heart.',
  },
} as const;

export type Config = typeof config;
