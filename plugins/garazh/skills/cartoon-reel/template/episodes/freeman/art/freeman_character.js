// ─── freeman_character.js: Персонаж «The Nobody» (Пан Ніхто) ───────────────
// Черно-белый векторный силуэт в пальто с острым поднятым воротником,
// лицо-маска с мигающим курсором терминала, волновой рот-осциллограф,
// резкая агрессивная жестикуляция прямо в камеру (ломка четвертой стены).

(function() {
  const warm = document.getElementById('warm'); if (warm) warm.style.display = 'none';
  const haze = document.getElementById('haze'); if (haze) haze.style.display = 'none';
  const vig = document.getElementById('vignette'); if (vig) vig.style.display = 'none';
})();

function drawNobody(t, x, y, s, opts = {}) {
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
  const cursorBlink = Math.floor(t * 3) % 2 === 0;

  // Очи/глифы The Nobody: минималистичные прицелы/овалы
  const eyeR = 24 + shock * 6;
  const pupilR = shock > 0.5 ? 4 : 7;
  
  const eyeL = `
    <g transform="translate(-32,-15)">
      <ellipse cx="0" cy="0" rx="${eyeR}" ry="${eyeR * 1.2}" fill="${bg}" stroke="${fg}" stroke-width="4.5"/>
      <circle cx="${eyeLookX * 8}" cy="${eyeLookY * 6}" r="${pupilR}" fill="${fg}"/>
      <!-- Перекрестье визира -->
      <line x1="${-eyeR + 4}" y1="0" x2="${eyeR - 4}" y2="0" stroke="${fg}" stroke-width="1.8" opacity="0.4"/>
    </g>
  `;
  const eyeR_svg = `
    <g transform="translate(32,-15)">
      <ellipse cx="0" cy="0" rx="${eyeR}" ry="${eyeR * 1.2}" fill="${bg}" stroke="${fg}" stroke-width="4.5"/>
      <circle cx="${eyeLookX * 8}" cy="${eyeLookY * 6}" r="${pupilR}" fill="${fg}"/>
      <!-- Перекрестье визира -->
      <line x1="${-eyeR + 4}" y1="0" x2="${eyeR - 4}" y2="0" stroke="${fg}" stroke-width="1.8" opacity="0.4"/>
    </g>
  `;

  // Брови The Nobody
  const brows = `
    <path d="M-55,${-50 - shock * 12} Q-32,${-62 - shock * 12} -12,${-48 - shock * 12}" stroke="${fg}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M12,${-48 - shock * 12} Q32,${-62 - shock * 12} 55,${-50 - shock * 12}" stroke="${fg}" stroke-width="6" fill="none" stroke-linecap="round"/>
  `;

  // Рот The Nobody: в режиме речи — звуковая осциллограмма / импульс
  let mouthSvg = '';
  if (mouth === 'talk') {
    if (talkMouth) {
      // Осциллографная звуковая волна
      const wave = [-18, -12, -6, 0, 6, 12, 18].map(wx => {
        const wy = Math.sin(wx * 0.4 + t * 45) * 12;
        return `L${wx},${38 + wy}`;
      }).join(' ');
      mouthSvg = `
        <ellipse cx="0" cy="38" rx="22" ry="12" fill="${fg}"/>
        <path d="M-22,38 ${wave} L22,38" stroke="${bg}" stroke-width="2.5" fill="none"/>
      `;
    } else {
      // Курсор терминала > _
      mouthSvg = `
        <g transform="translate(-14,34)">
          <path d="M0,0 L6,5 L0,10" stroke="${fg}" stroke-width="3" fill="none"/>
          ${cursorBlink ? `<line x1="12" y1="10" x2="24" y2="10" stroke="${fg}" stroke-width="3"/>` : ''}
        </g>
      `;
    }
  } else if (mouth === 'grin') {
    // Циничный оскал The Nobody
    mouthSvg = `
      <path d="M-30,34 Q-5,50 34,22" stroke="${fg}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <line x1="34" y1="22" x2="38" y2="16" stroke="${fg}" stroke-width="4"/>
    `;
  } else if (mouth === 'yell') {
    // Крик в камеру
    mouthSvg = `
      <polygon points="-36,25 36,25 28,66 -28,66" fill="${fg}" stroke="${fg}" stroke-width="4"/>
      <path d="M-30,30 L30,30 M-24,60 L24,60" stroke="${bg}" stroke-width="6"/>
    `;
  } else {
    // Минималистичный курсор в покое
    mouthSvg = `
      <g transform="translate(-14,34)">
        <path d="M0,0 L6,5 L0,10" stroke="${fg}" stroke-width="3" fill="none"/>
        ${cursorBlink ? `<line x1="12" y1="10" x2="24" y2="10" stroke="${fg}" stroke-width="3"/>` : ''}
      </g>
    `;
  }

  // Руки и позы The Nobody
  let armsSvg = '';
  if (pose === 'point') {
    armsSvg = `
      <path d="M-40,110 Q-80,140 -90,190" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <g transform="translate(60,110)">
        <path d="M0,0 Q60,30 90,60" stroke="${fg}" stroke-width="18" fill="none" stroke-linecap="round"/>
        <g transform="translate(90,60) scale(1.4)">
          <ellipse cx="0" cy="0" rx="20" ry="16" fill="${fg}"/>
          <path d="M5,-8 L40,-15 C46,-15 46,5 36,5 L5,5 Z" fill="${fg}"/>
          <ellipse cx="-4" cy="6" rx="8" ry="6" fill="${bg}" stroke="${fg}" stroke-width="3"/>
          <ellipse cx="6" cy="7" rx="8" ry="6" fill="${bg}" stroke="${fg}" stroke-width="3"/>
        </g>
      </g>
    `;
  } else if (pose === 'shrug') {
    armsSvg = `
      <path d="M-40,110 Q-110,90 -160,60" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <polygon points="-160,60 -185,45 -175,75" fill="${fg}"/>
      <path d="M40,110 Q110,90 160,60" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <polygon points="160,60 185,45 175,75" fill="${fg}"/>
    `;
  } else if (pose === 'headClutch') {
    armsSvg = `
      <path d="M-40,120 Q-100,50 -70,-20" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M40,120 Q100,50 70,-20" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
    `;
  } else if (pose === 'snap') {
    armsSvg = `
      <path d="M-30,110 Q-50,160 -40,210" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <g transform="translate(40,110)">
        <path d="M0,0 Q30,-40 50,-80" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="-80" r="14" fill="${fg}"/>
        ${snapProgress > 0 ? `
          <line x1="50" y1="-105" x2="50" y2="-120" stroke="${fg}" stroke-width="4"/>
          <line x1="70" y1="-95" x2="85" y2="-105" stroke="${fg}" stroke-width="4"/>
          <line x1="30" y1="-95" x2="15" y2="-105" stroke="${fg}" stroke-width="4"/>
        ` : ''}
      </g>
    `;
  } else {
    armsSvg = `
      <path d="M-40,110 Q-70,180 -60,250" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M40,110 Q70,180 60,250" stroke="${fg}" stroke-width="15" fill="none" stroke-linecap="round"/>
    `;
  }

  return `
  <g transform="translate(${x},${y + bob}) scale(${s})">
    ${armsSvg}

    <!-- Силуэт пальто / плаща The Nobody с поднятым воротником -->
    <path d="M-45,100 C-55,160 -50,250 -40,330 L40,330 C50,250 55,160 45,100 Z" fill="${fg}"/>
    
    <!-- Поднятый воротник-лацканы The Nobody -->
    <polygon points="-45,90 -65,30 -20,70" fill="${fg}"/>
    <polygon points="45,90 65,30 20,70" fill="${fg}"/>
    <line x1="-20" y1="70" x2="0" y2="140" stroke="${bg}" stroke-width="3"/>
    <line x1="20" y1="70" x2="0" y2="140" stroke="${bg}" stroke-width="3"/>
    
    <!-- Ноги (силуэт) -->
    <path d="M-26,330 L-30,470 M26,330 L30,470" stroke="${fg}" stroke-width="18" stroke-linecap="round"/>

    <!-- Шея -->
    <rect x="-12" y="70" width="24" height="35" fill="${fg}"/>

    <!-- Лицо The Nobody -->
    <g transform="translate(0,10) rotate(${tilt})">
      <path d="M-70,-10 C-70,-75 -50,-95 0,-95 C50,-95 70,-75 70,-10 C70,55 45,75 0,78 C-45,75 -70,55 -70,-10 Z" 
            fill="${bg}" stroke="${fg}" stroke-width="6"/>

      ${brows}
      ${eyeL}
      ${eyeR_svg}
      ${mouthSvg}
    </g>
  </g>`;
}

window.drawNobody = drawNobody;
window.drawFreeman = drawNobody; // обратная совместимость
