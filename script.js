document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HERO TYPING LOOP
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const phrases = ['clean web interfaces.', 'systems level coding.', 'database management.', 'problem solving.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1600;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    if (typingElement) {
        type();
    }

    /* ==========================================================================
       2. MOBILE NAVIGATION HAMBURGER
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       3. INTERACTIVE TECH STACK TERMINAL WRITER
       ========================================================================== */
    const techBadges = document.querySelectorAll('.tech-badge');
    const stackInfoText = document.getElementById('stack-info-text');
    let typingTimeout = null;

    function typeTerminal(text) {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        
        stackInfoText.textContent = '';
        let index = 0;
        
        function writeChar() {
            if (index < text.length) {
                stackInfoText.textContent += text.charAt(index);
                index++;
                const speed = 10 + Math.random() * 10;
                typingTimeout = setTimeout(writeChar, speed);
            }
        }
        writeChar();
    }

    techBadges.forEach(badge => {
        const selectBadge = () => {
            techBadges.forEach(b => b.classList.remove('active'));
            badge.classList.add('active');
            
            const desc = badge.getAttribute('data-desc');
            typeTerminal(desc);
        };

        badge.addEventListener('mouseenter', selectBadge);
        badge.addEventListener('click', selectBadge);
    });

    /* ==========================================================================
       4. INTERACTIVE IDE WORKSPACE SIMULATOR (PROJECTS SECTION)
       ========================================================================== */
    const ideFolders = document.querySelectorAll('.ide-folder');
    const ideFiles = document.querySelectorAll('.ide-file');
    const activeTabTitle = document.getElementById('active-tab-title');
    const ideCodeViewport = document.getElementById('ide-code-viewport');
    const ideLineGutter = document.getElementById('ide-line-gutter');

    // Preloaded mock database containing project files with syntax highlighting hooks
    const projectDb = {
        'student-hub': {
            'readme': `<span class="code-keyword"># YCP Student Hub</span>
A centralized dashboard portal built for Yashwantrao Chavan Polytechnic students to streamline schedules, track deadlines, and access course documents.

<span class="code-keyword">## Features</span>
- <span class="code-string">Class Schedule Matrix</span>: Visual timetable for final year syllabus.
- <span class="code-string">LocalStorage Cache</span>: Offline access to dates and files.
- <span class="code-string">Responsive bento layouts</span>: Adapted for mobile viewports.`,
            'code': `<span class="code-comment">// local_storage.js - YCP Student Hub Local Cache</span>
<span class="code-keyword">const</span> <span class="code-variable">ScheduleManager</span> = {
    <span class="code-function">saveData</span>(<span class="code-variable">day</span>, <span class="code-variable">data</span>) {
        <span class="code-variable">localStorage</span>.<span class="code-function">setItem</span>(\`ycp_day_\${<span class="code-variable">day</span>}\`, <span class="code-variable">JSON</span>.<span class="code-function">stringify</span>(<span class="code-variable">data</span>));
        <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Saved schedule successfully: "</span> + <span class="code-variable">day</span>);
    },
    <span class="code-function">loadData</span>(<span class="code-variable">day</span>) {
        <span class="code-keyword">const</span> <span class="code-variable">cached</span> = <span class="code-variable">localStorage</span>.<span class="code-function">getItem</span>(\`ycp_day_\${<span class="code-variable">day</span>}\`);
        <span class="code-keyword">return</span> <span class="code-variable">cached</span> ? <span class="code-variable">JSON</span>.<span class="code-function">parse</span>(<span class="code-variable">cached</span>) : <span class="code-keyword">null</span>;
    }
};`
        },
        'chat-cli': {
            'readme': `<span class="code-keyword"># Local Chat Command Line Application</span>
A terminal-based client-server chat program built in Python utilizing sockets and threading capabilities.

<span class="code-keyword">## Tech Stack</span>
- <span class="code-string">Python Sockets (TCP)</span> for reliable package transmissions.
- <span class="code-string">Threading</span> to support asynchronous client message relays.
- <span class="code-string">ASCII Shell Formatting</span> for terminal readability.`,
            'code': `<span class="code-comment"># server.py - Local socket chat server</span>
<span class="code-keyword">import</span> <span class="code-variable">socket</span>
<span class="code-keyword">import</span> <span class="code-variable">threading</span>

<span class="code-variable">HOST</span> = <span class="code-string">'127.0.0.1'</span>
<span class="code-variable">PORT</span> = <span class="code-number">9999</span>
<span class="code-variable">server</span> = <span class="code-variable">socket</span>.<span class="code-function">socket</span>(<span class="code-variable">socket</span>.<span class="code-variable">AF_INET</span>, <span class="code-variable">socket</span>.<span class="code-variable">SOCK_STREAM</span>)
<span class="code-variable">server</span>.<span class="code-function">bind</span>((<span class="code-variable">HOST</span>, <span class="code-variable">PORT</span>))

<span class="code-keyword">def</span> <span class="code-function">handle_client</span>(<span class="code-variable">client_socket</span>):
    <span class="code-keyword">while</span> <span class="code-keyword">True</span>:
        <span class="code-keyword">try</span>:
            <span class="code-variable">msg</span> = <span class="code-variable">client_socket</span>.<span class="code-function">recv</span>(<span class="code-number">1024</span>)
            <span class="code-function">broadcast</span>(<span class="code-variable">msg</span>)
        <span class="code-keyword">except</span>:
            <span class="code-keyword">break</span>`
        },
        'portfolio': {
            'readme': `<span class="code-keyword"># Personal Bento Portfolio</span>
Custom responsive grid dashboard crafted using pure HTML, CSS variables, and vanilla Javascript.

<span class="code-keyword">## Guidelines implemented</span>
- <span class="code-string">Zero AI Slop</span>: All logic, CSS grid setups, and styling tokens written by hand.
- <span class="code-string">Scroll spy observer</span>: Dynamic navigation link updates.
- <span class="code-string">RPG Stats Dashboard</span>: Interactive bento cell layouts.`
            ,
            'code': `<span class="code-comment">/* layout.css - Bento Grid Dashboard definitions */</span>
<span class="code-keyword">.bento-grid</span> {
    <span class="code-keyword">display</span>: <span class="code-string">grid</span>;
    <span class="code-keyword">grid-template-columns</span>: <span class="code-function">repeat</span>(<span class="code-number">3</span>, <span class="code-number">1fr</span>);
    <span class="code-keyword">gap</span>: <span class="code-number">24px</span>;
}

<span class="code-keyword">.bento-cell</span> {
    <span class="code-keyword">backdrop-filter</span>: <span class="code-function">blur</span>(<span class="code-number">20px</span>);
    <span class="code-keyword">border-radius</span>: <span class="code-number">24px</span>;
    <span class="code-keyword">transition</span>: <span class="code-variable">all</span> <span class="code-number">0.5s</span> <span class="code-function">cubic-bezier</span>(<span class="code-number">0.175</span>, <span class="code-number">0.885</span>, <span class="code-number">0.32</span>, <span class="code-number">1.275</span>);
}`
        }
    };

    // Calculate line numbers for display
    function updateGutter(text) {
        const linesCount = text.split('\n').length;
        let gutterHtml = '';
        for (let i = 1; i <= linesCount; i++) {
            gutterHtml += `<div>${i}</div>`;
        }
        ideLineGutter.innerHTML = gutterHtml;
    }

    // Load file into viewer viewport
    function loadIdeFile(project, type) {
        const fileContent = projectDb[project]?.[type] || 'File not found.';
        
        // Update tab header text
        const ext = type === 'readme' ? 'README.md' : (project === 'chat-cli' ? 'server.py' : (project === 'portfolio' ? 'layout.css' : 'local_storage.js'));
        activeTabTitle.textContent = ext;
        
        // Load content and lines
        ideCodeViewport.innerHTML = fileContent;
        updateGutter(fileContent);
    }

    // Initialize with student-hub readme
    if (ideLineGutter && ideCodeViewport) {
        loadIdeFile('student-hub', 'readme');
    }

    // Folders Toggle
    ideFolders.forEach(folder => {
        folder.addEventListener('click', () => {
            const folderName = folder.getAttribute('data-folder');
            const targetFilesList = document.getElementById(`files-${folderName}`);
            
            if (targetFilesList) {
                const isOpen = targetFilesList.classList.contains('hidden');
                
                // Toggle lists
                if (isOpen) {
                    targetFilesList.classList.remove('hidden');
                    folder.classList.add('open');
                    folder.querySelector('.ide-icon').textContent = '📂';
                } else {
                    targetFilesList.classList.add('hidden');
                    folder.classList.remove('open');
                    folder.querySelector('.ide-icon').textContent = '📁';
                }
            }
        });
    });

    // Files Clicking
    ideFiles.forEach(file => {
        file.addEventListener('click', () => {
            ideFiles.forEach(f => f.classList.remove('active'));
            file.classList.add('active');
            
            const project = file.getAttribute('data-project');
            const fileType = file.getAttribute('data-file');
            
            loadIdeFile(project, fileType);
        });
    });

    /* ==========================================================================
       5. RPG CHARACTER SHEET PASSIVES INTERACTION (HOBBIES SECTION)
       ========================================================================== */
    const rpgSkillCards = document.querySelectorAll('.rpg-skill-card');
    const statInt = document.getElementById('stat-int');
    const statStr = document.getElementById('stat-str');
    const statVit = document.getElementById('stat-vit');
    const statDex = document.getElementById('stat-dex');

    rpgSkillCards.forEach(card => {
        const updateAttributes = () => {
            // Remove active classes
            rpgSkillCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Read stats and set progress widths
            const intVal = card.getAttribute('data-int') || 85;
            const strVal = card.getAttribute('data-str') || 78;
            const vitVal = card.getAttribute('data-vit') || 90;
            const dexVal = card.getAttribute('data-dex') || 82;

            statInt.style.width = `${intVal}%`;
            statInt.parentElement.nextElementSibling.textContent = `${intVal}/100`;

            statStr.style.width = `${strVal}%`;
            statStr.parentElement.nextElementSibling.textContent = `${strVal}/100`;

            statVit.style.width = `${vitVal}%`;
            statVit.parentElement.nextElementSibling.textContent = `${vitVal}/100`;

            statDex.style.width = `${dexVal}%`;
            statDex.parentElement.nextElementSibling.textContent = `${dexVal}/100`;
        };

        card.addEventListener('mouseenter', updateAttributes);
        card.addEventListener('click', updateAttributes);
    });

    /* ==========================================================================
       6. INTERACTIVE FOOTER LOCAL STORAGE MAILBOX
       ========================================================================== */
    const mailboxForm = document.getElementById('mailbox-form');
    const mailboxLog = document.getElementById('mailbox-log');

    if (mailboxForm && mailboxLog) {
        mailboxForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('mail-email');
            const msgInput = document.getElementById('mail-msg');
            const sendBtn = document.getElementById('btn-mail-send');

            if (emailInput.value && msgInput.value) {
                // Change button state
                sendBtn.disabled = true;
                sendBtn.textContent = 'Transmitting...';
                mailboxLog.style.color = 'var(--text-muted)';
                mailboxLog.textContent = 'Connecting to client mailbox db...';

                setTimeout(() => {
                    // Create mock package
                    const pkg = {
                        sender: emailInput.value,
                        message: msgInput.value,
                        timestamp: new Date().toISOString()
                    };

                    // Load existing or setup empty array
                    const existingLogs = JSON.parse(localStorage.getItem('ycp_portfolio_mailbox') || '[]');
                    existingLogs.push(pkg);
                    localStorage.setItem('ycp_portfolio_mailbox', JSON.stringify(existingLogs));

                    // Success trigger
                    sendBtn.disabled = false;
                    sendBtn.textContent = 'Send Output';
                    emailInput.value = '';
                    msgInput.value = '';
                    
                    mailboxLog.style.color = 'var(--accent-green)';
                    mailboxLog.textContent = 'Success: Package saved to client local DB!';

                    // Clear log after delay
                    setTimeout(() => {
                        mailboxLog.textContent = '';
                    }, 4000);

                }, 1200);
            }
        });
    }

    /* ==========================================================================
       7. BENTO CELL SCROLL ENTRY OBSERVER
       ========================================================================== */
    const bentoCells = document.querySelectorAll('.bento-cell');

    const revealObserverOptions = {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 60);
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    bentoCells.forEach(cell => {
        revealObserver.observe(cell);
    });

    /* ==========================================================================
       8. SCROLLSPY (ACTIVE NAV LINK DETECTOR)
       ========================================================================== */
    const spySections = document.querySelectorAll('section[id]');
    
    const scrollspyObserverOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '-80px 0px -40% 0px'
    };

    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollspyObserverOptions);

    spySections.forEach(section => {
        scrollspyObserver.observe(section);
    });
});
