const projects = [
    {
        id: 1,
        title: "Project Alpha",
        category: "Web",
        image: "assets/img/project-web-1.jpg",
        description: "A full-stack web application for real-time data visualization. Built with a focus on security and performance, featuring a secure API and a robust front-end.",
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 2,
        title: "AI Sentinel",
        category: "AI",
        image: "assets/img/project-ai-1.jpg",
        description: "An AI-powered intrusion detection system that uses machine learning to identify and neutralize threats in real-time. The model is trained on the KDD Cup '99 dataset.",
        technologies: ["Python", "TensorFlow", "Scikit-learn"],
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 3,
        title: "Cyber Glider",
        category: "Game",
        image: "assets/img/project-game-1.jpg",
        description: "A retro-futuristic endless runner game with procedural level generation and online leaderboards. Developed with a custom game engine.",
        technologies: ["C++", "OpenGL"],
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 4,
        title: "NetMapper",
        category: "Tools",
        image: "assets/img/project-tool-1.jpg",
        description: "A command-line tool for network reconnaissance and vulnerability scanning, written in Python. Supports multiple scan types and outputs to JSON.",
        technologies: ["Python", "Scapy", "Nmap"],
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 5,
        title: "Secure Vault",
        category: "Web",
        image: "assets/img/project-web-2.jpg",
        description: "An encrypted, secure file storage application with end-to-end encryption and two-factor authentication. Built using modern web security principles.",
        technologies: ["HTML", "CSS", "JavaScript", "AES-256"],
        githubLink: "#",
        liveLink: "#"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('project-grid');
    const filterButtonsContainer = document.getElementById('filter-buttons');

    if (!projectGrid || !filterButtonsContainer) return;

    const createProjectCard = (project) => {
        const card = document.createElement('div');
        card.className = 'bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-neon-green/20 shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer group';
        card.dataset.projectId = project.id;

        card.innerHTML = `
            <div class="relative">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-dark-gray/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p class="text-neon-green font-bold text-lg">View Details</p>
                </div>
            </div>
            <div class="p-6">
                <p class="text-sm text-neon-green font-jetbrains-mono">${project.category}</p>
                <h3 class="text-2xl font-bold font-orbitron mt-2">${project.title}</h3>
            </div>
        `;
        return card;
    };

    const renderProjects = (filter = 'all') => {
        projectGrid.innerHTML = ''; // Clear existing projects

        const filteredProjects = filter === 'all'
            ? projects
            : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            projectGrid.appendChild(card);
        });
    };

    filterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Update active button style
            filterButtonsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            // Render projects
            const filter = e.target.dataset.filter;
            renderProjects(filter);
        }
    });

    // Initial render
    renderProjects();

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDescription = document.getElementById('modal-description');
    const modalGithub = document.getElementById('modal-github');
    const modalLive = document.getElementById('modal-live');

    const openModal = (project) => {
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalGithub.href = project.githubLink;
        modalLive.href = project.liveLink;

        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const techEl = document.createElement('span');
            techEl.className = 'bg-gray-700 text-neon-green text-xs font-medium px-3 py-1 rounded-full';
            techEl.textContent = tech;
            modalTech.appendChild(techEl);
        });

        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    projectGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.group');
        if (card) {
            const projectId = parseInt(card.dataset.projectId);
            const project = projects.find(p => p.id === projectId);
            if (project) {
                openModal(project);
            }
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
