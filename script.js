// ── Clock ─────────────────────────────────────────────────────────────────────
const clkEl = document.getElementById('clk');
function tick() {
  clkEl.textContent = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}
setInterval(tick, 1000);
tick();

// ── DOM refs ──────────────────────────────────────────────────────────────────
const out = document.getElementById('out');
const inp = document.getElementById('inp');
let hist = [], hidx = -1;

// ── Render helpers ─────────────────────────────────────────────────────────────
let lineIdx = 0;
function resetIdx() { lineIdx = 0; }

function ln(cls, html) {
  const d = document.createElement('div');
  d.className = 'ln fi ' + cls;
  d.style.setProperty('--i', lineIdx++);
  d.innerHTML = html;
  out.appendChild(d);
}

function blank() {
  const d = document.createElement('div');
  d.className = 'blank fi';
  out.appendChild(d);
}

function scroll() {
  setTimeout(() => out.scrollTop = out.scrollHeight, 40);
}

function echoCmd(cmd) {
  const d = document.createElement('div');
  d.className = 'echo fi';
  d.innerHTML = `<span class="ps1"><span class="u">abhinav</span><span class="a">@</span><span class="h">devops</span><span class="c">:</span><span class="p">~</span><span class="d"> $</span></span><span style="color:var(--text)"> ${cmd}</span>`;
  out.appendChild(d);
}

function shdr(t) {
  const d = document.createElement('div');
  d.className = 'shdr fi';
  d.innerHTML = `<span style="color:var(--purple);font-weight:600"># ${t}</span>`;
  out.appendChild(d);
}

function ir(k, v) {
  const d = document.createElement('div');
  d.className = 'ir';
  d.innerHTML = `<span class="ik">${k}</span><span class="isep">│</span><span class="iv">${v}</span>`;
  out.appendChild(d);
}

function skill(name, pct, tag) {
  const f = Math.round(pct / 10);
  let b = '';
  for (let i = 0; i < 10; i++) b += `<div class="sk-b ${i < f ? 'on' : 'off'}"></div>`;
  const d = document.createElement('div');
  d.className = 'sk-row fi';
  d.innerHTML = `<span class="sk-n">${name}</span><div class="sk-bar">${b}</div><span class="sk-p">${pct}%</span>${tag ? `<span class="sk-tag">${tag}</span>` : ''}`;
  out.appendChild(d);
}

// ── Commands ───────────────────────────────────────────────────────────────────
const CMD = {

  help() {
    blank();
    ln('', `  <span style="color:var(--muted)">┌──────────────────────────────────────────────────┐</span>`);
    ln('', `  <span style="color:var(--muted)">│</span>  <span style="color:var(--cyan);font-weight:600">Available Commands</span>                              <span style="color:var(--muted)">│</span>`);
    ln('', `  <span style="color:var(--muted)">├──────────────────────────────────────────────────┤</span>`);
    const d = document.createElement('div');
    d.className = 'hgrid fi';
    [
      ['whoami',       'Profile, summary & status'],
      ['skills',       'Tech stack with proficiency bars'],
      ['experience',   'Internships & work experience'],
      ['projects',     'Portfolio projects + GitHub links'],
      ['education',    'Degree, clubs & leadership'],
      ['achievements', 'Awards, certs & milestones'],
      ['contact',      'Email, GitHub, LinkedIn & more'],
      ['neofetch',     'System info splash (try it!)'],
      ['ls',           'List all sections as directory'],
      ['cat readme',   'What this portfolio is about'],
      ['history',      'Command history'],
      ['clear',        'Clear the terminal'],
    ].forEach(([c, d2]) => { d.innerHTML += `<span class="hc">${c}</span><span class="hd">— ${d2}</span>`; });
    out.appendChild(d);
    ln('', `  <span style="color:var(--muted)">└──────────────────────────────────────────────────┘</span>`);
    blank();
    ln('', `  <span style="color:var(--muted)">  ↑↓ history &nbsp;·&nbsp; Tab autocomplete &nbsp;·&nbsp; Ctrl+L clear</span>`);
    blank();
  },

  whoami() {
    blank();
    resetIdx();
    // ASCII name banner — clean modern style
    [
      '  ╔═════════════════════════════════════════╗',
      '  ║   ▄▀█ █▄▄ █░█ █ █▄░█ ▄▀█ █░█          ║',
      '  ║   █▀█ █▄█ █▀█ █ █░▀█ █▀█ ▀▄▀          ║',
      '  ╚═════════════════════════════════════════╝',
    ].forEach((a, i) => {
      const d = document.createElement('div');
      d.className = 'fi';
      d.style.setProperty('--i', i);
      d.style.cssText += 'font-family:var(--font);font-size:12px;line-height:1.5;color:var(--green);text-shadow:0 0 18px rgba(168,255,120,0.4), 0 0 40px rgba(168,255,120,0.1);white-space:pre;letter-spacing:0;';
      d.textContent = a;
      out.appendChild(d);
    });
    blank();

    // Status bar
    const sb = document.createElement('div');
    sb.className = 'statbar';
    sb.innerHTML = `
      <div class="stat"><div class="sdot g"></div><span class="sl">Status</span><span class="sv">Open to DevOps roles</span></div>
      <div class="stat"><div class="sdot y"></div><span class="sl">Batch</span><span class="sv">2023–2027</span></div>
      <div class="stat"><div class="sdot c"></div><span class="sl">Focus</span><span class="sv">DevOps · Linux · CI/CD</span></div>
      <div class="stat"><div class="sdot p"></div><span class="sl">Location</span><span class="sv">Bihar, India</span></div>`;
    out.appendChild(sb);
    blank();

    shdr('Identity');
    ir('Name',    `<span style="color:var(--green);font-weight:600">Abhinav Kumar</span>`);
    ir('Role',    'DevOps Enthusiast · Cybersecurity Engineer');
    ir('College', 'GEC Samastipur — B.Tech CSE (Cybersecurity)');
    ir('Email',   `<span style="color:var(--cyan)">abhinavcyber10@gmail.com</span>`);
    ir('GitHub',  `<span style="color:var(--purple)">github.com/abhi4navs</span>`);
    blank();

    shdr('Summary');
    ln('', `  <span style="color:var(--muted2)">CSE (Cybersecurity) student at GEC Samastipur actively transitioning</span>`);
    ln('', `  <span style="color:var(--muted2)">into DevOps. Built production shell automation tools, completed</span>`);
    ln('', `  <span style="color:var(--muted2)">internships in DevOps &amp; web security, developing infra skills</span>`);
    ln('', `  <span style="color:var(--muted2)">across Linux, CI/CD, Docker, and cloud.</span>`);
    blank();
  },

  skills() {
    blank();
    shdr('DevOps & Automation');
    skill('  Bash / Shell',    90, 'Expert');
    skill('  Linux Admin',     85, 'Strong');
    skill('  Git / GitHub',    80, 'Strong');
    skill('  CI/CD Concepts',  65, 'Good');
    skill('  Docker',          60, 'Good');
    blank();
    shdr('Security & Networking');
    skill('  Python',          75, 'Strong');
    skill('  Nmap / Recon',    80, 'Strong');
    skill('  TCP/IP / DNS',    75, 'Strong');
    skill('  Burp Suite',      70, 'Good');
    skill('  OWASP Top 10',    70, 'Good');
    blank();
    shdr('Infrastructure');
    skill('  MySQL / Postgres', 60, 'Good');
    skill('  Nginx',            65, 'Good');
    skill('  AWS / GCP',        45, 'Basics');
    skill('  IaC (Basics)',     40, 'Learning');
    blank();
    ln('', `  <span style="color:var(--green)">■</span> Filled = Proficient &nbsp; <span style="color:var(--border2)">■</span> Empty = Learning`);
    blank();
  },

  experience() {
    blank();
    shdr('Work Experience');

    const e1 = document.createElement('div');
    e1.className = 'card green';
    e1.innerHTML = `
      <div class="exp-top">
        <span class="exp-r">DevOps Intern</span>
        <span class="exp-d">Mar 2026 – Present</span>
      </div>
      <div class="exp-c">SCRYMZ ESPORTS &nbsp;<span style="color:var(--muted);font-size:11px">[Onsite]</span></div>
      <div class="ep">Assisted in CI/CD pipeline automation and deployment workflows</div>
      <div class="ep">Managed version control with Git; supported cloud infrastructure ops</div>
      <div class="ep">Worked with Docker; monitored system performance and resolved issues</div>`;
    out.appendChild(e1);

    const e2 = document.createElement('div');
    e2.className = 'card blue';
    e2.innerHTML = `
      <div class="exp-top">
        <span class="exp-r">Web Application Security Intern</span>
        <span class="exp-d">May 2025 – Jul 2025</span>
      </div>
      <div class="exp-c">VIEH Groups &nbsp;<span style="color:var(--muted);font-size:11px">[Remote]</span></div>
      <div class="ep">Automated vulnerability scanning using Burp Suite + Python on Linux</div>
      <div class="ep">Network reconnaissance with Nmap; wrote structured security reports</div>
      <div class="ep">Hands-on bug hunting — identified and reported web app vulnerabilities</div>`;
    out.appendChild(e2);
    blank();
  },

  projects() {
    blank();
    shdr('Projects');

    const p1 = document.createElement('div');
    p1.className = 'card blue';
    p1.innerHTML = `
      <div class="c-title">📁 DevOps Automation Toolkit</div>
      <div class="c-sub">🔗 github.com/abhi4navs/devops-automation-toolkit</div>
      <div class="chips">
        <span class="chip">Bash</span><span class="chip">Linux</span><span class="chip">CI/CD</span>
        <span class="chip">MySQL</span><span class="chip">PostgreSQL</span><span class="chip">Nginx</span><span class="chip">systemd</span>
      </div>
      <div class="pt">4 production shell scripts — monitoring, zero-downtime deploy, backup, log analysis</div>
      <div class="pt">Atomic symlink deploys + auto-rollback on HTTP health check failure</div>
      <div class="pt">mysqldump/pg_dump backups with 7-day retention + integrity verification</div>
      <div class="pt">Nginx log parser generating HTML reports — traffic, errors, bandwidth</div>`;
    out.appendChild(p1);

    blank();
    ln('', `  <span style="color:var(--muted)">→ More projects at </span><span style="color:var(--purple)">github.com/abhi4navs</span>`);
    blank();
  },

  education() {
    blank();
    shdr('Education');
    const e = document.createElement('div');
    e.className = 'card green';
    e.innerHTML = `
      <div class="c-title">Government Engineering College, Samastipur</div>
      <div class="exp-top" style="margin-bottom:8px">
        <span style="color:var(--text);font-size:12.5px">B.Tech — Computer Science &amp; Engineering (Cybersecurity)</span>
        <span style="color:var(--yellow);font-size:11.5px">2023 – 2027</span>
      </div>
      <div class="ep">Top 5% in Academics</div>
      <div class="ep">ASIMO Technical Club — Coordinator &amp; Social Media Head</div>
      <div class="ep">Training &amp; Placement Cell — Student Coordinator</div>
      <div class="ep">E-Cell IIT Bombay — Student Ambassador</div>`;
    out.appendChild(e);
    blank();
  },

  achievements() {
    blank();
    shdr('Achievements');
    [
      ['⚡', '100 Days DevOps Challenge — kodekloud (ongoing)'],
      ['🛡', 'Cyber Volunteer @ I4C (MHA, Govt. of India) — Reported 500+ illegal cyber activities over 2 years'],
      ['🏆', 'Smart India Hackathon (SIH) 2023 &amp; 2024 — College Level Participant'],
      ['🎓', 'Represented college at Inter-College Tech Fest — 500+ participants from 38 Bihar colleges'],
    ].forEach(([ic, t]) => ln('', `  ${ic} &nbsp;<span style="color:var(--muted2)">${t}</span>`));
    blank();

    shdr('Certifications');
    [
      'Indian Cyber Club — Bug Bounty Project',
      'CISCO — Essential Computer Networking',
      'IIT Bombay (Spoken Tutorial) — C Programming &amp; Web Development',
    ].forEach(c => ln('', `  <span style="color:var(--green)">✓</span> &nbsp;<span style="color:var(--muted2)">${c}</span>`));
    blank();
  },

  contact() {
    blank();
    resetIdx();
    shdr('Contact');
    ln('', `  <span style="color:var(--muted2)">Ping me — I respond within 24h ⚡</span>`);
    blank();
    ir('📧 Email',    `<a href="mailto:abhinavcyber10@gmail.com" target="_blank" style="color:var(--green)">abhinavcyber10@gmail.com</a>`);
    ir(`<span style="display:inline-flex;align-items:center;gap:5px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub</span>`,   `<a href="https://github.com/abhi4navs" target="_blank" style="color:var(--purple)">github.com/abhi4navs</a>`);
    ir(`<span style="display:inline-flex;align-items:center;gap:5px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</span>`, `<a href="https://linkedin.com/in/Abhinav-kumar-33047b265" target="_blank" style="color:var(--cyan)">linkedin.com/in/Abhinav-kumar-33047b265</a>`);
    ir('📍 Location', 'Samastipur, Bihar, India');
    blank();
  },

  neofetch() {
    blank();
    const L = [
      '      #####           ',
      '     #######          ',
      '     ##O#O##          ',
      '     #######          ',
      '   ###########        ',
      '  #############       ',
      ' ###############      ',
      ' ####  ###  ####      ',
      '  ###########         ',
    ];
    const R = [
      `<span style="color:var(--green);font-weight:600">abhinav</span><span style="color:var(--muted)">@</span><span style="color:var(--cyan);font-weight:600">devops-portfolio</span>`,
      `<span style="color:var(--muted)">────────────────────────</span>`,
      `<span style="color:var(--cyan)">OS</span>        Ubuntu 22.04 LTS x86_64`,
      `<span style="color:var(--cyan)">Shell</span>     zsh 5.9 + fira code`,
      `<span style="color:var(--cyan)">Role</span>      DevOps Enthusiast`,
      `<span style="color:var(--cyan)">College</span>   GEC Samastipur`,
      `<span style="color:var(--cyan)">Batch</span>     2023 – 2027`,
      `<span style="color:var(--cyan)">Uptime</span>    2+ years in tech`,
      `<span style="color:var(--cyan)">Status</span>    <span style="color:var(--green)">● Actively job hunting</span>`,
    ];
    const max = Math.max(L.length, R.length);
    for (let i = 0; i < max; i++) {
      const l = L[i] || '                       ';
      const r = R[i] || '';
      ln('', `  <span style="color:var(--cyan)">${l}</span>  ${r}`);
    }
    blank();
    ln('', '  ' +
      `<span style="background:var(--red);color:var(--red)">███</span>` +
      `<span style="background:var(--yellow);color:var(--yellow)">███</span>` +
      `<span style="background:var(--green);color:var(--green)">███</span>` +
      `<span style="background:var(--cyan);color:var(--cyan)">███</span>` +
      `<span style="background:var(--blue);color:var(--blue)">███</span>` +
      `<span style="background:var(--purple);color:var(--purple)">███</span>`);
    blank();
  },

  ls() {
    blank();
    ln('', `  <span style="color:var(--muted)">total 9  (drwxr-xr-x  abhinav  devops)</span>`);
    blank();
    [
      ['drwxr-xr-x', 'cyan',  'whoami/'],
      ['drwxr-xr-x', 'cyan',  'skills/'],
      ['drwxr-xr-x', 'cyan',  'experience/'],
      ['drwxr-xr-x', 'cyan',  'projects/'],
      ['drwxr-xr-x', 'cyan',  'education/'],
      ['drwxr-xr-x', 'cyan',  'achievements/'],
      ['-rw-r--r--',  'green', 'contact.txt'],
      ['-rw-r--r--',  'green', 'resume.pdf'],
      ['-rw-r--r--',  'green', 'readme.md'],
    ].forEach(([p, c, n]) => {
      ln('', `  <span style="color:var(--muted)">${p}</span>  <span style="color:var(--${c})">${n}</span>`);
    });
    blank();
  },

  'cat readme'() {
    blank();
    ln('', `  <span style="color:var(--green);font-weight:600"># README — Abhinav's Terminal Portfolio</span>`);
    blank();
    ln('', `  <span style="color:var(--muted2)">An interactive terminal portfolio built with vanilla HTML/CSS/JS.</span>`);
    ln('', `  <span style="color:var(--muted2)">No frameworks. No build tools. Just a shell.</span>`);
    blank();
    ln('', `  <span style="color:var(--cyan)">Why a terminal?</span>`);
    ln('', `  <span style="color:var(--muted2)">  Because I'm going into DevOps. The terminal IS home.</span>`);
    blank();
    ln('', `  <span style="color:var(--cyan)">Source</span>`);
    ln('', `  <span style="color:var(--purple)">  github.com/abhi4navs</span>`);
    blank();
  },

  history() {
    blank();
    if (!hist.length) {
      ln('', `  <span style="color:var(--muted)">(no commands yet)</span>`);
    } else {
      hist.slice().reverse().forEach((c, i) => {
        ln('', `  <span style="color:var(--muted)">${String(i + 1).padStart(4)}</span>  ${c}`);
      });
    }
    blank();
  },

  // ── Hidden easter egg ────────────────────────────────────────
  hobbies() {
    blank();
    ln('', `  <span style="color:var(--muted)">🔒 classified section unlocked...</span>`);
    blank();
    shdr('Hobbies  ( ͡° ͜ʖ ͡°)');
    ln('', `  <span style="color:var(--yellow)">🎭</span>  <span style="color:var(--text)">Creating Memes</span>  <span style="color:var(--muted)"># primary skill, unlisted on resume</span>`);
    blank();
    ln('', `  <span style="color:var(--muted2)">Proficiency:</span>`);
    skill('  Meme Creation', 99, '🔥 GODLIKE');
    blank();
    ln('', `  <span style="color:var(--muted)">  "I automate servers by day, break the internet by night."</span>`);
    blank();
    ln('', `  <span style="color:var(--muted)">  psst — this section is not on the resume 🤫</span>`);
    blank();
  },

  clear() { out.innerHTML = ''; },
  cls()   { out.innerHTML = ''; },
  exit()  { blank(); ln('', `  <span style="color:var(--yellow)">DevOps engineers never exit — they just Ctrl+Z 😄</span>`); blank(); },
  pwd()   { ln('', `  /home/abhinav/portfolio`); },
  date()  { ln('', `  ${new Date().toString()}`); },
  uname() { ln('', `  Linux abhinav-devops 6.1.0 #1 SMP x86_64 GNU/Linux`); },

  'git status'() {
    blank();
    ln('', `  <span style="color:var(--green)">On branch main</span>`);
    ln('', `  Your branch is up to date with 'origin/main'.`);
    blank();
    ln('', `  nothing to commit, working tree clean`);
    ln('', `  <span style="color:var(--muted)">  # All skills staged. Pushing to career... ⚡</span>`);
    blank();
  },
};

CMD['man'] = CMD['help'];

// ── Run command ────────────────────────────────────────────────────────────────
function run(raw) {
  const t = raw.trim();
  if (!t) return;
  hist.push(t);
  hidx = -1;
  echoCmd(t);
  scroll();
  const k = t.toLowerCase();

  if (CMD[k]) {
    CMD[k]();
  } else if (k.startsWith('cd ')) {
    blank(); ln('', `  <span style="color:var(--muted)">You're already in ~/portfolio.</span>`); blank();
  } else if (k === 'sudo su' || k.startsWith('sudo rm')) {
    blank(); ln('', `  <span style="color:var(--red)">Permission denied.</span>`); blank();
  } else if (k === 'vim' || k === 'nano' || k === 'vi') {
    blank(); ln('', `  <span style="color:var(--red)">This is a portfolio, not a text editor 😅</span>`); blank();
  } else if (k.startsWith('ping')) {
    blank(); ln('', `  <span style="color:var(--green)">PING abhinavcyber10@gmail.com — response: &lt;24h ⚡</span>`); blank();
  } else {
    blank();
    ln('', `  <span style="color:var(--red)">bash: ${t.split(' ')[0]}: command not found</span>`);
    ln('', `  <span style="color:var(--muted)">Type</span> <span style="color:var(--yellow)">help</span> <span style="color:var(--muted)">to see available commands.</span>`);
    blank();
  }
  scroll();
}

// ── Ghost autocomplete ────────────────────────────────────────────────────────
const ghostEl = document.createElement('span');
ghostEl.className = 'ghost';
document.querySelector('.irow').appendChild(ghostEl);

function updateGhost() {
  const p = inp.value.trim().toLowerCase();
  if (!p) { ghostEl.textContent = ''; return; }
  const match = CMDS.find(c => c.startsWith(p) && c !== p);
  if (match) {
    ghostEl.textContent = match;
    // position ghost over input
    const ps1 = document.querySelector('.ps1');
    ghostEl.style.left = (ps1.offsetWidth + inp.offsetLeft) + 'px';
  } else {
    ghostEl.textContent = '';
  }
}

// ── Input handling ─────────────────────────────────────────────────────────────
const CMDS = Object.keys(CMD);

inp.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = inp.value;
    inp.value = '';
    ghostEl.textContent = '';
    run(v);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (hidx < hist.length - 1) { hidx++; inp.value = hist[hist.length - 1 - hidx]; }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (hidx > 0) { hidx--; inp.value = hist[hist.length - 1 - hidx]; }
    else { hidx = -1; inp.value = ''; }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const p = inp.value.trim().toLowerCase();
    if (!p) return;
    const m = CMDS.find(c => c.startsWith(p) && c !== p);
    if (m) { inp.value = m; ghostEl.textContent = ''; }
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault();
    out.innerHTML = '';
  }
});

inp.addEventListener('input', updateGhost);

document.addEventListener('click', () => inp.focus());
inp.focus();

// ── Boot sequence ──────────────────────────────────────────────────────────────
const BOOT = [
  [0,   '', `  <span style="color:var(--muted)">Booting abhinav-portfolio v2.0 ...</span>`],
  [90,  '', `  <span style="color:var(--muted)">[</span><span style="color:var(--green)">  OK  </span><span style="color:var(--muted)">]</span> Started: bash_scripting.service`],
  [150, '', `  <span style="color:var(--muted)">[</span><span style="color:var(--green)">  OK  </span><span style="color:var(--muted)">]</span> Started: linux_admin.service`],
  [210, '', `  <span style="color:var(--muted)">[</span><span style="color:var(--green)">  OK  </span><span style="color:var(--muted)">]</span> Started: devops_toolkit.service`],
  [270, '', `  <span style="color:var(--muted)">[</span><span style="color:var(--green)">  OK  </span><span style="color:var(--muted)">]</span> Started: cicd_pipeline.service`],
  [330, '', `  <span style="color:var(--muted)">[</span><span style="color:var(--yellow)"> LOAD </span><span style="color:var(--muted)">]</span> Loading: cloud_skills.service... <span style="color:var(--muted)">(building)</span>`],
  [410, '', `  <span style="color:var(--muted)">[</span><span style="color:var(--green)">  OK  </span><span style="color:var(--muted)">]</span> portfolio_server.service — listening on :443`],
  [500, 'blank', ''],
  [520, '', `  <span style="color:var(--green);font-weight:600">✓  Portfolio ready. Welcome.</span>`],
  [580, '', `  <span style="color:var(--muted)">Type </span><span style="color:var(--yellow)">help</span><span style="color:var(--muted)"> to begin.</span>`],
  [640, 'blank', ''],
];

function boot(i) {
  if (i >= BOOT.length) { setTimeout(() => run('whoami'), 350); return; }
  const [delay, cls, html] = BOOT[i];
  setTimeout(() => {
    if (cls === 'blank') blank();
    else ln(cls, html);
    scroll();
    boot(i + 1);
  }, i === 0 ? 0 : delay);
}

boot(0);
