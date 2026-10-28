// man_character.js — Canonical Steve Cutts "MAN" (2012) Character & Entities

// --- 1. THE MAN (Steve Cutts protagonist) ---
function drawSteveCuttsMan(t, x, y, s, opts = {}) {
  const {
    pose = 'welcome',      // 'welcome', 'walk', 'chainsaw', 'throne', 'splat'
    tshirt = 'WELCOME',
    cigar = false,
    crown = false,
    walkSpeed = 3.6,
  } = opts;

  // Walk cycle mechanics
  const cycle = (t * walkSpeed) % 1;
  const legAngle = Math.sin(cycle * Math.PI * 2) * 28;
  const bob = pose === 'walk' ? Math.abs(Math.sin(cycle * Math.PI * 2)) * 8 : Math.sin(t * 3.5) * 2.5;

  if (pose === 'splat') {
    // Crushed flat by alien foot
    return `
    <g transform="translate(${x},${y + 140}) scale(${s})">
      <ellipse cx="0" cy="0" rx="95" ry="14" fill="#111111"/>
      <ellipse cx="-15" cy="0" rx="65" ry="10" fill="#ffffff" stroke="#000000" stroke-width="4"/>
      <!-- Splayed flattened shoes -->
      <path d="M-90,-5 L-130,-5 L-125,5 L-85,5 Z" fill="#000000"/>
      <path d="M90,-5 L130,-5 L125,5 L85,5 Z" fill="#000000"/>
      <!-- Flattened X eyes -->
      <circle cx="-25" cy="-2" r="7" fill="#ffffff" stroke="#000000" stroke-width="2"/>
      <path d="M-29,-4 L-21,0 M-29,0 L-21,-4" stroke="#000000" stroke-width="2"/>
      <circle cx="20" cy="-2" r="7" fill="#ffffff" stroke="#000000" stroke-width="2"/>
      <path d="M16,-4 L24,0 M16,0 L24,-4" stroke="#000000" stroke-width="2"/>
      <!-- Crushed crown -->
      <path d="M5,-12 L15,-28 L25,-12 L35,-26 L42,-8 Z" fill="#f5c227" stroke="#000000" stroke-width="3"/>
    </g>`;
  }

  // Text letter paths / custom hand lettering for tshirt
  function renderTshirtText(txt) {
    if (txt === 'WELCOME') {
      return `
      <g transform="translate(-18, 54) rotate(-3)" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="24" fill="#000000" letter-spacing="3" text-anchor="middle">
        <text x="0" y="0">WELCOME</text>
      </g>`;
    }
    if (txt === 'CONSUME') {
      return `
      <g transform="translate(-18, 54) rotate(-3)" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="23" fill="#000000" letter-spacing="3" text-anchor="middle">
        <text x="0" y="0">CONSUME</text>
      </g>`;
    }
    if (txt === 'PROFIT') {
      return `
      <g transform="translate(-18, 54) rotate(-3)" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="25" fill="#000000" letter-spacing="3" text-anchor="middle">
        <text x="0" y="0">PROFIT</text>
      </g>`;
    }
    if (txt === 'MAN') {
      return `
      <g transform="translate(-18, 54) rotate(-3)" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="32" fill="#000000" letter-spacing="5" text-anchor="middle">
        <text x="0" y="0">MAN</text>
      </g>`;
    }
    return `<text x="-18" y="54" font-family="Arial Black, Impact, sans-serif" font-size="22" font-weight="900" text-anchor="middle" fill="#000">${txt}</text>`;
  }

  return `
  <g transform="translate(${x},${y + bob}) scale(${s})">
    <!-- LEGS & SHOES -->
    ${pose === 'walk' ? `
      <!-- Walking legs -->
      <g stroke="#000000" stroke-width="12" stroke-linecap="round" fill="none">
        <line x1="-30" y1="120" x2="${-30 - legAngle * 1.3}" y2="${230 - Math.abs(legAngle) * 0.4}"/>
        <line x1="12" y1="120" x2="${12 + legAngle * 1.3}" y2="${230 - Math.abs(legAngle) * 0.4}"/>
      </g>
      <!-- Pointy loafers / boots -->
      <g fill="#000000">
        <!-- Left shoe -->
        <path d="M${-55 - legAngle * 1.3},${230 - Math.abs(legAngle) * 0.4}
                 L${-15 - legAngle * 1.3},${230 - Math.abs(legAngle) * 0.4}
                 C${-8 - legAngle * 1.3},${222 - Math.abs(legAngle) * 0.4} ${-12 - legAngle * 1.3},${218 - Math.abs(legAngle) * 0.4} ${-25 - legAngle * 1.3},${218 - Math.abs(legAngle) * 0.4}
                 L${-55 - legAngle * 1.3},${222 - Math.abs(legAngle) * 0.4} Z"/>
        <!-- Right shoe -->
        <path d="M${-10 + legAngle * 1.3},${230 - Math.abs(legAngle) * 0.4}
                 L${30 + legAngle * 1.3},${230 - Math.abs(legAngle) * 0.4}
                 C${38 + legAngle * 1.3},${222 - Math.abs(legAngle) * 0.4} ${34 + legAngle * 1.3},${218 - Math.abs(legAngle) * 0.4} ${18 + legAngle * 1.3},${218 - Math.abs(legAngle) * 0.4}
                 L${-10 + legAngle * 1.3},${222 - Math.abs(legAngle) * 0.4} Z"/>
      </g>
    ` : pose === 'throne' ? `
      <!-- Sitting on throne, legs crossed/relaxed -->
      <g stroke="#000000" stroke-width="12" stroke-linecap="round" fill="none">
        <path d="M-30,120 L-50,170 L-20,210"/>
        <path d="M15,120 L35,170 L65,210"/>
      </g>
      <!-- Pointy shoes pointing down -->
      <g fill="#000000">
        <path d="M-35,210 L-5,210 C5,205 0,195 -15,195 L-35,200 Z"/>
        <path d="M50,210 L80,210 C90,205 85,195 70,195 L50,200 Z"/>
      </g>
    ` : `
      <!-- Standing legs (canon Steve Cutts stance) -->
      <g stroke="#000000" stroke-width="13" stroke-linecap="round" fill="none">
        <line x1="-30" y1="120" x2="-35" y2="235"/>
        <line x1="16" y1="120" x2="20" y2="235"/>
      </g>
      <!-- Long pointy dress shoes splayed outwards -->
      <g fill="#000000">
        <!-- Left shoe points left-down -->
        <path d="M-35,235 C-52,235 -72,238 -76,230 C-68,222 -52,224 -35,224 Z"/>
        <!-- Right shoe points right-down -->
        <path d="M20,235 C38,235 58,238 62,230 C54,222 38,224 20,224 Z"/>
      </g>
    `}

    <!-- BLACK SHORTS / TRUNKS -->
    <path d="M-52,100 L44,100 C48,118 42,136 22,136 C6,136 -4,124 -10,124 C-16,124 -24,136 -40,136 C-52,136 -56,118 -52,100 Z"
          fill="#1e1e1e" stroke="#000000" stroke-width="5" stroke-linejoin="round"/>

    <!-- WHITE T-SHIRT WITH PROTRUDING POTBELLY -->
    <!-- Belly curves boldly outward to the left -->
    <path d="M-40,-35 
             C-52,10 -105,25 -98,75 
             C-92,115 -55,122 35,116 
             C52,112 56,80 52,30 
             C48,-15 42,-35 34,-35 Z" 
          fill="#ffffff" stroke="#000000" stroke-width="5.5" stroke-linejoin="round"/>

    <!-- Left short sleeve -->
    <path d="M-40,-35 L-66,-10 L-50,0 L-32,-20 Z" fill="#ffffff" stroke="#000000" stroke-width="5" stroke-linejoin="round"/>
    <!-- Right short sleeve -->
    <path d="M34,-35 L62,-10 L48,0 L28,-20 Z" fill="#ffffff" stroke="#000000" stroke-width="5" stroke-linejoin="round"/>

    <!-- Crew neck collar line -->
    <path d="M-22,-35 Q-2,-26 18,-35" stroke="#000000" stroke-width="4.5" fill="none"/>

    <!-- T-SHIRT HAND-LETTERED TEXT -->
    ${renderTshirtText(tshirt)}

    <!-- ARMS & HANDS -->
    ${pose === 'welcome' ? `
      <!-- Outstretched arms welcoming the world (Steve Cutts opening frame) -->
      <!-- Left arm stretching up-left -->
      <g stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none">
        <path d="M-58,-5 Q-110,-35 -155,-70"/>
        <!-- 4 cartoon splayed fingers (jazz hands) -->
        <path d="M-155,-70 L-180,-88 M-155,-70 L-178,-72 M-155,-70 L-172,-56 M-155,-70 L-160,-44"/>
      </g>
      <!-- Right arm stretching up-right -->
      <g stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none">
        <path d="M55,-5 Q110,-35 155,-70"/>
        <!-- 4 cartoon splayed fingers -->
        <path d="M155,-70 L180,-88 M155,-70 L178,-72 M155,-70 L172,-56 M155,-70 L160,-44"/>
      </g>
    ` : pose === 'walk' ? `
      <!-- Jaunty swinging arms -->
      <g stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none">
        <path d="M-55,-5 Q-75,${40 - legAngle * 0.8} -60,${85 - legAngle * 1.2}"/>
        <path d="M52,-5 Q75,${40 + legAngle * 0.8} 60,${85 + legAngle * 1.2}"/>
      </g>
      <circle cx="-60" cy="${85 - legAngle * 1.2}" r="7" fill="#000000"/>
      <circle cx="60" cy="${85 + legAngle * 1.2}" r="7" fill="#000000"/>
    ` : pose === 'chainsaw' ? `
      <!-- Holding buzzing chainsaw -->
      <g stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none">
        <path d="M-55,-5 Q-75,30 -60,65"/>
        <path d="M52,-5 Q40,35 -20,60"/>
      </g>
      <!-- Chainsaw body -->
      <g transform="translate(-70, 45) rotate(${Math.sin(t * 40) * 4})">
        <rect x="-35" y="-18" width="55" height="36" rx="4" fill="#ff2200" stroke="#000000" stroke-width="4"/>
        <!-- Guide bar / saw blade -->
        <path d="M-35,-8 L-130,-8 C-145,-8 -145,8 -130,8 L-35,8 Z" fill="#d0d0d0" stroke="#000000" stroke-width="4"/>
        <!-- Teeth / chain -->
        <path d="M-40,-12 L-125,-12" stroke="#000000" stroke-width="3" stroke-dasharray="4,4"/>
        <path d="M-40,12 L-125,12" stroke="#000000" stroke-width="3" stroke-dasharray="4,4"/>
        <!-- Handle -->
        <path d="M10,-12 Q24,-30 8,-36" stroke="#000000" stroke-width="5" fill="none"/>
        <!-- Smoke exhaust -->
        <circle cx="18" cy="10" r="${4 + Math.sin(t * 20) * 2}" fill="#888888" opacity="0.6"/>
        <circle cx="30" cy="18" r="${7 + Math.sin(t * 15) * 3}" fill="#aaaaaa" opacity="0.4"/>
      </g>
    ` : `
      <!-- Throne pose: holding champagne martini glass -->
      <g stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none">
        <!-- Left arm resting on belly -->
        <path d="M-55,-5 Q-85,25 -70,55"/>
        <!-- Right arm raised holding martini glass -->
        <path d="M52,-5 Q85,-15 80,-55"/>
      </g>
      <circle cx="-70" cy="55" r="7" fill="#000000"/>
      <!-- Martini glass in right hand -->
      <g transform="translate(80, -65)">
        <polygon points="-12,-16 12,-16 0,0" fill="#cbe6f5" stroke="#000000" stroke-width="2.5" opacity="0.85"/>
        <line x1="0" y1="0" x2="0" y2="16" stroke="#000000" stroke-width="3"/>
        <line x1="-8" y1="16" x2="8" y2="16" stroke="#000000" stroke-width="3"/>
        <!-- Green cocktail olive -->
        <circle cx="0" cy="-9" r="3" fill="#6ba62b"/>
      </g>
    `}

    <!-- THUMB-SHAPED HEAD & NECK (Steve Cutts cylinder/thumb head) -->
    <g transform="rotate(7 0 -35)">
      <!-- Head contour: rounded at crown, seamless into neck -->
      <path d="M-34,-35 
               C-38,-90 -35,-155 -15,-180 
               C-2,-196 22,-196 32,-175 
               C42,-150 40,-90 34,-35 Z" 
            fill="#ffffff" stroke="#000000" stroke-width="5.5" stroke-linejoin="round"/>

      <!-- SLICKED-BACK GREASER HAIR -->
      <path d="M-10,-182 
               C8,-195 24,-194 32,-175 
               C42,-150 42,-95 36,-40 
               C32,-60 30,-90 22,-120 
               C12,-155 -2,-175 -10,-182 Z" 
            fill="#000000"/>
      
      <!-- Comb texture lines in hair (white ink strokes) -->
      <path d="M2,-180 C18,-172 32,-155 35,-130" stroke="#ffffff" stroke-width="2.2" fill="none"/>
      <path d="M8,-168 C22,-160 34,-142 36,-115" stroke="#ffffff" stroke-width="2.2" fill="none"/>
      <path d="M14,-156 C26,-148 35,-130 36,-95" stroke="#ffffff" stroke-width="2.2" fill="none"/>

      <!-- Forehead pointed hair flick -->
      <path d="M-15,-178 L-8,-168 L-14,-165 Z" fill="#000000"/>

      <!-- Small right ear curve -->
      <path d="M34,-112 C40,-112 40,-98 33,-98" stroke="#000000" stroke-width="3" fill="none"/>

      <!-- FACIAL FEATURES -->
      <ellipse cx="-16" cy="-134" rx="4.5" ry="11" fill="#000000"/>
      <ellipse cx="6" cy="-137" rx="4.5" ry="11" fill="#000000"/>

      <!-- Eyebrows: arched left, smug horizontal right -->
      <path d="M-25,-152 Q-16,-160 -6,-154" stroke="#000000" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M0,-154 Q8,-158 17,-152" stroke="#000000" stroke-width="4.5" fill="none" stroke-linecap="round"/>

      <!-- Nose: small horizontal flick -->
      <path d="M-4,-122 Q-1,-118 -5,-116" stroke="#000000" stroke-width="3.5" fill="none" stroke-linecap="round"/>

      <!-- Confident smug smirk mouth -->
      <path d="M-16,-102 Q-1,-92 14,-102" stroke="#000000" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Double chin crease -->
      <path d="M-10,-82 Q1,-75 12,-84" stroke="#000000" stroke-width="3.2" fill="none" stroke-linecap="round"/>

      <!-- GOLDEN CROWN (for throne climax) -->
      ${crown ? `
        <g transform="translate(-10, -200) rotate(-12)">
          <path d="M-22,12 L-28,-14 L-10,0 L5,-18 L18,-2 L32,-16 L26,12 Z" fill="#ffd000" stroke="#000000" stroke-width="3.5" stroke-linejoin="round"/>
          <circle cx="5" cy="-3" r="4.5" fill="#ff1100" stroke="#000000" stroke-width="1.5"/>
        </g>
      ` : ''}

      <!-- CIGAR IN MOUTH -->
      ${cigar ? `
        <g transform="translate(10, -96) rotate(-8)">
          <rect x="0" y="-4" width="28" height="8" rx="2" fill="#5a2b0c" stroke="#000000" stroke-width="2"/>
          <rect x="24" y="-4" width="4" height="8" fill="#ff3300"/>
          <circle cx="34" cy="-8" r="${5 + Math.sin(t * 12) * 2}" fill="#aaaaaa" opacity="0.6"/>
        </g>
      ` : ''}
    </g>
  </g>`;
}

// --- 2. TWO-HEADED SPOTTED SNAKE (Steve Cutts opening) ---
function drawTwoHeadedSnake(t, x, y, s) {
  const wiggle = Math.sin(t * 4.5) * 6;
  const tongue = (Math.sin(t * 14) > 0.3);

  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <!-- S-curved spotted body with neck raising up into the air -->
    <path d="M-140,5 
             C-105,-20 -70,25 -40,0 
             C-10,-25 15,30 45,-15 
             C65,-45 75,-75 70,-105" 
          stroke="#000000" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-140,5 
             C-105,-20 -70,25 -40,0 
             C-10,-25 15,30 45,-15 
             C65,-45 75,-75 70,-105" 
          stroke="#ffffff" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Prominent irregular black spots on skin -->
    <ellipse cx="-110" cy="-6" rx="8" ry="5" fill="#000000" transform="rotate(-15 -110 -6)"/>
    <ellipse cx="-72" cy="14" rx="9" ry="6" fill="#000000" transform="rotate(20 -72 14)"/>
    <ellipse cx="-35" cy="-2" rx="8" ry="5" fill="#000000" transform="rotate(-10 -35 -2)"/>
    <ellipse cx="5" cy="16" rx="10" ry="7" fill="#000000" transform="rotate(25 5 16)"/>
    <ellipse cx="38" cy="-25" rx="8" ry="6" fill="#000000" transform="rotate(-20 38 -25)"/>
    <ellipse cx="62" cy="-65" rx="7" ry="5" fill="#000000" transform="rotate(45 62 -65)"/>

    <!-- Forking neck into two heads -->
    <!-- Head 1: Left / Upper head looking up-right at Man -->
    <g transform="translate(68, -110) rotate(${12 + wiggle * 0.8})">
      <path d="M0,15 C-5,-5 12,-18 28,-14 C44,-10 46,12 30,22 C18,30 4,26 0,15 Z" fill="#ffffff" stroke="#000000" stroke-width="4.5"/>
      <path d="M12,12 Q24,18 34,8" stroke="#000000" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="-2" r="6" fill="#ffffff" stroke="#000000" stroke-width="2.5"/>
      <circle cx="21" cy="-2" r="3.2" fill="#000000"/>
      ${tongue ? `<path d="M34,8 L44,6 L48,2 M44,6 L48,10" stroke="#e61c1c" stroke-width="2.2" fill="none"/>` : ''}
    </g>

    <!-- Head 2: Right / Lower head looking up-right at Man -->
    <g transform="translate(94, -95) rotate(${22 - wiggle * 0.8})">
      <path d="M0,14 C-5,-4 10,-16 26,-12 C40,-8 42,10 28,20 C16,26 4,24 0,14 Z" fill="#ffffff" stroke="#000000" stroke-width="4.5"/>
      <path d="M10,10 Q20,16 30,6" stroke="#000000" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="18" cy="-1" r="5.5" fill="#ffffff" stroke="#000000" stroke-width="2.5"/>
      <circle cx="19" cy="-1" r="3" fill="#000000"/>
    </g>
  </g>`;
}

// --- 3. GIANT ALIEN CLIMAX STOMP ---
function drawAlienClimax(t, eventTime, x, y, s) {
  if (t < eventTime) return '';
  const dt = t - eventTime;
  const fallProg = Math.min(1, dt / 0.22);
  const footY = (1 - fallProg) * -850;

  return `
  <g transform="translate(${x},${y + footY}) scale(${s})">
    <g stroke="#000000" stroke-width="7" stroke-linejoin="round">
      <rect x="-95" y="-1200" width="190" height="1200" fill="#3ca648"/>
      <line x1="-95" y1="-1200" x2="-95" y2="0" stroke="#000000" stroke-width="8"/>
      <line x1="95" y1="-1200" x2="95" y2="0" stroke="#000000" stroke-width="8"/>
      
      <!-- Robotic joint ring -->
      <rect x="-115" y="-60" width="230" height="35" rx="8" fill="#2b7a34"/>
      <circle cx="-60" cy="-42" r="6" fill="#ffd000"/>
      <circle cx="0" cy="-42" r="6" fill="#ffd000"/>
      <circle cx="60" cy="-42" r="6" fill="#ffd000"/>

      <!-- Giant mechanical stomp sole -->
      <path d="M-200,0 L200,0 C220,0 230,35 200,45 L-200,45 C-230,35 -220,0 -200,0 Z" fill="#1b4d21"/>
      <!-- Tread spikes -->
      <path d="M-190,45 L-170,65 L-150,45 L-130,65 L-110,45 L-90,65 L-70,45 L-50,65 L-30,45 L-10,65 L10,45 L30,65 L50,45 L70,65 L90,45 L110,65 L130,45 L150,65 L170,45 L190,65" fill="#0e2912"/>
    </g>

    <!-- Shockwave dust puffs upon landing -->
    ${dt > 0.08 ? `
      <g opacity="${Math.max(0, 1 - (dt - 0.08) * 0.9)}">
        <ellipse cx="-250" cy="50" rx="${60 + dt * 110}" ry="${25 + dt * 45}" fill="#ffffff" stroke="#000000" stroke-width="4"/>
        <ellipse cx="250" cy="50" rx="${60 + dt * 110}" ry="${25 + dt * 45}" fill="#ffffff" stroke="#000000" stroke-width="4"/>
      </g>
    ` : ''}

    <!-- Tiny alien steps out after 2.0s -->
    ${dt >= 2.0 ? `
      <g transform="translate(130, 20)">
        <ellipse cx="0" cy="-30" rx="16" ry="24" fill="#a8e635" stroke="#000000" stroke-width="3"/>
        <circle cx="-8" cy="-42" r="4.5" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
        <circle cx="-8" cy="-42" r="2" fill="#000000"/>
        <circle cx="0" cy="-48" r="5" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
        <circle cx="0" cy="-48" r="2.5" fill="#000000"/>
        <circle cx="8" cy="-42" r="4.5" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
        <circle cx="8" cy="-42" r="2" fill="#000000"/>
        <path d="M-6,-26 Q0,-20 6,-26" stroke="#000000" stroke-width="2.5" fill="none"/>
        <rect x="-14" y="-22" width="28" height="18" fill="#ffffff" stroke="#000000" stroke-width="2"/>
        <text x="0" y="-10" font-family="Arial Black" font-size="6" text-anchor="middle" fill="#000">WELCOME</text>
      </g>
    ` : ''}
  </g>`;
}

window.drawSteveCuttsMan = drawSteveCuttsMan;
window.drawTwoHeadedSnake = drawTwoHeadedSnake;
window.drawAlienClimax = drawAlienClimax;
