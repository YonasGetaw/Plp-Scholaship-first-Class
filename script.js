document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    
    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        updateTogglePosition();
    });
    
    // Close mobile menu when clicking on nav items
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            
            // Set active class
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalTechnologies = document.getElementById('modal-technologies');
    const liveDemoBtn = document.getElementById('live-demo');
    const sourceCodeBtn = document.getElementById('source-code');
    const closeModalBtn = document.querySelector('.close-button');
    
    // Project data
    const projects = {
        1: {
            title: "E-commerce Website",
            image: "ecomerce.png",
            description: "A full-featured e-commerce platform with product management, shopping cart, and secure checkout functionality. This project was built to provide a seamless online shopping experience with responsive design and intuitive user interface.",
            features: [
                "User authentication and authorization",
                "Product catalog with search and filtering",
                "Shopping cart functionality",
                "Secure payment processing with Stripe",
                "Order management system",
                "Admin dashboard with analytics",
                "Responsive design for all devices",
                "Product reviews and ratings"
            ],
            technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API", "JWT", "Bootstrap"],
            liveDemo: "#",
            sourceCode: "#"
        },
        2: {
            title: "Task Management App",
            image: "task.png",
            description: "A productivity application designed to help users organize and track their tasks efficiently. The app features drag-and-drop functionality, reminders, and team collaboration tools.",
            features: [
                "Task creation and organization",
                "Drag-and-drop interface",
                "Reminders and notifications",
                "Team collaboration features",
                "Progress tracking with charts",
                "Responsive design",
                "Dark/Light mode",
                "Data persistence with Firebase"
            ],
            technologies: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS", "Vue Dragula", "Chart.js", "Vue Router"],
            liveDemo: "#",
            sourceCode: "#"
        },
        3: {
            title: "Portfolio Website",
            image: "por.png",
            description: "An elegant and responsive portfolio template for creative professionals. This project showcases my design skills and attention to detail in creating beautiful user interfaces.",
            features: [
                "Responsive design for all devices",
                "Smooth animations and transitions",
                "Project showcase with filtering",
                "Contact form with validation",
                "Dark/Light mode toggle",
                "Performance optimized",
                "Accessibility compliant",
                "SEO optimized"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Sass", "Parcel", "Formspree", "Intersection Observer"],
            liveDemo: "#",
            sourceCode: "#"
        },
        4: {
            title: "Tech Blog Platform",
            image: "blog.png",
            description: "A modern blogging platform for technical writers with markdown support and syntax highlighting. The platform includes user authentication and a rich text editor.",
            features: [
                "Markdown support with live preview",
                "Syntax highlighting for code blocks",
                "User authentication system",
                "Rich text editor with media upload",
                "Tagging and categorization",
                "Search functionality",
                "Comment system",
                "Responsive design"
            ],
            technologies: ["Next.js", "GraphQL", "Prisma", "Tailwind", "Marked.js", "Highlight.js", "NextAuth", "Vercel"],
            liveDemo: "#",
            sourceCode: "#"
        },
        5: {
            title: "Fitness Tracker",
            image: "fitness.png",
            description: "Comprehensive workout and nutrition tracking application with detailed analytics and progress visualization.",
            features: [
                "Workout logging with exercise database",
                "Nutrition tracking with food database",
                "Progress tracking with charts",
                "Workout plans and routines",
                "Body measurements tracking",
                "Dark/Light mode",
                "Offline functionality",
                "Data export options"
            ],
            technologies: ["React Native", "Firebase", "Redux", "D3.js", "Expo", "Firestore", "React Navigation", "Victory Native"],
            liveDemo: "#",
            sourceCode: "#"
        },
        6: {
            title: "Real-time Chat App",
            image: "chat.png",
            description: "Secure instant messaging application with WebSockets and end-to-end encryption for private communications.",
            features: [
                "Real-time messaging with WebSockets",
                "End-to-end encryption",
                "User authentication",
                "Group chats and channels",
                "Message history",
                "Typing indicators",
                "Online status",
                "File sharing"
            ],
            technologies: ["Socket.io", "Express", "MongoDB", "JWT", "React", "Redux", "Crypto.js", "Multer"],
            liveDemo: "#",
            sourceCode: "#"
        }
    };
    
    // Show project details in modal
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.projectId;
            const project = projects[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalDescription.textContent = project.description;
                
                // Clear previous features and technologies
                modalFeatures.innerHTML = '';
                modalTechnologies.innerHTML = '';
                
                // Add features
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
                
                // Add technologies
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = tech;
                    modalTechnologies.appendChild(span);
                });
                
                // Set links
                liveDemoBtn.href = project.liveDemo;
                sourceCodeBtn.href = project.sourceCode;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const professions = ["Full Stack Developer", "Web Designer", "UI/UX Enthusiast"];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                typingText.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentProfession.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                setTimeout(type, 500);
            } else {
                const typingSpeed = isDeleting ? 100 : 150;
                setTimeout(type, typingSpeed);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Animate skill bars when scrolled into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Dark Mode Toggle Functionality
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggleCheckbox.checked = true;
    }
    
    // Toggle dark mode
    themeToggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Update toggle position for mobile
    function updateTogglePosition() {
        if (window.innerWidth <= 768) {
            // Move toggle to nav-links when mobile menu is active
            if (navMenu.classList.contains('active')) {
                navMenu.appendChild(themeToggle);
            } else {
                // Move back to header when mobile menu is closed
                const navbar = document.querySelector('.navbar');
                navbar.insertBefore(themeToggle, hamburgerBtn);
            }
        } else {
            // Always keep in header on desktop
            const navbar = document.querySelector('.navbar');
            navbar.insertBefore(themeToggle, navMenu);
        }
    }

    // Call initially and on resize
    updateTogglePosition();
    window.addEventListener('resize', updateTogglePosition);
});