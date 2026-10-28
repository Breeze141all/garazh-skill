// timeline.js — Steve Cutts "MAN" (2012) Full Animation Short
// Duration: 153.5s (4605 frames @ 30 fps), Aspect: 9:16 (720x1280)
// Music: Edvard Grieg - In the Hall of the Mountain King (Peer Gynt Suite No. 1, Op. 46)

const TIMELINE = {
  duration: 153.5,
  noOverlays: true,
  scripts: [
    'episodes/cutts_man/art/man_character.js',
    'episodes/cutts_man/art/man_sets.js',
  ],
  shots: [
    // ACT I: Genesis & Wilderness (0.0s - 25.0s)
    { id: 'S1', set: 'man_opening', from: 0.0, to: 16.0, cam: [[0, 360, 640, 1.0], [16.0, 360, 640, 1.06]] },
    { id: 'S2', set: 'man_opening', from: 16.0, to: 25.0, cam: [[16.0, 340, 680, 1.2], [25.0, 380, 680, 1.3]], shakeIn: 5 },

    // ACT II: Deforestation & Consumption (25.0s - 65.0s)
    { id: 'S3', set: 'man_forest', from: 25.0, to: 45.0, cam: [[25.0, 360, 640, 1.0], [45.0, 360, 620, 1.1]] },
    { id: 'S4', set: 'man_forest', from: 45.0, to: 65.0, cam: [[45.0, 380, 600, 1.2], [65.0, 380, 580, 1.35]], shakeIn: 4 },

    // ACT III: Industrialization & Plastic Oceans (65.0s - 105.0s)
    { id: 'S5', set: 'man_factory', from: 65.0, to: 85.0, cam: [[65.0, 360, 640, 1.0], [85.0, 360, 620, 1.12]] },
    { id: 'S6', set: 'man_factory', from: 85.0, to: 105.0, cam: [[85.0, 400, 620, 1.22], [105.0, 400, 600, 1.36]], shakeIn: 4 },

    // ACT IV: King of the Mountain & Climax Prestissimo (105.0s - 148.0s)
    { id: 'S7', set: 'man_throne', from: 105.0, to: 130.0, cam: [[105.0, 360, 620, 1.0], [130.0, 360, 580, 1.18]] },
    { id: 'S8', set: 'man_throne', from: 130.0, to: 148.0, cam: [[130.0, 360, 560, 1.22], [148.0, 360, 500, 1.48]], shakeIn: 6 },

    // ACT V: Extraterrestrial Retribution (148.0s - 153.5s)
    // t=150.0s is the colossal orchestral cymbal/bass-drum climax crash!
    { id: 'S9', set: 'man_throne', from: 148.0, to: 153.5, cam: [[148.0, 360, 560, 1.2], [153.5, 360, 560, 1.15]], shakeIn: 25 },
  ],

  badges: [], // No UI badges — pure cinematic cartoon
};
