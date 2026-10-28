// ─── sfx.mjs: Саунд-дизайн для манифеста Mr. Freeman ───────────────────────
export const SAMPLE_RATE = 48000;
export const PEAK_CEILING_DB = -3;

export function cues(TL) {
  return [
    // Статический электрический треск и шум эфира
    { id: 'tv_static_hum', type: 'room', t: 0, rms: -34 },
    { id: 'start_click', type: 'click', t: 0.2, db: -12 },
    { id: 'intro_glitch', type: 'laptopBeep', t: 0.8, db: -14 },

    // Удары кинетического текста (БИОМАССА / СЕРЬЁЗНО?!)
    { id: 'biomass_slam', type: 'breakerThunk', t: 5.0, db: -6 },
    { id: 'glitch_sub', type: 'boom', t: 5.1, db: -10 },
    { id: 'serious_whistle', type: 'slideWhistle', t: 12.0, db: -11 },
    { id: 'eye_spark', type: 'sparkle', t: 12.5, db: -14 },

    // Инверсия и будильник-удавка
    { id: 'invert_whoosh', type: 'whooshCut', t: 18.0, align: 'end', db: -10 },
    { id: 'alarm_trill_fm', type: 'ding', t: [18.2, 19.4, 20.6, 21.8], db: -14 },
    { id: 'collar_choke', type: 'plugClick', t: 22.5, db: -8 },

    // Инфографика (треск счетчика и машинки)
    { id: 'infographic_ticks', type: 'click', t: [26.2, 28.0, 30.5, 33.0, 35.5], db: -16 },
    { id: 'pie_chart_ding', type: 'ding', t: 36.0, db: -12 },

    // Штрихкод и тюрьма
    { id: 'barcode_bars_slam', type: 'breakerThunk', t: 38.0, db: -7 },
    { id: 'prison_echo', type: 'lampDing', t: 38.2, db: -12 },

    // Беличье колесо и деньги
    { id: 'wheel_spin_loop', type: 'whoosh', t: [48.2, 51.0, 53.8, 56.5, 59.2], db: -16, f: 1200, w: 1800 },
    { id: 'coin_sparkle', type: 'sparkle', t: 49.5, db: -11 },
    { id: 'slave_fanfare', type: 'fanfare', t: 52.0, cutAt: 58.0, bpm: 170, root: 440, db: -10 },

    // Мышеловка и БАМ!
    { id: 'trap_creak', type: 'kettleHum', t: 60.5, dur: 8.5, f0: 100, f1: 480, db: -12 },
    { id: 'bam_explosion', type: 'boom', t: 70.0, db: -2 },
    { id: 'bam_metal_crash', type: 'breakerThunk', t: 70.05, db: -4 },
    { id: 'shatter_echo', type: 'lampDing', t: 70.2, db: -8 },

    // Акт V: Секундная стрелка в гробовой тишине (тик-так)
    { id: 'clock_tick1', type: 'woodTick', t: [78.0, 79.0, 80.0, 81.0, 82.0, 83.0, 84.0, 85.0, 86.0], db: -14 },
    
    // Щелчок пальцами Фримена и мгновенный блэкаут
    { id: 'finger_snap', type: 'click', t: 86.8, db: -4 },
    { id: 'snap_thump', type: 'breakerThunk', t: 86.85, db: -6 },
    { id: 'crt_dot_shutdown', type: 'whooshCut', t: 88.0, align: 'end', db: -12 },
  ];
}
