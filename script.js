const cards = [
  { intro: true },

  {
    title: "Empathy",
    reason: "She has a lot of empathy. He has noticed her liking reels where someone is hurting, or how seeing an old man asking for money can genuinely make her sad. She is empathetic with her boyfriend, of course, but it goes beyond that , she tries to understand what everyone around her, and everyone close to her, might be feeling. Because she has space in her heart to feel for others, and that tells him how big of a heart she has."
  },

  {
    title: "She Radiates Happiness",
    reason: "He has noticed that whenever he talks to her, even when she is sad or has something going on, she never lets her own pain bleed into other people. She is usually in such a great mood that it radiates to everyone around her. He thinks it is called being charismatic, and he loves that about her. It makes his day better, and it makes everyone else's day better too."
  },

  {
    title: "Her Smile",
    reason: "Although this is not something she wouldn't know about, and other people might have told her too because it is really obvious, he likes it for a very different reason. He can't, and doesn't want to, imagine a life where he doesn't hear her giggling or see her smiling. When he sees her smile, he feels content and happy because he knows the one thing he really cares about is that she is happy and well. He doesn't want that smile to ever disappear, and he'll make sure he doesn't let it."
  },

  {
    title: "She Doesn't Take No Bullshit",
    reason: "He is literally laughing while writing this one, because this quality does make a lot of things hard for him hahah. But honestly, he would feel stranded if he didn't have someone like her  someone who is not afraid to speak up when somebody is wrong. She holds up a mirror to him, and he'd be stupid to let that go. He also respects this because he knows how isolated she can get when she can't take bullshit, but it will always leave her head held higher. He is so proud of her."
  },

  {
    title: "She Is Honest",
    reason: "She hates lying, and he can say this because she has always told her boyfriend the things he might not want to hear, but she still did because she has the courage to speak and live with honesty. It makes him feel safe, and it also makes him proud of himself for loving the right person."
  },

  {
    title: "She Is Thoughtful",
    reason: "He thought being caring and thoughtful was pampering someone with attention, but he learned with her that it is mostly quiet. He has seen her caring for her friends deeply, caring for her parents, and caring for everyone she loves by paying attention to finer details which he would surely miss. She understands how she can play her role the best way, and knows how to make somebody feel loved and respected."
  },

  {
    title: "She Has a Very Strong Sense of Conscience",
    reason: "He has met people, but he hasn't heard a lot of them talk about what they did wrong. On the other hand, he has always seen her being conscious about what would hurt her conscience, her soul. She understands that all we do will always come back to us, in whatever form. This makes him feel very happy for her because it tells him that she knows who she is, what she wants, what suits her, and what doesn't. And it will always be a reason for her strength."
  },

  {
    title: "She Is Hardworking",
    reason: "This isn't something he is proud to admit, or something he wants her to work hard for. But when he sees her getting on a ride and going to an internship the same day, then another internship at night, then her uni, her boyfriend, her friends, family, parents  so much to deal with, but she still somehow manages to pull through it so gracefully. She doesn't even make anyone feel like she is putting too much on herself. He doesn't want her to be in a state where she puts herself through too much, but it makes him feel very proud and motivated himself, knowing that she can do anything she wants to and achieve it, and ace it."
  },

  {
    title: "She Has So Much to Tell",
    reason: "He'd say she yaps, but does it count as yapping if he loves hearing it? He can never get bored with her. She just puts joy into everything she tells him, and he actually has so much fun listening. It helps him paint a picture of how she sees the world, and it is so beautiful, cute, and funny. It is also the path she lets him take into her heart. And without her awaaz, he would feel like something is missing."
  },

  {
    title: "She Is Beautiful",
    reason: "He knows this might sound lazy to her, saying the obvious, but for him it is a blessing bruv, and he can't leave it out. He loves that she is beautiful  who wouldn't? But he loves that she is beautiful because it reflects who she is inside too. Anyone who takes a good look at her, her eyes, and her smile would definitely know the kind of woman she is  smart, intelligent, and confident  because it just oozes out of her pretty aura. Hahah, he loves her."
  }
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
          <div class="eyebrow">hey ...</div>

          <h1>10 Things<br>About You</h1>

          <p class="subtitle">
            He was put into the spotlight yesterday and feels like he didn't do a great job telling her what he appreciates about her, and what makes him feel the most content that she has these qualities in her.
            <br><br>
            Sooo here areee 10 things that he loves about her, and he thinks she should know them.
          </p>

          <span class="tap">tap to begin →</span>
        </div>
      </div>`;

    counter.textContent = "INTRO";
    hint.textContent = "tap to begin";

  } else {

    const wordCount = item.reason.trim().split(/\s+/).length;

    const textSize =
      wordCount <= 55 ? "reason-short" :
      wordCount <= 95 ? "reason-medium" :
      wordCount <= 135 ? "reason-long" :
      "reason-xlong";

    card.innerHTML = `
      <div class="card-inner">

        <div class="face front">
          <div class="eyebrow">
            ${String(index).padStart(2, "0")} / 10
          </div>

          <h2>${item.title}</h2>

          <span class="tap">tap to reveal</span>
        </div>

        <div class="face back">
          <p class="reason ${textSize}">
            ${item.reason}
          </p>
        </div>

      </div>`;

    counter.textContent = `${index} / 10`;
    hint.textContent = "tap card to reveal";
  }

  card.addEventListener("click", () => {
    if (index === 0) {
      nextCard();
    } else {
      card.classList.toggle("flipped");
    }
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
