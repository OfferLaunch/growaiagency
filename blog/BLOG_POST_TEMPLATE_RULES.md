# Blog Post Template Rules

## Required Elements for Every Blog Post

### 1. FAQ Section (3 Questions)
- Add a "Frequently Asked Questions" section before the Final CTA
- Include exactly 3 FAQ questions based on the blog content
- Questions should address common reader concerns about the topic
- Answers should be comprehensive and helpful

### 2. Strategic Hyperlinks (Max 2 per page)
- Add 1-2 hyperlinks to related blog posts when topics are mentioned
- Links should be relevant and natural - don't overdo it
- Use inline style: `style="color: #5CC49D; text-decoration: underline;"`
- Link to related topics that enhance reader understanding

### 3. FAQ CSS Styling
Include this CSS in the `<style>` section:

```css
.faq-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-item {
    margin-bottom: 2.5rem;
}

.faq-item:last-child {
    margin-bottom: 0;
}

.faq-question {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.4;
}

.faq-answer {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 0;
}

.blog-post-content a {
    color: #5CC49D;
    text-decoration: underline;
    transition: color 0.3s ease;
}

.blog-post-content a:hover {
    color: #4a9d7d;
}

@media (max-width: 768px) {
    .faq-question {
        font-size: 1.2rem;
    }
    
    .faq-answer {
        font-size: 1rem;
    }
}
```

### 4. FAQ HTML Structure
Place before the closing `</div></div></section>` of the blog content:

```html
<h2>Frequently Asked Questions</h2>

<div class="faq-section">
    <div class="faq-item">
        <h3 class="faq-question">Question 1?</h3>
        <p class="faq-answer">Answer 1...</p>
    </div>

    <div class="faq-item">
        <h3 class="faq-question">Question 2?</h3>
        <p class="faq-answer">Answer 2...</p>
    </div>

    <div class="faq-item">
        <h3 class="faq-question">Question 3?</h3>
        <p class="faq-answer">Answer 3...</p>
    </div>
</div>
```

## Hyperlink Guidelines
- Maximum 2 hyperlinks per blog post
- Only link when the topic is naturally mentioned
- Choose the most relevant related blog post
- Use natural, contextual linking - don't force it
