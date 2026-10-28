// man_sets.js: Canonical Steve Cutts "MAN" (2012) Scene Sets
window.SETS = window.SETS || {};

const MAN_PAL = {
  skyYellow: '#e2d572',
  skyStain: '#cbbe62',
  skySmoke: '#4e4c44',
  line: '#000000',
  white: '#ffffff',
  mountainGray: '#d5d4cb',
  mountainShadow: '#bcbbaf',
  treeTrunk: '#4a453e',
  trashDark: '#262522',
  trashRust: '#734d26',
  trashGreen: '#23472b',
};

// Vintage distressed parchment sky background
function drawParchmentSky(darkFactor = 0) {
  return `
    <rect width="720" height="1280" fill="${MAN_PAL.skyYellow}"/>
    ${darkFactor > 0 ? `
      <!-- Industrial smog darkening the sky -->
      <rect width="720" height="1280" fill="${MAN_PAL.skySmoke}" opacity="${Math.min(0.85, darkFactor * 0.75)}"/>
    ` : ''}
    <!-- Subtle organic aged paper stains -->
    <g fill="${MAN_PAL.skyStain}" opacity="0.32">
      <ellipse cx="60" cy="180" rx="45" ry="22"/>
      <ellipse cx="660" cy="220" rx="55" ry="28"/>
      <ellipse cx="140" cy="460" rx="35" ry="18"/>
      <ellipse cx="580" cy="580" rx="60" ry="32"/>
      <ellipse cx="40" cy="740" rx="40" ry="20"/>
      <ellipse cx="320" cy="120" rx="50" ry="16"/>
    </g>
  `;
}

// Iconic opening background mountains & tree (1:1 with reference)
function drawCanonMountainsAndTree() {
  return `
    <!-- Distant mountain ridge -->
    <g transform="translate(0, 600)">
      <!-- Low left hill -->
      <path d="M-60,320 Q40,250 140,320" stroke="${MAN_PAL.line}" stroke-width="4.5" fill="${MAN_PAL.white}"/>

      <!-- Main towering snow-capped mountain (canon silhouette) -->
      <polygon points="60,320 245,-40 480,320" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="5" stroke-linejoin="round"/>
      <!-- Right shaded slope -->
      <polygon points="245,-40 320,50 290,80 355,160 335,320 480,320" fill="${MAN_PAL.mountainGray}" stroke="${MAN_PAL.line}" stroke-width="3"/>
      <!-- Jagged snowcap contour -->
      <path d="M245,-40 L190,50 L220,70 L240,45 L275,85 L320,50 Z" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="3.5" stroke-linejoin="round"/>
      <!-- Ink hatch lines on snow shadow -->
      <line x1="265" y1="20" x2="295" y2="55" stroke="${MAN_PAL.line}" stroke-width="2"/>
      <line x1="280" y1="40" x2="310" y2="75" stroke="${MAN_PAL.line}" stroke-width="2"/>
      <line x1="305" y1="105" x2="340" y2="145" stroke="${MAN_PAL.line}" stroke-width="2"/>

      <!-- Right background ridge -->
      <polygon points="430,320 580,140 760,320" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="4.5"/>
      <polygon points="580,140 640,200 620,220 660,270 760,320" fill="${MAN_PAL.mountainGray}"/>
    </g>

    <!-- Stylized ink tree on the right (canon screenshot) -->
    <g transform="translate(635, 830)">
      <path d="M0,90 L2,30 L-8,10 L8,-20 M2,30 L16,0" stroke="${MAN_PAL.treeTrunk}" stroke-width="6.5" fill="none" stroke-linecap="round"/>
      <circle cx="-16" cy="-45" r="32" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <circle cx="16" cy="-50" r="35" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <circle cx="0" cy="-80" r="38" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <circle cx="-10" cy="-50" r="2" fill="${MAN_PAL.line}"/>
      <circle cx="12" cy="-60" r="2.5" fill="${MAN_PAL.line}"/>
      <circle cx="2" cy="-75" r="2" fill="${MAN_PAL.line}"/>
    </g>

    <!-- Little bush at mountain base -->
    <g transform="translate(565, 905)">
      <line x1="0" y1="15" x2="0" y2="0" stroke="${MAN_PAL.line}" stroke-width="3"/>
      <path d="M0,0 Q-10,-12 -20,-8 M0,0 Q-5,-16 -8,-22 M0,0 Q6,-18 14,-20 M0,0 Q12,-10 20,-5" stroke="${MAN_PAL.line}" stroke-width="2.5" fill="none"/>
    </g>

    <!-- Flat pure white ground & crisp horizon line at Y=920 -->
    <rect y="920" width="720" height="360" fill="${MAN_PAL.white}"/>
    <line x1="-20" y1="920" x2="740" y2="920" stroke="${MAN_PAL.line}" stroke-width="5"/>
  `;
}

// =========================================================================
// SCENE 1: OPENING — WELCOME TO EARTH (0.0s - 25.0s)
// 1:1 match with user's reference image
// =========================================================================
SETS.man_opening = function(t, shot, st) {
  const isStomp = t >= 16.0;
  const walkOffset = isStomp ? (t - 16.0) * 45 : 0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Parchment sky -->
    ${drawParchmentSky()}
    
    <!-- Mountains, tree, horizon line at Y=920 and white ground -->
    ${drawCanonMountainsAndTree()}

    <!-- Two-headed smiling snake -->
    ${!isStomp ? `
      ${drawTwoHeadedSnake(t, 130, 920, 1.35)}
    ` : `
      <!-- Squished snake skin boots left on the ground -->
      <g transform="translate(130, 925)">
        <ellipse cx="0" cy="0" rx="35" ry="6" fill="#000000"/>
        <path d="M-25,0 Q0,-8 25,0" stroke="${MAN_PAL.line}" stroke-width="3" fill="none"/>
      </g>
    `}

    <!-- Steve Cutts Protagonist (WELCOME) -->
    ${drawSteveCuttsMan(t, 460 + walkOffset, 680, 1.45, {
      pose: isStomp ? 'walk' : 'welcome',
      tshirt: 'WELCOME',
      walkSpeed: 3.5,
    })}
  </svg>`;
};

// =========================================================================
// SCENE 2: FORESTS FELL & CONSUMPTION (25.0s - 65.0s)
// Chainsaw felling trees into giant toilet paper rolls
// =========================================================================
SETS.man_forest = function(t, shot, st) {
  const treeFall1 = t >= 32.0 ? Math.min(85, (t - 32.0) * 40) : 0;
  const treeFall2 = t >= 44.0 ? Math.min(85, (t - 44.0) * 40) : 0;
  const treeFall3 = t >= 54.0 ? Math.min(85, (t - 54.0) * 40) : 0;
  const tpRolls = Math.floor(Math.max(0, (t - 32.0) * 1.5));

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    ${drawParchmentSky()}

    <!-- Ground & Horizon at Y=920 -->
    <rect y="920" width="720" height="360" fill="${MAN_PAL.white}"/>
    <line x1="-20" y1="920" x2="740" y2="920" stroke="${MAN_PAL.line}" stroke-width="5"/>

    <!-- Tree 1 (falling) -->
    <g transform="translate(180, 920) rotate(${treeFall1} 0 0)">
      <line x1="0" y1="0" x2="0" y2="-340" stroke="${MAN_PAL.treeTrunk}" stroke-width="26"/>
      <circle cx="-30" cy="-370" r="70" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="6"/>
      <circle cx="35" cy="-380" r="75" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="6"/>
      <circle cx="0" cy="-440" r="85" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="6"/>
      ${treeFall1 > 0 ? `<line x1="-15" y1="0" x2="15" y2="0" stroke="#ff2200" stroke-width="5"/>` : ''}
    </g>

    <!-- Tree 2 (falling later) -->
    <g transform="translate(340, 920) rotate(${treeFall2} 0 0)">
      <line x1="0" y1="0" x2="0" y2="-300" stroke="${MAN_PAL.treeTrunk}" stroke-width="22"/>
      <circle cx="0" cy="-360" r="70" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="5.5"/>
    </g>

    <!-- Tree 3 -->
    <g transform="translate(560, 920) rotate(${treeFall3} 0 0)">
      <line x1="0" y1="0" x2="0" y2="-320" stroke="${MAN_PAL.treeTrunk}" stroke-width="24"/>
      <circle cx="0" cy="-390" r="75" fill="${MAN_PAL.white}" stroke="${MAN_PAL.line}" stroke-width="5.5"/>
    </g>

    <!-- Stacks of giant toilet paper rolls produced on the ground -->
    ${Array.from({ length: Math.min(12, tpRolls) }).map((_, i) => {
      const rx = 80 + (i % 4) * 65;
      const ry = 900 - Math.floor(i / 4) * 45;
      return `
      <g transform="translate(${rx}, ${ry})">
        <ellipse cx="0" cy="0" rx="28" ry="16" fill="#ffffff" stroke="${MAN_PAL.line}" stroke-width="3.5"/>
        <ellipse cx="0" cy="0" rx="8" ry="4.5" fill="#d5d4cb" stroke="${MAN_PAL.line}" stroke-width="2"/>
        <path d="M-28,0 L-28,26 C-28,34 28,34 28,26 L28,0 Z" fill="#ffffff" stroke="${MAN_PAL.line}" stroke-width="3.5"/>
        <text x="0" y="22" font-family="Arial Black" font-size="7" text-anchor="middle" fill="#555">PAPER</text>
      </g>`;
    }).join('')}

    <!-- The Man wielding chainsaw, shirt: CONSUME -->
    ${drawSteveCuttsMan(t, 440, 680, 1.45, {
      pose: 'chainsaw',
      tshirt: 'CONSUME',
      walkSpeed: 4.2,
    })}
  </svg>`;
};

// =========================================================================
// SCENE 3: INDUSTRIAL REVOLUTION & PLASTIC OCEANS (65.0s - 105.0s)
// Billowing black smokestacks, toxic green waters, plastic debris
// =========================================================================
SETS.man_factory = function(t, shot, st) {
  const smogProg = Math.min(1, (t - 65.0) / 35.0);
  const smokePuff = (t * 8) % 40;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Darkening sky with heavy smog -->
    ${drawParchmentSky(smogProg)}

    <!-- Billowing factory smokestacks in background -->
    <g transform="translate(0, 520)">
      <!-- Smokestack 1 -->
      <polygon points="80,400 100,160 150,160 170,400" fill="#2d2c29" stroke="${MAN_PAL.line}" stroke-width="5"/>
      <ellipse cx="125" cy="160" rx="25" ry="8" fill="#1b1a18"/>
      <!-- Smokestack 2 -->
      <polygon points="220,400 235,120 285,120 300,400" fill="#383733" stroke="${MAN_PAL.line}" stroke-width="5"/>
      <ellipse cx="260" cy="120" rx="25" ry="8" fill="#22211f"/>
      <!-- Smokestack 3 -->
      <polygon points="520,400 535,140 585,140 600,400" fill="#2d2c29" stroke="${MAN_PAL.line}" stroke-width="5"/>
      <ellipse cx="560" cy="140" rx="25" ry="8" fill="#1b1a18"/>

      <!-- Giant black smoke clouds expanding upwards -->
      <g fill="#1a1917" opacity="0.92">
        <circle cx="125" cy="${140 - smokePuff * 2}" r="${35 + smokePuff * 1.5}"/>
        <circle cx="${140 + smokePuff}" cy="${100 - smokePuff * 2}" r="${45 + smokePuff * 1.8}"/>
        <circle cx="260" cy="${100 - smokePuff * 2}" r="${40 + smokePuff * 1.6}"/>
        <circle cx="${280 - smokePuff}" cy="${60 - smokePuff * 2.2}" r="${55 + smokePuff * 2}"/>
        <circle cx="560" cy="${120 - smokePuff * 2}" r="${38 + smokePuff * 1.5}"/>
      </g>
    </g>

    <!-- Toxic sludge water / industrial ocean at Y=920 -->
    <rect y="920" width="720" height="360" fill="#182e1c"/>
    <line x1="-20" y1="920" x2="740" y2="920" stroke="${MAN_PAL.line}" stroke-width="5"/>

    <!-- Floating toxic barrels & plastic bottles -->
    <g transform="translate(140, 935)">
      <rect x="-25" y="-15" width="50" height="35" rx="5" fill="#f5c227" stroke="${MAN_PAL.line}" stroke-width="3"/>
      <text x="0" y="8" font-family="Arial Black" font-size="12" text-anchor="middle" fill="#000">☣</text>
    </g>
    <g transform="translate(260, 940)">
      <path d="M-30,0 L30,0 M-20,-10 L-20,10 M-5,-12 L-5,12 M10,-10 L10,10 M25,-6 L35,0 L25,6 Z" stroke="#ffffff" stroke-width="3" fill="none"/>
      <circle cx="-25" cy="-2" r="2" fill="#fff"/>
    </g>
    <g transform="translate(600, 930)">
      <rect x="-15" y="-12" width="30" height="24" rx="4" fill="#f5c227" stroke="${MAN_PAL.line}" stroke-width="3"/>
      <text x="0" y="4" font-family="Arial Black" font-size="9" text-anchor="middle" fill="#000">☣</text>
    </g>

    <!-- Plastic bottles floating -->
    <g transform="translate(380, 930) rotate(${Math.sin(t * 3) * 10})">
      <rect x="-10" y="-20" width="20" height="35" rx="4" fill="#aee0f0" stroke="${MAN_PAL.line}" stroke-width="2.5" opacity="0.8"/>
      <rect x="-5" y="-25" width="10" height="6" fill="#0066cc"/>
    </g>

    <!-- The Man strutting forward, shirt: PROFIT -->
    ${drawSteveCuttsMan(t, 440, 680, 1.45, {
      pose: 'walk',
      tshirt: 'PROFIT',
      cigar: true,
      walkSpeed: 3.8,
    })}
  </svg>`;
};

// =========================================================================
// SCENE 4: CLIMAX — THRONE ATOP THE MOUNTAIN OF TRASH (105.0s - 153.5s)
// King of the World, Alien Stomp at grand musical peak (t=150.0s)
// =========================================================================
SETS.man_throne = function(t, shot, st) {
  const isCrushed = t >= 150.0;
  const shadowDrop = t >= 148.0 ? Math.min(0.65, (t - 148.0) * 0.45) : 0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Apocalyptic darkened sky -->
    ${drawParchmentSky(0.85)}

    <!-- Raining $100 dollar bills in the prestissimo accelerando -->
    ${t < 150.0 ? Array.from({ length: 14 }).map((_, i) => {
      const bx = (i * 54 + (t * 120)) % 700;
      const by = (i * 85 + (t * 220)) % 750;
      return `
      <g transform="translate(${bx}, ${by}) rotate(${(i * 35 + t * 40) % 360})">
        <rect x="-20" y="-11" width="40" height="22" rx="2" fill="#85bb65" stroke="${MAN_PAL.line}" stroke-width="2"/>
        <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="${MAN_PAL.line}" stroke-width="1.5"/>
        <text x="0" y="3" font-family="Arial Black" font-size="7" text-anchor="middle" fill="#000">$</text>
      </g>`;
    }).join('') : ''}

    <!-- Colossal Mountain of Waste & Trash -->
    <g transform="translate(0, 560)">
      <!-- Base garbage polygon -->
      <polygon points="-80,720 360,180 800,720" fill="${MAN_PAL.trashDark}" stroke="${MAN_PAL.line}" stroke-width="7"/>
      
      <!-- CRT TV 1 -->
      <rect x="230" y="330" width="70" height="55" rx="5" fill="#44423c" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <rect x="238" y="338" width="44" height="38" rx="4" fill="#a09e94" stroke="${MAN_PAL.line}" stroke-width="2.5"/>
      <circle cx="290" cy="348" r="4" fill="#111"/>

      <!-- CRT TV 2 -->
      <rect x="430" y="400" width="80" height="60" rx="5" fill="#55534b" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <rect x="440" y="408" width="50" height="42" rx="4" fill="#908e84" stroke="${MAN_PAL.line}" stroke-width="2.5"/>

      <!-- Rusted oil drums -->
      <g transform="translate(170, 480) rotate(-25)">
        <rect x="-25" y="-35" width="50" height="70" rx="6" fill="${MAN_PAL.trashRust}" stroke="${MAN_PAL.line}" stroke-width="4"/>
        <line x1="-25" y1="-10" x2="25" y2="-10" stroke="${MAN_PAL.line}" stroke-width="3"/>
        <line x1="-25" y1="15" x2="25" y2="15" stroke="${MAN_PAL.line}" stroke-width="3"/>
      </g>
      <g transform="translate(550, 520) rotate(35)">
        <rect x="-25" y="-35" width="50" height="70" rx="6" fill="${MAN_PAL.trashGreen}" stroke="${MAN_PAL.line}" stroke-width="4"/>
      </g>

      <!-- Animal skull in trash -->
      <g transform="translate(310, 440)">
        <ellipse cx="0" cy="0" rx="14" ry="12" fill="#ffffff" stroke="${MAN_PAL.line}" stroke-width="3"/>
        <circle cx="-5" cy="-2" r="3.5" fill="#000"/>
        <circle cx="5" cy="-2" r="3.5" fill="#000"/>
        <path d="M-4,8 L-4,13 M0,8 L0,13 M4,8 L4,13" stroke="${MAN_PAL.line}" stroke-width="2"/>
      </g>
    </g>

    <!-- Grand Golden Throne at the Summit (X=360, Y=680) -->
    <g transform="translate(360, 680)">
      <!-- Throne high backrest -->
      <path d="M-80,60 L-80,-140 L0,-180 L80,-140 L80,60 Z" fill="#f5c227" stroke="${MAN_PAL.line}" stroke-width="6" stroke-linejoin="round"/>
      <!-- Red velvet cushion -->
      <path d="M-60,40 L-60,-115 L0,-150 L60,-115 L60,40 Z" fill="#a81919" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <!-- Armrests -->
      <rect x="-95" y="0" width="25" height="70" rx="4" fill="#e0af1d" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <rect x="70" y="0" width="25" height="70" rx="4" fill="#e0af1d" stroke="${MAN_PAL.line}" stroke-width="4"/>
      <!-- Base pedestal -->
      <rect x="-105" y="65" width="210" height="35" rx="5" fill="#d4a313" stroke="${MAN_PAL.line}" stroke-width="5"/>
    </g>

    <!-- Ominous shadow falling from space before impact -->
    ${shadowDrop > 0 ? `
      <ellipse cx="360" cy="640" rx="${120 + shadowDrop * 150}" ry="${35 + shadowDrop * 50}" fill="#000000" opacity="${shadowDrop}"/>
    ` : ''}

    <!-- The Man on the Throne: Crown, Cigar, Shirt: MAN (or Crushed Splat) -->
    ${!isCrushed ? `
      ${drawSteveCuttsMan(t, 360, 550, 1.45, {
        pose: 'throne',
        tshirt: 'MAN',
        crown: true,
        cigar: true,
      })}
    ` : `
      <!-- Flattened into pancake on the throne -->
      ${drawSteveCuttsMan(t, 360, 550, 1.45, {
        pose: 'splat',
      })}
    `}

    <!-- Massive Extraterrestrial Robot Foot (Drops at t=150.0s) -->
    ${drawAlienClimax(t, 150.0, 360, 690, 1.45)}
  </svg>`;
};
