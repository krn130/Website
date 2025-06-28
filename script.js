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
    container.innerHTML = "<p class='col-span-full text-center text-gray-500'>No matching projects found.</p>";
    return;
  }

  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-gray-200 rounded-lg shadow p-4";
    card.innerHTML = `
      <h3 class="text-xl font-semibold mb-1">${proj.name}</h3>
      <p class="text-sm text-gray-600 mb-2">${proj.description}</p>
      <a href="${proj.link}" target="_blank" class="text-blue-600 hover:underline text-sm">View Project</a>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const activeTab = document.querySelector(".tab.active").dataset.topic;
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = allProjects.filter((proj) => {
    const matchesTopic = activeTab === "all" || proj.topics.includes(activeTab);
    const matchesSearch = proj.name.toLowerCase().includes(search);
    return matchesTopic && matchesSearch;
  });

  renderProjects(filtered);
}

// Event Listeners
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("bg-gray-800", "text-white", "active");
    document.querySelector(".tab.active").classList.add("bg-gray-200", "text-black");
    tab.classList.remove("bg-gray-200", "text-black");
    tab.classList.add("bg-gray-800", "text-white", "active");
    applyFilters();
  });
});

document.getElementById("search").addEventListener("input", applyFilters);

loadProjects();
