document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    if (!terminal || !terminalOutput || !terminalInput) return;

    const commands = {
        help: `Available commands:
<span class="text-neon-green">help</span>     - Show this list of commands
<span class="text-neon-green">about</span>    - Display a short bio
<span class="text-neon-green">skills</span>   - List core skills
<span class="text-neon-green">projects</span> - List featured projects
<span class="text-neon-green">contact</span>  - Show contact information
<span class="text-neon-green">clear</span>    - Clear the terminal screen
<span class="text-neon-green">exit</span>     - Close the terminal`,
        about: "Processing... \nPasindu Heshan is a Cybersecurity Undergraduate with a passion for ethical hacking, malware analysis, and building secure systems. This portfolio is a showcase of his skills and projects.",
        skills: `Scanning for skills...
- Web Security
- Malware Analysis
- Penetration Testing
- Network Security
- CTF Competitions
- Python, JavaScript, C++
- Secure Software Development`,
        projects: `Querying project database...
1. Project Alpha (Web Security)
2. AI Sentinel (AI/ML)
3. Secure Vault (Web Security)
4. NetMapper (Tools)
Type 'projects --all' to see more (demo).`,
        contact: `Establishing secure connection...
- Email: heshanphl.1234@gmail.com
- GitHub: @Mathiyass
- LinkedIn: /in/mathisha-angirasa-a955941a2/`,
        clear: '',
        exit: ''
    };

    const toggleTerminal = () => {
        terminal.classList.toggle('hidden');
        if (!terminal.classList.contains('hidden')) {
            terminalInput.focus();
            printWelcomeMessage();
        }
    };

    const printWelcomeMessage = () => {
        terminalOutput.innerHTML = `<p class="terminal-line">Welcome, user. Type '<span class="text-neon-green">help</span>' to see available commands.</p>`;
    };

    const executeCommand = (cmd) => {
        const output = document.createElement('div');
        output.innerHTML = `<p class="terminal-line"><span class="text-neon-green">$</span> ${cmd}</p>`;

        if (commands.hasOwnProperty(cmd)) {
            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
                printWelcomeMessage();
                return;
            }
            if (cmd === 'exit') {
                toggleTerminal();
                return;
            }
            output.innerHTML += `<p class="terminal-line">${commands[cmd]}</p>`;
        } else {
            output.innerHTML += `<p class="terminal-line">Command not found: ${cmd}. Type 'help' for a list of commands.</p>`;
        }

        terminalOutput.appendChild(output);
        terminalInput.value = '';
        terminal.querySelector('#terminal-body').scrollTop = terminal.querySelector('#terminal-body').scrollHeight;
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            toggleTerminal();
        }
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(terminalInput.value.trim().toLowerCase());
        }
    });
});
