// ─── sfx.mjs: Процедурный саунд-дизайн для «cutts_feed» (Стив Каттс) ────────
export const SAMPLE_RATE = 48000;
export const PEAK_CEILING_DB = -3;

export function cues(TL) {
  return [
    // Фоновый гул индустриального города
    { id: 'room_amb', type: 'room', t: 0, rms: -34 },

    // Акт I: Будильник
    { id: 'alarm_trill', type: 'ding', t: [6.0, 7.5, 9.0, 10.5], db: -14 },
    { id: 'alarm_click', type: 'click', t: [6.2, 7.7, 9.2, 10.7], db: -18 },
    
    // Спуск манипулятора со смартфоном
    { id: 'claw_whoosh', type: 'whoosh', t: 12.2, db: -16, f: 1200, w: 1600 },
    { id: 'phone_clamp', type: 'bloop', t: 14.8, db: -10 },
    { id: 'phone_beep', type: 'laptopBeep', t: 15.2, db: -14 },

    // Дофаминовый запуск лица
    { id: 'face_whistle', type: 'slideWhistle', t: 18.0, db: -12 },
    { id: 'face_sparkle', type: 'sparkle', t: 19.0, db: -14 },
    { id: 'dopamine_fanfare', type: 'fanfare', t: 18.5, cutAt: 24.0, bpm: 150, root: 440, db: -10 },

    // Акт II: Шаги конвейера и измельчитель
    { id: 'conveyor_steps', type: 'woodTick', t: [24.0, 26.0, 28.0, 30.0, 32.0, 34.0, 36.0, 38.0, 40.0], db: -20 },
    { id: 'shredder_clank', type: 'breakerThunk', t: 42.5, db: -8 },
    { id: 'victim_fall', type: 'boom', t: 43.0, db: -14 },

    // Акт III: Слот-машина и кормление
    { id: 'lever_pull', type: 'kettleClick', t: 58.2, db: -10 },
    { id: 'slot_reels', type: 'textTick', t: [58.8, 60.0, 61.2, 62.4, 63.6], db: -18 },
    { id: 'slot_jackpot', type: 'fanfare', t: 64.0, cutAt: 72.0, bpm: 180, root: 523, db: -8 },
    { id: 'can_dispense', type: 'plugClick', t: [66.5, 68.5, 70.5], db: -12 },
    { id: 'dopamine_gulp', type: 'bloop', t: [67.2, 69.2, 71.2], db: -11 },

    // Акт IV: Колесо хомяка и перегрев
    { id: 'wheel_spin', type: 'whoosh', t: [76.0, 79.0, 82.0, 85.0, 88.0, 91.0], db: -18 },
    { id: 'overheat_alarm', type: 'lampFlick', t: [92.0, 93.5, 95.0, 96.5], db: -12 },
    { id: 'overheat_steam', type: 'kettleHum', t: 92.0, dur: 5.8, f0: 160, f1: 650, db: -10 },
    { id: 'catastrophe_boom', type: 'boom', t: 98.0, db: -4 },
    { id: 'breaker_blow', type: 'breakerThunk', t: 98.1, db: -6 },

    // Акт V: Гора мусора и финальный лайк
    { id: 'dump_silence_whoosh', type: 'whooshCut', t: 102.0, align: 'end', db: -16 },
    { id: 'final_like_ding', type: 'ding', t: 116.0, db: -12 },
    { id: 'iris_out_whoosh', type: 'whooshCut', t: 118.5, align: 'end', db: -15 },
  ];
}
