let allProjects = [];

async function loadProjects() {
  const res = await fetch("projects.json");
  allProjects = await res.json();
  renderProjects(allProjects);
}

function renderProjects(projects) {
  const container = document.getElementById("project-grid");
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p>No matching projects found.</p>";
    return;
  }

  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${proj.name}</h3>
      <p>${proj.description}</p>
      <a href="${proj.link}" target="_blank">View Project</a>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const activeTab = document.querySelector(".tab.active").dataset.topic;
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = allProjects.filter((proj) => {
    const matchesTopic =
      activeTab === "all" || proj.topics.includes(activeTab);
    const matchesSearch = proj.name.toLowerCase().includes(search);
    return matchesTopic && matchesSearch;
  });

  renderProjects(filtered);
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    applyFilters();
  });
});

document.getElementById("search").addEventListener("input", applyFilters);

loadProjects();
