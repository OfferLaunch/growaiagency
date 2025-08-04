// Process Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Step Navigation
    const steps = document.querySelectorAll('.process-step-detailed');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add click handlers to timeline items for smooth scrolling
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const targetStep = steps[index];
            if (targetStep) {
                targetStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Progress Tracking
    let currentStep = 0;
    const progressBar = createProgressBar();
    
    function createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-bar-container';
        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 1001;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #4F46E5, #7C3AED);
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        return progressBar;
    }
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);

    // Step Animation on Scroll
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Update current step
                const stepIndex = Array.from(steps).indexOf(entry.target);
                if (stepIndex !== -1) {
                    currentStep = stepIndex;
                    updateStepIndicator(stepIndex);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px 0px'
    });
    
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        stepObserver.observe(step);
    });
    
    function updateStepIndicator(stepIndex) {
        timelineItems.forEach((item, index) => {
            if (index <= stepIndex) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1.05)';
            } else {
                item.style.opacity = '0.6';
                item.style.transform = 'scale(1)';
            }
        });
    }

    // Interactive Cost Comparison
    const costItems = document.querySelectorAll('.cost-item');
    costItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Animated Counters for Statistics
    const statNumbers = document.querySelectorAll('.stat-number, .result-number, .metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('$')) {
                    counter.textContent = '$' + Math.floor(current).toLocaleString();
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                setTimeout(updateCounter, 30);
            } else {
                // Restore original format
                const originalText = counter.textContent;
                if (originalText.includes('$')) {
                    counter.textContent = '$' + target.toLocaleString();
                } else if (originalText.includes('+')) {
                    counter.textContent = target.toLocaleString() + '+';
                } else if (originalText.includes('%')) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    }

    // Step Navigation Menu
    createStepNavigation();
    
    function createStepNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'step-navigation';
        navContainer.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
        `;
        
        const steps = ['Set-up', 'Sell', 'Deliver', 'Scale', 'Join Forces'];
        steps.forEach((step, index) => {
            const stepButton = document.createElement('button');
            stepButton.textContent = step;
            stepButton.style.cssText = `
                display: block;
                width: 100%;
                padding: 0.5rem 1rem;
                margin: 0.25rem 0;
                border: none;
                background: transparent;
                color: #6B7280;
                cursor: pointer;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            `;
            
            stepButton.addEventListener('click', () => {
                const targetStep = document.getElementById(`step-${index + 1}`);
                if (targetStep) {
                    targetStep.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            stepButton.addEventListener('mouseenter', function() {
                this.style.background = '#4F46E5';
                this.style.color = 'white';
            });
            
            stepButton.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
                this.style.color = '#6B7280';
            });
            
            navContainer.appendChild(stepButton);
        });
        
        document.body.appendChild(navContainer);
        
        // Show navigation on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                navContainer.style.display = 'block';
            } else {
                navContainer.style.display = 'none';
            }
        });
    }

    // Interactive Checklists
    const checklistItems = document.querySelectorAll('.step-checklist li');
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = '#F0F9FF';
            this.style.borderLeftColor = '#3B82F6';
            this.querySelector('i').style.color = '#3B82F6';
        });
    });

    // Partnership CTA Enhancement
    const partnershipCTA = document.querySelector('.partnership-cta');
    if (partnershipCTA) {
        const ctaButton = partnershipCTA.querySelector('.btn');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.3)';
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        }
    }

    // Mobile Responsive Enhancements
    if (window.innerWidth <= 768) {
        // Hide step navigation on mobile
        const stepNav = document.querySelector('.step-navigation');
        if (stepNav) {
            stepNav.style.display = 'none';
        }
        
        // Adjust timeline layout
        const timeline = document.querySelector('.process-timeline');
        if (timeline) {
            timeline.style.flexDirection = 'column';
        }
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentStepElement = steps[currentStep];
            if (currentStepElement) {
                if (e.key === 'ArrowDown' && currentStep < steps.length - 1) {
                    currentStep++;
                } else if (e.key === 'ArrowUp' && currentStep > 0) {
                    currentStep--;
                }
                
                const targetStep = steps[currentStep];
                if (targetStep) {
                    targetStep.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });

    // Print-friendly styles
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Process';
    printButton.className = 'btn btn-secondary';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        display: none;
    `;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Show print button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            printButton.style.display = 'block';
        } else {
            printButton.style.display = 'none';
        }
    });

    // Add print styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            .navbar, .step-navigation, .progress-bar-container, button {
                display: none !important;
            }
            .process-step-detailed {
                break-inside: avoid;
                margin-bottom: 2rem;
            }
            body {
                font-size: 12pt;
            }
        }
    `;
    document.head.appendChild(printStyles);
}); 