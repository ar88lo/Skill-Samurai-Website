/* =========  DATA  ===================================== *
 * Add / edit here – each student owns an array of projects
 *  - id ⇢ string, unique, used in URL hash (#id)
 *  - avatar ⇢ local image path
 *  - projects = [ {title, url, img, description}, … ]
*/
const students = [
  {
    id: "alice",
    name: "Alice K.",
    avatar: "avatars/alice.png",
    projects: [
      {
        title: "Platformer Game",
        url: "https://app.bsd.education/share/2gqiyvfH",
        img: "images/alice_platformer.jpg",
        description:
          "Alice laid out tile-based levels and implemented smooth jumping physics. Next: enemy AI."
      },
      {
        title: "Weather Dashboard",
        url: "https://app.bsd.education/share/2gqiyvfH",
        img: "images/alice_weather.jpg",
        description:
          "Now pulls live data; styling pass complete. Currently adding hourly forecast graphs."
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
        url: "https://app.bsd.education/share/2gqiyvfH",
        img: "images/ben_quiz.jpg",
        description:
          "Basic question flow done; working on persistent high-score storage using localStorage."
      }
    ]
  }
];

/* =========  ROUTER  =================================== */
window.addEventListener("DOMContentLoaded", route);
window.addEventListener("hashchange", route);

function route() {
  const hash = location.hash.replace("#", "");
  if (!hash || hash === "home") renderHome();
  else renderStudent(hash);
}

/* ---------- HOME (students) ---------- */
function renderHome() {
  const main = document.getElementById("content");
  document.title = "Student Projects │ Skill Samurai";
  main.innerHTML = `
    <section>
      <h2 style="margin-bottom:1rem;color:var(--ss-blue);font-size:1.8rem;">Our Students</h2>
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

/* ---------- STUDENT PAGE (projects) ---------- */
function renderStudent(id) {
  const student = students.find((s) => s.id === id);
  const main = document.getElementById("content");
  if (!student) {
    main.innerHTML = `<p>Student not found. <a href="#home">Go back</a>.</p>`;
    return;
  }

  document.title = `${student.name} │ Skill Samurai`;
  main.innerHTML = `
    <article>
      <a href="#home" class="back">← Back to all students</a>
      <h2 class="student-name">${student.name}</h2>
      <div class="grid">
        ${student.projects
          .map(
            (p) => `
          <div class="project-card">
            <a href="${p.url}" target="_blank" rel="noopener" class="thumb">
              <img src="${p.img}" alt="Screenshot of ${p.title}" />
            </a>
            <div class="info">
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </article>
  `;
}

/* ---------- misc (footer year) ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

