const blogPosts = [
    {
        id: 1,
        title: "Deconstructing the Latest Phishing Kits",
        category: "Web Security",
        tags: ["phishing", "opsec", "analysis"],
        summary: "A deep dive into the techniques used by modern phishing kits and how to identify them before they compromise your data.",
        author: "Pasindu Heshan",
        date: "2025-08-15",
        image: "assets/img/blog-1.jpg",
        link: "post-1.html"
    },
    {
        id: 2,
        title: "A Guide to Reverse Engineering Malware",
        category: "Malware Analysis",
        tags: ["reverse engineering", "malware", "ghidra"],
        summary: "Learn the fundamentals of reverse engineering malicious software using popular tools like Ghidra and x64dbg.",
        author: "Pasindu Heshan",
        date: "2025-07-22",
        image: "assets/img/blog-2.jpg",
        link: "post-2.html"
    },
    {
        id: 3,
        title: "My Favorite CTF Challenge Walkthrough",
        category: "CTF",
        tags: ["ctf", "walkthrough", "pwn"],
        summary: "A step-by-step walkthrough of a challenging pwnable from a recent Capture The Flag competition.",
        author: "Pasindu Heshan",
        date: "2025-06-30",
        image: "assets/img/blog-3.jpg",
        link: "post-3.html"
    },
    {
        id: 4,
        title: "Securing Your Home Network",
        category: "Network Security",
        tags: ["networking", "security", "opsec"],
        summary: "Practical steps every home user can take to dramatically improve their network security against common attacks.",
        author: "Pasindu Heshan",
        date: "2025-05-19",
        image: "assets/img/blog-4.jpg",
        link: "post-4.html"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');
    const filterButtonsContainer = document.getElementById('blog-filter-buttons');

    if (!blogGrid || !filterButtonsContainer) return;

    // Function to create a blog post card
    const createPostCard = (post) => {
        const card = document.createElement('a');
        card.href = post.link;
        card.className = 'block bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-neon-green/20 shadow-lg transform hover:scale-105 transition-transform duration-300 group';

        card.innerHTML = `
            <div class="relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover" loading="lazy">
                <div class="absolute inset-0 bg-dark-gray/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p class="text-neon-green font-bold text-lg">Read More</p>
                </div>
            </div>
            <div class="p-6">
                <p class="text-sm text-neon-green font-jetbrains-mono">${post.category}</p>
                <h3 class="text-xl font-bold font-orbitron mt-2 group-hover:text-neon-green transition-colors">${post.title}</h3>
                <p class="text-gray-400 mt-2 text-sm">${post.summary}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${post.tags.map(tag => `<span class="bg-gray-700 text-neon-green/70 text-xs font-medium px-2 py-1 rounded-full">#${tag}</span>`).join('')}
                </div>
            </div>
        `;
        return card;
    };

    // Function to render posts
    const renderPosts = (filter = 'all') => {
        blogGrid.innerHTML = '';

        const filteredPosts = filter === 'all'
            ? blogPosts
            : blogPosts.filter(p => p.category === filter);

        filteredPosts.forEach(post => {
            const card = createPostCard(post);
            blogGrid.appendChild(card);
        });
    };

    // Function to create filter buttons
    const createFilterButtons = () => {
        const categories = [...new Set(blogPosts.map(p => p.category))];
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.dataset.filter = category;
            button.textContent = category;
            filterButtonsContainer.appendChild(button);
        });
    };

    // Event listener for filter buttons
    filterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            filterButtonsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            renderPosts(e.target.dataset.filter);
        }
    });

    // Initial setup
    createFilterButtons();
    renderPosts();
});
