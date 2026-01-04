import { useEffect, useRef, useState } from 'react';
import './GrowProcess.css';

const GrowProcess = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      letter: 'G',
      title: 'Generate',
      description: 'Build unstoppable momentum by filling your pipeline with opportunities.',
      bullets: [
        'Learn how to consistently book meetings even with zero prior experience',
        'Discover the fastest, lowest-cost strategies for launching and scaling outreach',
        'Master a repeatable system that takes you from no clients to predictable deal flow'
      ]
    },
    {
      letter: 'R',
      title: 'Refine',
      description: 'Turn raw opportunity into a sharp, irresistible offer.',
      bullets: [
        'Learn how to position yourself so clients see you as a partner, not a commodity',
        'Build a value-driven offer that commands premium pricing',
        'Develop the confidence and clarity to sell to any business owner'
      ]
    },
    {
      letter: 'O',
      title: 'Optimize',
      description: 'Deliver with impact and scale beyond yourself using AI leverage.',
      bullets: [
        'Learn how to onboard and manage clients without chaos or confusion',
        'Access our library of AI agents and automations to deliver real value for other businesses',
        'Set up the systems that let you scale from a one-person shop into a true agency'
      ]
    },
    {
      letter: 'W',
      title: 'Win',
      description: 'Stack the wins that compound into freedom and scale.',
      bullets: [
        'Learn how to close bigger clients with less resistance',
        'Discover how to expand accounts and increase lifetime value',
        'Master the fundamentals of cash flow, taxes, and business growth'
      ]
    }
  ];

  return (
    <div className="grow-process-section" ref={containerRef}>
      <div className="grow-process-container">
        {/* Glowing background effect */}
        <div className="grow-process-glow"></div>
        
        <div className="grow-process-grid">
          {steps.map((step, index) => (
            <div
              key={step.letter}
              className={`grow-process-card ${isVisible ? 'grow-process-card-visible' : ''}`}
              style={{ '--animation-delay': `${index * 150}ms` } as React.CSSProperties}
            >
              <div className="grow-process-card-header">
                <div className="grow-process-letter">{step.letter}</div>
                <h3 className="grow-process-title">{step.title}</h3>
              </div>
              <p className="grow-process-description">{step.description}</p>
              <ul className="grow-process-bullets">
                {step.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>
                    <svg
                      className="grow-process-check"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="#5CC49D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowProcess;

