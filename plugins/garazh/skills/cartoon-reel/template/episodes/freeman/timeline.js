// ─── Timeline эпизода «freeman» — «А КТО ТЫ?» ──────────────────────────────
// Длительность: 90.0 секунд (2700 кадров @ 30 fps), вертикаль 9:16 (720×1280).

const TIMELINE = {
  duration: 90.0,
  scripts: [
    'episodes/freeman/art/freeman_character.js',
    'episodes/freeman/art/freeman_sets.js',
  ],
  shots: [
    // Акт I: Провокация (Здравствуй, биомасса)
    { id: 'S1', set: 'freeman_intro', from: 0.0, to: 5.0, cam: [[0, 360, 640, 1.0], [5.0, 360, 640, 1.06]] },
    { id: 'S2', set: 'freeman_intro', from: 5.0, to: 12.0, cam: [[5.0, 360, 560, 1.25], [12.0, 360, 560, 1.35]], shakeIn: 6 },
    { id: 'S3', set: 'freeman_intro', from: 12.0, to: 18.0, cam: [[12.0, 360, 640, 1.0], [18.0, 360, 640, 1.25]], shakeIn: 4 },

    // Акт II: Инверсия и график рабства (Будильник, галстук-петля, 24 часа)
    { id: 'S4', set: 'freeman_collar', from: 18.0, to: 26.0, cam: [[18.0, 360, 560, 1.1], [26.0, 360, 560, 1.2]], shakeIn: 8 },
    { id: 'S5', set: 'freeman_collar', from: 26.0, to: 38.0, cam: [[26.0, 360, 520, 1.0], [38.0, 360, 500, 1.15]] },

    // Акт III: Иллюзия выбора (Штрихкод-тюрьма и беличье колесо)
    { id: 'S6', set: 'freeman_illusion', from: 38.0, to: 48.0, cam: [[38.0, 360, 600, 1.05], [48.0, 360, 600, 1.15]], shakeIn: 4 },
    { id: 'S7', set: 'freeman_illusion', from: 48.0, to: 60.0, cam: [[48.0, 360, 560, 1.0], [60.0, 360, 540, 1.18]] },

    // Акт IV: Мышеловка и БАМ!
    { id: 'S8', set: 'freeman_mousetrap', from: 60.0, to: 70.0, cam: [[60.0, 360, 580, 1.1], [70.0, 360, 560, 1.25]], shakeIn: 5 },
    { id: 'S9', set: 'freeman_mousetrap', from: 70.0, to: 78.0, cam: [[70.0, 360, 640, 1.0], [78.0, 360, 640, 1.35]], shakeIn: 16 },

    // Акт V: Секундомер, тишина, вопрос и щелчок
    { id: 'S10', set: 'freeman_outro', from: 78.0, to: 86.0, cam: [[78.0, 360, 640, 1.0], [86.0, 360, 600, 1.2]] },
    { id: 'S11', set: 'freeman_outro', from: 86.0, to: 90.0, cam: [[86.0, 360, 640, 1.0], [90.0, 360, 640, 1.0]], shakeIn: 3 },
  ],

  badges: [
    { from: 0.5, to: 4.8, name: 'MR. FREEMAN', role: 'PART 0', color: '#000000', x: 30, y: 160, rot: -3 },
    { from: 38.5, to: 44.0, name: 'ILLUSION', role: 'CHOOSE TO CONSUME', color: '#000000', x: 30, y: 160, rot: 3 },
  ],

  events: {
    boom: 70.0, // Момент БАМ!
  },
};
