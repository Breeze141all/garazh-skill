// ─── cutts_sets.js: Декорации для эпизода в стиле Стива Каттса ───
window.SETS = window.SETS || {};

// Вспомогательный генератор случайных чисел для повторяемости текстур
const cRng = seed => {
  let s = seed >>> 0;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ─── 1. Ячейка (SETS.cutts_cell) ──────────────────────────────────────────
SETS.cutts_cell = function(t, shot, st) {
  const bulbSwing = Math.sin(t * 1.8) * 12;
  const isAlarm = t >= 6.0 && t < 12.0;
  const alarmShake = isAlarm ? Math.sin(t * 80) * 8 : 0;
  const clawDrop = clamp((t - 12.0) / 3.0); // 0 -> 1 опускание манипулятора
  const clawY = lerp(-120, 560, easeInOut(clawDrop));
  const glowAlpha = clamp((t - 14.0) / 2.0);

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bulbLight" cx="0.5" cy="0" r="0.8">
        <stop offset="0%" stop-color="#fff5cc" stop-opacity="0.85"/>
        <stop offset="60%" stop-color="#ffd566" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#ffd566" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="phoneGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="${0.8 * glowAlpha}"/>
        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Стены и пол бетонной камеры -->
    <rect width="720" height="1280" fill="#1b1f24"/>
    <path d="M0,860 L720,860 L720,1280 L0,1280 Z" fill="#121417"/>
    <line x1="0" y1="860" x2="720" y2="860" stroke="#0a0b0d" stroke-width="8"/>
    
    <!-- Трещины на бетоне -->
    <path d="M120,200 L160,280 L140,360 L210,480" stroke="#121518" stroke-width="4" fill="none"/>
    <path d="M560,140 L520,250 L580,380" stroke="#121518" stroke-width="4" fill="none"/>

    <!-- Лампочка на шнуре -->
    <g transform="translate(360,0) rotate(${bulbSwing})">
      <line x1="0" y1="0" x2="0" y2="280" stroke="#333" stroke-width="4"/>
      <ellipse cx="0" cy="290" rx="16" ry="22" fill="#ffea9f" stroke="#222" stroke-width="4"/>
      <ellipse cx="0" cy="280" rx="10" ry="6" fill="#555"/>
      <polygon points="-260,1100 260,1100 0,290" fill="url(#bulbLight)"/>
    </g>

    <!-- Железная кровать -->
    <g transform="translate(80,820)">
      <!-- Спинки -->
      <rect x="0" y="-120" width="16" height="240" fill="#444b52" stroke="#1a1c1e" stroke-width="4"/>
      <rect x="520" y="-80" width="16" height="200" fill="#444b52" stroke="#1a1c1e" stroke-width="4"/>
      <!-- Каркас и матрас -->
      <rect x="16" y="20" width="504" height="40" fill="#2c3238" stroke="#1a1c1e" stroke-width="4"/>
      <rect x="16" y="-10" width="504" height="30" rx="6" fill="#ded5be" stroke="#1a1c1e" stroke-width="4"/>
      <!-- Подушка -->
      <ellipse cx="60" cy="-15" rx="42" ry="16" fill="#f0ece1" stroke="#1a1c1e" stroke-width="4"/>
    </g>

    <!-- Тумбочка и будильник -->
    <g transform="translate(560,840)">
      <rect x="20" y="0" width="90" height="150" fill="#2d3339" stroke="#1a1c1e" stroke-width="4"/>
      <!-- Будильник -->
      <g transform="translate(65,-30) translate(${alarmShake},0)">
        <circle cx="0" cy="0" r="24" fill="#a8362d" stroke="#1a1c1e" stroke-width="4"/>
        <circle cx="0" cy="0" r="18" fill="#f5f0e1"/>
        <!-- стрелки -->
        <line x1="0" y1="0" x2="0" y2="-12" stroke="#1a1c1e" stroke-width="3"/>
        <line x1="0" y1="0" x2="8" y2="4" stroke="#1a1c1e" stroke-width="3"/>
        <!-- звонки-колокольчики -->
        <circle cx="-16" cy="-20" r="8" fill="#d9aa36" stroke="#1a1c1e" stroke-width="3"/>
        <circle cx="16" cy="-20" r="8" fill="#d9aa36" stroke="#1a1c1e" stroke-width="3"/>
        <line x1="0" y1="-20" x2="0" y2="-26" stroke="#1a1c1e" stroke-width="3"/>
      </g>
    </g>

    <!-- Персонаж на кровати -->
    ${t < 6.0 ? `
      <!-- Спит под одеялом -->
      <g transform="translate(180,800)">
        <ellipse cx="60" cy="-20" rx="36" ry="30" fill="${CUTTS.skin}" stroke="${CUTTS.stroke}" stroke-width="5"/>
        <ellipse cx="70" cy="-15" rx="14" ry="12" fill="${CUTTS.nose}" stroke="${CUTTS.stroke}" stroke-width="3"/>
        <path d="M45,-25 Q60,-22 75,-25" stroke="${CUTTS.stroke}" stroke-width="4" fill="none"/>
        <path d="M-40,10 C40,-10 220,-10 320,10 L320,50 L-40,50 Z" fill="#3a424a" stroke="${CUTTS.stroke}" stroke-width="5"/>
        <!-- Храп Zzz -->
        <text x="120" y="${-50 - (t * 20) % 40}" font-family="Arial Black" font-size="28" fill="#ffea9f" opacity="${1 - ((t * 0.5) % 1)}">Zzz...</text>
      </g>
    ` : `
      <!-- Сидит на кровати -->
      <g transform="translate(100,240)">
        ${CHARS.cuttsman.body({ bob: Math.sin(t * 3) * 4 }, 'cell_')}
        <g transform="rotate(${t >= 14 ? 12 : 0} 360 700)">
          ${CHARS.cuttsman.head({ lid: t >= 16 ? 0.1 : 0.6, shock: t >= 16 ? 1 : 0, t }, 'cell_')}
        </g>
      </g>
    `}

    <!-- Механический манипулятор с потолка -->
    ${t >= 12.0 ? `
      <g transform="translate(360,${clawY})">
        <!-- Труба телескопа -->
        <line x1="0" y1="-800" x2="0" y2="0" stroke="#77808a" stroke-width="16"/>
        <circle cx="0" cy="0" r="16" fill="#333" stroke="#111" stroke-width="4"/>
        <!-- Клешня -->
        <path d="M-30,0 Q-40,40 -15,70" stroke="#444" stroke-width="10" fill="none"/>
        <path d="M30,0 Q40,40 15,70" stroke="#444" stroke-width="10" fill="none"/>
        <!-- Смартфон -->
        <g transform="translate(-35,40)">
          <rect x="0" y="0" width="70" height="120" rx="10" fill="#000" stroke="#fff" stroke-width="4"/>
          <rect x="4" y="6" width="62" height="108" rx="6" fill="#00f0ff"/>
          <!-- Свечение на лицо -->
          <circle cx="35" cy="60" r="220" fill="url(#phoneGlow)" pointer-events="none"/>
        </g>
      </g>
    ` : ''}
  </svg>`;
};

// ─── 2. Крупный план лица (SETS.cutts_face) ──────────────────────────────
SETS.cutts_face = function(t, shot, st) {
  const pulse = 1 + 0.08 * Math.sin(t * 18);
  const rot = (t * 540) % 360;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="faceCyanBg" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stop-color="#006677"/>
        <stop offset="100%" stop-color="#090d10"/>
      </radialGradient>
    </defs>
    <rect width="720" height="1280" fill="url(#faceCyanBg)"/>

    <!-- Летающие неоновые сердечки лайков на фоне -->
    ${[0, 1, 2, 3, 4].map(i => {
      const y = (1280 - (t * 160 + i * 240) % 1380);
      const x = 120 + (i * 130 + Math.sin(t * 3 + i) * 60) % 600;
      return `<path d="M${x.toFixed(1)},${y.toFixed(1)} C${(x - 20).toFixed(1)},${(y - 20).toFixed(1)} ${(x - 40).toFixed(1)},${(y + 10).toFixed(1)} ${x.toFixed(1)},${(y + 40).toFixed(1)} C${(x + 40).toFixed(1)},${(y + 10).toFixed(1)} ${(x + 20).toFixed(1)},${(y - 20).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)} Z" fill="#ff0055" opacity="0.6"/>`;
    }).join('')}

    <!-- Гигантская голова Стива Каттса с зубастым оскалом -->
    <g transform="translate(360,640) scale(${1.85 * pulse}) translate(-360,-640)">
      <g transform="translate(0,-60)">
        ${CHARS.cuttsman.head({ lid: 0, shock: 1, bliss: 1, t }, 'face_')}
      </g>
    </g>

    <!-- Рамка смартфона перед экраном (POV смартфона) -->
    <rect x="0" y="0" width="720" height="1280" fill="none" stroke="#00f0ff" stroke-width="32" opacity="0.4"/>
    <rect x="40" y="40" width="640" height="1200" rx="30" fill="none" stroke="#00f0ff" stroke-width="8" opacity="0.7"/>
    <!-- Бегущая полоса уведомления -->
    <rect x="160" y="1040" width="400" height="70" rx="35" fill="rgba(0,0,0,0.75)" stroke="#00f0ff" stroke-width="4"/>
    <text x="360" y="1086" text-anchor="middle" font-family="Arial Black" font-size="28" fill="#fff" letter-spacing="2">DOPAMINE: 100%</text>
  </svg>`;
};

// ─── 3. Конвейер зомби (SETS.cutts_conveyor) ──────────────────────────────
SETS.cutts_conveyor = function(t, shot, st) {
  const scrollX = (t * 180) % 80;
  const isTrapdoor = t >= 42.0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Смог и заводы на заднем плане -->
    <rect width="720" height="1280" fill="#464a45"/>
    <!-- Заводские трубы с дымом -->
    <rect x="60" y="320" width="80" height="400" fill="#2d302c"/>
    <rect x="240" y="240" width="100" height="480" fill="#242623"/>
    <rect x="520" y="280" width="120" height="440" fill="#1c1e1c"/>
    <!-- клубы дыма -->
    ${[60, 240, 520].map((x, i) => `<circle cx="${x + 40 + Math.sin(t * 2 + i) * 30}" cy="${220 - ((t * 40 + i * 80) % 200)}" r="45" fill="#3a3d38" opacity="0.7"/>`).join('')}

    <!-- Неоновый билборд сквозь смог -->
    <g transform="translate(160,120)">
      <rect x="0" y="0" width="400" height="90" rx="10" fill="#111" stroke="#333" stroke-width="6"/>
      <text x="200" y="58" text-anchor="middle" font-family="Impact" font-size="34" fill="${Math.sin(t * 12) > 0 ? '#ff0055' : '#440015'}" letter-spacing="3">OBEY · SCROLL · BUY</text>
    </g>

    <!-- Конвейерная лента -->
    <g transform="translate(0,960)">
      <rect x="-40" y="0" width="800" height="80" fill="#222" stroke="#111" stroke-width="6"/>
      <!-- Рифление ленты -->
      ${Array.from({ length: 18 }, (_, i) => `<line x1="${i * 50 - scrollX}" y1="0" x2="${i * 50 - 30 - scrollX}" y2="80" stroke="#444" stroke-width="8"/>`).join('')}
      <!-- Шестерни внизу -->
      <circle cx="120" cy="120" r="45" fill="#555" stroke="#111" stroke-width="6"/>
      <circle cx="360" cy="120" r="45" fill="#555" stroke="#111" stroke-width="6"/>
      <circle cx="600" cy="120" r="45" fill="#555" stroke="#111" stroke-width="6"/>
    </g>

    <!-- Пропасть / Измельчитель справа при S7 -->
    ${isTrapdoor ? `
      <g transform="translate(560,940)">
        <!-- Люк открыт -->
        <rect x="0" y="0" width="160" height="340" fill="#050505"/>
        <line x1="0" y1="0" x2="0" y2="340" stroke="#a00" stroke-width="8"/>
        <!-- Вращающиеся зубья мясорубки -->
        <g transform="translate(80,140) rotate(${(t * 720) % 360})">
          <circle cx="0" cy="0" r="40" fill="#777" stroke="#000" stroke-width="4"/>
          <polygon points="-40,-10 40,-10 0,-60" fill="#999"/>
          <polygon points="-40,10 40,10 0,60" fill="#999"/>
        </g>
        <text x="80" y="-20" text-anchor="middle" font-family="Impact" font-size="24" fill="#ff2200">SHREDDER</text>
      </g>
    ` : ''}

    <!-- Зомби-работники маршируют на фоне -->
    ${drawCuttsWalking(t + 0.3, -40, 20, 0.72, { speed: 3, hypno: 0, phone: true })}
    ${drawCuttsWalking(t + 0.6, 140, 20, 0.72, { speed: 3, hypno: 0, phone: true })}
    ${drawCuttsWalking(t + 0.9, 320, 20, 0.72, { speed: 3, hypno: 0, phone: true })}

    <!-- Главный герой на переднем плане -->
    ${drawCuttsWalking(t, 220, 60, 0.95, { speed: 3.5, hypno: 1, grin: true, phone: true })}
  </svg>`;
};

// ─── 4. Алтарь промптов / Слот-терминал (SETS.cutts_altar) ─────────────────
SETS.cutts_altar = function(t, shot, st) {
  const isPulling = t >= 58.0 && t <= 62.0;
  const leverAngle = isPulling ? lerp(0, 55, Math.sin((t - 58.0) * Math.PI / 4)) : 0;
  const isFeeding = t >= 66.0;
  const reelSpin = isPulling ? (t * 800) % 180 : 0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Фон хранилища серверов -->
    <rect width="720" height="1280" fill="#16181b"/>
    <!-- Ряды серверных стоек по бокам -->
    <rect x="0" y="0" width="140" height="1280" fill="#0d0e10" stroke="#222" stroke-width="6"/>
    <rect x="580" y="0" width="140" height="1280" fill="#0d0e10" stroke="#222" stroke-width="6"/>
    <!-- Мигающие диоды на серверах -->
    ${Array.from({ length: 24 }, (_, i) => `
      <circle cx="${40 + (i % 2) * 40}" cy="${80 + i * 45}" r="6" fill="${(i + Math.floor(t * 8)) % 3 === 0 ? '#00f0ff' : '#222'}"/>
      <circle cx="${620 + (i % 2) * 40}" cy="${80 + i * 45}" r="6" fill="${(i + Math.floor(t * 8)) % 2 === 0 ? '#ff0055' : '#222'}"/>
    `).join('')}

    <!-- Центральный гигантский алтарь-компьютер THE ALGORITHM -->
    <rect x="140" y="80" width="440" height="680" rx="20" fill="#272d36" stroke="#111" stroke-width="10"/>
    <!-- Электронные лампы наверху -->
    ${[200, 280, 360, 440, 520].map((x, i) => `
      <rect x="${x - 16}" y="40" width="32" height="45" rx="14" fill="${(i + Math.floor(t * 4)) % 2 === 0 ? '#ffb347' : '#553311'}" stroke="#111" stroke-width="4"/>
    `).join('')}

    <!-- Большой экран слот-машины -->
    <rect x="180" y="160" width="360" height="240" rx="14" fill="#080c10" stroke="#00f0ff" stroke-width="6"/>
    <!-- Барабаны слотов -->
    <g transform="translate(0,${reelSpin})">
      <rect x="200" y="180" width="95" height="200" rx="8" fill="#1b232b"/>
      <text x="248" y="295" text-anchor="middle" font-size="55">❤️</text>
      
      <rect x="312" y="180" width="95" height="200" rx="8" fill="#1b232b"/>
      <text x="360" y="295" text-anchor="middle" font-size="55">🤖</text>
      
      <rect x="424" y="180" width="95" height="200" rx="8" fill="#1b232b"/>
      <text x="472" y="295" text-anchor="middle" font-size="55">💰</text>
    </g>

    <!-- Надпись алтаря -->
    <text x="360" y="130" text-anchor="middle" font-family="Impact" font-size="34" fill="#ff0055" letter-spacing="4">THE ALGORITHM 9000</text>
    
    <!-- Кнопка/надпись GENERATE -->
    <rect x="250" y="440" width="220" height="60" rx="12" fill="#ff0055" stroke="#111" stroke-width="5"/>
    <text x="360" y="482" text-anchor="middle" font-family="Arial Black" font-size="26" fill="#fff">GENERATE</text>

    <!-- Рычаг справа -->
    <g transform="translate(580,320) rotate(${leverAngle})">
      <rect x="0" y="-12" width="90" height="24" rx="10" fill="#666" stroke="#111" stroke-width="4"/>
      <circle cx="90" cy="0" r="28" fill="#cc1111" stroke="#111" stroke-width="5"/>
    </g>

    <!-- Персонаж сидит перед терминалом -->
    <g transform="translate(0,180)">
      ${CHARS.cuttsman.body({ bob: Math.sin(t * 5) * 4 }, 'altar_')}
      <g transform="rotate(${isPulling ? -15 : 0} 360 700)">
        ${CHARS.cuttsman.head({ lid: 0, shock: isFeeding ? 1 : 0.4, bliss: isFeeding ? 1 : 0, t }, 'altar_')}
      </g>
    </g>

    <!-- Желоб для сброса дофамина и падающие банки/таблетки при S10 -->
    ${isFeeding ? `
      <g transform="translate(360,620)">
        <!-- Труба подачи -->
        <rect x="-35" y="-160" width="70" height="120" fill="#777" stroke="#111" stroke-width="5"/>
        <!-- Падающие банки DOPAMINE -->
        ${[0, 1, 2].map(i => {
          const dy = ((t * 260 + i * 90) % 200) - 80;
          return `
            <g transform="translate(${Math.sin(t * 4 + i) * 20},${dy})">
              <rect x="-24" y="-35" width="48" height="70" rx="8" fill="#ff0055" stroke="#111" stroke-width="3"/>
              <text x="0" y="5" text-anchor="middle" font-family="Arial Black" font-size="11" fill="#fff">DOPAMINE</text>
            </g>`;
        }).join('')}
      </g>
    ` : ''}
  </svg>`;
};

// ─── 5. Колесо хомяка и перегрузка (SETS.cutts_wheel) ──────────────────────
SETS.cutts_wheel = function(t, shot, st) {
  const wheelRot = (t * 600) % 360;
  const isOverheating = t >= 92.0;
  const steamPuff = isOverheating ? Math.sin(t * 40) * 20 : 0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Фон: серверные матрицы в аварийном режиме -->
    <rect width="720" height="1280" fill="${isOverheating && Math.sin(t * 30) > 0 ? '#420b0b' : '#0a0d12'}"/>

    <!-- Летающие реакции-эмодзи вихрем вокруг колеса -->
    ${Array.from({ length: 16 }, (_, i) => {
      const angle = (t * 4 + i * (Math.PI * 2 / 16)) % (Math.PI * 2);
      const dist = 280 + Math.sin(t * 8 + i) * 60;
      const ex = 360 + Math.cos(angle) * dist;
      const ey = 640 + Math.sin(angle) * dist;
      const icons = ['❤️', '🔥', '👍', '😂', '💀', '⚡'];
      return `<text x="${ex}" y="${ey}" font-size="38" opacity="0.85">${icons[i % icons.length]}</text>`;
    }).join('')}

    <!-- Гигантское металлическое колесо хомяка -->
    <g transform="translate(360,640) rotate(${wheelRot})">
      <circle cx="0" cy="0" r="260" fill="none" stroke="#606b78" stroke-width="36"/>
      <circle cx="0" cy="0" r="240" fill="none" stroke="#222" stroke-width="4"/>
      <!-- Спицы колеса -->
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="0" y1="0" x2="${Math.cos(a * Math.PI / 180) * 240}" y2="${Math.sin(a * Math.PI / 180) * 240}" stroke="#444d57" stroke-width="12"/>`).join('')}
      <circle cx="0" cy="0" r="50" fill="#222" stroke="#fff" stroke-width="6"/>
    </g>

    <!-- Персонаж бежит внутри колеса -->
    <g transform="translate(0,-160)">
      ${drawCuttsWalking(t, 220, 520, 0.88, { speed: 8, hypno: 1, grin: true, phone: false })}
    </g>

    <!-- Аварийные датчики и пар при перегреве -->
    ${isOverheating ? `
      <!-- Искры и разряды -->
      <path d="M120,400 L180,480 L140,540 L220,620" stroke="#00f0ff" stroke-width="8" fill="none"/>
      <path d="M600,420 L540,510 L580,580 L500,660" stroke="#ffe600" stroke-width="8" fill="none"/>
      <!-- Струи пара -->
      <circle cx="200" cy="800" r="${50 + steamPuff}" fill="#fff" opacity="0.6"/>
      <circle cx="520" cy="800" r="${60 + steamPuff}" fill="#fff" opacity="0.6"/>
      <!-- Табло тревоги -->
      <rect x="180" y="140" width="360" height="80" rx="14" fill="#ff0000" stroke="#fff" stroke-width="6"/>
      <text x="360" y="195" text-anchor="middle" font-family="Impact" font-size="40" fill="#fff">OVERHEAT · 999%</text>
    ` : ''}
  </svg>`;
};

// ─── 6. Гора электронных отходов (SETS.cutts_dump) ─────────────────────────
SETS.cutts_dump = function(t, shot, st) {
  const isFinalLike = t >= 116.0;
  const isIrisOut = t >= 118.0;
  const irisRadius = isIrisOut ? Math.max(0, (120.0 - t) / 2.0 * 800) : 1000;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="irisClip">
        <circle cx="360" cy="640" r="${irisRadius}"/>
      </clipPath>
    </defs>

    <g clip-path="url(#irisClip)">
      <!-- Ядовито-зеленое сумрачное небо -->
      <rect width="720" height="1280" fill="#1b241e"/>
      <circle cx="540" cy="220" r="70" fill="#b8c99d" opacity="0.4"/>

      <!-- Дымка горизонта -->
      <rect y="400" width="720" height="400" fill="#29362c" opacity="0.5"/>

      <!-- Гора мусора: разбитые ЭЛТ мониторы, платы, клавиатуры -->
      <polygon points="-60,1280 360,580 780,1280" fill="#151718" stroke="#000" stroke-width="8"/>

      <!-- Контуры старых разбитых мониторов на склоне горы -->
      ${Array.from({ length: 18 }, (_, i) => {
        const mx = 120 + (i * 32) % 480;
        const my = 680 + (i * 34);
        return `
          <g transform="translate(${mx},${my}) rotate(${(i * 37) % 50 - 25})">
            <rect x="0" y="0" width="65" height="50" rx="6" fill="#25292c" stroke="#111" stroke-width="4"/>
            <rect x="6" y="6" width="53" height="38" rx="4" fill="#0d1012"/>
            <!-- трещина на экране -->
            <line x1="12" y1="12" x2="45" y2="35" stroke="#444" stroke-width="2"/>
          </g>`;
      }).join('')}

      <!-- Персонаж сидит на вершине горы в сломанном кресле -->
      <g transform="translate(180,240)">
        <!-- Офисное сломанное кресло -->
        <rect x="140" y="620" width="80" height="14" fill="#333"/>
        <line x1="180" y1="634" x2="180" y2="700" stroke="#111" stroke-width="12"/>
        <line x1="140" y1="700" x2="220" y2="700" stroke="#111" stroke-width="8"/>
        
        <!-- Опустошенный, серый персонаж-манекен -->
        ${CHARS.cuttsman.body({ bob: 0 }, 'dump_')}
        <g transform="rotate(18 360 700)">
          ${CHARS.cuttsman.head({ lid: 0.95, shock: 0, bliss: 0, mouth: 0, t }, 'dump_')}
        </g>
      </g>

      <!-- Рука держит светящийся телефон с 1% батареи -->
      <g transform="translate(320,840)">
        <rect x="0" y="0" width="80" height="140" rx="10" fill="#000" stroke="#fff" stroke-width="4"/>
        <rect x="6" y="8" width="68" height="124" rx="6" fill="#111"/>
        
        <!-- Индикатор батареи 1% -->
        <rect x="25" y="40" width="30" height="16" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
        <rect x="27" y="42" width="${(t * 4) % 2 === 0 ? 5 : 0}" height="12" fill="#ff2200"/>
        <text x="40" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#ff2200">1%</text>

        <!-- Всплывающий лайк "+1 LIKE" при S16 -->
        ${isFinalLike ? `
          <g transform="translate(40,105)">
            <rect x="-35" y="-18" width="70" height="28" rx="14" fill="#ff0055"/>
            <text x="0" y="2" text-anchor="middle" font-family="Arial Black" font-size="11" fill="#fff">+1 LIKE</text>
          </g>
        ` : ''}
      </g>
    </g>

    <!-- Круг закрытия (Iris Out) и ретро-титр 1930-х -->
    ${isIrisOut ? `
      <rect width="720" height="1280" fill="#000" mask="url(#irisMask)"/>
      <text x="360" y="640" text-anchor="middle" font-family="Impact" font-size="46" fill="#ffea9f" letter-spacing="3">THAT'S PROGRESS!</text>
    ` : ''}
  </svg>`;
};
