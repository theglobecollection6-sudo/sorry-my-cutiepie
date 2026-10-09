"use strict";

const $ = (selector) => document.querySelector(selector);

/* ========================================
   FLOATING HEARTS
======================================== */

function startHearts() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";

    const hearts = ["♡", "♥", "💕", "❤"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 22 + "px";
    heart.style.animationDuration = 6 + Math.random() * 5 + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }, 800);
}

/* ========================================
   ENVELOPE
======================================== */

function toggleEnvelope() {
  const envelope = $("#envelope");

  if (envelope) {
    envelope.classList.toggle("open");
  }
}

/* ========================================
   TYPING EFFECT
======================================== */

function typeMessage(element, message, speed = 32) {
  if (!element) return;

  let index = 0;
  element.textContent = "";

  function typeNext() {
    if (index >= message.length) return;

    const character = message.charAt(index);
    element.textContent += character;
    index++;

    const delay = character === "\n" ? speed * 4 : speed;

    setTimeout(typeNext, delay);
  }

  typeNext();
}

/* ========================================
   SURPRISE CONFETTI
======================================== */

function launchSurprise() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const symbols = ["💗", "💕", "♡", "✨", "🌸"];

  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = 14 + Math.random() * 20 + "px";
    piece.style.animationDelay = Math.random() * 1.2 + "s";

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }
}

/* ========================================
   BACKGROUND MUSIC
======================================== */

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

        try {
          localStorage.setItem("sorryMusicWanted", "yes");
        } catch (error) {
          // Music still works if browser storage is unavailable.
        }
      } catch (error) {
        button.textContent = "Tap to play music";
      }
    } else {
      audio.pause();
      button.textContent = "♫ Play Music";

      try {
        localStorage.setItem("sorryMusicWanted", "no");
      } catch (error) {
        // Ignore unavailable browser storage.
      }
    }
  });

  audio.addEventListener("play", () => {
    button.textContent = "♫ Music On";
  });

  audio.addEventListener("pause", () => {
    button.textContent = "♫ Play Music";
  });
}

/* ========================================
   PASSWORD GATE
   Password: amsorrycutie
======================================== */

function setupPasswordGate() {
  const passwordForm = $("#passwordForm");
  const passwordInput = $("#passwordInput");
  const errorMessage = $("#errorMessage");
  const lockScreen = $("#lockScreen");
  const welcomeScreen = $("#welcomeScreen");

  // Pages without the password form can use the rest of script.js.
  if (!passwordForm || !passwordInput || !errorMessage || !lockScreen) {
    return;
  }

  const correctPassword = "amsorrycutie";

  const wrongPasswordComments = [
    "Hehe, wrong password, cutie! Try again 💗",
    "Awww, your secret key isn't quite right 🥺",
    "My heart says that's not the magic word 💕",
    "Nopeee! Even Cupid is shaking his head 😂💘",
    "One more try, my favourite human 🌷",
    "The heart-shaped door is still locked 🔐💖",
    "Cutie, are you guessing? 😏💕",
    "Almost magical… but not quite! ✨",
    "Wrong password! Sending you a tiny kiss anyway 😘",
    "The butterflies say: try again 🦋💗",
    "Oopsie! Our little secret needs the right key 💌",
    "Even my heart can't unlock that one 😂❤️",
    "Cutie, think a little harder 🥹💞",
    "Access denied… cuddles still approved 🫂💕",
    "The love alarm says: incorrect password 🚨💓",
    "Try again, sleepyhead 😴💗",
    "No entry yet! Your surprise is waiting 🎁💝",
    "That password needs a little more romance 🌹",
    "Wrong key, right girl… try again, sweetheart 💋",
    "Keep trying, cutie. Your surprise is waiting 😂💖"
  ];

  let previousCommentIndex = -1;

  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordInput.value === correctPassword) {
      errorMessage.textContent = "";

      lockScreen.classList.add("hidden");

      if (welcomeScreen) {
        welcomeScreen.classList.remove("hidden");
      }

      return;
    }

    // Select a different comment from the previous attempt.
    let commentIndex;

    do {
      commentIndex = Math.floor(
        Math.random() * wrongPasswordComments.length
      );
    } while (commentIndex === previousCommentIndex);

    previousCommentIndex = commentIndex;

    errorMessage.textContent = wrongPasswordComments[commentIndex];

    // Restart the shake animation for every incorrect attempt.
    lockScreen.classList.remove("shake");

    // Force the browser to restart the CSS animation.
    void lockScreen.offsetWidth;

    lockScreen.classList.add("shake");

    passwordInput.value = "";
    passwordInput.focus();
  });

  lockScreen.addEventListener("animationend", (event) => {
    if (event.animationName === "passwordShake") {
      lockScreen.classList.remove("shake");
    }
  });
}

/* ========================================
   MAIN PAGE INITIALIZATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  startHearts();
  setupMusic();
  setupPasswordGate();

  // Apology letter typing effect.
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

  // Surprise reveal button.
  const surpriseButton = $("#surpriseButton");

  if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      launchSurprise();

      $("#surpriseReveal")?.classList.remove("hidden");

      surpriseButton.classList.add("hidden");
    });
  }
});

/* ========================================
   SECRET MESSAGE CARDS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".secret-card")];
  const count = $("#secretCount");
  const progress = $("#secretProgress");
  const complete = $("#secretComplete");

  // Track which cards have ever been opened.
  const opened = new Set();

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.secret;
      const message = card.querySelector(".secret-message");
      const hint = card.querySelector(".secret-hint");

      if (!message) return;

      const willOpen = message.classList.contains("hidden");

      if (willOpen) {
        message.classList.remove("hidden");
        card.classList.add("is-open");
        card.setAttribute("aria-expanded", "true");

        if (hint) {
          hint.textContent = "A note for you ♡";
        }

        opened.add(id);
      } else {
        message.classList.add("hidden");
        card.classList.remove("is-open");
        card.setAttribute("aria-expanded", "false");

        if (hint) {
          hint.textContent = "Tap to open ♡";
        }
      }

      if (count) {
        count.textContent = opened.size;
      }

      if (progress && cards.length > 0) {
        progress.style.width =
          (opened.size / cards.length) * 100 + "%";
      }

      if (complete && cards.length > 0 && opened.size === cards.length) {
        complete.classList.remove("hidden");
      }
    });
  });

  // Pause background music while the memory video plays.
  const video = $("#memoryVideo");

  if (video) {
    video.addEventListener("play", () => {
      const audio = $("#backgroundMusic");
      const musicButton = $("#musicToggle");

      if (audio && !audio.paused) {
        audio.pause();
      }

      if (musicButton) {
        musicButton.textContent = "♫ Play Music";
      }
    });
  }

  // Optional countdown on the final surprise page.
  const countdown = $("#loveCountdown");
  const revealButton = $("#surpriseButton");

  if (countdown && revealButton) {
    let seconds = 5;

    revealButton.disabled = true;
    revealButton.textContent = `A little surprise in ${seconds}…`;

    countdown.textContent = `Get ready… ${seconds}`;

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

    setTimeout(tick, 1000);
  }
});
