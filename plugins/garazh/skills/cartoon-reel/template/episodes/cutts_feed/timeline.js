// ─── Timeline эпизода «cutts_feed» (Steve Cutts «Happiness» / Rat Race) ───────
// Длительность: 120 секунд (3600 кадров @ 30 fps), вертикаль 9:16 (720×1280).

const TIMELINE = {
  duration: 120.0,
  scripts: [
    'episodes/cutts_feed/art/cutts_rat.js',
    'episodes/cutts_feed/art/cutts_sets.js',
  ],
  shots: [
    // Акт I: Пробка под дождем (в красной машине)
    { id: 'S1', set: 'rat_traffic', from: 0.0, to: 8.0, cam: [[0, 360, 640, 1.0], [8.0, 360, 640, 1.06]] },
    { id: 'S2', set: 'rat_traffic', from: 8.0, to: 16.0, cam: [[8.0, 380, 580, 1.25], [16.0, 380, 570, 1.35]], shakeIn: 3 },
    { id: 'S3', set: 'rat_traffic', from: 16.0, to: 25.0, cam: [[16.0, 300, 520, 1.55], [25.0, 300, 510, 1.7]] },

    // Акт II: Метро / давка крыс в костюмах
    { id: 'S4', set: 'rat_subway', from: 25.0, to: 32.0, cam: [[25.0, 360, 640, 1.0], [32.0, 360, 640, 1.08]], shakeIn: 6 },
    { id: 'S5', set: 'rat_subway', from: 32.0, to: 40.0, cam: [[32.0, 360, 260, 1.35], [40.0, 360, 260, 1.45]] },
    { id: 'S6', set: 'rat_subway', from: 40.0, to: 50.0, cam: [[40.0, 360, 600, 1.25], [50.0, 360, 590, 1.4]], shakeIn: 4 },

    // Акт III: Офисный опенспейс и таблетки «HAPPINESS»
    { id: 'S7', set: 'rat_office', from: 50.0, to: 58.0, cam: [[50.0, 360, 640, 1.0], [58.0, 360, 640, 1.08]] },
    { id: 'S8', set: 'rat_office', from: 58.0, to: 66.0, cam: [[58.0, 500, 800, 1.45], [66.0, 500, 790, 1.6]], shakeIn: 3 },
    { id: 'S9', set: 'rat_office', from: 66.0, to: 75.0, cam: [[66.0, 340, 480, 1.3], [75.0, 340, 470, 1.45]] },

    // Акт IV: Бешеная погоня за 100-долларовой купюрой
    { id: 'S10', set: 'rat_chase', from: 75.0, to: 83.0, cam: [[75.0, 360, 640, 1.0], [83.0, 360, 640, 1.1]], shakeIn: 6 },
    { id: 'S11', set: 'rat_chase', from: 83.0, to: 91.0, cam: [[83.0, 500, 440, 1.35], [91.0, 500, 440, 1.45]] },
    { id: 'S12', set: 'rat_chase', from: 91.0, to: 100.0, cam: [[91.0, 380, 620, 1.2], [100.0, 380, 600, 1.4]], shakeIn: 8 },

    // Акт V: Ловушка-мышеловка и щелчок
    { id: 'S13', set: 'rat_trap', from: 100.0, to: 108.0, cam: [[100.0, 360, 680, 1.0], [108.0, 360, 670, 1.08]] },
    { id: 'S14', set: 'rat_trap', from: 108.0, to: 114.0, cam: [[108.0, 320, 540, 1.4], [114.0, 320, 530, 1.55]] },
    { id: 'S15', set: 'rat_trap', from: 114.0, to: 120.0, cam: [[114.0, 360, 720, 1.1], [120.0, 360, 720, 1.2]], shakeIn: 18 },
  ],

  badges: [
    { from: 1.0, to: 6.0, name: 'RAT #4829', role: 'COMMUTER · BUYER', color: '#8f9c7f', x: 30, y: 160, rot: -4 },
    { from: 33.0, to: 38.0, name: 'METRO COMMUTE', role: 'ZONE 17', color: '#b03828', x: 30, y: 160, rot: 3 },
  ],

  events: {
    boom: 114.0, // Момент удара мышеловки
    blink: [3.2, 7.8, 22.4, 45.1, 71.0],
  },
};
