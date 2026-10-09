
const $ = (selector) => document.querySelector(selector);

function startHearts() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♡", "♥", "💕", "❤"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 22) + "px";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }, 800);
}

function toggleEnvelope() {
  const envelope = $("#envelope");
  if (envelope) envelope.classList.toggle("open");
}

function typeMessage(element, message, speed = 32) {
  if (!element) return;

  let index = 0;
  element.textContent = "";

  function typeNext() {
    if (index >= message.length) return;

    element.textContent += message.charAt(index);
    index++;

    const delay = message.charAt(index - 1) === "\n" ? speed * 4 : speed;
    setTimeout(typeNext, delay);
  }

  typeNext();
}

function launchSurprise() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const symbols = ["💗", "💕", "♡", "✨", "🌸"];

  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (14 + Math.random() * 20) + "px";
    piece.style.animationDelay = Math.random() * 1.2 + "s";

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

function setupMusic() {
  const audio = $("#backgroundMusic");
  const button = $("#musicToggle");
  if (!audio || !button) return;

  audio.volume = 0.35;

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.textContent = "♫ Music On";
        localStorage.setItem("sorryMusicWanted", "yes");
      } catch {
        button.textContent = "Tap to play music";
      }
    } else {
      audio.pause();
      button.textContent = "♫ Play Music";
      localStorage.setItem("sorryMusicWanted", "no");
    }
  });

  audio.addEventListener("play", () => {
    button.textContent = "♫ Music On";
  });

  audio.addEventListener("pause", () => {
    button.textContent = "♫ Play Music";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startHearts();
  setupMusic();

  const typingElement = $("#typedMessage");
  if (typingElement) {
    const message = `My love,

I am truly sorry for hurting you.

I know that an apology cannot erase what happened, and I don't want to make excuses. Your feelings matter to me, and you deserve to be treated with love, honesty, and respect.

I want to listen, understand how I hurt you, and do better through my actions — not just my words.

You don't have to forgive me right away. Take the time you need. I just wanted you to know how sorry I am, and how much you mean to me.

With all my love,
Your person ❤️`;

    typeMessage(typingElement, message);
  }

  const surpriseButton = $("#surpriseButton");
  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      launchSurprise();
      $("#surpriseReveal")?.classList.remove("hidden");
      surpriseButton.classList.add("hidden");
    });
  }
});


/* ADVANCED INTERACTIVE SURPRISES */

document.addEventListener("DOMContentLoaded", () => {
  // Unlock the hidden message cards.
  const cards = [...document.querySelectorAll(".secret-card")];
  const count = document.querySelector("#secretCount");
  const progress = document.querySelector("#secretProgress");
  const complete = document.querySelector("#secretComplete");
  const opened = new Set();

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.secret;
      const message = card.querySelector(".secret-message");
      if (!message) return;

      const willOpen = message.classList.contains("hidden");

      if (willOpen) {
        message.classList.remove("hidden");
        card.classList.add("is-open");
        card.setAttribute("aria-expanded", "true");
        card.querySelector(".secret-hint").textContent = "A note for you ♡";
        opened.add(id);
      } else {
        message.classList.add("hidden");
        card.classList.remove("is-open");
        card.setAttribute("aria-expanded", "false");
        card.querySelector(".secret-hint").textContent = "Tap to open ♡";
      }

      if (count) count.textContent = opened.size;
      if (progress) progress.style.width = (opened.size / cards.length * 100) + "%";

      if (complete && cards.length > 0 && opened.size === cards.length) {
        complete.classList.remove("hidden");
      }
    });
  });

  // Start the film when the visitor presses play.
  const video = document.querySelector("#memoryVideo");
  if (video) {
    video.addEventListener("play", () => {
      const audio = document.querySelector("#backgroundMusic");
      if (audio && !audio.paused) audio.pause();

      const musicButton = document.querySelector("#musicToggle");
      if (musicButton && audio) musicButton.textContent = "♫ Play Music";
    });
  }

  // Optional countdown on the final page.
  const countdown = document.querySelector("#loveCountdown");
  const revealButton = document.querySelector("#surpriseButton");

  if (countdown && revealButton) {
    let seconds = 5;
    revealButton.disabled = true;
    revealButton.textContent = `A little surprise in ${seconds}…`;

    const tick = () => {
      seconds--;

      if (seconds <= 0) {
        countdown.textContent = "Your surprise is ready ♡";
        revealButton.disabled = false;
        revealButton.textContent = "Open your little surprise ✨";
        return;
      }

      countdown.textContent = `Get ready… ${seconds}`;
      revealButton.textContent = `A little surprise in ${seconds}…`;
      setTimeout(tick, 1000);
    };

    countdown.textContent = `Get ready… ${seconds}`;
    setTimeout(tick, 1000);
  }
});