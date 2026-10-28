// ─── freeman_sets.js: Сцены и кинетическая графика Mr. Freeman ───────────────
window.SETS = window.SETS || {};

// ─── 1. Интро: Белая пустота и провокация (SETS.freeman_intro) ─────────────
SETS.freeman_intro = function(t, shot, st) {
  const isPoint = t >= 5.0 && t < 12.0;
  const isZoomEye = t >= 12.0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Белая стерильная пустота -->
    <rect width="720" height="1280" fill="#ffffff"/>

    <!-- Кинетическая типографика на заднем плане -->
    ${t < 5.0 ? `
      <text x="360" y="240" text-anchor="middle" font-family="Impact, Arial Black" font-size="72" fill="#000000" letter-spacing="4">ЗДРАВСТВУЙ</text>
    ` : ''}

    ${isPoint ? `
      <g transform="translate(360,180)">
        <text x="0" y="0" text-anchor="middle" font-family="Impact, Arial Black" font-size="88" fill="#000000" letter-spacing="6">БИОМАССА</text>
        <line x1="-220" y1="20" x2="220" y2="20" stroke="#000000" stroke-width="8"/>
      </g>
    ` : ''}

    ${isZoomEye ? `
      <text x="360" y="180" text-anchor="middle" font-family="Impact, Arial Black" font-size="76" fill="#000000">СЕРЬЁЗНО?!</text>
    ` : ''}

    <!-- Фигура Mr. Freeman -->
    ${!isZoomEye ? `
      ${drawFreeman(t, 360, 560, 1.35, {
        pose: isPoint ? 'point' : 'idle',
        mouth: 'talk',
        eyeLookX: Math.sin(t * 3) * 0.4,
        eyeLookY: 0,
        tilt: isPoint ? -6 : 0,
      })}
    ` : `
      <!-- Макро-план глаза Фримена, смотрящего в душу зрителя -->
      <g transform="translate(360,640) scale(4.2)">
        <ellipse cx="0" cy="0" rx="36" ry="48" fill="#ffffff" stroke="#000000" stroke-width="4"/>
        <!-- Пульсирующий черный зрачок -->
        <circle cx="0" cy="0" r="${8 + Math.sin(t * 18) * 3}" fill="#000000"/>
        <!-- Внутреннее отражение силуэта зрителя со смартфоном в руках -->
        <g transform="scale(0.08) translate(-50,-80)">
          <ellipse cx="0" cy="0" rx="15" ry="18" fill="#ffffff"/>
          <rect x="-12" y="24" width="24" height="40" rx="4" fill="#ffffff"/>
          <rect x="-6" y="32" width="12" height="20" rx="2" fill="#000000"/>
        </g>
      </g>
    `}
  </svg>`;
};

// ─── 2. Инверсия: Ошейник и график жизни (SETS.freeman_collar) ──────────────
SETS.freeman_collar = function(t, shot, st) {
  const isDiagram = t >= 26.0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Инверсия: черный фон -->
    <rect width="720" height="1280" fill="#000000"/>

    ${!isDiagram ? `
      <!-- Будильник, превращающийся в удавку -->
      <g transform="translate(360,320)">
        <circle cx="0" cy="0" r="110" fill="#000000" stroke="#ffffff" stroke-width="12"/>
        <line x1="0" y1="0" x2="0" y2="-65" stroke="#ffffff" stroke-width="10"/>
        <line x1="0" y1="0" x2="45" y2="20" stroke="#ffffff" stroke-width="8"/>
        <!-- Колокольчики будильника вздрагивают -->
        <path d="M-80,-80 Q-110,-120 -60,-130" stroke="#ffffff" stroke-width="12" fill="none"/>
        <path d="M80,-80 Q110,-120 60,-130" stroke="#ffffff" stroke-width="12" fill="none"/>
      </g>

      <text x="360" y="520" text-anchor="middle" font-family="Impact" font-size="52" fill="#ffffff" letter-spacing="3">РАБСКИЙ ОШЕЙНИК</text>

      <!-- Шея в галстуке-петле -->
      <g transform="translate(360,780)">
        <polygon points="-50,0 50,0 25,180 -25,180" fill="#ffffff"/>
        <!-- затянутый узел -->
        <polygon points="-30,-40 30,-40 20,0 -20,0" fill="#ffffff"/>
        <line x1="0" y1="-280" x2="0" y2="-40" stroke="#ffffff" stroke-width="8" stroke-dasharray="14 10"/>
      </g>
    ` : `
      <!-- Инфографика «ЗАГОН БИОМАССЫ: 24 ЧАСА» -->
      <text x="360" y="160" text-anchor="middle" font-family="Impact" font-size="56" fill="#ffffff" letter-spacing="4">ТВОЙ ДЕНЬ:</text>

      <!-- Круговая диаграмма распределения рабского времени -->
      <g transform="translate(360,480)">
        <!-- Круг диаграммы -->
        <circle cx="0" cy="0" r="220" fill="none" stroke="#ffffff" stroke-width="16"/>
        <!-- Секторы -->
        <line x1="0" y1="0" x2="0" y2="-220" stroke="#ffffff" stroke-width="10"/>
        <line x1="0" y1="0" x2="190" y2="110" stroke="#ffffff" stroke-width="10"/>
        <line x1="0" y1="0" x2="-190" y2="110" stroke="#ffffff" stroke-width="10"/>
        
        <!-- Подписи секторов -->
        <text x="0" y="-100" text-anchor="middle" font-family="Arial Black" font-size="24" fill="#ffffff">10ч ОФИС / РАБСТВО</text>
        <text x="110" y="90" text-anchor="middle" font-family="Arial Black" font-size="20" fill="#ffffff">8ч СОН</text>
        <text x="-110" y="90" text-anchor="middle" font-family="Arial Black" font-size="18" fill="#ffffff">6ч ПРОБКА + СКРОЛЛ</text>
      </g>

      <!-- Фримен сбоку комментирует график -->
      <g transform="translate(180,680)">
        ${drawFreeman(t, 180, 260, 0.95, {
          pose: 'point',
          mouth: 'talk',
          invert: true,
          tilt: -8,
        })}
      </g>
    `}
  </svg>`;
};

// ─── 3. Иллюзия выбора: Штрихкод и колесо (SETS.freeman_illusion) ───────────
SETS.freeman_illusion = function(t, shot, st) {
  const isWheel = t >= 48.0;
  const barcodeY = Math.min(1280, (t - 38.0) * 160);

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <rect width="720" height="1280" fill="#ffffff"/>

    ${!isWheel ? `
      <!-- Штрихкод, превращающийся в решетку тюрьмы -->
      <text x="360" y="160" text-anchor="middle" font-family="Impact" font-size="64" fill="#000000" letter-spacing="4">ИЛЛЮЗИЯ ВЫБОРА</text>

      <!-- Вертикальные полосы штрихкода -->
      <g transform="translate(60,240)">
        ${[15, 30, 60, 75, 110, 150, 175, 210, 230, 270, 310, 350, 380, 420, 450, 490, 520, 560, 590].map((x, i) => `
          <rect x="${x}" y="0" width="${i % 2 === 0 ? 16 : 8}" height="${Math.max(240, barcodeY)}" fill="#000000"/>
        `).join('')}
        <text x="300" y="${Math.max(290, barcodeY + 40)}" text-anchor="middle" font-family="Courier New, monospace" font-size="28" font-weight="bold" fill="#000000" letter-spacing="8">2 4 8 9 0 0 1 7 4 3</text>
      </g>

      <!-- Фримен за решеткой штрихкода -->
      ${drawFreeman(t, 360, 680, 1.25, {
        pose: 'shrug',
        mouth: 'talk',
        invert: false,
      })}
    ` : `
      <!-- Беличье колесо с циферблатом и купюрой на удочке -->
      <text x="360" y="140" text-anchor="middle" font-family="Impact" font-size="60" fill="#000000" letter-spacing="3">ЖРИ · СПИ · ПЛАТИ</text>

      <!-- Колесо бега -->
      <g transform="translate(360,560) rotate(${(t * 280) % 360})">
        <circle cx="0" cy="0" r="230" fill="none" stroke="#000000" stroke-width="16"/>
        <circle cx="0" cy="0" r="215" fill="none" stroke="#000000" stroke-width="4"/>
        <!-- Перекладины колеса -->
        ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => `
          <line x1="0" y1="0" x2="${Math.cos(a * Math.PI / 180) * 215}" y2="${Math.sin(a * Math.PI / 180) * 215}" stroke="#000000" stroke-width="8"/>
        `).join('')}
        <circle cx="0" cy="0" r="35" fill="#000000"/>
      </g>

      <!-- Силуэт бегущего раба внутри колеса -->
      <g transform="translate(360,650) scale(0.65)">
        <circle cx="0" cy="-60" r="22" fill="#000000"/>
        <line x1="0" y1="-40" x2="-20" y2="30" stroke="#000000" stroke-width="14"/>
        <!-- бегущие ноги -->
        <line x1="-20" y1="30" x2="${30 + Math.sin(t * 18) * 35}" y2="90" stroke="#000000" stroke-width="12"/>
        <line x1="-20" y1="30" x2="${-30 - Math.sin(t * 18) * 35}" y2="90" stroke="#000000" stroke-width="12"/>
      </g>

      <!-- Удочка с купюрой $ перед колесом -->
      <g transform="translate(560,420) rotate(-15)">
        <line x1="-80" y1="-20" x2="60" y2="-180" stroke="#000000" stroke-width="8"/>
        <line x1="60" y1="-180" x2="60" y2="-40" stroke="#000000" stroke-width="3" stroke-dasharray="8 6"/>
        <g transform="translate(60,-40)">
          <rect x="-40" y="0" width="80" height="42" fill="#ffffff" stroke="#000000" stroke-width="4"/>
          <text x="0" y="28" text-anchor="middle" font-family="Impact" font-size="24" fill="#000000">$ 100 $</text>
        </g>
      </g>

      <!-- Фримен указывает на колесо -->
      ${drawFreeman(t, 140, 780, 0.95, {
        pose: 'point',
        mouth: 'talk',
      })}
    `}
  </svg>`;
};

// ─── 4. Кульминация: Мышеловка и БАМ (SETS.freeman_mousetrap) ───────────────
SETS.freeman_mousetrap = function(t, shot, st) {
  const isBam = t >= 70.0;
  // Стробоскопический эффект на кульминации: мигание черным/белым
  const strobe = isBam && Math.floor((t - 70.0) * 15) % 2 === 0;
  const bg = strobe ? '#000000' : '#ffffff';
  const fg = strobe ? '#ffffff' : '#000000';

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <rect width="720" height="1280" fill="${bg}"/>

    ${!isBam ? `
      <!-- Огромная графическая мышеловка -->
      <text x="360" y="160" text-anchor="middle" font-family="Impact" font-size="64" fill="${fg}" letter-spacing="4">МЫШЕЛОВКА</text>

      <!-- Платформа мышеловки -->
      <g transform="translate(110,640)">
        <rect x="0" y="0" width="500" height="340" fill="${bg}" stroke="${fg}" stroke-width="12"/>
        <!-- Стальная пружина -->
        <circle cx="250" cy="170" r="50" fill="none" stroke="${fg}" stroke-width="14"/>
        <ellipse cx="250" cy="170" rx="35" ry="45" fill="none" stroke="${fg}" stroke-width="8"/>
        <!-- Приманка: пачка купюр и диплом -->
        <rect x="220" y="120" width="60" height="35" fill="${fg}"/>
        <text x="250" y="145" text-anchor="middle" font-family="Arial Black" font-size="14" fill="${bg}">УСПЕХ</text>
        <!-- Нависающая рамка -->
        <line x1="50" y1="50" x2="450" y2="50" stroke="${fg}" stroke-width="20" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="250" y2="170" stroke="${fg}" stroke-width="16"/>
        <line x1="450" y1="50" x2="250" y2="170" stroke="${fg}" stroke-width="16"/>
      </g>

      <!-- Фримен в ужасе хватается за голову -->
      ${drawFreeman(t, 360, 420, 1.15, {
        pose: 'headClutch',
        mouth: 'yell',
        invert: false,
        shock: 1,
      })}
    ` : `
      <!-- БАМ! Расколотый экран -->
      <g transform="translate(360,640)">
        <text x="0" y="30" text-anchor="middle" font-family="Impact" font-size="160" fill="${fg}" letter-spacing="8">БАМ!</text>
        <!-- Трещины реальности на экране -->
        <path d="M-300,-400 L-100,-120 L0,0 L240,-80 L350,-350" stroke="${fg}" stroke-width="12" fill="none"/>
        <path d="M0,0 L-180,240 L-260,450 M0,0 L120,260 L280,420" stroke="${fg}" stroke-width="12" fill="none"/>
      </g>

      <!-- Фримен кричит во весь экран -->
      <g transform="translate(360,320)">
        ${drawFreeman(t, 0, 0, 1.45, {
          pose: 'yell',
          mouth: 'yell',
          invert: strobe,
          shock: 1,
        })}
      </g>
    `}
  </svg>`;
};

// ─── 5. Финал: Вопрос и щелчок пальцами (SETS.freeman_outro) ───────────────
SETS.freeman_outro = function(t, shot, st) {
  const isSnap = t >= 86.0;
  const isDot = t >= 88.0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    ${!isDot ? `
      <!-- Стерильная тишина: белый фон -->
      <rect width="720" height="1280" fill="#ffffff"/>

      <!-- Секундная стрелка тикает вверху -->
      <g transform="translate(360,180)">
        <circle cx="0" cy="0" r="45" fill="none" stroke="#000000" stroke-width="6"/>
        <line x1="0" y1="0" x2="0" y2="-32" stroke="#000000" stroke-width="6" transform="rotate(${((t - 78.0) * 360 / 12) % 360})"/>
      </g>

      <!-- Вопрос прямо в камеру -->
      <text x="360" y="320" text-anchor="middle" font-family="Impact" font-size="64" fill="#000000" letter-spacing="4">А КТО ТЫ?</text>

      <!-- Фримен стоит в упор, смотрит в душу, щелкает пальцами -->
      ${drawFreeman(t, 360, 680, 1.45, {
        pose: isSnap ? 'snap' : 'idle',
        mouth: 'flat',
        invert: false,
        eyeLookX: 0,
        eyeLookY: 0,
        snapProgress: isSnap ? 1 : 0,
      })}
    ` : `
      <!-- Blackout: угасающая белая точка ЭЛТ-телевизора -->
      <rect width="720" height="1280" fill="#000000"/>
      ${t < 89.2 ? `
        <circle cx="360" cy="640" r="${Math.max(2, (89.2 - t) * 18)}" fill="#ffffff"/>
      ` : ''}
    `}
  </svg>`;
};
