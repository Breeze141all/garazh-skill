// ─── cutts_man.js: Стив Каттс / Steve Cutts 1930s Fleischer rubber-hose персонаж ───
window.CHARS = window.CHARS || {};

const CUTTS = {
  skin: '#ded5be',
  skinShade: '#b8ab8e',
  crease: '#8e8268',
  cloth: '#282d33',
  clothDk: '#1d2126',
  button: '#f2eee4',
  nose: '#c24b3e',
  stroke: '#1e1814',
  glow: '#00f0ff',
  like: '#ff0055',
};

// Функция отрисовки глаза в стиле ретро-мультипликации (pie-eye или гипно-спираль)
function cuttsEye(id, cx, cy, rx, ry, lid, hypno, t) {
  if (hypno > 0.1) {
    // Вращающаяся гипнотическая спираль
    const rot = (t * 480) % 360;
    return `<g transform="translate(${cx},${cy}) rotate(${rot})">
      <ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="#fff" stroke="${CUTTS.stroke}" stroke-width="4.5"/>
      <path d="M0,0 Q${rx * 0.4},${ry * 0.4} ${rx * 0.7},0 Q${rx * 0.4},${-ry * 0.4} 0,0 Q${-rx * 0.4},${ry * 0.4} ${-rx * 0.7},0" fill="none" stroke="${CUTTS.stroke}" stroke-width="4"/>
      <circle cx="0" cy="0" r="4.5" fill="${CUTTS.stroke}"/>
    </g>`;
  }

  // Обычный сонный глаз с мешком и зрачком-точкой
  const ly0 = cy - ry + clamp(lid) * 2 * ry;
  return `
    <g id="${id}">
      <!-- мешок под глазом -->
      <path d="M${cx - rx - 2},${cy + ry * 0.4} Q${cx},${cy + ry + 8} ${cx + rx + 2},${cy + ry * 0.4}" fill="none" stroke="${CUTTS.crease}" stroke-width="3" opacity="0.75"/>
      <!-- белок -->
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f5f0e1" stroke="${CUTTS.stroke}" stroke-width="4.5"/>
      <!-- зрачок pie-eye -->
      <g clip-path="url(#${id}_clip)">
        <clipPath id="${id}_clip"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath>
        <circle cx="${cx + 1}" cy="${cy + 2}" r="${rx * 0.45}" fill="${CUTTS.stroke}"/>
        <!-- вырез pie wedge -->
        <polygon points="${cx + 1},${cy + 2} ${cx + rx * 0.6},${cy - ry * 0.4} ${cx + rx * 0.7},${cy + ry * 0.1}" fill="#f5f0e1"/>
        <!-- верхнее веко -->
        <rect x="${cx - rx - 4}" y="${cy - ry - 4}" width="${2 * rx + 8}" height="${ly0 - (cy - ry)}" fill="${CUTTS.skin}"/>
        <path d="M${cx - rx},${ly0} Q${cx},${ly0 + 3} ${cx + rx},${ly0}" stroke="${CUTTS.stroke}" stroke-width="4" fill="none"/>
      </g>
    </g>
  `;
}

CHARS.cuttsman = {
  anchors: { head: [360, 600], mouth: [360, 706], chest: [360, 800], desk: 932 },
  rig: {
    L: { shoulder: [250, 810], len: [95, 100], bend: 1 },
    R: { shoulder: [470, 810], len: [95, 100], bend: -1 },
    sleeve: CUTTS.cloth,
    stripe: null,
    skin: CUTTS.skin,
    crease: CUTTS.crease,
    width: 38
  },

  body(st, P) {
    const b = (st.bob || 0) * 0.5;
    return `
    <g transform="translate(0,${b})">
      <!-- шея -->
      <rect x="334" y="690" width="52" height="70" fill="${CUTTS.skin}" stroke="${CUTTS.stroke}" stroke-width="5"/>
      <path d="M336,715 Q360,722 384,715 M338,735 Q360,742 382,735" stroke="${CUTTS.crease}" stroke-width="3" fill="none"/>
      <!-- торс: грушевидный сгорбленный комбинезон -->
      <path d="M180,1030 C170,890 220,770 290,755 L430,755 C500,770 550,890 540,1030 Z" fill="${CUTTS.cloth}" stroke="${CUTTS.stroke}" stroke-width="6" stroke-linejoin="round"/>
      <!-- воротник -->
      <polygon points="318,755 360,785 340,755" fill="#f0ece1" stroke="${CUTTS.stroke}" stroke-width="4"/>
      <polygon points="402,755 360,785 380,755" fill="#f0ece1" stroke="${CUTTS.stroke}" stroke-width="4"/>
      <!-- лямки комбинезона с пуговицами -->
      <path d="M280,755 L285,930 M440,755 L435,930" stroke="${CUTTS.clothDk}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="285" cy="850" r="7" fill="${CUTTS.button}" stroke="${CUTTS.stroke}" stroke-width="3"/>
      <circle cx="435" cy="850" r="7" fill="${CUTTS.button}" stroke="${CUTTS.stroke}" stroke-width="3"/>
    </g>`;
  },

  head(st, P) {
    const { lid = 0.55, mouth = 0, shock = 0, bliss = 0, t = 0 } = st;
    const hypno = st.hypno ?? (shock > 0.35 ? 1 : 0);
    const wideGrin = st.grin ?? (shock > 0.25 || bliss > 0.4);

    // Глаза
    const eyeL = cuttsEye(P + 'eL', 308, 600, 26, 28, lid, hypno, t);
    const eyeR = cuttsEye(P + 'eR', 412, 600, 26, 28, lid, hypno, t);

    // Рот
    let mouthSvg = '';
    if (wideGrin) {
      // Гротескный оскал Стива Каттса: зубы-клавиши в широком оскале
      mouthSvg = `
        <g transform="translate(360,710)">
          <!-- темная пасть -->
          <path d="M-80,0 Q0,45 80,0 Q0,-15 -80,0 Z" fill="#421411" stroke="${CUTTS.stroke}" stroke-width="5.5"/>
          <!-- верхние зубы -->
          <path d="M-65,-3 Q0,12 65,-3 L65,-12 Q0,2 -65,-12 Z" fill="#ffffff" stroke="${CUTTS.stroke}" stroke-width="3"/>
          ${[-45, -25, -5, 15, 35, 55].map(x => `<line x1="${x}" y1="-10" x2="${x}" y2="3" stroke="${CUTTS.stroke}" stroke-width="2.5"/>`).join('')}
          <!-- нижние зубы -->
          <path d="M-60,18 Q0,32 60,18 L60,26 Q0,40 -60,26 Z" fill="#ffffff" stroke="${CUTTS.stroke}" stroke-width="3"/>
          ${[-40, -20, 0, 20, 40].map(x => `<line x1="${x}" y1="18" x2="${x}" y2="30" stroke="${CUTTS.stroke}" stroke-width="2.5"/>`).join('')}
          <!-- язык -->
          <ellipse cx="0" cy="18" rx="28" ry="10" fill="#a8362d" opacity="0.85"/>
        </g>
      `;
    } else {
      // Усталый дрожащий изгиб рта
      const my = 710 + mouth * 8;
      mouthSvg = `<path d="M326,${my} Q360,${my - 8} 394,${my + 2}" stroke="${CUTTS.stroke}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    }

    // Три волосинки на макушке
    const hairs = `
      <path d="M356,462 Q350,420 338,400" stroke="${CUTTS.stroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M362,460 Q364,410 368,390" stroke="${CUTTS.stroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M368,462 Q380,422 396,408" stroke="${CUTTS.stroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    `;

    return `
    <g transform="translate(0,${st.bob || 0})">
      <!-- Уши -->
      <ellipse cx="232" cy="620" rx="20" ry="26" fill="${CUTTS.skin}" stroke="${CUTTS.stroke}" stroke-width="5"/>
      <ellipse cx="488" cy="620" rx="20" ry="26" fill="${CUTTS.skin}" stroke="${CUTTS.stroke}" stroke-width="5"/>
      <!-- Череп: грушевидный, ретро 1930 -->
      <path d="M236,540 C238,458 290,446 360,446 C430,446 482,458 484,540 C488,620 478,690 432,724 C398,746 322,746 288,724 C242,690 232,620 236,540 Z" fill="${CUTTS.skin}" stroke="${CUTTS.stroke}" stroke-width="6" stroke-linejoin="round"/>
      <!-- Тень подбородка -->
      <path d="M290,724 Q360,756 430,724" stroke="${CUTTS.skinShade}" stroke-width="8" fill="none"/>
      ${hairs}
      ${eyeL}
      ${eyeR}
      <!-- Нос: резиновый шарик с бликом -->
      <ellipse cx="360" cy="640" rx="30" ry="26" fill="${CUTTS.nose}" stroke="${CUTTS.stroke}" stroke-width="5"/>
      <ellipse cx="348" cy="630" rx="8" ry="6" fill="#ffffff" opacity="0.6"/>
      ${mouthSvg}
    </g>`;
  }
};

// Вспомогательная функция для генерации полноценного идущего/бегущего персонажа с резиновыми ногами
function drawCuttsWalking(t, x, y, s, opts = {}) {
  const { hypno = 0, grin = false, speed = 4, phone = true, dead = false } = opts;
  const cycle = (t * speed) % 1;
  const legAngleL = Math.sin(cycle * Math.PI * 2) * 32;
  const legAngleR = -legAngleL;
  const bob = Math.abs(Math.sin(cycle * Math.PI * 2)) * 14;

  const stroke = CUTTS.stroke;
  const cloth = dead ? '#40454a' : CUTTS.cloth;
  const skin = dead ? '#9c988f' : CUTTS.skin;
  const nose = dead ? '#6e5a57' : CUTTS.nose;

  return `
  <g transform="translate(${x},${y - bob}) scale(${s})">
    <!-- Левая нога (сзади) -->
    <g transform="translate(320,1000) rotate(${legAngleR})">
      <path d="M0,0 Q-15,60 0,130" stroke="${cloth}" stroke-width="32" fill="none" stroke-linecap="round"/>
      <!-- ботинок -->
      <path d="M-10,130 Q15,130 40,140 Q35,160 -15,160 Z" fill="#141416" stroke="${stroke}" stroke-width="4"/>
    </g>
    <!-- Правая нога (спереди) -->
    <g transform="translate(400,1000) rotate(${legAngleL})">
      <path d="M0,0 Q15,60 0,130" stroke="${cloth}" stroke-width="32" fill="none" stroke-linecap="round"/>
      <!-- ботинок -->
      <path d="M-10,130 Q15,130 40,140 Q35,160 -15,160 Z" fill="#141416" stroke="${stroke}" stroke-width="4"/>
    </g>
    <!-- Тело -->
    <path d="M220,1020 C210,870 250,780 320,760 L400,760 C470,780 510,870 500,1020 Z" fill="${cloth}" stroke="${stroke}" stroke-width="6"/>
    <!-- Голова наклонена вниз к телефону -->
    <g transform="translate(360,720) rotate(${phone ? 20 : 0}) translate(-360,-720)">
      <path d="M250,560 C250,470 300,450 360,450 C420,450 470,470 470,560 C470,640 450,710 410,730 C380,745 340,745 310,730 C270,710 250,640 250,560 Z" fill="${skin}" stroke="${stroke}" stroke-width="6"/>
      ${cuttsEye('wL', 315, 600, 22, 24, dead ? 0.9 : 0.3, hypno, t)}
      ${cuttsEye('wR', 405, 600, 22, 24, dead ? 0.9 : 0.3, hypno, t)}
      <ellipse cx="360" cy="640" rx="24" ry="20" fill="${nose}" stroke="${stroke}" stroke-width="4"/>
      ${grin ? `
        <path d="M290,700 Q360,745 430,700 Q360,685 290,700 Z" fill="#421411" stroke="${stroke}" stroke-width="4"/>
        <path d="M305,695 Q360,712 415,695" stroke="#fff" stroke-width="8"/>
      ` : `<path d="M330,705 Q360,695 390,705" stroke="${stroke}" stroke-width="4" fill="none"/>`}
    </g>
    <!-- Руки со смартфоном -->
    ${phone ? `
      <!-- Руки вытянуты вперед держат смартфон -->
      <path d="M280,800 Q360,880 430,860" stroke="${cloth}" stroke-width="32" fill="none" stroke-linecap="round"/>
      <circle cx="430" cy="860" r="18" fill="#fff" stroke="${stroke}" stroke-width="4"/>
      <!-- Смартфон со светящимся экраном -->
      <g transform="translate(420,770) rotate(-25)">
        <rect x="0" y="0" width="34" height="64" rx="6" fill="#111" stroke="${stroke}" stroke-width="3"/>
        <rect x="3" y="4" width="28" height="56" rx="4" fill="${CUTTS.glow}"/>
        <!-- иконка уведомления -->
        <circle cx="17" cy="20" r="6" fill="${CUTTS.like}"/>
      </g>
    ` : ''}
  </g>`;
}

window.drawCuttsWalking = drawCuttsWalking;
