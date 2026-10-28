// ─── Timeline эпизода «cutts_feed» (Стив Каттс / Steve Cutts) ──────────────────
// Длительность: 120 секунд (3600 кадров при 30 fps).
const TIMELINE = {
  duration: 120.0,
  scripts: [
    'episodes/cutts_feed/art/cutts_man.js',
    'episodes/cutts_feed/art/cutts_sets.js',
  ],
  shots: [
    // Акт I: Капсула пробуждения
    { id: 'S1', set: 'cutts_cell', from: 0.0, to: 6.0, cam: [[0, 360, 640, 1.0], [6.0, 360, 640, 1.08]] },
    { id: 'S2', set: 'cutts_cell', from: 6.0, to: 12.0, cam: [[6.0, 440, 750, 1.35], [12.0, 440, 740, 1.45]], shakeIn: 4 },
    { id: 'S3', set: 'cutts_cell', from: 12.0, to: 18.0, cam: [[12.0, 360, 620, 1.2], [18.0, 360, 610, 1.3]] },
    { id: 'S4', set: 'cutts_face', from: 18.0, to: 24.0, cam: [[18.0, 360, 640, 1.0], [24.0, 360, 640, 1.18]], shakeIn: 6 },

    // Акт II: Марш леммингов по конвейеру
    { id: 'S5', set: 'cutts_conveyor', from: 24.0, to: 34.0, cam: [[24.0, 360, 700, 0.98], [34.0, 360, 690, 1.06]] },
    { id: 'S6', set: 'cutts_conveyor', from: 34.0, to: 42.0, cam: [[34.0, 380, 720, 1.22], [42.0, 380, 710, 1.32]] },
    { id: 'S7', set: 'cutts_conveyor', from: 42.0, to: 50.0, cam: [[42.0, 460, 750, 1.1], [50.0, 470, 740, 1.2]], shakeIn: 4 },

    // Акт III: Алтарь промптов и слот-машина
    { id: 'S8', set: 'cutts_altar', from: 50.0, to: 58.0, cam: [[50.0, 360, 620, 1.0], [58.0, 360, 610, 1.08]] },
    { id: 'S9', set: 'cutts_altar', from: 58.0, to: 66.0, cam: [[58.0, 420, 380, 1.32], [66.0, 420, 370, 1.42]], shakeIn: 5 },
    { id: 'S10', set: 'cutts_altar', from: 66.0, to: 76.0, cam: [[66.0, 360, 600, 1.2], [76.0, 360, 590, 1.32]] },

    // Акт IV: Колесо хомяка и аварийный разгон
    { id: 'S11', set: 'cutts_wheel', from: 76.0, to: 84.0, cam: [[76.0, 360, 640, 0.98], [84.0, 360, 640, 1.06]] },
    { id: 'S12', set: 'cutts_wheel', from: 84.0, to: 92.0, cam: [[84.0, 360, 600, 1.15], [92.0, 360, 590, 1.25]] },
    { id: 'S13', set: 'cutts_wheel', from: 92.0, to: 102.0, cam: [[92.0, 360, 620, 1.3], [102.0, 360, 610, 1.45]], shakeIn: 8 },

    // Акт V: Гора отходов цивилизации
    { id: 'S14', set: 'cutts_dump', from: 102.0, to: 110.0, cam: [[102.0, 360, 640, 0.95], [110.0, 360, 620, 1.05]] },
    { id: 'S15', set: 'cutts_dump', from: 110.0, to: 116.0, cam: [[110.0, 360, 700, 1.22], [116.0, 360, 690, 1.32]] },
    { id: 'S16', set: 'cutts_dump', from: 116.0, to: 120.0, cam: [[116.0, 350, 840, 1.65], [120.0, 350, 840, 1.85]] },
  ],

  badges: [
    { from: 18.5, to: 23.5, name: 'CONSUMER #84', role: 'DOPAMINE ADDICT', color: '#00f0ff', x: 30, y: 160, rot: -4 },
    { from: 51.0, to: 56.5, name: 'ALGORITHM 9000', role: 'PROMPT MACHINE', color: '#ff0055', x: 30, y: 160, rot: 3 },
  ],

  events: {
    boom: 98.0,
    blink: [2.5, 4.8, 14.2],
  },
};
