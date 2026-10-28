// ─── sfx.mjs: Саунд-дизайн для Steve Cutts «Happiness» (Rat Race) ───────────
export const SAMPLE_RATE = 48000;
export const PEAK_CEILING_DB = -3;

export function cues(TL) {
  return [
    // Акт I: Пробка под дождем
    { id: 'rain_city_hum', type: 'room', t: 0, rms: -32 },
    // Щелчки дворников по стеклу (маятник)
    { id: 'wipers_swish', type: 'whoosh', t: [1.2, 3.6, 6.0, 8.4, 10.8, 13.2, 15.6, 18.0, 20.4, 22.8], db: -18, f: 900, w: 1200 },
    { id: 'traffic_horns', type: 'laptopBeep', t: [4.5, 11.2, 19.0], db: -15 },

    // Акт II: Метро и давка
    { id: 'subway_doors', type: 'breakerThunk', t: 25.1, db: -10 },
    { id: 'rail_screech', type: 'kettleWhistle', t: 28.0, dur: 4.5, db: -16 },
    { id: 'subway_hum', type: 'garageHum', t: 25.0, dur: 24.5, db: -14 },
    { id: 'subway_chime', type: 'ding', t: 33.0, db: -12 },

    // Акт III: Офисный опенспейс и таблетки «HAPPINESS»
    { id: 'typing_click', type: 'click', t: [51.0, 52.5, 54.0, 55.5, 57.0], db: -16 },
    { id: 'blister_pop', type: 'plugClick', t: 64.2, db: -9 },
    { id: 'pill_swallow', type: 'bloop', t: 65.5, db: -11 },
    { id: 'happiness_sparkle', type: 'sparkle', t: 66.2, db: -12 },
    { id: 'happiness_fanfare', type: 'fanfare', t: 67.0, cutAt: 74.5, bpm: 160, root: 440, db: -9 },

    // Акт IV: Бешеная погоня за 100-долларовой купюрой
    { id: 'rat_sprint_steps', type: 'woodTick', t: [75.2, 77.0, 79.2, 81.5, 84.0, 86.5, 89.0, 91.5, 94.0, 96.5, 99.0], db: -16 },
    { id: 'bill_flutter', type: 'whoosh', t: [77.5, 83.2, 88.5, 93.8, 97.5], db: -15, f: 1600, w: 2200 },
    { id: 'crowd_roar_whistle', type: 'slideWhistle', t: 92.0, db: -13 },

    // Акт V: Ловушка-мышеловка
    { id: 'trap_tension', type: 'kettleHum', t: 108.5, dur: 5.3, f0: 120, f1: 520, db: -12 },
    // Смертельный удар мышеловки
    { id: 'mousetrap_snap', type: 'breakerThunk', t: 114.0, db: -3 },
    { id: 'mousetrap_boom', type: 'boom', t: 114.05, db: -4 },
    { id: 'steel_wire_echo', type: 'lampDing', t: 114.2, db: -10 },
    { id: 'fade_to_black', type: 'whooshCut', t: 115.8, align: 'end', db: -15 },
  ];
}
