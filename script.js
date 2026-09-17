const cards = [
  { intro: true },

  { title: "quality one", reason: "Write the real thing you love about her here. Keep it specific — a habit, a personality trait, or something she does that you notice." },
  { title: "quality two", reason: "This is where the explanation goes. It can be funny, honest, short, long, or even a tiny story." },
  { title: "quality three", reason: "Replace this with what you actually wrote. The card will reveal this side when she taps it." },
  { title: "quality four", reason: "A personal reason works better than a generic compliment. Mention the little detail that made you choose this quality." },
  { title: "quality five", reason: "Your own words go here." },
  { title: "quality six", reason: "Your own words go here." },
  { title: "quality seven", reason: "Your own words go here." },
  { title: "quality eight", reason: "Your own words go here." },
  { title: "quality nine", reason: "Your own words go here." },
  { title: "quality ten", reason: "Your own words go here." }
];

const deck = document.getElementById("deck");
const dots = document.getElementById("dots");
const counter = document.getElementById("counter");
const hint = document.getElementById("hint");

let index = 0;
let touchStartX = 0;

function render() {
  const item = cards[index];
  deck.innerHTML = "";

  const card = document.createElement("article");
  card.className = "card" + (item.intro ? " intro" : "");

  if (item.intro) {
    card.innerHTML = `
      <div class="card-inner">
        <div class="face front">
          <div class="eyebrow">a small list</div>
          <h1>10 Things<br>About You</h1>
          <p class="subtitle">Ten little things I notice, appreciate, and like about you.</p>
          <span class="tap">tap to begin →</span>
        </div>
      </div>`;
    counter.textContent = "INTRO";
    hint.textContent = "tap or swipe to begin";
  } else {
    const wordCount = item.reason.trim().split(/\s+/).length;
    const textSize = wordCount <= 55 ? "reason-short"
      : wordCount <= 95 ? "reason-medium"
      : wordCount <= 135 ? "reason-long"
      : "reason-xlong";

    card.innerHTML = `
      <div class="card-inner">
        <div class="face front">
          <div class="eyebrow">${String(index).padStart(2, "0")} / 10</div>
          <h2>${item.title}</h2>
          <span class="tap">tap to reveal</span>
        </div>
        <div class="face back">
          <p class="reason ${textSize}">${item.reason}</p>
        </div>
      </div>`;
    counter.textContent = `${index} / 10`;
    hint.textContent = "tap card to reveal";
  }

  card.addEventListener("click", () => {
    if (index === 0) nextCard();
    else card.classList.toggle("flipped");
  });

  deck.appendChild(card);

  dots.innerHTML = cards.map((_, i) =>
    `<span class="dot ${i === index ? "active" : ""}"></span>`
  ).join("");
}

function nextCard() {
  if (index < cards.length - 1) {
    index++;
    render();
  }
}

function prevCard() {
  if (index > 0) {
    index--;
    render();
  }
}

document.getElementById("next").addEventListener("click", nextCard);
document.getElementById("prev").addEventListener("click", prevCard);

deck.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

deck.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 55) {
    dx < 0 ? nextCard() : prevCard();
  }
}, { passive: true });

render();
