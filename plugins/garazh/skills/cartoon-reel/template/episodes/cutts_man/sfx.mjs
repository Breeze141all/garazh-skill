// sfx.mjs: Foley cues for Steve Cutts "MAN" (2012)
export const SAMPLE_RATE = 48000;
export const PEAK_CEILING_DB = -3;

export function cues(TL) {
  return [
    // Subdued room presence
    { id: 'nature_room', type: 'room', t: 0, rms: -38 },

    // Snake stomp into snakeskin boots
    { id: 'snake_stomp', type: 'bloop', t: 16.0, db: -10 },
    { id: 'boots_click', type: 'woodTick', t: 16.2, db: -12 },

    // Forest tree fellings
    { id: 'tree_fall_1', type: 'woodTick', t: 32.0, db: -8 },
    { id: 'paper_roll_1', type: 'whoosh', t: 33.5, db: -14 },
    { id: 'tree_fall_2', type: 'woodTick', t: 44.0, db: -8 },
    { id: 'tree_fall_3', type: 'woodTick', t: 54.0, db: -8 },

    // Industrial cash & profit
    { id: 'cash_register', type: 'sparkle', t: 105.0, db: -10 },
    { id: 'coin_ding', type: 'ding', t: 105.5, db: -12 },

    // Prestissimo accelerando stings
    { id: 'climax_whistle', type: 'slideWhistle', t: 147.0, db: -8 },

    // Grand Alien Stomp at musical climax (150.0s)
    { id: 'alien_stomp_boom', type: 'boom', t: 150.0, db: -2 },
    { id: 'alien_metal_crash', type: 'woodTick', t: 150.05, db: -4 },
    { id: 'blackout_whoosh', type: 'whooshCut', t: 153.0, align: 'end', db: -12 },
  ];
}
