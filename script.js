/* =========  DATA  ================================================= */

/* ‣ Sample projects (grouped by difficulty) */
const sampleProjects = {
  beginner: [
    {
      title: "Whack-A-Mole",
      url: "",
      img: "images/whack.jpg",
      description: "Smash the mole before it disappears—loops, timers, and click events in action. \n\n\n\n \n Scratch, Python, Javascript"
    },
    {
      title: "Hangman",
      url: "",
      img: "images/hangman.png",
      description: "Find the missing word or words by guessing letters. \n\n Scratch, Python, Javascript"
    },
    {
      title: "Virtual Pet",
      url: "",
      img: "images/pet.jpg",
      description: "Feed, play, and tuck your pixel-pet into bed—introduces state variables and timers. \n\n\n\n\n\n Scratch, Python, Javascript"
    }
  ],

  medium: [
    {
      title: "Endless Runner (“Space Dash”)",
      url: "",
      img: "images/space.png",
      description: "Side-scrolling action with jump physics, collision detection, and a distance score. \n\n Python, Javascript"
    },
    {
      title: "Weather Dashboard",
      url: "",
      img: "images/weather.png",
      description: "Live API data, search history, and colourful icons—perfect intro to fetch & async. \n\n Python, Javascript"
    }
  ],

  advanced: [
    {
      title: "Collaborative Pixel Art Board",
      url: "",
      img: "images/pixel.jpg",
      description: "Paint one pixel at a time with friends—real-time updates via Firebase Realtime DB. \n\n Javascript"
    },
    {
      title: "Procedural Dungeon Explorer",
      url: "",
      img: "images/dungeon.jpeg",
      description: "Randomly generated maze, treasures, and enemies—learn algorithms plus a game loop. \n\n Python "
    }
  ]
};

/* ‣ Student profiles and their projects */
const students = [
  {
    id: "alice",
    name: "Alice K.",
    avatar: "avatars/alice.png",
    projects: [
      {
        title: "Platformer Game",
        url: "",
        img: "images/alice_platformer.jpg",
        description: "Tile-based levels, jump physics done; enemy AI in progress."
      },
      {
        title: "Weather Dashboard",
        url: "",
        img: "images/alice_weather.jpg",
        description: "Pulls live data; now adding hourly forecast graphs."
      }
    ]
  },
  {
    id: "ben",
    name: "Ben D.",
    avatar: "avatars/ben.png",
    projects: [
      {
        title: "Trivia Quiz",
        url: "",
        img: "images/ben_quiz.jpg",
        description: "Question flow finished; working on high-score storage."
      }
    ]
  }
];

/* =========  ROUTER  =============================================== */
window.addEventListener("DOMContentLoaded", route);
window.addEventListener("hashchange", route);

function route() {
  const hash = location.hash.replace("#", "") || "home";
  switch (hash) {
    case "home":     renderLanding();             break;
    case "samples":  renderSamples();             break;
    case "students": renderStudentsPage();        break;
    default:         renderStudent(hash);         break;  // #alice, #ben…
  }
}

function renderLanding() {
  document.title = "Co-Lab │ Skill Samurai";
  const main = document.getElementById("content");
  main.innerHTML = `
    <section class="grid menu-grid">
      <div class="menu-card" onclick="location.hash='samples'">
        <h2>Sample Projects</h2>
      </div>
      <div class="menu-card" onclick="location.hash='students'">
        <h2>Student Projects</h2>
      </div>
    </section>
  `;
}



/* ---------- SAMPLE PROJECTS PAGE ---------- */
function renderSamples() {
  document.title = "Sample Projects │ Skill Samurai";
  const main = document.getElementById("content");

  const block = (difficulty, niceName) => `
    <h3 class="section-head">${niceName}</h3>
    <div class="grid">
      ${sampleProjects[difficulty]
        .map(cardTemplate)
        .join("")}
    </div>
  `;

  main.innerHTML = `
    <article>
      <a href="#home" class="back">← Back to menu</a>
      <h2 class="page-title">Sample Projects</h2>
      ${block("beginner", "Beginner")}
      ${block("medium", "Medium")}
      ${block("advanced", "Advanced")}
    </article>
  `;
}

/* ---------- STUDENTS LIST PAGE ---------- */
function renderStudentsPage() {
  document.title = "Student Projects │ Skill Samurai";
  const main = document.getElementById("content");
  main.innerHTML = `
    <section>
      <a href="#home" class="back">← Back to menu</a>
      <h2 class="page-title">Our Students</h2>
      <div class="grid">
        ${students
          .map(
            (s) => `
          <div class="student-card">
            <a href="#${s.id}">
              <img src="${s.avatar}" alt="Avatar of ${s.name}" class="avatar" />
              <h2>${s.name}</h2>
            </a>
          </div>`
          )
          .join("")}
      </div>
    </section>
  `;
}

/* ---------- INDIVIDUAL STUDENT PAGE ---------- */
function renderStudent(id) {
  const student = students.find((s) => s.id === id);
  const main = document.getElementById("content");

  if (!student) {
    main.innerHTML = `<p>Student not found. <a href="#home">Go home</a>.</p>`;
    return;
  }

  document.title = `${student.name} │ Skill Samurai`;
  main.innerHTML = `
    <article>
      <a href="#students" class="back">← Back to students</a>
      <h2 class="page-title">${student.name}</h2>
      <div class="grid">
        ${student.projects.map(cardTemplate).join("")}
      </div>
    </article>
  `;
}

/* ---------- SHARED CARD TEMPLATE ---------- */
function cardTemplate(p) {
  return `
    <div class="project-card">
      <a href="${p.url}" target="_blank" rel="noopener" class="thumb">
        <img src="${p.img}" alt="Screenshot of ${p.title}" />
      </a>
      <div class="info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    </div>
  `;
}

/* ---------- footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
