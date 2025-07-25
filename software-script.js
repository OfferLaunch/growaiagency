// Software Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tool Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter tool cards
            toolCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            
            // Animate visible cards
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.tool-card:not(.hidden)');
                visibleCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                });
            }, 100);
        });
    });

    // Category Card Interactions
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Find and click the corresponding filter button
            const filterButton = document.querySelector(`[data-filter="${category}"]`);
            if (filterButton) {
                filterButton.click();
                
                // Scroll to tools section
                const toolsSection = document.querySelector('.ai-tools-directory');
                if (toolsSection) {
                    toolsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Software Item Interactions
    const softwareItems = document.querySelectorAll('.software-item');
    
    softwareItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

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
                if (counter.textContent.includes('+')) {
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
                if (originalText.includes('+')) {
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

    // Comparison Table Interactions
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        const tableRows = comparisonTable.querySelectorAll('.table-row');
        
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#F9FAFB';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }

    // Integration Item Interactions
    const integrationItems = document.querySelectorAll('.integration-item');
    
    integrationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px)';
            }, 150);
        });
    });

    // Software Demo Modal (placeholder)
    const demoButtons = document.querySelectorAll('a[href="#demo"]');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showDemoModal();
        });
    });
    
    function showDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
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
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            <h3 style="margin-bottom: 1rem; color: #1F2937;">Request Demo</h3>
            <p style="margin-bottom: 2rem; color: #6B7280;">Our team will contact you to schedule a personalized demo of our AI software solutions.</p>
            <form>
                <input type="text" placeholder="Your Name" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                <input type="email" placeholder="Your Email" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                <input type="text" placeholder="Company Name" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                <textarea placeholder="Tell us about your needs" style="width: 100%; padding: 1rem; margin-bottom: 2rem; border: 1px solid #E5E7EB; border-radius: 8px; height: 100px; resize: vertical;"></textarea>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Request Demo</button>
            </form>
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
        
        // Form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modalContent.innerHTML = `
                <h3 style="margin-bottom: 1rem; color: #10B981;">Thank You!</h3>
                <p style="margin-bottom: 2rem; color: #6B7280;">We'll contact you within 24 hours to schedule your demo.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
            `;
        });
    }

    // Pricing Modal (placeholder)
    const pricingButtons = document.querySelectorAll('a[href="#pricing"]');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showPricingModal();
        });
    });
    
    function showPricingModal() {
        const modal = document.createElement('div');
        modal.className = 'pricing-modal';
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
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 16px;
            max-width: 600px;
            text-align: center;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            <h3 style="margin-bottom: 1rem; color: #1F2937;">Pricing Plans</h3>
            <p style="margin-bottom: 2rem; color: #6B7280;">Choose the perfect plan for your business needs</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                <div style="padding: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                    <h4>Starter</h4>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #4F46E5;">$99/month</div>
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>Basic AI tools</li>
                        <li>Email support</li>
                        <li>5 team members</li>
                    </ul>
                </div>
                <div style="padding: 1rem; border: 2px solid #4F46E5; border-radius: 8px; background: #F9FAFB;">
                    <h4>Professional</h4>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #4F46E5;">$299/month</div>
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>All AI tools</li>
                        <li>Priority support</li>
                        <li>Unlimited team</li>
                    </ul>
                </div>
                <div style="padding: 1rem; border: 1px solid #E5E7EB; border-radius: 8px;">
                    <h4>Enterprise</h4>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #4F46E5;">$599/month</div>
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>Custom solutions</li>
                        <li>Dedicated support</li>
                        <li>API access</li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Get Started</button>
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

    // Search Functionality
    createSearchBar();
    
    function createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            display: none;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search AI tools...';
        searchInput.style.cssText = `
            padding: 0.75rem 1rem;
            border: 1px solid #E5E7EB;
            border-radius: 25px;
            width: 250px;
            font-size: 0.9rem;
        `;
        
        searchContainer.appendChild(searchInput);
        document.body.appendChild(searchContainer);
        
        // Show search on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                searchContainer.style.display = 'block';
            } else {
                searchContainer.style.display = 'none';
            }
        });
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.demo-modal, .pricing-modal');
            modals.forEach(modal => {
                if (modal.parentElement) {
                    modal.parentElement.removeChild(modal);
                }
            });
        }
        
        if (e.key === 'f' && e.ctrlKey) {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder="Search AI tools..."]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Tool Card Click Handlers
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.querySelector('h3').textContent;
            const toolPrice = this.querySelector('.tool-price').textContent;
            
            // Show tool details modal
            showToolDetails(toolName, toolPrice);
        });
    });
    
    function showToolDetails(toolName, toolPrice) {
        const modal = document.createElement('div');
        modal.className = 'tool-details-modal';
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
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            <h3 style="margin-bottom: 1rem; color: #1F2937;">${toolName}</h3>
            <p style="margin-bottom: 1rem; color: #4F46E5; font-weight: 600;">${toolPrice}</p>
            <p style="margin-bottom: 2rem; color: #6B7280;">Learn more about this AI tool and how it can benefit your business.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary">Learn More</button>
                <button class="btn btn-secondary">Try Demo</button>
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