document.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById('launch-chatbot');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    const optionsContainer = document.getElementById('chatbot-options');

    if (!launchBtn || !chatbotContainer || !closeBtn || !messagesContainer || !optionsContainer) {
        return;
    }

    const conversationTree = {
        start: {
            bot: "Initializing system... Greetings. I am the portfolio's AI assistant. How may I direct your query?",
            options: [
                { text: "What can you do?", next: "help" },
                { text: "Tell me about Pasindu.", next: "about" },
                { text: "Show me some projects.", next: "projects" },
            ]
        },
        help: {
            bot: "I can provide information about Pasindu's skills, projects, and contact details. Please select an option.",
            options: [
                { text: "About Pasindu", next: "about" },
                { text: "Projects", next: "projects" },
                { text: "Contact Info", next: "contact" },
                { text: "Restart", next: "start" },
            ]
        },
        about: {
            bot: "Pasindu Heshan is a Cybersecurity Undergraduate specializing in web security and malware analysis. Would you like to know more?",
            options: [
                { text: "Show skills", next: "skills" },
                { text: "Let's see projects", next: "projects" },
                { text: "Back to start", next: "start" },
            ]
        },
        skills: {
            bot: "Pasindu's core skills include: Web Security, Malware Analysis, Penetration Testing, and Network Security. For a more detailed view, please visit the Skills page.",
            options: [
                { text: "View Skills Page", link: "skills.html" },
                { text: "Show me projects", next: "projects" },
                { text: "Restart", next: "start" },
            ]
        },
        projects: {
            bot: "Accessing project database... Pasindu has worked on various projects involving Web Security, AI, and Tool development. I recommend viewing the full list on the Projects page.",
            options: [
                { text: "View Projects Page", link: "projects.html" },
                { text: "Contact Pasindu", next: "contact" },
                { text: "Restart", next: "start" },
            ]
        },
        contact: {
            bot: "You can reach Pasindu via the contact form on this page or through the following channels: \n- Email: heshanphl.1234@gmail.com\n- GitHub: @pasindu21hl",
            options: [
                { text: "Thanks!", next: "end" },
                { text: "Restart", next: "start" },
            ]
        },
        end: {
            bot: "Query resolved. Terminating connection.",
            options: []
        }
    };

    let currentNode = 'start';

    const typeMessage = (message, container) => {
        let i = 0;
        container.innerHTML = '';
        const typing = () => {
            if (i < message.length) {
                container.innerHTML += message.charAt(i);
                i++;
                setTimeout(typing, 20);
            }
        };
        typing();
    };

    const displayNode = (nodeId) => {
        const node = conversationTree[nodeId];
        currentNode = nodeId;

        // Display bot message
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chatbot-message bot-message';
        messagesContainer.appendChild(botMessageDiv);
        typeMessage(node.bot, botMessageDiv);

        // Display options
        optionsContainer.innerHTML = '';
        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chatbot-option-btn';
            button.textContent = option.text;
            if (option.next) {
                button.dataset.next = option.next;
            } else if (option.link) {
                button.dataset.link = option.link;
            }
            optionsContainer.appendChild(button);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const handleOptionClick = (e) => {
        if (!e.target.matches('.chatbot-option-btn')) return;

        const button = e.target;
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chatbot-message user-message';
        userMessageDiv.textContent = button.textContent;
        messagesContainer.appendChild(userMessageDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        if (button.dataset.next) {
            setTimeout(() => displayNode(button.dataset.next), 500);
        } else if (button.dataset.link) {
            window.location.href = button.dataset.link;
        }
        optionsContainer.innerHTML = '<p class="text-gray-500">Awaiting response...</p>';
    };

    const openChatbot = () => {
        chatbotContainer.classList.remove('hidden');
        messagesContainer.innerHTML = '';
        displayNode('start');
    };

    const closeChatbot = () => {
        chatbotContainer.classList.add('hidden');
    };

    launchBtn.addEventListener('click', openChatbot);
    closeBtn.addEventListener('click', closeChatbot);
    optionsContainer.addEventListener('click', handleOptionClick);
});
