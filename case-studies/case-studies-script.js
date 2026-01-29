// Case Studies Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const caseStudyItems = document.querySelectorAll('.case-study-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-category');
            
            // Filter case study items
            caseStudyItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
            
            // Animate visible items
            setTimeout(() => {
                const visibleItems = document.querySelectorAll('.case-study-item:not(.hidden)');
                visibleItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                });
            }, 100);
        });
    });

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance testimonials
    setInterval(nextSlide, 5000);

    // Case Study Story Modals
    const readStoryButtons = document.querySelectorAll('.read-full-story, .read-story');
    
    readStoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story');
            showStoryModal(storyId);
        });
    });

    function showStoryModal(storyId) {
        const stories = {
            johnd: {
                title: "John Dellafiora's Fast Track: $28,500 in 33 Days",
                content: `
                    <h3>The Background</h3>
                    <p>John Dellafiora is a founder of an Insurance Brokerage in NYC and a Chartered Financial Analyst. With a newborn and a desire to spend more time with his family, John wanted to build another form of income that would provide flexibility and financial freedom.</p>
                    
                    <h3>The Discovery</h3>
                    <p>John discovered Grow AI's system and recognized the opportunity to leverage AI arbitrage to build additional income. His financial expertise as a CFA and experience as a business founder gave him a unique advantage in understanding market opportunities and value creation.</p>
                    
                    <h3>The Rapid Results</h3>
                    <ul>
                        <li>Day 1-14: Completed core curriculum and set up his AI arbitrage operations</li>
                        <li>Day 15-30: Implemented prospecting strategies and began outreach</li>
                        <li>Day 33: Signed his first paying client with a $4,500 setup fee</li>
                        <li>Day 33: Secured $2,000/month retainer contract</li>
                    </ul>
                    
                    <h3>The Success</h3>
                    <p>In just 33 days, John Dellafiora generated $28,500 in total revenue ($4,500 setup + $2,000/month retainer). His combination of business expertise and Grow AI's proven system created a powerful formula for rapid success.</p>
                    
                    <div class="story-metrics">
                        <div class="metric">
                            <strong>$28,500</strong>
                            <span>Total Revenue (33 Days)</span>
                        </div>
                        <div class="metric">
                            <strong>$2K/mo</strong>
                            <span>Monthly Retainer</span>
                        </div>
                        <div class="metric">
                            <strong>33</strong>
                            <span>Days to First Client</span>
                        </div>
                    </div>
                `,
                image: "https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=John+D.'s+Story"
            },
            james: {
                title: "James's Transformation: From Bartender to AI Entrepreneur",
                content: `
                    <h3>The Challenge</h3>
                    <p>James was working as a bartender in Miami, making $2,000/month. He had no business experience but was determined to change his life.</p>
                    
                    <h3>The Solution</h3>
                    <p>James discovered our AI content creation system and started offering content services to local businesses. He quickly learned how to scale his operations.</p>
                    
                    <h3>The Journey</h3>
                    <ul>
                        <li>Month 1-3: Learned the AI content creation system</li>
                        <li>Month 4-6: Built his first 10 clients</li>
                        <li>Month 7-9: Scaled to $15K/month</li>
                        <li>Month 10-12: Reached $28K/month</li>
                    </ul>
                    
                    <h3>The Outcome</h3>
                    <p>James now runs a successful AI content agency serving 20+ clients. He bought his first home and has complete financial independence.</p>
                    
                    <div class="story-metrics">
                        <div class="metric">
                            <strong>$28K</strong>
                            <span>Monthly Revenue</span>
                        </div>
                        <div class="metric">
                            <strong>20+</strong>
                            <span>Active Clients</span>
                        </div>
                        <div class="metric">
                            <strong>12</strong>
                            <span>Months to Success</span>
                        </div>
                    </div>
                `,
                image: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=James's+Story"
            }
        };

        const story = stories[storyId];
        if (!story) return;

        const modal = document.createElement('div');
        modal.className = 'story-modal';
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
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; z-index: 10;">×</button>
            <div style="padding: 3rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h2 style="margin-bottom: 1rem; color: #1F2937;">${story.title}</h2>
                        <img src="${story.image}" alt="Story Image" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: center;">
                        <div class="story-metrics" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                            <div class="metric" style="text-align: center; padding: 1rem; background: #F9FAFB; border-radius: 8px;">
                                <strong style="display: block; font-size: 1.5rem; color: #4F46E5;">$30K</strong>
                                <span style="font-size: 0.9rem; color: #6B7280;">Monthly Revenue</span>
                            </div>
                            <div class="metric" style="text-align: center; padding: 1rem; background: #F9FAFB; border-radius: 8px;">
                                <strong style="display: block; font-size: 1.5rem; color: #4F46E5;">15+</strong>
                                <span style="font-size: 0.9rem; color: #6B7280;">Clients</span>
                            </div>
                            <div class="metric" style="text-align: center; padding: 1rem; background: #F9FAFB; border-radius: 8px;">
                                <strong style="display: block; font-size: 1.5rem; color: #4F46E5;">8</strong>
                                <span style="font-size: 0.9rem; color: #6B7280;">Months</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="line-height: 1.7; color: #6B7280;">
                    ${story.content}
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

    // Video Modal Functionality
    const watchVideoButtons = document.querySelectorAll('.watch-video');
    
    watchVideoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            showVideoModal(videoId);
        });
    });

    function showVideoModal(videoId) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: #1F2937;
            border-radius: 16px;
            max-width: 800px;
            width: 100%;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: white; z-index: 10;">×</button>
            <div style="padding: 2rem; text-align: center; color: white;">
                <h3 style="margin-bottom: 1rem;">Success Story Video</h3>
                <p style="margin-bottom: 2rem; opacity: 0.8;">Watch the full interview with our successful client</p>
                <div style="background: #374151; padding: 3rem; border-radius: 8px;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: #4F46E5; margin-bottom: 1rem;"></i>
                    <p>Video content would be embedded here</p>
                    <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">Click to play the success story video</p>
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

    // Animated Counters for Statistics
    const statNumbers = document.querySelectorAll('.stat-number, .result-number');
    
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
                } else if (counter.textContent.includes('.')) {
                    counter.textContent = (Math.floor(current * 10) / 10).toFixed(1);
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
                } else if (originalText.includes('.')) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    }

    // Case Study Card Interactions
    const caseStudyCards = document.querySelectorAll('.case-study-card, .case-study-item');
    
    caseStudyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.story-modal, .video-modal');
            modals.forEach(modal => {
                if (modal.parentElement) {
                    modal.parentElement.removeChild(modal);
                }
            });
        }
        
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
        
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

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
        searchInput.placeholder = 'Search case studies...';
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
            
            caseStudyItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    }

    // Share Functionality
    const shareButtons = document.querySelectorAll('.share-story');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyTitle = this.closest('.case-study-card, .case-study-item').querySelector('h3, h4').textContent;
            shareStory(storyTitle);
        });
    });
    
    function shareStory(title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Check out this amazing success story from Grow AI!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            const text = `Check out this amazing success story: ${title}`;
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(shareUrl, '_blank');
        }
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