// ─── cutts_sets.js: Сцены для эпизода «Happiness» (Steve Cutts Rat Race) ───
window.SETS = window.SETS || {};

// ─── 1. Пробка под дождем (SETS.rat_traffic) ──────────────────────────────
SETS.rat_traffic = function(t, shot, st) {
  const wiperAngle = Math.sin(t * 4.2) * 55;
  const carVibe = Math.sin(t * 28) * 1.5;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Фон: город сквозь стекло под дождем -->
    <rect width="720" height="1280" fill="#424c3d"/>
    
    <!-- Небоскребы и промышленный горизонт сзади -->
    <g fill="#2d3529" opacity="0.8">
      <rect x="20" y="80" width="140" height="700"/>
      <rect x="180" y="40" width="180" height="740"/>
      <rect x="380" y="120" width="160" height="660"/>
      <rect x="560" y="60" width="150" height="720"/>
      <!-- Окна в зданиях -->
      ${Array.from({ length: 32 }, (_, i) => `
        <rect x="${40 + (i % 6) * 110}" y="${120 + Math.floor(i / 6) * 70}" width="18" height="24" fill="${i % 3 === 0 ? '#d4cca8' : '#20261d'}" opacity="0.6"/>
      `).join('')}
    </g>

    <!-- Вывески и дорожные щиты ZONE 17, как на референсе -->
    <g transform="translate(180,80)">
      <rect x="0" y="0" width="130" height="60" fill="#384233" stroke="#1f261c" stroke-width="3"/>
      <text x="65" y="42" text-anchor="middle" font-family="Impact" font-size="28" fill="#a4ab9b" letter-spacing="2">ZONE 17</text>
    </g>
    <g transform="translate(330,60)">
      <rect x="0" y="0" width="60" height="60" fill="#384233" stroke="#1f261c" stroke-width="3"/>
      <text x="30" y="45" text-anchor="middle" font-family="Impact" font-size="38" fill="#a4ab9b">H</text>
    </g>

    <!-- Фары стоящих в пробке машин (размытые круги света) -->
    <g opacity="0.75">
      <circle cx="160" cy="520" r="38" fill="#f5e8b0" filter="drop-shadow(0 0 18px #f5e8b0)"/>
      <circle cx="270" cy="520" r="38" fill="#f5e8b0" filter="drop-shadow(0 0 18px #f5e8b0)"/>
      <circle cx="490" cy="500" r="32" fill="#e05848" filter="drop-shadow(0 0 15px #e05848)"/>
      <circle cx="580" cy="500" r="32" fill="#e05848" filter="drop-shadow(0 0 15px #e05848)"/>
    </g>

    <!-- Красная спортивная машина (кузов снаружи и стойки) -->
    <path d="M0,720 L720,720 L720,1280 L0,1280 Z" fill="${RAT_PAL.carRedDk}"/>
    <path d="M50,720 Q360,680 670,720 L720,860 L0,860 Z" fill="${RAT_PAL.carRed}"/>

    <!-- Персонаж-крыса за рулем (точно по композиции референса) -->
    <g transform="translate(30,120)">
      ${drawCuttsRatHead(t, { mood: 'grin', blink: (t % 4.5) < 0.15 })}
    </g>

    <!-- Салон автомобиля (руль, зеркало, сиденье) -->
    ${drawCarInterior(t)}

    <!-- Дворник лобового стекла (маятник) -->
    <g transform="translate(360,1180) rotate(${wiperAngle})">
      <!-- поводок дворника -->
      <line x1="0" y1="0" x2="0" y2="-620" stroke="#12100d" stroke-width="14"/>
      <!-- щетка -->
      <line x1="-8" y1="-280" x2="-8" y2="-620" stroke="#000" stroke-width="20" stroke-linecap="round"/>
      <line x1="-14" y1="-280" x2="-14" y2="-620" stroke="#444" stroke-width="4"/>
    </g>

    <!-- Слой капель и струй дождя на стекле (поверх всего) -->
    ${drawRainOnGlass(t, 70, 77)}
  </svg>`;
};

// ─── 2. Переполненное вагонами метро (SETS.rat_subway) ─────────────────────
SETS.rat_subway = function(t, shot, st) {
  const trainRattle = Math.sin(t * 45) * 4;
  const crowdSway = Math.sin(t * 3.5) * 8;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Интерьер металлического вагона метро -->
    <rect width="720" height="1280" fill="#323b30"/>
    
    <!-- Потолочные флуоресцентные лампы с мерцанием -->
    <rect x="140" y="40" width="440" height="28" rx="6" fill="${(t * 12) % 3 < 1 ? '#d6ded0' : '#889182'}"/>
    <polygon points="120,68 600,68 680,1280 40,1280" fill="#ffffff" opacity="0.08"/>

    <!-- Окно вагона в темный тоннель -->
    <rect x="80" y="160" width="560" height="320" rx="14" fill="#111610" stroke="#21291f" stroke-width="12"/>
    <!-- Мелькающие кабели тоннеля -->
    <line x1="-100" y1="${300 + trainRattle}" x2="800" y2="${320 + trainRattle}" stroke="#4f594a" stroke-width="6"/>
    <line x1="-100" y1="${240 - trainRattle}" x2="800" y2="${250 - trainRattle}" stroke="#4f594a" stroke-width="4"/>

    <!-- Рекламный плакат в вагоне: «HAPPINESS: BUY NOW» -->
    <g transform="translate(140,200)">
      <rect x="0" y="0" width="440" height="110" rx="6" fill="#f0ebd8" stroke="#1f261c" stroke-width="4"/>
      <text x="220" y="50" text-anchor="middle" font-family="Impact" font-size="34" fill="#a83628" letter-spacing="3">HAPPINESS</text>
      <text x="220" y="85" text-anchor="middle" font-family="Arial Black" font-size="18" fill="#333">NOW IN CONVENIENT PILL FORM</text>
      <!-- изображение золотой пилюли -->
      <ellipse cx="60" cy="55" rx="30" ry="14" fill="#d4b248" stroke="#1f261c" stroke-width="3"/>
    </g>

    <!-- Поручни вагона и свисающие ремни -->
    <line x1="0" y1="120" x2="720" y2="120" stroke="#7a8274" stroke-width="14"/>
    ${[120, 240, 360, 480, 600].map(x => `
      <line x1="${x}" y1="120" x2="${x + crowdSway * 0.4}" y2="240" stroke="#222" stroke-width="8"/>
      <circle cx="${x + crowdSway * 0.4}" cy="260" r="22" fill="none" stroke="#7a8274" stroke-width="8"/>
    `).join('')}

    <!-- Толпа сдавленных крыс-клерков в костюмах и галстуках -->
    <g transform="translate(${crowdSway},${trainRattle})">
      <!-- Задний ряд голов -->
      ${[-60, 80, 220, 360, 500, 640].map((x, i) => `
        <g transform="translate(${x},${380 + (i % 2) * 40}) scale(0.68)">
          ${drawCuttsRatHead(t + i, { mood: 'tired', blink: (t + i) % 3 < 0.2 })}
        </g>
      `).join('')}

      <!-- Передний ряд: главный герой в центре, прижатый толпой -->
      <g transform="translate(140,480) scale(0.92)">
        ${drawCuttsRatHead(t, { mood: 'grin', blink: (t % 5) < 0.1 })}
      </g>
      <g transform="translate(-40,540) scale(0.88)">
        ${drawCuttsRatHead(t + 0.4, { mood: 'tired', blink: false })}
      </g>
      <g transform="translate(380,520) scale(0.88)">
        ${drawCuttsRatHead(t + 0.8, { mood: 'tired', blink: false })}
      </g>
    </g>
  </svg>`;
};

// ─── 3. Офисный опенспейс и таблетки (SETS.rat_office) ─────────────────────
SETS.rat_office = function(t, shot, st) {
  const isPillShot = t >= 64.0;
  const deskTyping = Math.sin(t * 38) * 2;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Бесконечный серый опенспейс -->
    <rect width="720" height="1280" fill="#474f43"/>
    
    <!-- Перегородки кубиклов уходящие в перспективу -->
    ${Array.from({ length: 6 }, (_, i) => `
      <rect x="0" y="${200 + i * 110}" width="720" height="16" fill="#31382e" stroke="#1d221b" stroke-width="3"/>
      <rect x="${i * 120}" y="180" width="14" height="600" fill="#31382e"/>
    `).join('')}

    <!-- Другие крысы печатают за своими столами на фоне -->
    ${[100, 320, 540].map((x, i) => `
      <g transform="translate(${x},260) scale(0.45)">
        ${drawCuttsRatHead(t * 2 + i, { mood: 'tired' })}
      </g>
    `).join('')}

    <!-- Офисный стол на переднем плане -->
    <rect x="0" y="760" width="720" height="520" fill="#2b3127" stroke="#141812" stroke-width="6"/>

    <!-- Монитор компьютера со светящимися графиками и кодом -->
    <g transform="translate(60,440)">
      <rect x="0" y="0" width="340" height="260" rx="10" fill="#1b2018" stroke="#0e120c" stroke-width="8"/>
      <rect x="14" y="14" width="312" height="232" rx="6" fill="#111610"/>
      <!-- падающий график вниз -->
      <polyline points="30,60 90,90 160,80 230,160 300,210" fill="none" stroke="#b03828" stroke-width="6"/>
      <text x="30" y="45" font-family="Arial" font-size="16" fill="#cfb148">METRICS: DEADLINE CRITICAL</text>
    </g>

    <!-- Клавиатура со следами когтей -->
    <g transform="translate(80,780) translate(0,${deskTyping})">
      <rect x="0" y="0" width="320" height="90" rx="8" fill="#181d15" stroke="#0c0f0a" stroke-width="4"/>
      ${Array.from({ length: 18 }, (_, i) => `
        <rect x="${15 + (i % 6) * 50}" y="${15 + Math.floor(i / 6) * 24}" width="38" height="18" rx="3" fill="#2d3529"/>
      `).join('')}
    </g>

    <!-- Главная крыса за столом -->
    <g transform="translate(180,260)">
      ${drawCuttsRatHead(t, { mood: isPillShot ? 'grin' : 'tired', blink: (t % 4) < 0.15 })}
    </g>

    <!-- Блистер с таблетками «HAPPINESS» на столе справа -->
    <g transform="translate(440,780) rotate(-15)">
      <!-- упаковка блистера -->
      <rect x="0" y="0" width="220" height="150" rx="14" fill="#e8e4d8" stroke="#1e241a" stroke-width="5"/>
      <text x="110" y="35" text-anchor="middle" font-family="Impact" font-size="22" fill="#b03828" letter-spacing="2">HAPPINESS™</text>
      <!-- золотые ячейки с таблетками -->
      ${[0, 1, 2, 3].map(i => `
        <ellipse cx="${55 + (i % 2) * 110}" cy="${70 + Math.floor(i / 2) * 50}" rx="36" ry="18" fill="#d4b248" stroke="#1e241a" stroke-width="3"/>
      `).join('')}
      <!-- одна выдавленная пустая ячейка -->
      <ellipse cx="55" cy="70" rx="36" ry="18" fill="#3a4034" stroke="#1e241a" stroke-width="3" opacity="0.6"/>
    </g>

    <!-- Если момент приема таблетки: лапа подносит таблетку ко рту -->
    ${isPillShot ? `
      <g transform="translate(320,640)">
        <path d="M0,0 Q60,-40 120,40" stroke="${RAT_PAL.furShadow}" stroke-width="24" fill="none" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="18" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="4"/>
        <ellipse cx="-4" cy="-4" rx="16" ry="9" fill="#d4b248" stroke="#1e241a" stroke-width="3"/>
      </g>
    ` : ''}
  </svg>`;
};

// ─── 4. Погоня за фальшивой купюрой (SETS.rat_chase) ───────────────────────
SETS.rat_chase = function(t, shot, st) {
  const sprintCycle = (t * 12) % 1;
  const legOffset = Math.sin(sprintCycle * Math.PI * 2) * 45;
  const billFloat = Math.sin(t * 8) * 35;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Грозовое темное небо мегаполиса -->
    <rect width="720" height="1280" fill="#2d352a"/>

    <!-- Асфальт шоссе с разметкой на скорости -->
    <rect y="780" width="720" height="500" fill="#1b2018"/>
    <!-- несущиеся полосы разметки -->
    ${Array.from({ length: 8 }, (_, i) => `
      <rect x="${((i * 140 - t * 900) % 1120) - 200}" y="980" width="80" height="20" fill="#b0aa8f"/>
    `).join('')}

    <!-- 100-долларовая купюра на леске сверху спереди -->
    <g transform="translate(540,${420 + billFloat}) rotate(${Math.sin(t * 6) * 15})">
      <!-- леска -->
      <line x1="0" y1="-500" x2="0" y2="0" stroke="#fff" stroke-width="2.5" opacity="0.6"/>
      <!-- рыболовный крючок -->
      <path d="M0,0 Q-10,30 15,25 Q25,20 20,-5" fill="none" stroke="#bbb" stroke-width="3.5"/>
      <!-- 100-долларовая банкнота -->
      <g transform="translate(-100,-40)">
        <rect x="0" y="0" width="200" height="95" rx="6" fill="#8f9c7f" stroke="#1f261b" stroke-width="4"/>
        <rect x="10" y="8" width="180" height="79" rx="4" fill="none" stroke="#2a3524" stroke-width="3"/>
        <circle cx="100" cy="48" r="26" fill="#6d7a5e" stroke="#1f261b" stroke-width="2"/>
        <text x="100" y="56" text-anchor="middle" font-family="Impact" font-size="28" fill="#1f261b">100</text>
        <text x="24" y="32" font-family="Arial Black" font-size="16" fill="#1f261b">$</text>
        <text x="176" y="75" font-family="Arial Black" font-size="16" fill="#1f261b">$</text>
      </g>
    </g>

    <!-- Бегущая стая крыс сзади (силуэты с горящими глазами) -->
    ${[40, 160, -40].map((x, i) => `
      <g transform="translate(${x},${380 + (i % 2) * 50}) scale(0.65)">
        ${drawCuttsRatHead(t * 1.5 + i, { mood: 'grin' })}
      </g>
    `).join('')}

    <!-- Главная крыса мчится в отчаянном рывке с вытянутыми лапами -->
    <g transform="translate(180,480) rotate(${12 + Math.sin(t * 14) * 4})">
      ${drawCuttsRatHead(t, { mood: 'grin' })}
      
      <!-- Вытянутые вперед лапы с острыми когтями, жадно тянущиеся к купюре -->
      <g transform="translate(320,540) rotate(-25)">
        <path d="M-60,0 Q60,-40 180,-10" stroke="${RAT_PAL.furShadow}" stroke-width="36" fill="none" stroke-linecap="round"/>
        <path d="M-60,40 Q60,0 170,30" stroke="${RAT_PAL.furShadow}" stroke-width="36" fill="none" stroke-linecap="round"/>
        <!-- когтистые кисти -->
        <circle cx="180" cy="-10" r="24" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="4"/>
        <circle cx="170" cy="30" r="24" fill="${RAT_PAL.skinPink}" stroke="${RAT_PAL.hatch}" stroke-width="4"/>
        <!-- когти -->
        ${[-15, 0, 15].map(a => `<line x1="${180}" y1="${-10 + a}" x2="${210}" y2="${-10 + a * 1.3}" stroke="#000" stroke-width="4"/>`).join('')}
      </g>
    </g>
  </svg>`;
};

// ─── 5. Ловушка-мышеловка и финал (SETS.rat_trap) ──────────────────────────
SETS.rat_trap = function(t, shot, st) {
  const isSnapped = t >= 114.0;
  const trapBarAngle = isSnapped ? 180 : 0; // дуга мышеловки захлопывается на 180 градусов
  const fadeOut = isSnapped ? clamp((t - 115.5) / 3.0) : 0;

  return `
  <svg viewBox="0 0 720 1280" width="720" height="1280" xmlns="http://www.w3.org/2000/svg">
    <!-- Черный мертвый фон -->
    <rect width="720" height="1280" fill="#141712"/>

    <!-- Деревянная платформа гигантской мышеловки -->
    <g transform="translate(60,680)">
      <!-- Деревянный брус с текстурой годичных колец -->
      <rect x="0" y="0" width="600" height="420" rx="10" fill="#4d3a27" stroke="#1f160e" stroke-width="8"/>
      <!-- штрихи текстуры дерева -->
      ${Array.from({ length: 12 }, (_, i) => `
        <line x1="20" y1="${30 + i * 32}" x2="580" y2="${35 + i * 32}" stroke="#36281a" stroke-width="4" opacity="0.6"/>
      `).join('')}

      <!-- Мощная витая стальная пружина в центре -->
      <g transform="translate(300,180)">
        <circle cx="0" cy="0" r="55" fill="#596355" stroke="#1b2019" stroke-width="8"/>
        <!-- витки пружины -->
        <ellipse cx="0" cy="0" rx="38" ry="48" fill="none" stroke="#2a3227" stroke-width="12"/>
        <ellipse cx="0" cy="0" rx="22" ry="34" fill="none" stroke="#1b2019" stroke-width="10"/>
      </g>

      <!-- Пусковая медная педаль с долларовой купюрой -->
      <g transform="translate(300,280)">
        <rect x="-40" y="-15" width="80" height="30" fill="#9e7b3a" stroke="#222" stroke-width="4"/>
        
        <!-- Доллар на спусковом механизме -->
        ${!isSnapped ? `
          <g transform="translate(-60,-35) rotate(8)">
            <rect x="0" y="0" width="120" height="60" rx="4" fill="#8f9c7f" stroke="#1f261b" stroke-width="3"/>
            <text x="60" y="38" text-anchor="middle" font-family="Impact" font-size="22" fill="#1f261b">$ 100 $</text>
          </g>
        ` : `
          <!-- Разорванная окровавленная бумажка -->
          <polygon points="-30,-15 20,-25 40,5 -10,15" fill="#6d7860" stroke="#1f261b" stroke-width="3"/>
        `}
      </g>

      <!-- Стальная рамка-убийца (Bail wire) -->
      <!-- В заряженном состоянии она отведена назад (угол 0) -->
      <!-- В захлопнутом состоянии она с грохотом бьет по дереву (угол 180) -->
      <g transform="translate(300,180) rotate(${trapBarAngle})">
        <line x1="0" y1="0" x2="0" y2="-280" stroke="#8c9688" stroke-width="22" stroke-linecap="round"/>
        <line x1="-220" y1="-280" x2="220" y2="-280" stroke="#8c9688" stroke-width="24" stroke-linecap="round"/>
        <line x1="-220" y1="-280" x2="-220" y2="0" stroke="#8c9688" stroke-width="22" stroke-linecap="round"/>
        <line x1="220" y1="-280" x2="220" y2="0" stroke="#8c9688" stroke-width="22" stroke-linecap="round"/>
        <!-- блик стали -->
        <line x1="-210" y1="-276" x2="210" y2="-276" stroke="#ffffff" stroke-width="4" opacity="0.6"/>
      </g>
    </g>

    <!-- Голова крысы: до щелчка тянется к сыру/купюре -->
    ${!isSnapped ? `
      <g transform="translate(140,240)">
        ${drawCuttsRatHead(t, { mood: 'grin' })}
      </g>
    ` : `
      <!-- После щелчка: мышеловка захлопнута, крыса прижата брусом -->
      <!-- Темнота и падающая пыль -->
      ${Array.from({ length: 14 }, (_, i) => `
        <circle cx="${180 + (i * 35) % 400}" cy="${700 + (i * 20) % 200}" r="${2 + (i % 3)}" fill="#a4ab9b" opacity="0.6"/>
      `).join('')}
    `}

    <!-- Финальный уход в глубокую тьму -->
    ${fadeOut > 0 ? `
      <rect width="720" height="1280" fill="#050705" opacity="${fadeOut}"/>
      <text x="360" y="620" text-anchor="middle" font-family="Impact" font-size="52" fill="#d4cca8" letter-spacing="4" opacity="${clamp((fadeOut - 0.3) * 1.5)}">HAPPINESS</text>
      <text x="360" y="680" text-anchor="middle" font-family="Arial" font-size="20" fill="#889180" letter-spacing="2" opacity="${clamp((fadeOut - 0.4) * 1.5)}">A SHORT FILM BY STEVE CUTTS</text>
    ` : ''}
  </svg>`;
};
