// ─── freeman_character.js: Персонаж Mr. Freeman (Toonbox канон) ─────────────
// Черно-белый векторный силуэт, выразительные овальные глаза, стреловидные пальцы,
// агрессивная жестикуляция прямо в камеру (ломка четвертой стены).

// Отключаем теплые пленочные фильтры гаража для достижения строгого бинарного монохрома
(function() {
  const warm = document.getElementById('warm'); if (warm) warm.style.display = 'none';
  const haze = document.getElementById('haze'); if (haze) haze.style.display = 'none';
  const vig = document.getElementById('vignette'); if (vig) vig.style.display = 'none';
})();

function drawFreeman(t, x, y, s, opts = {}) {
  const {
    pose = 'point',
    mouth = 'talk',
    invert = false,
    eyeLookX = 0,
    eyeLookY = 0,
    shock = 0,
    tilt = 0,
    snapProgress = 0,
  } = opts;

  const fg = invert ? '#ffffff' : '#000000';
  const bg = invert ? '#000000' : '#ffffff';
  const red = '#ff0000';

  const bob = Math.sin(t * 8) * 3;
  const talkMouth = Math.sin(t * 32) > -0.2;

  // Глаза Фримена: крупные овалы с черными точками-зрачками
  const eyeR = 26 + shock * 6;
  const pupilR = shock > 0.5 ? 4 : 7;
  const eyeL = `
    <g transform="translate(-32,-15)">
      <ellipse cx="0" cy="0" rx="${eyeR}" ry="${eyeR * 1.25}" fill="${bg}" stroke="${fg}" stroke-width="4.5"/>
      <circle cx="${eyeLookX * 10}" cy="${eyeLookY * 8}" r="${pupilR}" fill="${fg}"/>
      <!-- Блик -->
      <circle cx="${eyeLookX * 10 - 2}" cy="${eyeLookY * 8 - 2}" r="2" fill="${bg}"/>
    </g>
  `;
  const eyeR_svg = `
    <g transform="translate(32,-15)">
      <ellipse cx="0" cy="0" rx="${eyeR}" ry="${eyeR * 1.25}" fill="${bg}" stroke="${fg}" stroke-width="4.5"/>
      <circle cx="${eyeLookX * 10}" cy="${eyeLookY * 8}" r="${pupilR}" fill="${fg}"/>
      <!-- Блик -->
      <circle cx="${eyeLookX * 10 - 2}" cy="${eyeLookY * 8 - 2}" r="2" fill="${bg}"/>
    </g>
  `;

  // Брови: подвижные черные дуги
  const browAngle = shock > 0.4 ? -15 : (tilt * 2);
  const brows = `
    <path d="M-55,${-50 - shock * 12} Q-32,${-62 - shock * 12} -12,${-48 - shock * 12}" stroke="${fg}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M12,${-48 - shock * 12} Q32,${-62 - shock * 12} 55,${-50 - shock * 12}" stroke="${fg}" stroke-width="6" fill="none" stroke-linecap="round"/>
  `;

  // Рот Фримена
  let mouthSvg = '';
  if (mouth === 'talk') {
    if (talkMouth) {
      mouthSvg = `
        <ellipse cx="0" cy="38" rx="22" ry="${14 + Math.abs(Math.sin(t * 16)) * 10}" fill="${fg}"/>
        <!-- Язык / зубы -->
        <path d="M-15,32 Q0,38 15,32" stroke="${bg}" stroke-width="3" fill="none"/>
      `;
    } else {
      mouthSvg = `<path d="M-20,38 Q0,42 20,36" stroke="${fg}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    }
  } else if (mouth === 'grin') {
    // Циничная кривая ухмылка
    mouthSvg = `
      <path d="M-28,34 Q-5,48 32,24" stroke="${fg}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <line x1="32" y1="24" x2="36" y2="18" stroke="${fg}" stroke-width="4"/>
    `;
  } else if (mouth === 'yell') {
    // Крик / яростный оскал
    mouthSvg = `
      <polygon points="-35,25 35,25 28,65 -28,65" fill="${fg}" stroke="${fg}" stroke-width="4"/>
      <!-- зубы -->
      <path d="M-30,30 L30,30" stroke="${bg}" stroke-width="6"/>
      <path d="M-24,58 L24,58" stroke="${bg}" stroke-width="6"/>
    `;
  } else {
    // Нейтральная линия
    mouthSvg = `<line x1="-18" y1="38" x2="18" y2="38" stroke="${fg}" stroke-width="4.5" stroke-linecap="round"/>`;
  }

  // Руки и позы (жесты Фримена)
  let armsSvg = '';
  if (pose === 'point') {
    // Канонический жест: указательный палец тычет прямо в экран (в зрителя)
    armsSvg = `
      <!-- Левая рука приподнята сбоку -->
      <path d="M-40,110 Q-80,140 -90,190" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <!-- Правая рука направлена вперед: гигантский указательный палец в ракурсе -->
      <g transform="translate(60,110)">
        <path d="M0,0 Q60,30 90,60" stroke="${fg}" stroke-width="18" fill="none" stroke-linecap="round"/>
        <!-- Кисть, указывающая в зрителя (ракурс) -->
        <g transform="translate(90,60) scale(1.4)">
          <ellipse cx="0" cy="0" rx="20" ry="16" fill="${fg}"/>
          <!-- Вытянутый указательный палец -->
          <path d="M5,-8 L38,-15 C45,-15 45,5 35,5 L5,5 Z" fill="${fg}"/>
          <!-- согнутые пальцы -->
          <ellipse cx="-4" cy="6" rx="8" ry="6" fill="${bg}" stroke="${fg}" stroke-width="3"/>
          <ellipse cx="6" cy="7" rx="8" ry="6" fill="${bg}" stroke="${fg}" stroke-width="3"/>
        </g>
      </g>
    `;
  } else if (pose === 'shrug') {
    // Руки разведены в стороны в саркастичном недоумении
    armsSvg = `
      <path d="M-40,110 Q-110,90 -160,60" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <polygon points="-160,60 -185,45 -175,75" fill="${fg}"/>
      <path d="M40,110 Q110,90 160,60" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <polygon points="160,60 185,45 175,75" fill="${fg}"/>
    `;
  } else if (pose === 'headClutch') {
    // Хватается руками за голову в приступе отчаяния от глупости биомассы
    armsSvg = `
      <path d="M-40,120 Q-100,50 -70,-20" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M40,120 Q100,50 70,-20" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
    `;
  } else if (pose === 'snap') {
    // Щелчок пальцами перед финалом
    armsSvg = `
      <path d="M-30,110 Q-50,160 -40,210" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <g transform="translate(40,110)">
        <path d="M0,0 Q30,-40 50,-80" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <!-- Рука в щелчке -->
        <circle cx="50" cy="-80" r="14" fill="${fg}"/>
        <!-- искры щелчка -->
        ${snapProgress > 0 ? `
          <line x1="50" y1="-105" x2="50" y2="-120" stroke="${fg}" stroke-width="4"/>
          <line x1="70" y1="-95" x2="85" y2="-105" stroke="${fg}" stroke-width="4"/>
          <line x1="30" y1="-95" x2="15" y2="-105" stroke="${fg}" stroke-width="4"/>
        ` : ''}
      </g>
    `;
  } else {
    // Свободные опущенные руки
    armsSvg = `
      <path d="M-40,110 Q-70,180 -60,250" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M40,110 Q70,180 60,250" stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round"/>
    `;
  }

  return `
  <g transform="translate(${x},${y + bob}) scale(${s})">
    <!-- Руки -->
    ${armsSvg}

    <!-- Тело: лаконичный черный силуэт торса -->
    <path d="M-42,100 C-50,150 -45,240 -35,320 L35,320 C45,240 50,150 42,100 Z" fill="${fg}"/>
    <!-- Ноги (силуэт) -->
    <path d="M-26,320 L-30,460 M26,320 L30,460" stroke="${fg}" stroke-width="16" stroke-linecap="round"/>

    <!-- Шея -->
    <rect x="-12" y="70" width="24" height="35" fill="${fg}"/>

    <!-- Голова (наклоняется на tilt градусов) -->
    <g transform="translate(0,10) rotate(${tilt})">
      <!-- Овал головы с заостренным подбородком -->
      <path d="M-70,-10 C-70,-75 -50,-95 0,-95 C50,-95 70,-75 70,-10 C70,55 45,75 0,78 C-45,75 -70,55 -70,-10 Z" 
            fill="${bg}" stroke="${fg}" stroke-width="6"/>

      <!-- Брови, Глаза, Рот -->
      ${brows}
      ${eyeL}
      ${eyeR_svg}
      ${mouthSvg}
    </g>
  </g>`;
}

window.drawFreeman = drawFreeman;
