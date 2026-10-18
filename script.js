const pages = [...document.querySelectorAll('.page')];
const dots = [...document.querySelectorAll('.dot')];
const pleadMessage = document.getElementById('plead-message');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const floatLayer = document.getElementById('float-layer');
let currentPage = 'page-question';
let noCount = 0;
let letterStarted = false;

const noMessages = [
  "Pleeease, babyyy! 🥺👉👈 I made this just for you! Don't break my little heart! 💔🐱💕",
  "Not the NO button, princessss 😭💗 the tiny cat is literally begging you.",
  "Babyyy, one little YES? I'll give you unlimited virtual hugs. 🥹🫂",
  "Look at their little faces!! 🐱🐶 How can you say no to these babies? 💕",
  "Okay okay, dramatic puppy eyes activated… 🥺✨ try the pink button, my love!"
];

function goToPage(id) {
  if (!document.getElementById(id)) return;
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  dots.forEach(dot => dot.classList.toggle('active', dot.dataset.page === id));
  currentPage = id;
  window.scrollTo({top: 0, behavior: 'smooth'});
  burstHearts(id === 'page-forever' ? 24 : 10);
  if (id === 'page-letter' && !letterStarted) typeLetter();
}
yesBtn.addEventListener('click', () => goToPage('page-welcome'));
noBtn.addEventListener('click', () => {
  noCount++;
  pleadMessage.textContent = noMessages[(noCount - 1) % noMessages.length];
  pleadMessage.classList.remove('show');
  void pleadMessage.offsetWidth;
  pleadMessage.classList.add('show');
  noBtn.animate([
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(-5deg) scale(1.07)' },
    { transform: 'rotate(5deg) scale(1.04)' },
    { transform: 'rotate(0) scale(1)' }
  ], { duration: 430, easing: 'ease-out' });
  burstHearts(7);
});
document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', () => goToPage(btn.dataset.next)));
dots.forEach(dot => dot.addEventListener('click', () => {
  // The dots are intentionally available as simple page navigation.
  goToPage(dot.dataset.page);
}));

const letter = `Babyyy, where do I even begin? 💗\n\nYou mean the entire world to me, baby. I love you, so, so, so much. Sometimes I get shy and don't know how to show you just how much you mean to me, but I hope you can feel it in all the little things.\n\nEven though we've only met in person once, that memory stays special to me. And the second time? Azaan and Ayaan really had to appear, ehehe. 😭💕 I'll always smile thinking about our little moments, our Roblox adventures, and all the silly fun we've had together.\n\nYou make ordinary moments feel special just by being part of them. I want to keep learning about you, laughing with you, supporting you, and making memories that we'll look back on with the biggest smiles.\n\nThank you for being you, my cute little princess. Please never forget how loved and appreciated you are. No fancy words could ever explain it perfectly, but I'll keep trying. 🥹🎀\n\nI love you endlessly, babygirl. ♡`;
function typeLetter() {
  letterStarted = true;
  const target = document.getElementById('typed-letter');
  const signature = document.getElementById('signature');
  target.textContent = '';
  let i = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    target.textContent = letter;
    signature.classList.add('show');
    return;
  }
  const tick = () => {
    if (currentPage !== 'page-letter') return;
    target.textContent = letter.slice(0, i);
    i += 3;
    if (i <= letter.length) window.setTimeout(tick, 19);
    else signature.classList.add('show');
  };
  tick();
}

document.getElementById('hug-btn').addEventListener('click', () => {
  document.getElementById('hug-surprise').classList.add('show');
  document.getElementById('hug-btn').textContent = 'HUG DELIVERED!! 💗🫂';
  burstHearts(38);
  document.getElementById('hug-surprise').scrollIntoView({behavior:'smooth', block:'center'});
});

function makeFloat(symbol, className, left, duration, size) {
  const el = document.createElement('span');
  el.className = className;
  el.textContent = symbol;
  el.style.left = `${left}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.fontSize = `${size}px`;
  if (className === 'sparkle') {
    el.style.bottom = `${Math.random() * 55 + 15}%`;
  }
  floatLayer.appendChild(el);
  window.setTimeout(() => el.remove(), (duration + 1) * 1000);
}
function burstHearts(amount = 10) {
  const symbols = ['♡','♥','✦','✨','💗','🌸'];
  for (let i = 0; i < amount; i++) {
    window.setTimeout(() => {
      makeFloat(symbols[Math.floor(Math.random() * symbols.length)], 'sparkle', Math.random() * 100, 1.1 + Math.random() * 1.2, 12 + Math.random() * 18);
    }, i * 22);
  }
}
function ambientHearts() {
  if (document.hidden) return;
  const symbols = ['♡','♥','✧','✦'];
  makeFloat(symbols[Math.floor(Math.random() * symbols.length)], 'float-heart', Math.random() * 100, 10 + Math.random() * 9, 12 + Math.random() * 15);
}
window.setInterval(ambientHearts, 900);
window.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✦';
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.style.bottom = 'auto';
  floatLayer.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 1400);
});

// Add a gentle keyboard shortcut: Enter on the first screen chooses YES.
document.addEventListener('keydown', event => {
  if (currentPage === 'page-question' && event.key === 'Enter' && !event.target.closest('button')) {
    goToPage('page-welcome');
  }
});
