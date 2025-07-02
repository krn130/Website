document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const searchInput = document.getElementById('search');
  const projectGrid = document.getElementById('project-grid');
  let allProjects = [];

  // Load projects from JSON
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      allProjects = data;
      renderProjects(allProjects);
    });

  // Render projects
  function renderProjects(projects) {
    projectGrid.innerHTML = '';

    if (projects.length === 0) {
      projectGrid.innerHTML = '<p>No matching projects found.</p>';
      return;
    }

    projects.forEach(project => {
      const div = document.createElement('div');
      div.classList.add('project');
      div.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      projectGrid.appendChild(div);
    });
  }

  // Handle tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active').classList.remove('active');
      tab.classList.add('active');

      const topic = tab.getAttribute('data-topic');
      const searchTerm = searchInput.value.toLowerCase();

      const filtered = allProjects.filter(project => {
        const matchesTopic = topic === 'all' || project.topics.includes(topic);
        const matchesSearch = project.name.toLowerCase().includes(searchTerm);
        return matchesTopic && matchesSearch;
      });

      renderProjects(filtered);
    });
  });

  // Handle search
  searchInput.addEventListener('input', () => {
    const activeTopic = document.querySelector('.tab.active').getAttribute('data-topic');
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allProjects.filter(project => {
      const matchesTopic = activeTopic === 'all' || project.topics.includes(activeTopic);
      const matchesSearch = project.name.toLowerCase().includes(searchTerm);
      return matchesTopic && matchesSearch;
    });

    renderProjects(filtered);
  });
});
