// ─── cutts_rat.js: Персонаж-крыса в стиле Steve Cutts «Happiness» (2017) ───
// Гравюрный комиксный стиль: перекрестная штриховка тушью (cross-hatching), текстура шерсти,
// выступающие резцы, глаз-бусина, дождевые потеки.

const RAT_PAL = {
  fur: '#919988',
  furDark: '#67705f',
  furShadow: '#444d3d',
  hatch: '#242b1f',
  skinPink: '#cba396',
  teeth: '#cfb148',
  teethDk: '#967d26',
  eye: '#0f140e',
  shirt: '#e2dfd5',
  tie: '#1d221c',
  carRed: '#b03828',
  carRedDk: '#7a2216',
  cityBg: '#535d4c',
};

// Процедурные штрихи шерсти (направление, плотность, разброс)
function generateFurHatching(cx, cy, count, angleDeg, length, spreadX, spreadY, seed = 42) {
  let s = seed;
  const rng = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const rad = angleDeg * Math.PI / 180;
  const dx = Math.cos(rad) * length;
  const dy = Math.sin(rad) * length;

  let out = '';
  for (let i = 0; i < count; i++) {
    const ox = cx + (rng() - 0.5) * spreadX;
    const oy = cy + (rng() - 0.5) * spreadY;
    const lenVar = 0.7 + rng() * 0.6;
    const curve = (rng() - 0.5) * 6;
    out += `M${ox.toFixed(1)},${oy.toFixed(1)} q${(dx * 0.5 * lenVar + curve).toFixed(1)},${(dy * 0.5 * lenVar).toFixed(1)} ${(dx * lenVar).toFixed(1)},${(dy * lenVar).toFixed(1)} `;
  }
  return `<path d="${out}" stroke="${RAT_PAL.hatch}" stroke-width="1.8" fill="none" opacity="0.65" stroke-linecap="round"/>`;
}

// Отрисовка головы крысы крупным планом (точно по референсу Steve Cutts "Happiness")
function drawCuttsRatHead(t, opts = {}) {
  const { mood = 'grin', mouthOpen = 0.5, blink = false, lookX = 0, lookY = 0 } = opts;
  const breathe = Math.sin(t * 2.5) * 3;

  return `
  <g transform="translate(0,${breathe})">
    <defs>
      <!-- Паттерн перекрестной штриховки для глубоких теней -->
      <pattern id="ratCrossHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke="${RAT_PAL.hatch}" stroke-width="1.2" opacity="0.6"/>
        <line x1="0" y1="0" x2="6" y2="0" stroke="${RAT_PAL.hatch}" stroke-width="1.2" opacity="0.6"/>
      </pattern>
      <pattern id="ratLineHatch" width="5" height="5" patternTransform="rotate(55 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="5" stroke="${RAT_PAL.hatch}" stroke-width="1.3" opacity="0.55"/>
      </pattern>
    </defs>

    <!-- Заднее левое ухо -->
    <g transform="translate(390,300) rotate(-15)">
      <ellipse cx="0" cy="0" rx="42" ry="58" fill="${RAT_PAL.furDark}" stroke="${RAT_PAL.hatch}" stroke-width="4.5"/>
      <ellipse cx="-4" cy="2" rx="28" ry="42" fill="${RAT_PAL.skinPink}" opacity="0.7"/>
    </g>

    <!-- Основной контур шеи и тела (плечи клерка) -->
    <path d="M220,780 C240,680 320,640 400,620 L580,680 C660,730 700,820 720,950 L120,950 Z" fill="${RAT_PAL.furShadow}"/>
    
    <!-- Белая офисная рубашка и галстук -->
    <path d="M280,820 L380,840 L440,790 L520,840 L560,950 L240,950 Z" fill="${RAT_PAL.shirt}" stroke="${RAT_PAL.hatch}" stroke-width="4.5"/>
    <polygon points="380,840 440,790 420,840" fill="#c5c2b7" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
    <polygon points="410,830 430,830 440,950 400,950" fill="${RAT_PAL.tie}" stroke="${RAT_PAL.hatch}" stroke-width="3.5"/>

    <!-- Форма черепа крысы: вытянутая морда в профиль 3/4 -->
    <path d="M190,440 
             C210,410 260,390 340,380 
             C440,370 540,400 590,460 
             C650,530 650,640 600,740 
             C540,830 420,830 330,760 
             C280,720 250,650 260,570 
             C240,550 210,530 190,470 Z" 
          fill="${RAT_PAL.fur}" stroke="${RAT_PAL.hatch}" stroke-width="5" stroke-linejoin="round"/>

    <!-- Теневая подложка со штриховкой по нижней челюсти и шее -->
    <path d="M260,570 C280,680 380,780 540,780 C610,740 630,660 620,620 C540,720 400,740 310,650 Z" fill="url(#ratLineHatch)"/>
    <path d="M420,660 C460,740 560,760 620,720 C640,770 590,820 520,830 C420,830 350,780 320,740 Z" fill="url(#ratCrossHatch)"/>

    <!-- Штрихи шерсти на щеках и загривке -->
    ${generateFurHatching(460, 560, 110, 48, 22, 180, 160, 101)}
    ${generateFurHatching(380, 480, 75, 35, 18, 120, 90, 202)}
    ${generateFurHatching(520, 680, 80, 60, 26, 140, 100, 303)}

    <!-- Большое переднее ухо (правое) -->
    <g transform="translate(540,380) rotate(18)">
      <path d="M-50,60 C-60,-20 -20,-70 50,-60 C110,-50 120,30 90,80 C60,110 -20,110 -50,60 Z" fill="${RAT_PAL.fur}" stroke="${RAT_PAL.hatch}" stroke-width="5"/>
      <!-- внутренняя розовая раковина со складками -->
      <path d="M-30,50 C-40,-5 -10,-45 40,-40 C85,-35 90,20 70,60 C50,85 -5,85 -30,50 Z" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
      <!-- прожилки в ухе -->
      <path d="M10,20 Q30,-10 45,-25 M15,35 Q45,20 60,10 M-10,35 Q10,15 25,-5" stroke="${RAT_PAL.furShadow}" stroke-width="2.5" fill="none" opacity="0.6"/>
      ${generateFurHatching(20, 10, 30, 40, 14, 40, 50, 404)}
    </g>

    <!-- Пасть и зубы (своеобразный оскал "Happiness") -->
    <!-- Нижняя челюсть -->
    <path d="M220,530 C240,540 280,560 300,600 C270,610 240,580 220,530 Z" fill="${RAT_PAL.furDark}" stroke="${RAT_PAL.hatch}" stroke-width="4.5"/>
    <!-- Темная внутренняя полость рта -->
    <path d="M225,510 Q280,550 330,535 Q290,610 230,545 Z" fill="#151b14" stroke="${RAT_PAL.hatch}" stroke-width="3.5"/>
    
    <!-- Большие желтые выступающие резцы крысы -->
    <g transform="translate(225,512)">
      <!-- левый резец -->
      <rect x="0" y="0" width="13" height="28" rx="2" fill="${RAT_PAL.teeth}" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
      <line x1="3" y1="4" x2="3" y2="24" stroke="${RAT_PAL.teethDk}" stroke-width="1.8"/>
      <!-- правый резец -->
      <rect x="13" y="1" width="13" height="27" rx="2" fill="${RAT_PAL.teeth}" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
      <line x1="16" y1="5" x2="16" y2="23" stroke="${RAT_PAL.teethDk}" stroke-width="1.8"/>
      <!-- налет и трещинки на зубах -->
      <line x1="0" y1="14" x2="26" y2="15" stroke="${RAT_PAL.teethDk}" stroke-width="1.5" opacity="0.7"/>
    </g>

    <!-- Нос крысы: выступающий розовый пятачок с ноздрями -->
    <g transform="translate(182,430) rotate(-10)">
      <ellipse cx="14" cy="14" rx="20" ry="15" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="4.5"/>
      <!-- ноздря -->
      <ellipse cx="8" cy="16" rx="5" ry="7" fill="${RAT_PAL.eye}"/>
      <ellipse cx="18" cy="16" rx="4" ry="6" fill="${RAT_PAL.furShadow}"/>
      <!-- блик на кончике носа -->
      <circle cx="10" cy="10" r="3.5" fill="#f4e4dd" opacity="0.8"/>
    </g>

    <!-- Глаз крысы (маленькая черная бусина в складках) -->
    <g transform="translate(450,440)">
      <!-- складки века со штриховкой -->
      <path d="M-22,-4 Q0,-18 24,-6" stroke="${RAT_PAL.hatch}" stroke-width="3.5" fill="none"/>
      <path d="M-20,-10 Q0,-25 22,-12" stroke="${RAT_PAL.hatch}" stroke-width="2.2" fill="none" opacity="0.6"/>
      <path d="M-18,12 Q0,20 22,8" stroke="${RAT_PAL.hatch}" stroke-width="3" fill="none"/>
      
      <!-- сам глаз -->
      ${blink ? `
        <line x1="-16" y1="0" x2="18" y2="0" stroke="${RAT_PAL.hatch}" stroke-width="5" stroke-linecap="round"/>
      ` : `
        <ellipse cx="0" cy="0" rx="16" ry="14" fill="${RAT_PAL.eye}" stroke="${RAT_PAL.hatch}" stroke-width="4"/>
        <!-- блик взгляда -->
        <circle cx="${-4 + lookX * 3}" cy="${-3 + lookY * 3}" r="4" fill="#ffffff"/>
        <circle cx="${3 + lookX * 2}" cy="${2 + lookY * 2}" r="1.8" fill="#ffffff" opacity="0.7"/>
      `}
    </g>

    <!-- Усы (вибриссы) грызуна: жесткие изогнутые линии -->
    <g stroke="${RAT_PAL.hatch}" stroke-width="2.5" fill="none" opacity="0.85" stroke-linecap="round">
      <path d="M190,465 C130,470 70,510 10,560"/>
      <path d="M195,475 C140,500 80,555 30,620"/>
      <path d="M185,455 C120,440 60,460 0,490"/>
      <path d="M200,485 C160,530 110,600 70,670"/>
      <path d="M210,495 C180,550 140,630 110,700"/>
    </g>
  </g>`;
}

// Отрисовка капель дождя и потеков на стекле (передний план)
function drawRainOnGlass(t, count = 45, seed = 88) {
  let s = seed;
  const rng = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

  let drops = '';
  for (let i = 0; i < count; i++) {
    const bx = rng() * 720;
    const speed = 400 + rng() * 600;
    const by = ((t * speed + rng() * 1280) % 1380) - 50;
    const len = 15 + rng() * 45;
    const slant = 8 + rng() * 12;
    const w = 1.5 + rng() * 2.2;
    const op = 0.25 + rng() * 0.45;

    // Струя и капля
    drops += `<path d="M${bx.toFixed(1)},${by.toFixed(1)} l${slant.toFixed(1)},${len.toFixed(1)}" stroke="#ffffff" stroke-width="${w.toFixed(1)}" opacity="${op.toFixed(2)}" stroke-linecap="round"/>`;
    // Круглая капля в конце потека
    if (rng() > 0.4) {
      drops += `<ellipse cx="${(bx + slant).toFixed(1)}" cy="${(by + len).toFixed(1)}" rx="${(w * 1.6).toFixed(1)}" ry="${(w * 2.2).toFixed(1)}" fill="#ffffff" opacity="${(op * 0.9).toFixed(2)}"/>`;
    }
  }

  return `<g pointer-events="none">${drops}</g>`;
}

// Салон автомобиля: зеркало заднего вида, стойка, подголовник, руль
function drawCarInterior(t) {
  const shake = Math.sin(t * 35) * 1.5;

  return `
  <g transform="translate(0,${shake})">
    <!-- Стойка лобового стекла слева -->
    <polygon points="0,0 90,0 20,480 0,480" fill="#28221c" stroke="#120e0b" stroke-width="4"/>
    
    <!-- Зеркало заднего вида сверху слева -->
    <g transform="translate(120,120) rotate(12)">
      <!-- ножка крепления к потолку -->
      <line x1="-40" y1="-80" x2="0" y2="0" stroke="#3d352b" stroke-width="18" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="14" fill="#1f1a14"/>
      <!-- корпус зеркала -->
      <rect x="-80" y="-35" width="220" height="70" rx="16" fill="#352e25" stroke="#17130e" stroke-width="5"/>
      <!-- отражающая поверхность с градиентом дождя -->
      <rect x="-74" y="-29" width="208" height="58" rx="12" fill="#586350"/>
      <!-- мини-отражение фар сзади -->
      <circle cx="-20" cy="0" r="10" fill="#f2ecb8" opacity="0.85"/>
      <circle cx="60" cy="0" r="10" fill="#f2ecb8" opacity="0.85"/>
    </g>

    <!-- Подголовник водительского сиденья слева сзади -->
    <g transform="translate(60,620)">
      <path d="M-20,-120 C40,-130 90,-100 80,10 C70,120 20,160 -40,150 Z" fill="#4d3f32" stroke="#1e1812" stroke-width="5"/>
      <path d="M-10,-90 Q50,-70 45,10 Q40,90 -20,110" stroke="#2a221a" stroke-width="4" fill="none" opacity="0.7"/>
    </g>

    <!-- Руль автомобиля (снизу справа) -->
    <g transform="translate(520,1080)">
      <!-- Обод руля -->
      <circle cx="0" cy="0" r="220" fill="none" stroke="#1c1813" stroke-width="38"/>
      <circle cx="0" cy="0" r="216" fill="none" stroke="#42382c" stroke-width="6"/>
      <!-- Лапа крысы с когтями на руле -->
      <path d="M-80,-140 Q-60,-190 -10,-170 Q40,-150 10,-110 Z" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="4"/>
      <!-- пальцы и коготки -->
      <line x1="-30" y1="-180" x2="-25" y2="-200" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
      <line x1="-10" y1="-185" x2="-5" y2="-205" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
      <line x1="10" y1="-180" x2="15" y2="-200" stroke="${RAT_PAL.hatch}" stroke-width="3"/>
    </g>
  </g>`;
}

window.drawCuttsRatHead = drawCuttsRatHead;
window.drawRainOnGlass = drawRainOnGlass;
window.drawCarInterior = drawCarInterior;
window.RAT_PAL = RAT_PAL;
