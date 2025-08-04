// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animated Counters for Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
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
                } else if (counter.textContent.includes('/')) {
                    counter.textContent = (Math.floor(current * 10) / 10).toFixed(1) + '/5';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = (Math.floor(current * 10) / 10).toFixed(1) + '%';
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
                } else if (originalText.includes('/')) {
                    counter.textContent = target.toFixed(1) + '/5';
                } else if (originalText.includes('%')) {
                    counter.textContent = target.toFixed(1) + '%';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Team Member Interactions
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            showTeamMemberModal(this);
        });
    });
    
    function showTeamMemberModal(member) {
        const name = member.querySelector('h3').textContent;
        const title = member.querySelector('.member-title').textContent;
        const bio = member.querySelector('.member-bio').textContent;
        const image = member.querySelector('img').src;
        
        const modal = document.createElement('div');
        modal.className = 'team-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; z-index: 10;">×</button>
            <div style="padding: 3rem;">
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <img src="${image}" alt="${name}" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div>
                        <h2 style="margin-bottom: 0.5rem; color: #1F2937;">${name}</h2>
                        <p style="color: #4F46E5; font-weight: 600; margin-bottom: 1rem;">${title}</p>
                        <p style="color: #6B7280; line-height: 1.6;">${bio}</p>
                    </div>
                </div>
                <div style="background: #F9FAFB; padding: 2rem; border-radius: 8px;">
                    <h3 style="margin-bottom: 1rem; color: #1F2937;">More About ${name.split(' ')[0]}</h3>
                    <ul style="color: #6B7280; line-height: 1.6;">
                        <li>Expertise in AI and entrepreneurship</li>
                        <li>Passionate about helping others succeed</li>
                        <li>Dedicated to our mission and values</li>
                        <li>Committed to continuous learning and growth</li>
                    </ul>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Value Cards Interactions
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // Culture Items Interactions
    const cultureItems = document.querySelectorAll('.culture-item');
    
    cultureItems.forEach(item => {
        item.addEventListener('click', function() {
            showCultureModal(this);
        });
    });
    
    function showCultureModal(item) {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const icon = item.querySelector('i').className;
        
        const modal = document.createElement('div');
        modal.className = 'culture-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; z-index: 10;">×</button>
            <div style="padding: 3rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4F46E5, #7C3AED); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                    <i class="${icon}" style="font-size: 2rem; color: white;"></i>
                </div>
                <h2 style="margin-bottom: 1rem; color: #1F2937;">${title}</h2>
                <p style="color: #6B7280; line-height: 1.6; margin-bottom: 2rem;">${description}</p>
                <div style="background: #F9FAFB; padding: 2rem; border-radius: 8px;">
                    <h3 style="margin-bottom: 1rem; color: #1F2937;">How We Live This Value</h3>
                    <ul style="text-align: left; color: #6B7280; line-height: 1.6;">
                        <li>Regular team meetings and check-ins</li>
                        <li>Open communication channels</li>
                        <li>Supportive environment for growth</li>
                        <li>Recognition and celebration of achievements</li>
                    </ul>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Awards Interactions
    const awardItems = document.querySelectorAll('.award-item');
    
    awardItems.forEach(item => {
        item.addEventListener('click', function() {
            showAwardModal(this);
        });
    });
    
    function showAwardModal(item) {
        const title = item.querySelector('h3').textContent;
        const organization = item.querySelector('p').textContent;
        const icon = item.querySelector('i').className;
        
        const modal = document.createElement('div');
        modal.className = 'award-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; z-index: 10;">×</button>
            <div style="padding: 3rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #F59E0B, #FBBF24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                    <i class="${icon}" style="font-size: 2rem; color: white;"></i>
                </div>
                <h2 style="margin-bottom: 0.5rem; color: #1F2937;">${title}</h2>
                <p style="color: #4F46E5; font-weight: 600; margin-bottom: 2rem;">${organization}</p>
                <div style="background: #FEF3C7; padding: 2rem; border-radius: 8px;">
                    <h3 style="margin-bottom: 1rem; color: #92400E;">What This Award Means</h3>
                    <p style="color: #92400E; line-height: 1.6;">This recognition validates our mission and the impact we're making in the AI entrepreneurship space. It motivates us to continue helping more entrepreneurs succeed.</p>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Careers Modal
    const careersButton = document.querySelector('a[href="#careers"]');
    
    if (careersButton) {
        careersButton.addEventListener('click', function(e) {
            e.preventDefault();
            showCareersModal();
        });
    }
    
    function showCareersModal() {
        const modal = document.createElement('div');
        modal.className = 'careers-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; z-index: 10;">×</button>
            <div style="padding: 3rem;">
                <h2 style="margin-bottom: 1rem; color: #1F2937;">Join Our Team</h2>
                <p style="color: #6B7280; margin-bottom: 2rem;">We're always looking for passionate individuals who share our mission to democratize AI entrepreneurship.</p>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: #1F2937;">Open Positions</h3>
                    <div style="display: grid; gap: 1rem;">
                        <div style="padding: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1F2937;">Senior AI Engineer</h4>
                            <p style="color: #6B7280; font-size: 0.9rem; margin-bottom: 0.5rem;">Full-time • Remote</p>
                            <p style="color: #6B7280; font-size: 0.9rem;">Join our AI team to build cutting-edge tools for entrepreneurs.</p>
                        </div>
                        <div style="padding: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1F2937;">Growth Marketing Manager</h4>
                            <p style="color: #6B7280; font-size: 0.9rem; margin-bottom: 0.5rem;">Full-time • Remote</p>
                            <p style="color: #6B7280; font-size: 0.9rem;">Help us reach more entrepreneurs and grow our community.</p>
                        </div>
                        <div style="padding: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1F2937;">Community Manager</h4>
                            <p style="color: #6B7280; font-size: 0.9rem; margin-bottom: 0.5rem;">Full-time • Remote</p>
                            <p style="color: #6B7280; font-size: 0.9rem;">Build and nurture our community of entrepreneurs.</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: #F9FAFB; padding: 2rem; border-radius: 8px;">
                    <h3 style="margin-bottom: 1rem; color: #1F2937;">Benefits</h3>
                    <ul style="color: #6B7280; line-height: 1.6;">
                        <li>Competitive salary and equity packages</li>
                        <li>Remote-first culture with flexible hours</li>
                        <li>Unlimited PTO and mental health days</li>
                        <li>Learning budget for conferences and courses</li>
                        <li>Health, dental, and vision insurance</li>
                    </ul>
                </div>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">Apply Now</button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.team-modal, .culture-modal, .award-modal, .careers-modal');
            modals.forEach(modal => {
                if (modal.parentElement) {
                    modal.parentElement.removeChild(modal);
                }
            });
        }
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance optimization: Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}); 